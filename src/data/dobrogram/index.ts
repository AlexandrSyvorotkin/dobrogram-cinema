import { alenaProfile } from './profiles/alena'
import { vikaProfile } from './profiles/vika'
import type { DobrogramProfile, DobrogramProfileId } from './types'

export type { DobrogramProfile, DobrogramProfileId, FeedComment, FeedPostData, PostUser, Story } from './types'

export const dobrogramProfiles: Record<DobrogramProfileId, DobrogramProfile> = {
  alena: alenaProfile,
  vika: vikaProfile,
}

export const defaultDobrogramProfile = alenaProfile

export function getProfileIdFromPathname(pathname: string): DobrogramProfileId {
  if (pathname === '/vika' || pathname.startsWith('/vika/')) {
    return 'vika'
  }

  return 'alena'
}

export function getDobrogramProfile(pathname: string): DobrogramProfile {
  return dobrogramProfiles[getProfileIdFromPathname(pathname)]
}

export function getProfileBasePath(profileId: DobrogramProfileId): string {
  return profileId === 'vika' ? '/vika' : ''
}
