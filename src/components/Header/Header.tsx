import { NavLink } from 'react-router-dom'
import { user } from '../../data/mockData'
import { IconPlus } from '../icons/Icons'

export function Header() {
  return (
    <header className="flex h-11 items-center justify-between bg-black px-4 py-2.5">
      <button
        type="button"
        className="flex cursor-pointer items-center justify-center border-0 bg-transparent p-0 text-white"
        aria-label="Создать"
      >
        <IconPlus />
      </button>
      <span className="font-instagram text-[28px] leading-none tracking-wide text-white select-none">
        {/* Dobrogram */}
      </span>
      <NavLink
        to="/profile"
        className="h-7 w-7 shrink-0 overflow-hidden rounded-full"
        aria-label="Профиль"
      >
        <img src={user.avatar} alt="" className="h-full w-full object-cover" />
      </NavLink>
    </header>
  )
}
