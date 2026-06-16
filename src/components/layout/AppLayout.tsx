import { Outlet } from 'react-router-dom'
import { BottomNav } from '../BottomNav/BottomNav'

export function AppLayout() {
  return (
    <div className="relative flex min-h-dvh w-full max-w-[430px] flex-col bg-black">
      <Outlet />
      <BottomNav />
    </div>
  )
}
