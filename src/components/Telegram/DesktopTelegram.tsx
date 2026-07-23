import { chatContact } from '../../data/telegramChat'
import { desktopChatPreviews } from '../../data/telegramDesktopChats'
import { TelegramConversation } from './TelegramConversation'

function ChatAvatar({ name, color, src }: { name: string; color: string; src?: string }) {
  if (src) {
    return <img src={src} alt="" className="h-full w-full object-cover" />
  }

  return (
    <div
      className="flex h-full w-full items-center justify-center text-[15px] font-semibold text-white"
      style={{ backgroundColor: color }}
    >
      {name.charAt(0).toUpperCase()}
    </div>
  )
}

export function DesktopTelegram() {
  return (
    <div className="flex h-dvh w-full overflow-hidden bg-white text-black">
      <aside className="flex w-[68px] shrink-0 flex-col items-center bg-[#293A4C] py-3">
        <button type="button" className="flex h-10 w-10 items-center justify-center text-white/90" aria-label="Меню">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
      </aside>

      <section className="flex w-[340px] shrink-0 flex-col border-r border-[#dfe3e8] bg-white">
        <div className="flex items-center gap-2 border-b border-[#dfe3e8] px-3 py-2.5">
          <button type="button" className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-[#f4f4f5]" aria-label="Меню">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" stroke="#707579" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
          <div className="flex min-h-[36px] flex-1 items-center rounded-full bg-[#f4f4f5] px-3">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="mr-2 shrink-0" aria-hidden="true">
              <circle cx="11" cy="11" r="7" stroke="#8E8E93" strokeWidth="1.8" />
              <path d="M20 20l-3.5-3.5" stroke="#8E8E93" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <span className="text-[14px] text-[#8E8E93]">Поиск</span>
          </div>
        </div>

        <div className="no-scrollbar flex-1 overflow-y-auto">
          {desktopChatPreviews.map((chat) => (
            <button
              key={chat.id}
              type="button"
              className={`flex w-full items-center gap-3 px-3 py-2.5 text-left transition ${
                chat.active ? 'bg-[#419FD9] text-white' : 'hover:bg-[#f4f4f5]'
              }`}
            >
              <div className="h-[54px] w-[54px] shrink-0 overflow-hidden rounded-full">
                <ChatAvatar name={chat.name} color={chat.avatarColor} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <span className={`truncate text-[15px] font-semibold ${chat.active ? 'text-white' : 'text-black'}`}>
                    {chat.name}
                  </span>
                  <span className={`shrink-0 text-[12px] ${chat.active ? 'text-white/85' : 'text-[#8E8E93]'}`}>
                    {chat.time}
                  </span>
                </div>
                <div className="mt-0.5 flex items-center justify-between gap-2">
                  <span className={`truncate text-[14px] ${chat.active ? 'text-white/90' : 'text-[#707579]'}`}>
                    {chat.preview}
                  </span>
                  {chat.unread !== undefined && chat.unread > 0 && !chat.active && (
                    <span className="min-w-[20px] shrink-0 rounded-full bg-[#419FD9] px-1.5 text-center text-[11px] leading-[20px] font-semibold text-white">
                      {chat.unread}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="flex min-w-0 flex-1 flex-col bg-[#D9FDD3]">
        <header className="flex shrink-0 items-center gap-3 border-b border-[#dfe3e8] bg-white px-4 py-2.5">
          <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full">
            <ChatAvatar name={chatContact.name} color="#E17055" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[15px] font-semibold text-black">{chatContact.name}</p>
            <p className="truncate text-[13px] text-[#707579]">{chatContact.status}</p>
          </div>
          <div className="flex items-center gap-1 text-[#707579]">
            <button type="button" className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-[#f4f4f5]" aria-label="Поиск">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
                <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
            <button type="button" className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-[#f4f4f5]" aria-label="Звонок">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M8.5 4.5h7a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2v-11a2 2 0 0 1 2-2z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
              </svg>
            </button>
            <button type="button" className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-[#f4f4f5]" aria-label="Ещё">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="6" cy="12" r="1.4" fill="currentColor" />
                <circle cx="12" cy="12" r="1.4" fill="currentColor" />
                <circle cx="18" cy="12" r="1.4" fill="currentColor" />
              </svg>
            </button>
          </div>
        </header>

        <TelegramConversation variant="desktop" />
      </section>
    </div>
  )
}
