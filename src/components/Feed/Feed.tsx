import { feedPosts } from '../../data/feedPosts'
import { FeedPost } from './FeedPost'

export function Feed() {
  return (
    <main className="flex-1 pb-[90px]">
      {feedPosts.map((post) => (
        <FeedPost key={post.id} post={post} />
      ))}
    </main>
  )
}
