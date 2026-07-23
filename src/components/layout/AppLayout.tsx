import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { isDesktopPath } from '../../lib/appPaths'
import { BottomNav } from '../BottomNav/BottomNav'
import { RouteSwitcher } from '../RouteSwitcher/RouteSwitcher'

const MOBILE_INSTAGRAM_ROUTES = ['/feed', '/reels', '/direct', '/search', '/profile']
const MODE_SELECTION_ROUTE = '/'
const DESKTOP_INSTAGRAM_ROUTES = ['/desktop']
const MOBILE_FULLSCREEN_ROUTES = ['/telegram']

export function AppLayout() {
  const { pathname } = useLocation()
  const isDesktopTelegram = pathname === '/desktop/telegram'
  const isDesktopInstagram = pathname === '/desktop'
  const isDesktop = isDesktopPath(pathname)
  const isModeSelection = pathname === MODE_SELECTION_ROUTE
  const isInstagramRoute =
    MOBILE_INSTAGRAM_ROUTES.includes(pathname) || DESKTOP_INSTAGRAM_ROUTES.includes(pathname)
  const isMobileFullscreen = MOBILE_FULLSCREEN_ROUTES.includes(pathname)
  const hideBottomNav = !isInstagramRoute

  useEffect(() => {
    document.documentElement.classList.toggle('desktop-shell', isDesktopInstagram)
    document.documentElement.classList.toggle('desktop-telegram-shell', isDesktopTelegram)
    return () => {
      document.documentElement.classList.remove('desktop-shell')
      document.documentElement.classList.remove('desktop-telegram-shell')
    }
  }, [isDesktopInstagram, isDesktopTelegram])

  if (isDesktopTelegram || isDesktopInstagram) {
    return (
      <>
        <Outlet />
        <RouteSwitcher />
      </>
    )
  }

  if (isModeSelection) {
    return (
      <>
        <Outlet />
      </>
    )
  }

  const layoutBg =
    pathname === '/news'
      ? 'bg-white'
      : pathname === '/taxi'
        ? 'bg-[#F5F5F5]'
        : pathname === '/telegram'
          ? 'bg-[#DCF8C6]'
          : isInstagramRoute
            ? 'bg-white'
            : 'bg-[#F5F5F5]'

  return (
    <div
      className={`relative flex w-full flex-col ${
        isDesktopInstagram ? 'max-w-[430px]' : 'max-w-[430px]'
      } ${isMobileFullscreen ? 'h-dvh overflow-hidden' : 'min-h-dvh'} ${layoutBg} ${
        isDesktop ? 'shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_24px_80px_rgba(0,0,0,0.55)]' : ''
      }`}
    >
      <Outlet />
      {!hideBottomNav && <BottomNav />}
      <RouteSwitcher />
    </div>
  )
}
