import { useCallback, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const TAP_GOAL = 3
const TAP_WINDOW_MS = 700

export function RouteSwitcher() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const tapCountRef = useRef(0)
  const tapTimerRef = useRef<number | null>(null)

  const goHome = useCallback(() => {
    navigate('/')
  }, [navigate])

  const registerSecretTap = useCallback(() => {
    tapCountRef.current += 1

    if (tapTimerRef.current !== null) {
      window.clearTimeout(tapTimerRef.current)
    }

    if (tapCountRef.current >= TAP_GOAL) {
      tapCountRef.current = 0
      goHome()
      return
    }

    tapTimerRef.current = window.setTimeout(() => {
      tapCountRef.current = 0
      tapTimerRef.current = null
    }, TAP_WINDOW_MS)
  }, [goHome])

  useEffect(() => {
    return () => {
      if (tapTimerRef.current !== null) {
        window.clearTimeout(tapTimerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Backquote') {
        event.preventDefault()
        goHome()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [goHome])

  if (pathname === '/') {
    return null
  }

  return (
    <button
      type="button"
      onClick={registerSecretTap}
      className="fixed bottom-0 left-0 z-[500] h-[52px] w-[52px] opacity-0"
      aria-hidden="true"
      tabIndex={-1}
    />
  )
}
