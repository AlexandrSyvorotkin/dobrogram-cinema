import { NavLink, useLocation } from 'react-router-dom'
import { viewer } from '../../data/mockData'
import { telegramPath } from '../../lib/appPaths'
import { UserAvatar } from '../UserAvatar'
import { IconPlus } from '../icons/Icons'

export function Header() {
  const { pathname } = useLocation()

  return (
    <header className="flex h-11 items-center justify-between bg-white px-4 py-2.5">
      <NavLink
        to="/"
        className="flex cursor-pointer items-center justify-center text-black"
        aria-label="Меню режимов"
      >
        <IconPlus />
      </NavLink>
      <span className="font-instagram text-[28px] leading-none tracking-wide text-black select-none">
        {/* Dobrogram */}
      </span>
      <NavLink
        to={telegramPath(pathname)}
        className="h-7 w-7 shrink-0 overflow-hidden rounded-full"
        aria-label="Telegram"
      >
        <UserAvatar src={viewer.avatar} className="h-full w-full object-cover" />
      </NavLink>
    </header>
  )
}
