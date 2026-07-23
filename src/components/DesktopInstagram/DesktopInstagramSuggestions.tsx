import { desktopInstagramFooterLinks, desktopInstagramSuggestions } from '../../data/desktopInstagramMock'
import { profileUser, viewer } from '../../data/mockData'
import { UserAvatar } from '../UserAvatar'

function SuggestionAvatar({ username, color }: { username: string; color: string }) {
  return (
    <div
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[14px] font-semibold text-white"
      style={{ backgroundColor: color }}
    >
      {username.charAt(0).toUpperCase()}
    </div>
  )
}

export function DesktopInstagramSuggestions() {
  return (
    <aside className="sticky top-0 h-dvh w-[320px] shrink-0 bg-[#fcfcfc] py-8 pl-4 pr-3">
      <div className="mb-6 flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full">
            <UserAvatar src={viewer.avatar} className="h-full w-full object-cover" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-[14px] font-semibold text-black">{viewer.username}</p>
            <p className="truncate text-[14px] text-[#8e8e8e]">{profileUser.username}</p>
          </div>
        </div>
        <button type="button" className="shrink-0 text-[12px] font-semibold text-[#0095f6]">
          Сменить
        </button>
      </div>

      <div className="mb-3 flex items-center justify-between">
        <span className="text-[14px] font-semibold text-[#8e8e8e]">Рекомендации для вас</span>
        <button type="button" className="text-[12px] font-semibold text-black">
          Все
        </button>
      </div>

      <div className="space-y-3">
        {desktopInstagramSuggestions.map((account) => (
          <div key={account.id} className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <SuggestionAvatar username={account.username} color={account.avatarColor} />
              <div className="min-w-0">
                <p className="truncate text-[14px] font-semibold text-black">{account.username}</p>
                <p className="truncate text-[12px] text-[#8e8e8e]">{account.subtitle}</p>
              </div>
            </div>
            <button type="button" className="shrink-0 text-[12px] font-semibold text-[#0095f6]">
              Подписаться
            </button>
          </div>
        ))}
      </div>

      <p className="mt-6 text-[11px] leading-relaxed text-[#c7c7c7]">
        {desktopInstagramFooterLinks.join(' · ')}
      </p>
      <p className="mt-3 text-[11px] uppercase text-[#c7c7c7]">© 2026 Dobrogram</p>
    </aside>
  )
}
