import { Outlet, useLocation } from 'react-router-dom'
import { BottomNav } from '../BottomNav/BottomNav'

export function AppLayout() {
  const { pathname } = useLocation()
  const hideBottomNav = pathname === '/news' || pathname === '/taxi'
  const layoutBg =
    pathname === '/news' ? 'bg-white' : pathname === '/taxi' ? 'bg-[#F5F5F5]' : 'bg-black'

  return (
    <div className={`relative flex min-h-dvh w-full max-w-[430px] flex-col ${layoutBg}`}>
      <Outlet />
      {!hideBottomNav && <BottomNav />}
    </div>
  )
}
