import { Outlet, useLocation } from 'react-router-dom'
import { BottomNav } from '../BottomNav/BottomNav'

export function AppLayout() {
  const { pathname } = useLocation()
  const hideBottomNav = pathname === '/news'

  return (
    <div
      className={`relative flex min-h-dvh w-full max-w-[430px] flex-col ${hideBottomNav ? 'bg-white' : 'bg-black'}`}
    >
      <Outlet />
      {!hideBottomNav && <BottomNav />}
    </div>
  )
}
