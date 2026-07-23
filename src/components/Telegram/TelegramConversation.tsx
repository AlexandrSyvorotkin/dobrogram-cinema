import { useEffect, useRef } from 'react'
import { chatMessages, type ChatItem } from '../../data/telegramChat'
import { IconAttach, IconEmoji, IconMic } from './TelegramIcons'

function IncomingBubble({ text, tail }: { text: string; tail?: boolean }) {
  return (
    <div className={`mb-[2px] flex items-start justify-start ${tail ? 'mb-1.5' : ''}`}>
      <div
        className={`max-w-[560px] border border-[#ececec] bg-white px-3.5 py-2.5 text-[15px] leading-[21px] text-black shadow-[0_1px_0.5px_rgba(0,0,0,0.08)] ${
          tail ? 'rounded-[12px_12px_12px_4px]' : 'rounded-[12px]'
        }`}
      >
        {text}
      </div>
    </div>
  )
}

function OutgoingBubble({ text, tail }: { text: string; tail?: boolean }) {
  return (
    <div className={`mb-[2px] flex items-start justify-end ${tail ? 'mb-1.5' : ''}`}>
      <div
        className={`max-w-[560px] border border-[#c5e8b7] bg-[#EEFFDE] px-3.5 py-2.5 text-[15px] leading-[21px] text-black shadow-[0_1px_0.5px_rgba(0,0,0,0.08)] ${
          tail ? 'rounded-[12px_12px_4px_12px]' : 'rounded-[12px]'
        }`}
      >
        {text}
      </div>
    </div>
  )
}

function ChatMessage({ item }: { item: ChatItem }) {
  return item.outgoing ? (
    <OutgoingBubble text={item.text} tail={item.tail} />
  ) : (
    <IncomingBubble text={item.text} tail={item.tail} />
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
          isDesktop ? 'px-6 pt-4 pb-4' : 'px-3 pt-3 pb-28'
        }`}
      >
        {!isDesktop && <div className="min-h-0 flex-1" aria-hidden="true" />}

        <div className="shrink-0">
          {chatMessages.map((item, index) => (
            <ChatMessage key={index} item={item} />
          ))}
        </div>

        <div ref={messagesEndRef} />
      </div>

      <footer
        className={
          isDesktop
            ? 'flex shrink-0 items-center gap-3 border-t border-[#dfe3e8] bg-white px-4 py-3'
            : 'pointer-events-none absolute inset-x-0 bottom-[max(12px,env(safe-area-inset-bottom))] z-30 border-t border-[#c5e8b7] bg-[#DCF8C6] px-3 py-2.5'
        }
      >
        <div
          className={
            isDesktop
              ? 'flex w-full items-center gap-3'
              : 'pointer-events-auto flex w-full items-end gap-2 rounded-[24px] border border-[#c5e8b7] bg-white px-3 py-2 shadow-[0_1px_3px_rgba(0,0,0,0.06)]'
          }
        >
          <button type="button" className="shrink-0 p-1 text-[#8E8E93]" aria-label="Прикрепить">
            <IconAttach />
          </button>

          <div
            className={
              isDesktop
                ? 'flex min-h-[44px] flex-1 items-center rounded-full border border-[#dfe3e8] bg-[#f4f4f5] px-4 py-2'
                : 'flex min-h-[42px] flex-1 items-center rounded-[20px] border border-[#dcefd4] bg-[#E7FED8] px-3.5 py-2'
            }
          >
            <span className={`flex-1 ${isDesktop ? 'text-[15px] text-[#8E8E93]' : 'text-[18px] text-[#6B8E6B]'}`}>
              {isDesktop ? 'Сообщение...' : 'Сообщение'}
            </span>
            <button type="button" className="shrink-0 p-0.5 text-[#8E8E93]" aria-label="Эмодзи">
              <IconEmoji />
            </button>
          </div>

          <button type="button" className="shrink-0 p-1 text-[#8E8E93]" aria-label="Записать голосовое">
            <IconMic />
          </button>
        </div>
      </footer>
    </>
  )
}
