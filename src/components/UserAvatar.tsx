type UserAvatarProps = {
  src?: string | null
  className?: string
}

export function UserAvatar({ src, className = 'h-full w-full object-cover' }: UserAvatarProps) {
  if (src) {
    return <img src={src} alt="" className={className} />
  }

  return <div className={`bg-[#363636] ${className}`} aria-hidden="true" />
}
