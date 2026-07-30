export type DobrogramProfileId = 'alena' | 'vika'

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
  comments?: FeedComment[]
}

export type FeedComment = {
  id: string
  username: string
  text: string
}

export type DobrogramProfile = {
  id: DobrogramProfileId
  label: string
  description: string
  profileUser: {
    username: string
    avatar: string
  }
  viewer: {
    username: string
    avatar: string | null
  }
  stories: Story[]
  feedPosts: FeedPostData[]
}
