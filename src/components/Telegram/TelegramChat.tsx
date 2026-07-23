import { Link } from 'react-router-dom'
import { chatContact } from '../../data/telegramChat'
import { MODE_SELECTION_PATH } from '../../lib/appPaths'
import { IconChevronBack, IconProfile } from './TelegramIcons'
import { TelegramConversation } from './TelegramConversation'

export function TelegramChat() {
  return (
    <div className="relative flex h-dvh max-h-dvh w-full flex-col overflow-hidden bg-[#DCF8C6]">
      <header className="z-10 flex shrink-0 items-center gap-1 border-b border-[#dbdbdb] bg-white px-1 py-2">
        <Link to={MODE_SELECTION_PATH} className="flex items-center pl-0.5" aria-label="Назад">
          <IconChevronBack />
        </Link>

        <div className="ml-1 min-w-0 flex-1">
          <p className="truncate text-[19px] font-semibold leading-tight text-black">{chatContact.name}</p>
          <p className="truncate text-[14px] leading-tight text-[#6B8E6B]">{chatContact.status}</p>
        </div>

        <Link to={MODE_SELECTION_PATH} className="mr-1 shrink-0" aria-label="Меню режимов">
          <IconProfile />
        </Link>
      </header>

      <TelegramConversation variant="mobile" />
    </div>
  )
}
