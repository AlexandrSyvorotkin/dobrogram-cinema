import { Link } from 'react-router-dom'
import { desktopInstagramViewer } from '../../data/desktopInstagramMock'
import { MODE_SELECTION_PATH } from '../../lib/appPaths'
import { UserAvatar } from '../UserAvatar'
import {
  IconDirect,
  IconHeart,
  IconHome,
  IconPlus,
  IconReels,
  IconSearch,
} from '../icons/Icons'

const navItems = [
  { label: 'Главная', icon: IconHome, active: true },
  { label: 'Поиск', icon: IconSearch },
  { label: 'Интересное', icon: IconExplore },
  { label: 'Reels', icon: IconReels },
  { label: 'Сообщения', icon: IconDirect },
  { label: 'Уведомления', icon: IconHeart },
  { label: 'Создать', icon: IconPlus },
]

function IconExplore() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M14.5 9.5L10 15l4.5-2.5L17 8l-2.5 1.5z" fill="currentColor" />
    </svg>
  )
}

function IconMore() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function DesktopInstagramNav() {
  return (
    <aside className="sticky top-0 flex h-dvh w-[244px] shrink-0 flex-col bg-[#fcfcfc] px-3 py-8">
      <div className="mb-8 h-7" aria-hidden="true" />

      <nav className="space-y-1">
        {navItems.map(({ label, icon: Icon, active }) => (
          <button
            key={label}
            type="button"
            className={`flex w-full items-center gap-4 rounded-lg px-3 py-3 text-left transition hover:bg-[#f4f4f5] ${
              active ? 'font-bold' : 'font-normal text-black'
            }`}
          >
            <Icon />
            <span className="text-[16px]">{label}</span>
          </button>
        ))}

        <button
          type="button"
          className="flex w-full items-center gap-4 rounded-lg px-3 py-3 text-left transition hover:bg-[#f4f4f5]"
        >
          <div className="h-6 w-6 overflow-hidden rounded-full bg-[#efefef]">
            <UserAvatar src={desktopInstagramViewer.avatar} className="h-full w-full object-cover" />
          </div>
          <span className="text-[16px]">Профиль</span>
        </button>
      </nav>

      <div className="mt-auto">
        <Link
          to={MODE_SELECTION_PATH}
          className="flex w-full items-center gap-4 rounded-lg px-3 py-3 text-left transition hover:bg-[#f4f4f5]"
        >
          <IconMore />
          <span className="text-[16px]">Ещё</span>
        </Link>
      </div>
    </aside>
  )
}
