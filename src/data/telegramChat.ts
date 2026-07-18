export type MessageStatus = 'sent' | 'delivered' | 'read'

export type ChatItem =
  | { kind: 'date'; label: string }
  | {
      kind: 'text'
      text: string
      outgoing: boolean
      time: string
      status?: MessageStatus
      tail?: boolean
    }
  | {
      kind: 'voice'
      duration: string
      outgoing: boolean
      time: string
      status?: MessageStatus
    }
  | {
      kind: 'document'
      time: string
      status?: MessageStatus
    }

export const chatContact = {
  name: 'Алена',
  status: 'был(а) недавно',
  unreadCount: 0,
}

export const chatMessages: ChatItem[] = []
