import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from 'react'
import { profileUser, viewer } from '../../data/mockData'
import { formatVoiceDuration, useVoiceRecording } from '../../hooks/useVoiceRecording'
import {
  INCOMING_VOICE_REPLY_DELAY_MS,
  incomingVoiceReplyText,
  playTelegramIncomingSound,
  unlockTelegramSounds,
} from '../../lib/telegramSound'
import { UserAvatar } from '../UserAvatar'
import { IconComment, IconHeart, IconShare } from '../icons/Icons'
import { IconMic, IconMicRecording, IconPlay, IconSend, VoiceWaveform } from './FeedVoiceIcons'

export type TextComment = {
  id: string
  kind: 'text'
  username: string
  avatar: string | null
  text: string
  time: string
  own?: boolean
}

export type VoiceComment = {
  id: string
  kind: 'voice'
  username: string
  avatar: string | null
  duration: string
  time: string
  own?: boolean
}

export type PostComment = TextComment | VoiceComment

function formatCommentTime(date: Date): string {
  return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', hour12: false })
}

function createCommentId(): string {
  return `comment-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}

function TextCommentRow({ comment }: { comment: TextComment }) {
  return (
    <div className="py-0.5 leading-snug">
      <span className="mr-1.5 text-[13px] font-semibold text-white">{comment.username}</span>
      <span className="text-[13px] text-white/90">{comment.text}</span>
      <span className="ml-1.5 text-[11px] text-[#8e8e8e]">{comment.time}</span>
    </div>
  )
}

function VoiceCommentRow({ comment }: { comment: VoiceComment }) {
  return (
    <div className="flex items-center gap-2 py-1">
      <span className="shrink-0 text-[13px] font-semibold text-white">{comment.username}</span>
      <div className="flex min-w-0 flex-1 items-center gap-2 rounded-full bg-[#262626] px-2.5 py-1.5">
        <button
          type="button"
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/15"
          aria-label="Воспроизвести голосовой комментарий"
        >
          <IconPlay />
        </button>
        <VoiceWaveform />
        <span className="shrink-0 text-[11px] tabular-nums text-[#8e8e8e]">{comment.duration}</span>
      </div>
      <span className="shrink-0 text-[11px] text-[#8e8e8e]">{comment.time}</span>
    </div>
  )
}

export const PostComments = forwardRef<HTMLElement>(function PostComments(_props, ref) {
  const sectionRef = useRef<HTMLElement>(null)
  const inputId = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const [comments, setComments] = useState<PostComment[]>([])
  const [draft, setDraft] = useState('')
  const replyTimeoutRef = useRef<number | null>(null)

  useImperativeHandle(ref, () => sectionRef.current as HTMLElement)

  const clearReplyTimeout = useCallback(() => {
    if (replyTimeoutRef.current !== null) {
      window.clearTimeout(replyTimeoutRef.current)
      replyTimeoutRef.current = null
    }
  }, [])

  const scheduleAlenaReply = useCallback(() => {
    clearReplyTimeout()
    replyTimeoutRef.current = window.setTimeout(() => {
      replyTimeoutRef.current = null
      playTelegramIncomingSound()
      setComments((prev) => [
        ...prev,
        {
          id: createCommentId(),
          kind: 'text',
          username: profileUser.username,
          avatar: profileUser.avatar,
          text: incomingVoiceReplyText,
          time: formatCommentTime(new Date()),
        },
      ])
    }, INCOMING_VOICE_REPLY_DELAY_MS)
  }, [clearReplyTimeout])

  useEffect(() => () => clearReplyTimeout(), [clearReplyTimeout])

  const focusInput = () => {
    sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    inputRef.current?.focus()
  }

  const { recording, handleMicPointerDown } = useVoiceRecording((snapshot) => {
    setComments((prev) => [
      ...prev,
      {
        id: createCommentId(),
        kind: 'voice',
        username: viewer.username,
        avatar: viewer.avatar,
        duration: formatVoiceDuration(snapshot.elapsedMs),
        time: formatCommentTime(new Date()),
        own: true,
      },
    ])
    scheduleAlenaReply()
  })

  const handleMicDown = (event: ReactPointerEvent<HTMLButtonElement>) => {
    unlockTelegramSounds()
    handleMicPointerDown(event)
  }

  const submitTextComment = () => {
    const text = draft.trim()
    if (!text) return

    setComments((prev) => [
      ...prev,
      {
        id: createCommentId(),
        kind: 'text',
        username: viewer.username,
        avatar: viewer.avatar,
        text,
        time: formatCommentTime(new Date()),
        own: true,
      },
    ])
    setDraft('')
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    submitTextComment()
  }

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      submitTextComment()
    }
  }

  return (
    <section ref={sectionRef} className="border-t border-[#262626] px-3 pt-2 pb-3" aria-label="Комментарии">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button type="button" className="p-0 text-white" aria-label="Нравится">
            <IconHeart />
          </button>
          <button type="button" className="p-0 text-white" aria-label="Комментарии" onClick={focusInput}>
            <IconComment />
          </button>
          <button type="button" className="p-0 text-white" aria-label="Поделиться">
            <IconShare />
          </button>
        </div>
        {comments.length > 0 && (
          <span className="text-[13px] text-[#8e8e8e]">
            {comments.length}{' '}
            {comments.length === 1
              ? 'комментарий'
              : comments.length < 5
                ? 'комментария'
                : 'комментариев'}
          </span>
        )}
      </div>

      {comments.length > 0 && (
        <div className="mb-2 space-y-0.5">
          {comments.map((comment) =>
            comment.kind === 'text' ? (
              <TextCommentRow key={comment.id} comment={comment} />
            ) : (
              <VoiceCommentRow key={comment.id} comment={comment} />
            ),
          )}
        </div>
      )}

      {recording && (
        <div className="voice-recording-bubble mb-2 flex items-center gap-2 rounded-2xl bg-[#262626] px-3 py-2">
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ff3040] opacity-60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#ff3040]" />
          </span>
          <span className="min-w-[36px] shrink-0 text-[14px] font-medium tabular-nums text-white">
            {formatVoiceDuration(recording.elapsedMs)}
          </span>
          <VoiceWaveform bars={recording.bars} />
          <span className="ml-auto shrink-0 text-[12px] text-[#8e8e8e]">Отпустите для отправки</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <div className="h-6 w-6 shrink-0 overflow-hidden rounded-full">
          <UserAvatar src={viewer.avatar} />
        </div>

        {recording ? (
          <div className="flex min-h-[36px] flex-1 items-center rounded-full bg-[#1a1a1a] px-3.5 py-2">
            <span className="text-[14px] text-[#8e8e8e]">Запись голосового…</span>
          </div>
        ) : (
          <input
            ref={inputRef}
            id={inputId}
            type="text"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder="Добавьте комментарий…"
            className="min-h-[36px] flex-1 rounded-full border-0 bg-transparent px-1 text-[14px] text-white outline-none placeholder:text-[#8e8e8e]"
            autoComplete="off"
          />
        )}

        {!recording && draft.trim() && (
          <button
            type="submit"
            className="shrink-0 p-1 text-[#0095f6]"
            aria-label="Отправить комментарий"
          >
            <IconSend />
          </button>
        )}

        <button
          type="button"
          className="shrink-0 touch-none p-1 select-none"
          aria-label={recording ? 'Отпустите для отправки' : 'Зажмите для записи голосового'}
          onPointerDown={handleMicDown}
        >
          {recording ? <IconMicRecording /> : <IconMic />}
        </button>
      </form>
    </section>
  )
})
