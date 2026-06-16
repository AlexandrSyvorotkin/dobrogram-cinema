import { IconMute } from '../icons/Icons'

type PostMediaProps = {
  image: string
  overlayText?: string
}

export function PostMedia({ image, overlayText }: PostMediaProps) {
  return (
    <div className="relative aspect-4/5 w-full overflow-hidden bg-[#1a1a1a]">
      <img src={image} alt="Пост" className="h-full w-full object-cover" />
      {overlayText && (
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center font-serif text-[clamp(28px,8vw,36px)] tracking-[0.15em] text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.6)]">
          {overlayText}
        </span>
      )}
      <div className="absolute right-4 bottom-4 flex h-7 w-7 items-center justify-center rounded-full bg-black/50">
        <IconMute />
      </div>
    </div>
  )
}
