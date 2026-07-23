export type AppRouteOption = {
  id: string
  label: string
  description: string
  path: string
  device: 'phone' | 'desktop'
}

export const appRouteOptions: AppRouteOption[] = [
  {
    id: 'mobile-instagram',
    label: 'Instagram',
    description: 'Лента на телефоне',
    path: '/feed',
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
    id: 'desktop-instagram',
    label: 'Instagram',
    description: 'Лента на компьютере',
    path: '/desktop',
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

export function isRouteActive(pathname: string, path: string): boolean {
  return pathname === path
}
