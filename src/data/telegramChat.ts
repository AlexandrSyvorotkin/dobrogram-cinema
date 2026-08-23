import woman1 from '../assets/feed/woman/1.jpg'
import womanNew1 from '../assets/feed/woman/ChatGPT Image 13 авг. 2026 г., 12_48_08.png'
import womanNew2 from '../assets/feed/woman/Screenshot_1.png'
import womanNew3 from '../assets/feed/woman/ChatGPT Image 12 авг. 2026 г., 15_50_11.png'
import womanFoto1 from '../assets/feed/woman/фото1.png'

export type ChatItem =
  | {
      kind: 'text'
      text: string
      outgoing: boolean
      tail?: boolean
    }
  | {
      kind: 'photo'
      image: string
      caption: string
      time: string
      outgoing: boolean
      tail?: boolean
    }

export const chatContact = {
  name: 'Жукова Жанна',
  status: 'группа',
  avatar: woman1,
  unreadCount: 0,
}

export const chatMessages: ChatItem[] = [
  {
    kind: 'photo',
    image: womanNew1,
    caption: 'Прогулка по Энску ☀️',
    time: 'вчера 18:12',
    outgoing: false,
  },
  {
    kind: 'photo',
    image: womanNew2,
    caption: 'Ужин в лучшем ресторане Энска ⭐',
    time: 'вчера 19:05',
    outgoing: false,
  },
  {
    kind: 'photo',
    image: womanNew3,
    caption: 'Энск не просто город !',
    time: 'вчера 20:33',
    outgoing: false,
  },
  {
    kind: 'photo',
    image: womanFoto1,
    caption: '',
    time: 'сегодня',
    outgoing: false,
    tail: true,
  },
]
