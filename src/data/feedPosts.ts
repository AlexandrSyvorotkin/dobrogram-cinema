import type { FeedPostData } from './mockData'
import { profileUser } from './mockData'

const images = import.meta.glob<string>('../assets/new-feed-man/*.{jpg,JPG,jpeg,JPEG,png,PNG}', {
  eager: true,
  import: 'default',
})

const MAIN_IMAGE = 'main.jpg'

const CAPTIONS: Record<string, string> = {
  'image.png': 'С мужиками на охоте',
  'image1.png': 'Все на рыбалку',
  'img3.png': 'Тишина, вода, клёв',
  [MAIN_IMAGE]: 'Отчий дом, деревня Дубки',
}

function getFileName(path: string): string {
  return path.split('/').pop() ?? path
}

function toPost([path, image]: [string, string]): FeedPostData {
  const fileName = getFileName(path)

  return {
    id: path,
    avatar: profileUser.avatar,
    authors: [{ username: profileUser.username, verified: true }],
    image,
    caption: CAPTIONS[fileName],
  }
}

function buildFeedPosts(): FeedPostData[] {
  const entries = Object.entries(images)
  const mainEntry = entries.find(([path]) => path.endsWith(`/${MAIN_IMAGE}`))
  const otherEntries = entries
    .filter(([path]) => !path.endsWith(`/${MAIN_IMAGE}`))
    .sort(([a], [b]) => a.localeCompare(b))

  const otherPosts = otherEntries.map(toPost)

  if (!mainEntry) return otherPosts

  const mainPost = toPost(mainEntry)
  const centerIndex = Math.floor(otherPosts.length / 2)

  return [
    ...otherPosts.slice(0, centerIndex),
    mainPost,
    ...otherPosts.slice(centerIndex),
  ]
}

export const feedPosts: FeedPostData[] = buildFeedPosts()
