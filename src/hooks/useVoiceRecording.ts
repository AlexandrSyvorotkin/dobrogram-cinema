import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'

export type VoiceRecordingState = {
  bars: number[]
  startedAt: number
  elapsedMs: number
}

const MIN_RECORDING_MS = 400
const BAR_INTERVAL_MS = 110
const MAX_BARS = 64

export function formatVoiceDuration(ms: number): string {
  const totalSec = Math.max(0, Math.floor(ms / 1000))
  const min = Math.floor(totalSec / 60)
  const sec = totalSec % 60
  return `${min}:${sec.toString().padStart(2, '0')}`
}

function randomBarHeight(): number {
  return 3 + Math.floor(Math.random() * 11)
}

export function useVoiceRecording(onComplete: (snapshot: VoiceRecordingState) => void) {
  const [recording, setRecording] = useState<VoiceRecordingState | null>(null)
  const recordingRef = useRef<VoiceRecordingState | null>(null)
  const intervalRef = useRef<number | null>(null)
  const isRecordingActiveRef = useRef(false)
  const releaseListenersRef = useRef<(() => void) | null>(null)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  const clearRecordingInterval = useCallback(() => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const detachReleaseListeners = useCallback(() => {
    if (!releaseListenersRef.current) return
    releaseListenersRef.current()
    releaseListenersRef.current = null
  }, [])

  const finishRecording = useCallback(() => {
    if (!isRecordingActiveRef.current) return
    isRecordingActiveRef.current = false
    clearRecordingInterval()
    detachReleaseListeners()

    const snapshot = recordingRef.current
    recordingRef.current = null
    setRecording(null)

    if (!snapshot || snapshot.elapsedMs < MIN_RECORDING_MS) return
    onCompleteRef.current(snapshot)
  }, [clearRecordingInterval, detachReleaseListeners])

  const startRecording = useCallback(() => {
    if (isRecordingActiveRef.current) return
    isRecordingActiveRef.current = true

    const initial: VoiceRecordingState = {
      bars: [5, 7, 4],
      startedAt: Date.now(),
      elapsedMs: 0,
    }
    recordingRef.current = initial
    setRecording(initial)

    intervalRef.current = window.setInterval(() => {
      setRecording((prev) => {
        if (!prev) return null
        const elapsedMs = Date.now() - prev.startedAt
        const next: VoiceRecordingState = {
          startedAt: prev.startedAt,
          elapsedMs,
          bars: [...prev.bars, randomBarHeight()].slice(-MAX_BARS),
        }
        recordingRef.current = next
        return next
      })
    }, BAR_INTERVAL_MS)

    detachReleaseListeners()
    const finish = () => finishRecording()
    window.addEventListener('pointerup', finish)
    window.addEventListener('pointercancel', finish)
    window.addEventListener('touchend', finish)
    releaseListenersRef.current = () => {
      window.removeEventListener('pointerup', finish)
      window.removeEventListener('pointercancel', finish)
      window.removeEventListener('touchend', finish)
    }
  }, [detachReleaseListeners, finishRecording])

  useEffect(
    () => () => {
      clearRecordingInterval()
      detachReleaseListeners()
    },
    [clearRecordingInterval, detachReleaseListeners],
  )

  const handleMicPointerDown = (event: ReactPointerEvent<HTMLButtonElement>) => {
    event.preventDefault()
    startRecording()
  }

  return { recording, handleMicPointerDown }
}
