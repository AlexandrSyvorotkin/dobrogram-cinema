import type { FeedPostData } from './mockData'
import { profileUser } from './mockData'

const images = import.meta.glob<string>('../assets/new-feed/*.{jpg,JPG,jpeg,JPEG}', {
  eager: true,
  import: 'default',
})

export const feedPosts: FeedPostData[] = Object.entries(images)
  .sort(([a], [b]) => b.localeCompare(a))
  .map(([path, image]) => ({
    id: path,
    avatar: profileUser.avatar,
    authors: [{ username: profileUser.username, verified: true }],
    image,
  }))
