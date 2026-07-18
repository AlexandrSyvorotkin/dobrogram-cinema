export function IconChevronBack() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M14.5 6.5L9 12l5.5 5.5"
        stroke="#007AFF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function IconAttach() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M16.5 6.5v8.25a4.5 4.5 0 1 1-9 0V7.5a3 3 0 1 1 6 0v7.5a1.5 1.5 0 1 1-3 0V7.5"
        stroke="#8E8E93"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function IconEmoji() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="#8E8E93" strokeWidth="1.6" />
      <path d="M8.5 14.5c.9 1.4 2 2.1 3.5 2.1s2.6-.7 3.5-2.1" stroke="#8E8E93" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="9" cy="10" r="1" fill="#8E8E93" />
      <circle cx="15" cy="10" r="1" fill="#8E8E93" />
    </svg>
  )
}

export function IconMic() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="9" y="3" width="6" height="11" rx="3" stroke="#8E8E93" strokeWidth="1.6" />
      <path
        d="M6 11a6 6 0 0 0 12 0M12 17v3"
        stroke="#8E8E93"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function IconPlay() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="white" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}

type CheckStatus = 'sent' | 'delivered' | 'read'

export function IconChecks({ status }: { status: CheckStatus }) {
  const color = status === 'read' ? '#4FC3F7' : 'rgba(255,255,255,0.55)'
  return (
    <svg width="16" height="11" viewBox="0 0 16 11" fill="none" aria-hidden="true" className="inline-block shrink-0">
      <path
        d="M1 5.5L4.5 9 10 2"
        stroke={color}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {status !== 'sent' && (
        <path
          d="M5 5.5L8.5 9 14 2"
          stroke={color}
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  )
}

export function VoiceWaveform({ bars }: { bars?: number[] }) {
  const displayBars =
    bars ??
    [3, 5, 8, 4, 10, 6, 12, 7, 9, 5, 11, 4, 8, 6, 10, 3, 7, 9, 5, 11, 6, 8, 4, 10, 7, 12, 5, 9]

  return (
    <div className="flex h-[22px] min-w-[48px] items-center gap-[2px] overflow-hidden">
      {displayBars.map((h, i) => (
        <span
          key={i}
          className={`w-[2px] shrink-0 rounded-full bg-white/85 ${
            bars && i >= displayBars.length - 2 ? 'animate-pulse' : ''
          }`}
          style={{ height: `${h}px` }}
        />
      ))}
    </div>
  )
}

export function IconMicRecording() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="9" y="3" width="6" height="11" rx="3" fill="#ff3040" stroke="#ff3040" strokeWidth="1.6" />
      <path
        d="M6 11a6 6 0 0 0 12 0M12 17v3"
        stroke="#ff3040"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}
