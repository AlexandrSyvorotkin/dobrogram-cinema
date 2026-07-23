import { useRef } from 'react'
import type { FeedPostData } from '../../data/mockData'
import { PostComments } from './PostComments'
import { PostHeader } from './PostHeader'
import { PostMedia } from './PostMedia'

type FeedPostProps = {
  post: FeedPostData
}

export function FeedPost({ post }: FeedPostProps) {
  const commentsRef = useRef<HTMLElement>(null)

  const focusComments = () => {
    commentsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    commentsRef.current?.querySelector('input')?.focus()
  }

  return (
    <article className="border-b border-[#dbdbdb]">
      <PostHeader avatar={post.avatar} authors={post.authors} />
      <PostMedia image={post.image} overlayText={post.overlayText} onCommentClick={focusComments} />
      <PostComments ref={commentsRef} caption={post.caption} />
    </article>
  )
}
