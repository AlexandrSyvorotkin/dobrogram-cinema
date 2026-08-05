import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { DobrogramProfileProvider } from '../../context/DobrogramProfileContext'
import { isDesktopPath, isInstagramPath, stripProfilePrefix } from '../../lib/appPaths'
import { BottomNav } from '../BottomNav/BottomNav'
import { RouteSwitcher } from '../RouteSwitcher/RouteSwitcher'

const MODE_SELECTION_ROUTE = '/'
const MOBILE_FULLSCREEN_ROUTES = ['/telegram', '/taxi']

export function AppLayout() {
  const { pathname } = useLocation()
  const normalizedPath = stripProfilePrefix(pathname)
  const isDesktopTelegram = normalizedPath === '/desktop/telegram'
  const isDesktopInstagram = normalizedPath === '/desktop'
  const isDesktop = isDesktopPath(pathname)
  const isModeSelection = pathname === MODE_SELECTION_ROUTE
  const isInstagramRoute = isInstagramPath(pathname)
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

  const layout = (() => {
    if (isDesktopTelegram || isDesktopInstagram) {
      return (
        <>
          <Outlet />
          <RouteSwitcher />
        </>
      )
    }

    if (isModeSelection) {
      return <Outlet />
    }

    const layoutBg =
      pathname === '/news'
        ? 'bg-[#FAF9F6]'
        : pathname === '/taxi'
          ? 'bg-[#F5F5F5]'
          : pathname === '/telegram'
            ? 'bg-[#DCF8C6]'
            : isInstagramRoute
              ? 'bg-white'
              : 'bg-[#F5F5F5]'

    return (
      <div
        className={`relative flex w-full flex-col max-w-[430px] ${
          isMobileFullscreen ? 'h-dvh overflow-hidden' : 'min-h-dvh'
        } ${layoutBg} ${
          isDesktop ? 'shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_24px_80px_rgba(0,0,0,0.55)]' : ''
        }`}
      >
        <Outlet />
        {!hideBottomNav && <BottomNav />}
        <RouteSwitcher />
      </div>
    )
  })()

  return <DobrogramProfileProvider>{layout}</DobrogramProfileProvider>
}
