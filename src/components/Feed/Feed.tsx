import { feedPosts } from '../../data/feedPosts'
import { FeedPost } from './FeedPost'

export function Feed({ className = 'pb-[90px]' }: { className?: string }) {
  return (
    <main className={`flex-1 ${className}`}>
      {feedPosts.map((post) => (
        <FeedPost key={post.id} post={post} />
      ))}
    </main>
  )
}
