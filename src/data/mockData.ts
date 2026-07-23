import profileAvatar from '../assets/ava.png'

export const profileUser = {
  username: 'Павел Никонов',
  avatar: profileAvatar,
}

export const viewer = {
  username: 'Павел',
  avatar: profileAvatar,
}

export type Story = {
  id: string
  label: string
  avatar?: string | null
  own?: boolean
  viewed?: boolean
}

export type PostUser = {
  username: string
  verified?: boolean
}

export type FeedPostData = {
  id: string
  avatar: string
  authors: PostUser[]
  image: string
  overlayText?: string
  caption?: string
}

export const stories: Story[] = [
  { id: 'own', label: viewer.username, own: true, viewed: false, avatar: profileAvatar },
  { id: '1', label: 'darinashevtsova_', viewed: true, avatar: 'https://i.pravatar.cc/150?img=5' },
  { id: '2', label: 'anna_brnn', viewed: false, avatar: 'https://i.pravatar.cc/150?img=9' },
  { id: '3', label: 'anton.lyad...', viewed: false, avatar: 'https://i.pravatar.cc/150?img=33' },
  { id: '4', label: 'kate_moroz', viewed: false, avatar: 'https://i.pravatar.cc/150?img=47' },
  { id: '5', label: 'vlad_petrov', viewed: true, avatar: 'https://i.pravatar.cc/150?img=15' },
]

export { profileAvatar }
