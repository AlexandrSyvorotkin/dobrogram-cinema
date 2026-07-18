import { NavLink } from 'react-router-dom'
import { user } from '../../data/mockData'
import { IconDirect, IconHome, IconReels, IconSearch } from '../icons/Icons'

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  isActive
    ? 'flex cursor-pointer items-center justify-center rounded-xl bg-white/12 px-3.5 py-2.5 text-white'
    : 'relative flex cursor-pointer items-center justify-center p-2 text-white'

export function BottomNav() {
  return (
    <nav
      className="fixed bottom-5 left-1/2 z-200 flex h-14 w-[calc(100%-32px)] max-w-[398px] -translate-x-1/2 items-center justify-around rounded-[28px] bg-[rgba(38,38,38,0.95)] px-2 backdrop-blur-md"
      aria-label="Навигация"
    >
      <NavLink to="/feed" end className={navLinkClass} aria-label="Главная">
        <IconHome />
      </NavLink>
      <NavLink to="/reels" className={navLinkClass} aria-label="Reels">
        <IconReels />
      </NavLink>
      <NavLink to="/direct" className={navLinkClass} aria-label="Сообщения">
        <IconDirect />
        <span className="absolute right-1 bottom-1.5 h-[7px] w-[7px] rounded-full border-[1.5px] border-[#262626] bg-[#ff3040]" />
      </NavLink>
      <NavLink to="/search" className={navLinkClass} aria-label="Поиск">
        <IconSearch />
      </NavLink>
      <NavLink to="/profile" className={navLinkClass} aria-label="Профиль">
        <div className="h-[26px] w-[26px] overflow-hidden rounded-full">
          <img src={user.avatar} alt="" className="h-full w-full object-cover" />
        </div>
      </NavLink>
    </nav>
  )
}
