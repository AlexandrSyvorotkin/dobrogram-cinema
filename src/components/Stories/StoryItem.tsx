import type { Story } from '../../data/mockData'
import { UserAvatar } from '../UserAvatar'
import { IconAddSmall } from '../icons/Icons'

type StoryItemProps = {
  story: Story
}

export function StoryItem({ story }: StoryItemProps) {
  const wrapClass = story.own
    ? 'border border-[#363636] bg-transparent'
    : story.viewed
      ? 'bg-[#363636]'
      : 'bg-[linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)]'

  return (
    <div className="flex w-[72px] shrink-0 flex-col items-center gap-1.5">
      <div className={`relative h-[66px] w-[66px] rounded-full p-0.5 ${wrapClass}`}>
        <div className="h-full w-full overflow-hidden rounded-full border-2 border-white bg-[#efefef]">
          <UserAvatar src={story.avatar} />
        </div>
        {story.own && (
          <div className="absolute right-0 bottom-0 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-[#0095f6]">
            <IconAddSmall />
          </div>
        )}
      </div>
      <span className="max-w-[72px] truncate text-center text-[11px] text-black">{story.label}</span>
    </div>
  )
}
