export type ChatItem = {
  kind: 'text'
  text: string
  outgoing: boolean
  tail?: boolean
}

export const chatContact = {
  name: 'Бывший Козел',
  status: 'был(а) недавно',
  unreadCount: 0,
}

export const chatMessages: ChatItem[] = [
  { kind: 'text', text: 'Нам срочно нужно поговорить, возьми телефон!!', outgoing: false },
  { kind: 'text', text: 'Если мы не договоримся у тебя будут проблемы!', outgoing: false },
  { kind: 'text', text: 'Не хочешь по хорошему, я могу по плохому!', outgoing: false },
  { kind: 'text', text: 'Все равно тебя достану', outgoing: false },
  { kind: 'text', text: 'И как мы будем решать вопрос ?', outgoing: false, tail: true },
  { kind: 'text', text: 'Отвали', outgoing: true, tail: true },
  { kind: 'text', text: 'Тварь ты от меня не отделаешься!', outgoing: false },
  { kind: 'text', text: 'Ало', outgoing: false },
  { kind: 'text', text: 'Трубку возьми!!!', outgoing: false },
  { kind: 'text', text: 'Быстро', outgoing: false },
  { kind: 'text', text: 'Я сейчас приеду!', outgoing: false, tail: true },
  { kind: 'text', text: 'Удали уже мой номер', outgoing: true, tail: true },
  { kind: 'text', text: 'Дура это и твоя проблема тоже!', outgoing: false, tail: true },
  { kind: 'text', text: 'Пошел к черту, Меня в это не впутывай.', outgoing: true, tail: true },
  { kind: 'text', text: 'Тварь, тебе жить надоело', outgoing: false, tail: true },
]
