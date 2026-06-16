import { stories } from '../../data/mockData'
import { StoryItem } from './StoryItem'

export function StoriesBar() {
  return (
    <div className="flex gap-4 overflow-x-auto px-4 pt-2 pb-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      {stories.map((story) => (
        <StoryItem key={story.id} story={story} />
      ))}
    </div>
  )
}
