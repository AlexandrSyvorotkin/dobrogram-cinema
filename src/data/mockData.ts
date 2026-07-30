export type { FeedPostData, PostUser, Story } from './dobrogram'
export { defaultDobrogramProfile as profileSource } from './dobrogram'

import { defaultDobrogramProfile } from './dobrogram'

export const profileUser = defaultDobrogramProfile.profileUser
export const viewer = defaultDobrogramProfile.viewer
export const stories = defaultDobrogramProfile.stories
export const profileAvatar = defaultDobrogramProfile.profileUser.avatar
