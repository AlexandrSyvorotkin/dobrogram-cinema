import {
  getProfileBasePath,
  getProfileIdFromPathname,
  type DobrogramProfileId,
} from '../data/dobrogram'

export function stripProfilePrefix(pathname: string): string {
  if (pathname.startsWith('/vika/')) {
    return pathname.slice('/vika'.length)
  }

  if (pathname === '/vika') {
    return '/'
  }

  return pathname
}

export function isDesktopPath(pathname: string): boolean {
  const normalized = stripProfilePrefix(pathname)
  return normalized === '/desktop' || normalized.startsWith('/desktop/')
}

export const MODE_SELECTION_PATH = '/'

export function feedPath(pathname: string): string {
  const base = getProfileBasePath(getProfileIdFromPathname(pathname))
  const desktop = isDesktopPath(pathname)

  if (desktop) {
    return `${base}/desktop`.replace('//', '/')
  }

  return `${base}/feed`.replace('//', '/')
}

export function profilePath(pathname: string, segment: string): string {
  const base = getProfileBasePath(getProfileIdFromPathname(pathname))

  if (!base) {
    return `/${segment}`
  }

  return `${base}/${segment}`
}

export function telegramPath(pathname: string): string {
  return isDesktopPath(pathname) ? '/desktop/telegram' : '/telegram'
}

export function instagramMobilePaths(profileId: DobrogramProfileId): string[] {
  const base = getProfileBasePath(profileId)
  const segments = ['feed', 'reels', 'direct', 'search', 'profile']

  return segments.map((segment) => `${base}/${segment}`.replace('//', '/'))
}

export function instagramDesktopPath(profileId: DobrogramProfileId): string {
  return `${getProfileBasePath(profileId)}/desktop`.replace('//', '/')
}

export function isInstagramPath(pathname: string): boolean {
  const normalized = stripProfilePrefix(pathname)
  return (
    ['/feed', '/reels', '/direct', '/search', '/profile', '/desktop'].includes(normalized) ||
    normalized.startsWith('/desktop/')
  )
}
