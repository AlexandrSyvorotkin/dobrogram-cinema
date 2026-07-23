import { useEffect, useRef } from 'react'
import { chatMessages, type ChatItem } from '../../data/telegramChat'
import { IconAttach, IconEmoji, IconMic } from './TelegramIcons'

function IncomingBubble({ text, tail, large }: { text: string; tail?: boolean; large?: boolean }) {
  return (
    <div className={`mb-[2px] flex items-start justify-start ${tail ? 'mb-2' : ''}`}>
      <div
        className={`border border-[#ececec] bg-white text-black shadow-[0_1px_0.5px_rgba(0,0,0,0.08)] ${
          large
            ? 'max-w-[760px] px-5 py-4 text-[22px] leading-[32px]'
            : 'max-w-[560px] px-3.5 py-2.5 text-[15px] leading-[21px]'
        } ${tail ? 'rounded-[12px_12px_12px_4px]' : 'rounded-[12px]'}`}
      >
        {text}
      </div>
    </div>
  )
}

function OutgoingBubble({ text, tail, large }: { text: string; tail?: boolean; large?: boolean }) {
  return (
    <div className={`mb-[2px] flex items-start justify-end ${tail ? 'mb-2' : ''}`}>
      <div
        className={`border border-[#c5e8b7] bg-[#EEFFDE] text-black shadow-[0_1px_0.5px_rgba(0,0,0,0.08)] ${
          large
            ? 'max-w-[760px] px-5 py-4 text-[22px] leading-[32px]'
            : 'max-w-[560px] px-3.5 py-2.5 text-[15px] leading-[21px]'
        } ${tail ? 'rounded-[12px_12px_4px_12px]' : 'rounded-[12px]'}`}
      >
        {text}
      </div>
    </div>
  )
}

function ChatMessage({ item, large }: { item: ChatItem; large?: boolean }) {
  return item.outgoing ? (
    <OutgoingBubble text={item.text} tail={item.tail} large={large} />
  ) : (
    <IncomingBubble text={item.text} tail={item.tail} large={large} />
  )
}

type TelegramConversationProps = {
  variant: 'mobile' | 'desktop'
}

export function TelegramConversation({ variant }: TelegramConversationProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const isDesktop = variant === 'desktop'

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'auto', block: 'end' })
  }, [])

  return (
    <>
      <div
        className={`no-scrollbar flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain ${
          isDesktop ? 'px-10 pt-6 pb-6' : 'px-3 pt-3 pb-28'
        }`}
      >
        {!isDesktop && <div className="min-h-0 flex-1" aria-hidden="true" />}

        <div className="shrink-0">
          {chatMessages.map((item, index) => (
            <ChatMessage key={index} item={item} large={isDesktop} />
          ))}
        </div>

        <div ref={messagesEndRef} />
      </div>

      <footer
        className={
          isDesktop
            ? 'flex shrink-0 items-center gap-5 border-t border-[#dfe3e8] bg-white px-6 py-5'
            : 'pointer-events-none absolute inset-x-0 bottom-[max(12px,env(safe-area-inset-bottom))] z-30 border-t border-[#c5e8b7] bg-[#DCF8C6] px-3 py-2.5'
        }
      >
        <div
          className={
            isDesktop
              ? 'flex w-full items-center gap-4'
              : 'pointer-events-auto flex w-full items-end gap-2 rounded-[24px] border border-[#c5e8b7] bg-white px-3 py-2 shadow-[0_1px_3px_rgba(0,0,0,0.06)]'
          }
        >
          <button type="button" className={`shrink-0 text-[#8E8E93] ${isDesktop ? 'p-1.5 [&_svg]:h-[32px] [&_svg]:w-[32px]' : 'p-1'}`} aria-label="Прикрепить">
            <IconAttach />
          </button>

          <div
            className={
              isDesktop
              ? 'flex min-h-[60px] flex-1 items-center rounded-full border border-[#dfe3e8] bg-[#f4f4f5] px-6 py-3'
              : 'flex min-h-[42px] flex-1 items-center rounded-[20px] border border-[#dcefd4] bg-[#E7FED8] px-3.5 py-2'
            }
          >
            <span className={`flex-1 ${isDesktop ? 'text-[22px] text-[#8E8E93]' : 'text-[18px] text-[#6B8E6B]'}`}>
              {isDesktop ? 'Сообщение...' : 'Сообщение'}
            </span>
            <button type="button" className={`shrink-0 text-[#8E8E93] ${isDesktop ? 'p-1 [&_svg]:h-[32px] [&_svg]:w-[32px]' : 'p-0.5'}`} aria-label="Эмодзи">
              <IconEmoji />
            </button>
          </div>

          <button type="button" className={`shrink-0 text-[#8E8E93] ${isDesktop ? 'p-1.5 [&_svg]:h-[32px] [&_svg]:w-[32px]' : 'p-1'}`} aria-label="Записать голосовое">
            <IconMic />
          </button>
        </div>
      </footer>
    </>
  )
}
