import { NavLink, useLocation } from 'react-router-dom'
import { viewer } from '../../data/mockData'
import { feedPath } from '../../lib/appPaths'
import { UserAvatar } from '../UserAvatar'
import { IconDirect, IconHome, IconReels, IconSearch } from '../icons/Icons'

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  isActive
    ? 'flex cursor-pointer items-center justify-center rounded-xl bg-black/8 px-3.5 py-2.5 text-black'
    : 'relative flex cursor-pointer items-center justify-center p-2 text-black'

export function BottomNav() {
  const { pathname } = useLocation()
  const homePath = feedPath(pathname)

  return (
    <nav
      className="fixed bottom-5 left-1/2 z-200 flex h-14 w-[calc(100%-32px)] max-w-[398px] -translate-x-1/2 items-center justify-around rounded-[28px] border border-[#dbdbdb] bg-white px-2 shadow-[0_4px_24px_rgba(0,0,0,0.08)]"
      aria-label="Навигация"
    >
      <NavLink to={homePath} end className={navLinkClass} aria-label="Главная">
        <IconHome />
      </NavLink>
      <NavLink to="/reels" className={navLinkClass} aria-label="Reels">
        <IconReels />
      </NavLink>
      <NavLink to="/direct" className={navLinkClass} aria-label="Сообщения">
        <IconDirect />
        <span className="absolute right-1 bottom-1.5 h-[7px] w-[7px] rounded-full border-[1.5px] border-white bg-[#ff3040]" />
      </NavLink>
      <NavLink to="/search" className={navLinkClass} aria-label="Поиск">
        <IconSearch />
      </NavLink>
      <NavLink to="/profile" className={navLinkClass} aria-label="Профиль">
        <div className="h-[26px] w-[26px] overflow-hidden rounded-full">
          <UserAvatar src={viewer.avatar} />
        </div>
      </NavLink>
    </nav>
  )
}
