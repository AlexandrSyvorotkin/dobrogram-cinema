export function isDesktopPath(pathname: string): boolean {
  return pathname === '/desktop' || pathname.startsWith('/desktop/')
}

export const MODE_SELECTION_PATH = '/'

export function feedPath(pathname: string): string {
  return isDesktopPath(pathname) ? '/desktop' : '/feed'
}

export function telegramPath(pathname: string): string {
  return isDesktopPath(pathname) ? '/desktop/telegram' : '/telegram'
}
