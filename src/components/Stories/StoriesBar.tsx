import type { Story } from '../../data/dobrogram'
import { StoryItem } from './StoryItem'

type StoriesBarProps = {
  stories: Story[]
}

export function StoriesBar({ stories }: StoriesBarProps) {
  return (
    <div className="flex gap-4 overflow-x-auto px-4 pt-2 pb-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      {stories.map((story) => (
        <StoryItem key={story.id} story={story} />
      ))}
    </div>
  )
}
