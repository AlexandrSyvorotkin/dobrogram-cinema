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
} from 'react'
import { profileUser, viewer } from '../../data/mockData'
import {
  INCOMING_VOICE_REPLY_DELAY_MS,
  incomingVoiceReplyText,
  playIncomingMessageSound,
  unlockMessageSounds,
} from '../../lib/messageSound'
import { UserAvatar } from '../UserAvatar'
import { IconComment, IconHeart, IconShare } from '../icons/Icons'

export type TextComment = {
  id: string
  username: string
  avatar: string | null
  text: string
  own?: boolean
}

function IconSend() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"
        stroke="#0095f6"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function TextCommentRow({ comment }: { comment: TextComment }) {
  return (
    <div className="py-1 leading-normal">
      <span className="mr-2 text-[16px] font-semibold text-black">{comment.username}</span>
      <span className="text-[16px] text-black/90">{comment.text}</span>
    </div>
  )
}

function createCommentId(): string {
  return `comment-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}

function createCaptionComment(text: string): TextComment {
  return {
    id: 'caption',
    username: profileUser.username,
    avatar: profileUser.avatar,
    text,
  }
}

export const PostComments = forwardRef<HTMLElement, { caption?: string }>(function PostComments(
  { caption },
  ref,
) {
  const sectionRef = useRef<HTMLElement>(null)
  const inputId = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const [comments, setComments] = useState<TextComment[]>(() =>
    caption ? [createCaptionComment(caption)] : [],
  )
  const [draft, setDraft] = useState('')
  const replyTimeoutRef = useRef<number | null>(null)

  useImperativeHandle(ref, () => sectionRef.current as HTMLElement)

  const clearReplyTimeout = useCallback(() => {
    if (replyTimeoutRef.current !== null) {
      window.clearTimeout(replyTimeoutRef.current)
      replyTimeoutRef.current = null
    }
  }, [])

  const scheduleAuthorReply = useCallback(() => {
    clearReplyTimeout()
    replyTimeoutRef.current = window.setTimeout(() => {
      replyTimeoutRef.current = null
      playIncomingMessageSound()
      setComments((prev) => [
        ...prev,
        {
          id: createCommentId(),
          username: profileUser.username,
          avatar: profileUser.avatar,
          text: incomingVoiceReplyText,
        },
      ])
    }, INCOMING_VOICE_REPLY_DELAY_MS)
  }, [clearReplyTimeout])

  useEffect(() => () => clearReplyTimeout(), [clearReplyTimeout])

  const focusInput = () => {
    sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    inputRef.current?.focus()
  }

  const submitTextComment = () => {
    const text = draft.trim()
    if (!text) return

    unlockMessageSounds()
    setComments((prev) => [
      ...prev,
      {
        id: createCommentId(),
        username: viewer.username,
        avatar: viewer.avatar,
        text,
        own: true,
      },
    ])
    setDraft('')
    scheduleAuthorReply()
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
    <section ref={sectionRef} className="border-t border-[#dbdbdb] px-3 pt-2 pb-3" aria-label="Комментарии">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button type="button" className="p-0 text-black" aria-label="Нравится">
            <IconHeart />
          </button>
          <button type="button" className="p-0 text-black" aria-label="Комментарии" onClick={focusInput}>
            <IconComment />
          </button>
          <button type="button" className="p-0 text-black" aria-label="Поделиться">
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
        <div className="mb-2 space-y-1">
          {comments.map((comment) => (
            <TextCommentRow key={comment.id} comment={comment} />
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <div className="h-6 w-6 shrink-0 overflow-hidden rounded-full">
          <UserAvatar src={viewer.avatar} />
        </div>

        <input
          ref={inputRef}
          id={inputId}
          type="text"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={handleInputKeyDown}
          placeholder="Добавьте комментарий…"
          className="min-h-[36px] flex-1 rounded-full border-0 bg-transparent px-1 text-[14px] text-black outline-none placeholder:text-[#8e8e8e]"
          autoComplete="off"
        />

        {draft.trim() && (
          <button
            type="submit"
            className="shrink-0 p-1 text-[#0095f6]"
            aria-label="Отправить комментарий"
          >
            <IconSend />
          </button>
        )}
      </form>
    </section>
  )
})
