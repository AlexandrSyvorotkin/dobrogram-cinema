import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'
import { chatContact, chatMessages, type ChatItem, type MessageStatus } from '../../data/telegramChat'
import {
  INCOMING_VOICE_REPLY_DELAY_MS,
  incomingVoiceReplyText,
  playTelegramIncomingSound,
  unlockTelegramSounds,
} from '../../lib/telegramSound'
import {
  IconAttach,
  IconChevronBack,
  IconChecks,
  IconEmoji,
  IconMic,
  IconMicRecording,
  IconPlay,
  VoiceWaveform,
} from './TelegramIcons'

type RecordingState = {
  bars: number[]
  startedAt: number
  elapsedMs: number
}

const MIN_RECORDING_MS = 400
const BAR_INTERVAL_MS = 110
const MAX_BARS = 64

function formatVoiceDuration(ms: number): string {
  const totalSec = Math.max(0, Math.floor(ms / 1000))
  const min = Math.floor(totalSec / 60)
  const sec = totalSec % 60
  return `${min}:${sec.toString().padStart(2, '0')}`
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', hour12: false })
}

function randomBarHeight(): number {
  return 3 + Math.floor(Math.random() * 11)
}

function MessageMeta({ time, status }: { time: string; status?: MessageStatus }) {
  return (
    <span className="float-right ml-2 flex translate-y-[3px] items-end gap-[3px] pl-2">
      <span className="text-[11px] leading-none text-white/55">{time}</span>
      {status && <IconChecks status={status} />}
    </span>
  )
}

function IncomingBubble({ text, time, tail }: { text: string; time: string; tail?: boolean }) {
  return (
    <div className={`mb-[2px] flex justify-start ${tail ? 'mb-1.5' : ''}`}>
      <div
        className={`max-w-[78%] bg-[#182533] px-2.5 py-1.5 text-[16px] leading-[21px] text-white ${
          tail ? 'rounded-[18px_18px_18px_4px]' : 'rounded-[18px]'
        }`}
      >
        {text}
        <span className="float-right ml-2 translate-y-[3px] pl-2 text-[11px] leading-none text-white/45">
          {time}
        </span>
      </div>
    </div>
  )
}

function OutgoingBubble({
  text,
  time,
  status,
  tail,
}: {
  text: string
  time: string
  status?: MessageStatus
  tail?: boolean
}) {
  return (
    <div className={`mb-[2px] flex justify-end ${tail ? 'mb-1.5' : ''}`}>
      <div
        className={`max-w-[78%] bg-[#2B5278] px-2.5 py-1.5 text-[16px] leading-[21px] text-white ${
          tail ? 'rounded-[18px_18px_4px_18px]' : 'rounded-[18px]'
        }`}
      >
        {text}
        <MessageMeta time={time} status={status} />
      </div>
    </div>
  )
}

