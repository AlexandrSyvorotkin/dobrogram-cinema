import { NavLink } from 'react-router-dom'
import { viewer } from '../../data/mockData'
import { UserAvatar } from '../UserAvatar'
import { IconPlus } from '../icons/Icons'

export function Header() {
  return (
    <header className="flex h-11 items-center justify-between bg-white px-4 py-2.5">
      <NavLink
        to="/news"
        className="flex cursor-pointer items-center justify-center text-black"
        aria-label="Новости"
      >
        <IconPlus />
      </NavLink>
      <span className="font-instagram text-[28px] leading-none tracking-wide text-black select-none">
        {/* Dobrogram */}
      </span>
      <NavLink
        to="/"
        className="h-7 w-7 shrink-0 overflow-hidden rounded-full"
        aria-label="Dobrogram"
      >
        <UserAvatar src={viewer.avatar} className="h-full w-full object-cover" />
      </NavLink>
    </header>
  )
}
