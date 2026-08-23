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

function PhotoBubble({
  image,
  caption,
  time,
  tail,
  large,
  outgoing,
}: {
  image: string
  caption: string
  time: string
  tail?: boolean
  large?: boolean
  outgoing?: boolean
}) {
  return (
    <div
      className={`mb-3 flex items-start ${outgoing ? 'justify-end' : 'justify-start'} ${
        tail ? 'mb-4' : ''
      }`}
    >
      <div
        className={`w-full overflow-hidden border shadow-[0_1px_0.5px_rgba(0,0,0,0.08)] ${
          outgoing ? 'border-[#c5e8b7] bg-[#EEFFDE]' : 'border-[#ececec] bg-white'
        } ${large ? 'max-w-[760px]' : 'max-w-full'} ${
          tail
            ? outgoing
              ? 'rounded-[12px_12px_4px_12px]'
              : 'rounded-[12px_12px_12px_4px]'
            : 'rounded-[12px]'
        }`}
      >
        <img
          src={image}
          alt=""
          className="block h-auto w-full object-contain"
        />
        <div className={large ? 'px-5 py-3' : 'px-3 py-2'}>
          {caption ? (
            <div
              className={`whitespace-pre-wrap text-black ${
                large ? 'text-[36px] leading-[44px]' : 'text-[26px] leading-[32px]'
              }`}
            >
              {caption}
            </div>
          ) : null}
          <p
            className={`text-right text-[#6B8E6B] ${caption ? 'mt-1' : ''} ${
              large ? 'text-[16px] leading-5' : 'text-[12px] leading-4'
            }`}
          >
            {time}
          </p>
        </div>
      </div>
    </div>
  )
}

function ChatMessage({ item, large }: { item: ChatItem; large?: boolean }) {
  if (item.kind === 'photo') {
    return (
      <PhotoBubble
        image={item.image}
        caption={item.caption}
        time={item.time}
        tail={item.tail}
        large={large}
        outgoing={item.outgoing}
      />
    )
  }

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
          isDesktop ? 'px-10 pt-6 pb-6' : 'px-3 pt-3 pb-3'
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

      {isDesktop && (
        <footer className="flex shrink-0 items-center gap-5 border-t border-[#dfe3e8] bg-white px-6 py-5">
          <div className="flex w-full items-center gap-4">
            <button type="button" className="shrink-0 p-1.5 text-[#8E8E93] [&_svg]:h-[32px] [&_svg]:w-[32px]" aria-label="Прикрепить">
              <IconAttach />
            </button>

            <div className="flex min-h-[60px] flex-1 items-center rounded-full border border-[#dfe3e8] bg-[#f4f4f5] px-6 py-3">
              <span className="flex-1 text-[22px] text-[#8E8E93]">Сообщение...</span>
              <button type="button" className="shrink-0 p-1 text-[#8E8E93] [&_svg]:h-[32px] [&_svg]:w-[32px]" aria-label="Эмодзи">
                <IconEmoji />
              </button>
            </div>

            <button type="button" className="shrink-0 p-1.5 text-[#8E8E93] [&_svg]:h-[32px] [&_svg]:w-[32px]" aria-label="Записать голосовое">
              <IconMic />
            </button>
          </div>
        </footer>
      )}
    </>
  )
}
