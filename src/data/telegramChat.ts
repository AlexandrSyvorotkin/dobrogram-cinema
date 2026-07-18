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
  name: 'Влад',
  status: 'был(а) недавно',
  unreadCount: 1363,
  avatar: 'https://i.pravatar.cc/150?img=12',
}

export const chatMessages: ChatItem[] = [
  { kind: 'date', label: '19 октября 2024' },
  {
    kind: 'text',
    text: 'только вспомнил какой там был квест',
    outgoing: false,
    time: '15:37',
    tail: false,
  },
  {
    kind: 'text',
    text: 'проходили ночью, вообще огонь',
    outgoing: false,
    time: '15:37',
    tail: false,
  },
  {
    kind: 'text',
    text: 'ты помнишь?',
    outgoing: false,
    time: '15:40',
    tail: true,
  },

  { kind: 'date', label: 'Сегодня' },
  {
    kind: 'text',
    text: 'конечно помню',
    outgoing: true,
    time: '11:02',
    status: 'read',
    tail: false,
  },
  {
    kind: 'text',
    text: 'мы же в прошлый раз до конца не дошли',
    outgoing: true,
    time: '11:03',
    status: 'read',
    tail: true,
  },
  {
    kind: 'text',
    text: 'ну вот, как раз можем добить',
    outgoing: false,
    time: '11:05',
    tail: true,
  },
  {
    kind: 'voice',
    duration: '0:28',
    outgoing: true,
    time: '11:06',
    status: 'read',
  },
  {
    kind: 'text',
    text: 'ага',
    outgoing: false,
    time: '11:07',
    tail: true,
  },
  {
    kind: 'document',
    time: '11:08',
    status: 'read',
  },
  {
    kind: 'text',
    text: 'заметил что изменения зелёным подсвечиваются',
    outgoing: true,
    time: '11:10',
    status: 'read',
    tail: false,
  },
  {
    kind: 'text',
    text: 'я ему направлю job offer только завтра',
    outgoing: true,
    time: '11:10',
    status: 'read',
    tail: true,
  },
  {
    kind: 'text',
    text: 'Ага',
    outgoing: false,
    time: '11:11',
    tail: true,
  },
]
