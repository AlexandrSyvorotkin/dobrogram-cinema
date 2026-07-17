import { useEffect, useState } from 'react'

type CountdownStep = 5 | 4 | 3 | 2 | 1 | 'ready'

type OrderCountdownOverlayProps = {
  onReady: () => void
}

const COUNTDOWN_SECONDS = [5, 4, 3, 2, 1] as const
const READY_DISPLAY_MS = 1000

export function OrderCountdownOverlay({ onReady }: OrderCountdownOverlayProps) {
  const [step, setStep] = useState<CountdownStep>(5)

  useEffect(() => {
    const timers = COUNTDOWN_SECONDS.slice(1).map((value, index) =>
      window.setTimeout(() => setStep(value), (index + 1) * 1000),
    )

    const readyTimer = window.setTimeout(() => setStep('ready'), COUNTDOWN_SECONDS.length * 1000)
    const dismissTimer = window.setTimeout(
      onReady,
      COUNTDOWN_SECONDS.length * 1000 + READY_DISPLAY_MS,
    )

    return () => {
      timers.forEach(clearTimeout)
      clearTimeout(readyTimer)
      clearTimeout(dismissTimer)
    }
  }, [onReady])

  return (
    <div className="absolute inset-0 z-[100] flex items-center justify-center bg-black/65 backdrop-blur-[3px]">
      <div
        key={step}
        className="animate-[countdown-pop_0.35s_ease-out]"
      >
        {step === 'ready' ? (
          <span className="text-[56px] leading-none font-bold tracking-[0.08em] text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.45)]">
            Ready
          </span>
        ) : (
          <span className="text-[120px] leading-none font-bold text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.45)]">
            {step}
          </span>
        )}
      </div>
    </div>
  )
}
