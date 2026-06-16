import type { FeedPostData } from './mockData'
import { user } from './mockData'

const images = import.meta.glob<string>('../assets/feed/*.{jpg,JPG,jpeg,JPEG}', {
  eager: true,
  import: 'default',
})

export const feedPosts: FeedPostData[] = Object.entries(images)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, image]) => ({
    id: path,
    avatar: user.avatar,
    authors: [{ username: user.username, verified: true }],
    image,
  }))
