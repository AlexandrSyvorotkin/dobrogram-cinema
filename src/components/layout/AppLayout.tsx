import { Outlet, useLocation } from 'react-router-dom'
import { BottomNav } from '../BottomNav/BottomNav'

const INSTAGRAM_ROUTES = ['/', '/feed', '/reels', '/direct', '/search', '/profile']

export function AppLayout() {
  const { pathname } = useLocation()
  const isInstagramRoute = INSTAGRAM_ROUTES.includes(pathname)
  const hideBottomNav = !isInstagramRoute
  const layoutBg = pathname === '/news'
    ? 'bg-white'
    : pathname === '/taxi'
      ? 'bg-[#F5F5F5]'
      : isInstagramRoute
        ? 'bg-white'
        : 'bg-[#F5F5F5]'

  return (
    <div className={`relative flex min-h-dvh w-full max-w-[430px] flex-col ${layoutBg}`}>
      <Outlet />
      {!hideBottomNav && <BottomNav />}
    </div>
  )
}
