export type DesktopChatPreview = {
  id: string
  name: string
  preview: string
  time: string
  unread?: number
  avatarColor: string
  active?: boolean
}

export const desktopChatPreviews: DesktopChatPreview[] = [
  {
    id: 'active',
    name: 'Бывший Козел',
    preview: 'Тварь, тебе жить надоело',
    time: '15:09',
    active: true,
    avatarColor: '#E17055',
  },
  {
    id: '2',
    name: 'MortHam',
    preview: 'По поводу арены позвоню в четверг',
    time: '15:32',
    unread: 2,
    avatarColor: '#74B9FF',
  },
  {
    id: '3',
    name: 'Спорт клуб',
    preview: 'Тренировки по расписанию',
    time: '14:18',
    avatarColor: '#2D6A4F',
  },
  {
    id: '4',
    name: 'Рабочий чат',
    preview: 'Андрей: созвон через 10 мин',
    time: '13:44',
    unread: 11,
    avatarColor: '#A29BFE',
  },
  {
    id: '5',
    name: 'Доставка',
    preview: 'Курьер уже у подъезда',
    time: '12:05',
    avatarColor: '#00B894',
  },
  {
    id: '6',
    name: 'Соседи',
    preview: 'Кто-нибудь видел кота?',
    time: '11:27',
    unread: 4,
    avatarColor: '#FDCB6E',
  },
  {
    id: '7',
    name: 'Алексей',
    preview: 'Ок, договорились',
    time: 'Вчера',
    avatarColor: '#636E72',
  },
  {
    id: '8',
    name: 'Кино-клуб',
    preview: 'Наташа: в субботу в 19:00',
    time: 'Вчера',
    unread: 27,
    avatarColor: '#6C5CE7',
  },
  {
    id: '9',
    name: 'Банк',
    preview: 'Код подтверждения: 482910',
    time: 'Пн',
    avatarColor: '#0984E3',
  },
  {
    id: '10',
    name: 'Такси',
    preview: 'Поездка завершена',
    time: 'Пн',
    avatarColor: '#F39C12',
  },
]