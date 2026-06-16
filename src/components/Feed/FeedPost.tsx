import type { FeedPostData } from '../../data/mockData'
import { PostHeader } from './PostHeader'
import { PostMedia } from './PostMedia'

type FeedPostProps = {
  post: FeedPostData
}

export function FeedPost({ post }: FeedPostProps) {
  return (
    <article className="border-b border-[#262626]">
      <PostHeader avatar={post.avatar} authors={post.authors} />
      <PostMedia image={post.image} overlayText={post.overlayText} />
    </article>
  )
}
