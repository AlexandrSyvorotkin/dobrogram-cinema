export type AppRouteOption = {
  id: string
  label: string
  description: string
  path: string
  device: 'phone' | 'desktop'
}

export const appRouteOptions: AppRouteOption[] = [
  {
    id: 'mobile-instagram-alena',
    label: 'Профиль Алена',
    description: 'Лента на телефоне',
    path: '/feed',
    device: 'phone',
  },
  {
    id: 'mobile-instagram-vika',
    label: 'Профиль Вика',
    description: 'Лента на телефоне',
    path: '/vika/feed',
    device: 'phone',
  },
  {
    id: 'mobile-telegram',
    label: 'Telegram',
    description: 'Чат на телефоне',
    path: '/telegram',
    device: 'phone',
  },
  {
    id: 'mobile-taxi',
    label: 'Такси',
    description: 'Приложение для водителей',
    path: '/taxi',
    device: 'phone',
  },
  {
    id: 'desktop-instagram-alena',
    label: 'Профиль Алена',
    description: 'Лента на компьютере',
    path: '/desktop',
    device: 'desktop',
  },
  {
    id: 'desktop-instagram-vika',
    label: 'Профиль Вика',
    description: 'Лента на компьютере',
    path: '/vika/desktop',
    device: 'desktop',
  },
  {
    id: 'desktop-telegram',
    label: 'Telegram',
    description: 'Десктопный Telegram',
    path: '/desktop/telegram',
    device: 'desktop',
  },
]

const alenaMobilePaths = ['/feed', '/reels', '/direct', '/search', '/profile']
const vikaMobilePaths = alenaMobilePaths.map((path) => `/vika${path}`)

export function isRouteActive(pathname: string, path: string): boolean {
  if (pathname === path) return true

  if (path === '/feed') {
    return alenaMobilePaths.includes(pathname)
  }

  if (path === '/vika/feed') {
    return vikaMobilePaths.includes(pathname)
  }

  if (path === '/desktop') {
    return pathname === '/desktop'
  }

  if (path === '/vika/desktop') {
    return pathname === '/vika/desktop'
  }

  return false
}