function VoiceBubble({
  duration,
  time,
  status,
  bars,
  recording = false,
}: {
  duration: string
  time: string
  status?: MessageStatus
  bars?: number[]
  recording?: boolean
}) {
  const bubbleWidth = bars
    ? `${Math.min(78, 28 + bars.length * 0.85)}%`
    : undefined

  return (
    <div className="mb-1.5 flex justify-end">
      <div
        className={`flex items-center gap-2 rounded-[18px_18px_4px_18px] bg-[#8774E1] px-2.5 py-2 transition-[width] duration-150 ease-out ${
          recording ? 'voice-recording-bubble' : 'max-w-[78%]'
        }`}
        style={bubbleWidth ? { width: bubbleWidth, maxWidth: '78%' } : undefined}
      >
        <div
          className={`flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full ${
            recording ? 'bg-[#ff3040]/25' : 'bg-white/20'
          }`}
        >
          {recording ? (
            <span className="h-3 w-3 animate-pulse rounded-full bg-[#ff3040]" />
          ) : (
            <button type="button" aria-label="Воспроизвести">
              <IconPlay />
            </button>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <VoiceWaveform bars={bars} />
          <div className="mt-0.5 flex items-center justify-end gap-1">
            <span className="text-[11px] text-white/70">{duration}</span>
            {!recording && status && <MessageMeta time={time} status={status} />}
          </div>
        </div>
      </div>
    </div>
  )
}

function DocumentBubble({ time, status }: { time: string; status?: MessageStatus }) {
  return (
    <div className="mb-1.5 flex justify-end">
      <div className="max-w-[78%] overflow-hidden rounded-[18px_18px_4px_18px] bg-[#2B5278] p-1">
        <div className="overflow-hidden rounded-[14px] bg-white">
          <div className="px-4 py-5 text-black">
            <p className="text-[11px] font-semibold tracking-wide text-[#333] uppercase">Job Offer</p>
            <p className="mt-3 text-[13px] leading-[1.45] text-[#222]">
              Dear Candidate,
              <br />
              <br />
              We are pleased to offer you the position of Senior Developer at our company.
              <br />
              <br />
              Start date: November 1, 2024
              <br />
              Salary: $120,000/year
            </p>
            <p className="mt-4 text-[13px] text-[#222]">Best regards,</p>
            <p className="text-[13px] font-medium text-[#222]">HR Department</p>
          </div>
        </div>
        <div className="flex justify-end px-2 py-1">
          <MessageMeta time={time} status={status} />
        </div>
      </div>
    </div>
  )
}

function DateSeparator({ label }: { label: string }) {
  return (
    <div className="my-3 flex justify-center">
      <span className="rounded-full bg-[rgba(0,0,0,0.35)] px-2.5 py-1 text-[13px] font-medium text-white/90 backdrop-blur-sm">
        {label}
      </span>
    </div>
  )
}

function ChatMessage({ item }: { item: ChatItem }) {
  switch (item.kind) {
    case 'date':
      return <DateSeparator label={item.label} />
    case 'text':
      return item.outgoing ? (
        <OutgoingBubble text={item.text} time={item.time} status={item.status} tail={item.tail} />
      ) : (
        <IncomingBubble text={item.text} time={item.time} tail={item.tail} />
      )
    case 'voice':
      return <VoiceBubble duration={item.duration} time={item.time} status={item.status} />
    case 'document':
      return <DocumentBubble time={item.time} status={item.status} />
  }
}

export function TelegramChat() {
  const [messages, setMessages] = useState<ChatItem[]>(() => [...chatMessages])
  const [recording, setRecording] = useState<RecordingState | null>(null)
  const recordingRef = useRef<RecordingState | null>(null)
  const intervalRef = useRef<number | null>(null)
  const messagesRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const isRecordingActiveRef = useRef(false)
  const replyTimeoutRef = useRef<number | null>(null)

  const clearReplyTimeout = useCallback(() => {
    if (replyTimeoutRef.current !== null) {
      window.clearTimeout(replyTimeoutRef.current)
      replyTimeoutRef.current = null
    }
  }, [])

  const scheduleIncomingReply = useCallback(() => {
    clearReplyTimeout()
    replyTimeoutRef.current = window.setTimeout(() => {
      replyTimeoutRef.current = null
      playTelegramIncomingSound()
      setMessages((prev) => [
        ...prev,
        {
          kind: 'text',
          text: incomingVoiceReplyText,
          outgoing: false,
          time: formatTime(new Date()),
          tail: true,
        },
      ])
    }, INCOMING_VOICE_REPLY_DELAY_MS)
  }, [clearReplyTimeout])

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [])

  useEffect(() => {
    if (recording) scrollToBottom()
  }, [recording, recording?.bars.length, recording?.elapsedMs, scrollToBottom])

  useEffect(() => {
    scrollToBottom()
  }, [messages.length, scrollToBottom])

  const clearRecordingInterval = useCallback(() => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const finishRecording = useCallback(() => {
    if (!isRecordingActiveRef.current) return
    isRecordingActiveRef.current = false
    clearRecordingInterval()

    const snapshot = recordingRef.current
    recordingRef.current = null
    setRecording(null)

    if (!snapshot || snapshot.elapsedMs < MIN_RECORDING_MS) return

    setMessages((prev) => [
      ...prev,
      {
        kind: 'voice',
        duration: formatVoiceDuration(snapshot.elapsedMs),
        outgoing: true,
        time: formatTime(new Date()),
        status: 'delivered',
      },
    ])
    scheduleIncomingReply()
  }, [clearRecordingInterval, scheduleIncomingReply])

  const startRecording = useCallback(() => {
    if (isRecordingActiveRef.current) return
    isRecordingActiveRef.current = true

    const initial: RecordingState = {
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
        const next: RecordingState = {
          startedAt: prev.startedAt,
          elapsedMs,
          bars: [...prev.bars, randomBarHeight()].slice(-MAX_BARS),
        }
        recordingRef.current = next
        return next
      })
    }, BAR_INTERVAL_MS)
  }, [])

  useEffect(
    () => () => {
      clearRecordingInterval()
      clearReplyTimeout()
    },
    [clearRecordingInterval, clearReplyTimeout],
  )

  const handleMicPointerDown = (event: ReactPointerEvent<HTMLButtonElement>) => {
    event.preventDefault()
    unlockTelegramSounds()
    event.currentTarget.setPointerCapture(event.pointerId)
    startRecording()
  }

  const handleMicPointerUp = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
    finishRecording()
  }

  return (
    <div className="telegram-bg flex h-dvh max-h-dvh w-full flex-col overflow-hidden bg-[#0E1621]">
      <header className="z-10 flex shrink-0 items-center gap-1 border-b border-white/5 bg-[rgba(23,33,43,0.94)] px-1 py-2 backdrop-blur-md">
        <button type="button" className="flex items-center pl-0.5" aria-label="Назад">
          <IconChevronBack />
        </button>
        {chatContact.unreadCount > 0 && (
          <span className="rounded-full bg-[rgba(255,255,255,0.12)] px-2 py-0.5 text-[13px] font-semibold text-white">
            {chatContact.unreadCount}
          </span>
        )}

        <div className="ml-1 min-w-0 flex-1">
          <p className="truncate text-[17px] font-semibold leading-tight text-white">{chatContact.name}</p>
          <p className="truncate text-[13px] leading-tight text-[#8E8E93]">
            {recording ? 'запись…' : chatContact.status}
          </p>
        </div>
      </header>

      <div
        ref={messagesRef}
        className="no-scrollbar flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-3 pt-2 pb-2"
      >
        <div className="min-h-0 flex-1" aria-hidden="true" />

        <div className="shrink-0">
          {messages.map((item, index) => (
            <ChatMessage key={index} item={item} />
          ))}

          {recording && (
            <VoiceBubble
              duration={formatVoiceDuration(recording.elapsedMs)}
              time=""
              bars={recording.bars}
              recording
            />
          )}
        </div>

        <div ref={messagesEndRef} />
      </div>

      <footer
        className={`z-10 flex shrink-0 items-end gap-2 border-t border-white/5 px-4 pb-[max(8px,env(safe-area-inset-bottom))] pt-2 backdrop-blur-md transition-colors ${
          recording ? 'bg-[rgba(35,24,48,0.98)]' : 'bg-[rgba(23,33,43,0.96)]'
        }`}
      >
        {!recording && (
          <button type="button" className="mb-0.5 shrink-0 p-1" aria-label="Прикрепить">
            <IconAttach />
          </button>
        )}

        {recording ? (
          <div className="mb-0.5 flex min-h-[36px] flex-1 items-center gap-2.5 rounded-[20px] bg-[#17212B] px-3 py-1.5">
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ff3040] opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#ff3040]" />
            </span>
            <span className="min-w-[36px] shrink-0 text-[17px] font-medium tabular-nums text-white">
              {formatVoiceDuration(recording.elapsedMs)}
            </span>
            <span className="flex-1 truncate text-center text-[15px] text-white/50">Отпустите для отправки</span>
          </div>
        ) : (
          <div className="flex min-h-[36px] flex-1 items-center rounded-[20px] bg-[#17212B] px-3 py-1.5">
            <span className="flex-1 text-[17px] text-[#8E8E93]">Сообщение</span>
            <button type="button" className="shrink-0" aria-label="Эмодзи">
              <IconEmoji />
            </button>
          </div>
        )}

        <button
          type="button"
          className="mb-0.5 shrink-0 touch-none p-1 select-none"
          aria-label={recording ? 'Отпустите для отправки' : 'Зажмите для записи голосового'}
          onPointerDown={handleMicPointerDown}
          onPointerUp={handleMicPointerUp}
          onPointerCancel={handleMicPointerUp}
          onLostPointerCapture={finishRecording}
        >
          {recording ? <IconMicRecording /> : <IconMic />}
        </button>
      </footer>
    </div>
  )
}
