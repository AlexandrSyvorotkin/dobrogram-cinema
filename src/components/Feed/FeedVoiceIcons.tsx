export function IconMic() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="9" y="3" width="6" height="11" rx="3" stroke="#8e8e8e" strokeWidth="1.6" />
      <path
        d="M6 11a6 6 0 0 0 12 0M12 17v3"
        stroke="#8e8e8e"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function IconMicRecording() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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

export function IconPlay() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}

export function IconSend() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"
        stroke="#0095f6"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function VoiceWaveform({ bars }: { bars?: number[] }) {
  const displayBars =
    bars ??
    [3, 5, 8, 4, 10, 6, 12, 7, 9, 5, 11, 4, 8, 6, 10, 3, 7, 9, 5, 11, 6, 8, 4, 10, 7, 12, 5, 9]

  return (
    <div className="flex h-[18px] min-w-[48px] flex-1 items-center gap-[2px] overflow-hidden">
      {displayBars.map((h, i) => (
        <span
          key={i}
          className={`w-[2px] shrink-0 rounded-full bg-black/50 ${
            bars && i >= displayBars.length - 2 ? 'animate-pulse' : ''
          }`}
          style={{ height: `${h}px` }}
        />
      ))}
    </div>
  )
}
