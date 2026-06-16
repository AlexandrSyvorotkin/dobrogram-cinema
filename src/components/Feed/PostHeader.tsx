import type { FeedPostData } from '../../data/mockData'
import { IconDots, IconVerified } from '../icons/Icons'

type PostHeaderProps = {
  avatar: string
  authors: FeedPostData['authors']
}

export function PostHeader({ avatar, authors }: PostHeaderProps) {
  return (
    <header className="flex items-center gap-2.5 px-3 py-2.5">
      <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full bg-[#262626]">
        <img src={avatar} alt="" className="h-full w-full object-cover" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-0.5 text-[13px] leading-tight font-semibold">
          {authors.map((author, index) => (
            <span key={author.username} className="flex items-center">
              {index > 0 && <span className="font-normal">&nbsp;и&nbsp;</span>}
              <span className="text-white">{author.username}</span>
              {author.verified && <IconVerified />}
            </span>
          ))}
        </div>
      </div>
      <button
        type="button"
        className="shrink-0 cursor-pointer border-0 bg-transparent p-1 text-white"
        aria-label="Ещё"
      >
        <IconDots />
      </button>
    </header>
  )
}
