import profileAvatar from '../../../assets/new-insta-feed/photo_2026-07-30_17-29-15.jpg'
import type { DobrogramProfile, FeedComment, FeedPostData } from '../types'

const images = import.meta.glob<string>('../../../assets/new-insta-feed/*.{jpg,JPG,jpeg,JPEG}', {
  eager: true,
  import: 'default',
})

const profileUser = {
  username: 'Вика',
  avatar: profileAvatar,
}

const viewer = {
  username: 'Вика',
  avatar: profileAvatar,
}

const postComments: FeedComment[] = [
  {
    id: 'comment-1',
    username: 'masha_kriv',
    text: 'Её отчим убил любовницу, щас в бегах.',
  },
  {
    id: 'comment-2',
    username: 'lera_nov',
    text: 'Да ладно, гонишь?',
  },
  {
    id: 'comment-3',
    username: 'masha_kriv',
    text: 'У меня батя в полиции работает.',
  },
]

const feedPosts: FeedPostData[] = Object.entries(images)
  .sort(([a], [b]) => b.localeCompare(a))
  .map(([path, image], index) => ({
    id: path,
    avatar: profileUser.avatar,
    authors: [{ username: profileUser.username, verified: true }],
    image,
    comments: index === 0 ? postComments : undefined,
  }))

export const vikaProfile: DobrogramProfile = {
  id: 'vika',
  label: 'Профиль Вика',
  description: 'Лента Instagram',
  profileUser,
  viewer,
  stories: [
    { id: 'own', label: viewer.username, own: true, viewed: false, avatar: profileAvatar },
    { id: '1', label: 'darinashevtsova_', viewed: true, avatar: 'https://i.pravatar.cc/150?img=5' },
    { id: '2', label: 'anna_brnn', viewed: false, avatar: 'https://i.pravatar.cc/150?img=9' },
    { id: '3', label: 'anton.lyad...', viewed: false, avatar: 'https://i.pravatar.cc/150?img=33' },
    { id: '4', label: 'kate_moroz', viewed: false, avatar: 'https://i.pravatar.cc/150?img=47' },
    { id: '5', label: 'vlad_petrov', viewed: true, avatar: 'https://i.pravatar.cc/150?img=15' },
  ],
  feedPosts,
}
