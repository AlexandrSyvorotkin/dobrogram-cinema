export function IconMenu({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M3 5h14M3 10h14M3 15h14" stroke="#212121" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function IconChevronRight({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M6 4l4 4-4 4" stroke="#9E9E9E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function IconLightning({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M7.5 1L3 8h4l-.5 5L11 6H7l.5-5z" fill="#7B61FF" />
    </svg>
  )
}

export function IconChat({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
        stroke="#212121"
        strokeWidth="1.5"
      />
      <path d="M7 10h6M10 7v6" stroke="#212121" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function IconNavigation({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M10 2l1.8 5.5H17l-4.5 3.5 1.8 5.5L10 13.5 5.7 16.5l1.8-5.5L3 7.5h5.2L10 2z"
        fill="#212121"
      />
    </svg>
  )
}

function DriverArrowIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path
        d="M14 4.5L20.8 18.6Q14 15.2 7.2 18.6L14 4.5Z"
        fill="#2B2B2B"
      />
    </svg>
  )
}

export function DriverMarker() {
  return (
    <div className="pointer-events-none absolute top-1/2 left-1/2 z-[2] -translate-x-1/2 -translate-y-1/2">
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-[0_3px_12px_rgba(0,0,0,0.14)]">
        <DriverArrowIcon />
      </div>
    </div>
  )
}

export function IconSteeringWheel() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 3v6M12 15v6M3 12h6M15 12h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function IconOrders() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="5" y="3" width="14" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 8h6M9 12h6M9 16h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function IconIncome() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="14" width="4" height="6" rx="1" fill="currentColor" />
      <rect x="10" y="10" width="4" height="10" rx="1" fill="currentColor" />
      <rect x="16" y="6" width="4" height="14" rx="1" fill="currentColor" />
    </svg>
  )
}

export function IconMessages() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M21 12a8 8 0 01-8 8H7l-4 3V12a8 8 0 018-8h4a8 8 0 018 8z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function IconPerson() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 21c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function IconBonus() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect x="4" y="6" width="24" height="20" rx="3" fill="#F5F5F5" stroke="#E0E0E0" strokeWidth="1" />
      <path d="M4 12h24" stroke="#E0E0E0" strokeWidth="1" />
      <circle cx="10" cy="9" r="1.5" fill="#BDBDBD" />
      <rect x="8" y="16" width="16" height="2" rx="1" fill="#E0E0E0" />
      <rect x="8" y="20" width="10" height="2" rx="1" fill="#E0E0E0" />
    </svg>
  )
}

export function MapBackground() {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 430 420"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <rect width="430" height="420" fill="#EDE8DF" />
      <path d="M0 180 Q80 160 160 175 T320 165 T430 180 L430 420 L0 420Z" fill="#C8E6F5" opacity="0.6" />
      <path d="M0 120 L430 100" stroke="#fff" strokeWidth="8" />
      <path d="M0 200 L430 190" stroke="#fff" strokeWidth="6" />
      <path d="M0 260 L430 250" stroke="#fff" strokeWidth="5" />
      <path d="M80 0 L80 420" stroke="#fff" strokeWidth="5" />
      <path d="M200 0 L200 420" stroke="#fff" strokeWidth="6" />
      <path d="M320 0 L320 420" stroke="#fff" strokeWidth="5" />
      <path d="M140 0 Q180 100 160 200 T140 420" stroke="#fff" strokeWidth="4" fill="none" />
      <path d="M260 0 Q240 120 280 220 T260 420" stroke="#fff" strokeWidth="4" fill="none" />
      <rect x="60" y="60" width="50" height="40" fill="#E8E4DC" rx="2" />
      <rect x="170" y="90" width="60" height="50" fill="#E8E4DC" rx="2" />
      <rect x="290" y="70" width="55" height="45" fill="#E8E4DC" rx="2" />
      <rect x="100" y="220" width="70" height="55" fill="#E8E4DC" rx="2" />
      <rect x="230" y="200" width="65" height="50" fill="#E8E4DC" rx="2" />
      <text x="155" y="55" fill="#888" fontSize="11" fontFamily="system-ui">Садовое кольцо</text>
      <text x="30" y="175" fill="#888" fontSize="10" fontFamily="system-ui">р. Москва</text>
      <text x="175" y="145" fill="#888" fontSize="10" fontFamily="system-ui">Таганская</text>
      <text x="295" y="155" fill="#888" fontSize="10" fontFamily="system-ui">Марксистская</text>
      <circle cx="175" cy="155" r="8" fill="#D32F2F" />
      <text x="171" y="159" fill="#fff" fontSize="8" fontWeight="bold" fontFamily="system-ui">M</text>
      <circle cx="295" cy="165" r="8" fill="#D32F2F" />
      <text x="291" y="169" fill="#fff" fontSize="8" fontWeight="bold" fontFamily="system-ui">M</text>
    </svg>
  )
}
