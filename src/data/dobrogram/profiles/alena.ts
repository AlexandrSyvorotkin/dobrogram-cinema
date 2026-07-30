import profileAvatar from '../../../assets/new-feed/профил.png'
import type { DobrogramProfile, FeedPostData } from '../types'

const images = import.meta.glob<string>('../../../assets/new-feed/*.{jpg,JPG,jpeg,JPEG}', {
  eager: true,
  import: 'default',
})

const profileUser = {
  username: 'Алена Соколова',
  avatar: profileAvatar,
}

const viewer = {
  username: 'Светлана',
  avatar: null as string | null,
}

const feedPosts: FeedPostData[] = Object.entries(images)
  .sort(([a], [b]) => b.localeCompare(a))
  .map(([path, image]) => ({
    id: path,
    avatar: profileUser.avatar,
    authors: [{ username: profileUser.username, verified: true }],
    image,
  }))

export const alenaProfile: DobrogramProfile = {
  id: 'alena',
  label: 'Профиль Алена',
  description: 'Лента Instagram',
  profileUser,
  viewer,
  stories: [
    { id: 'own', label: viewer.username, own: true, viewed: false, avatar: null },
    { id: '1', label: 'darinashevtsova_', viewed: true, avatar: 'https://i.pravatar.cc/150?img=5' },
    { id: '2', label: 'anna_brnn', viewed: false, avatar: 'https://i.pravatar.cc/150?img=9' },
    { id: '3', label: 'anton.lyad...', viewed: false, avatar: 'https://i.pravatar.cc/150?img=33' },
    { id: '4', label: 'kate_moroz', viewed: false, avatar: 'https://i.pravatar.cc/150?img=47' },
    { id: '5', label: 'vlad_petrov', viewed: true, avatar: 'https://i.pravatar.cc/150?img=15' },
  ],
  feedPosts,
}
