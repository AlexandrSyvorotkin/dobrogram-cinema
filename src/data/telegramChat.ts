import woman1 from '../assets/feed/woman/1.jpg'
import woman23 from '../assets/feed/woman/23.jpg'
import woman45 from '../assets/feed/woman/45.png'
import woman5 from '../assets/feed/woman/5.png'
import womanNew1 from '../assets/feed/woman/3666250c50ee4e4cbd2ec7a86b868665.max-2500x1500.jpg'
import womanNew2 from '../assets/feed/woman/Screenshot_1.png'
import womanNew3 from '../assets/feed/woman/ChatGPT Image 12 авг. 2026 г., 15_50_11.png'

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
    caption: 'Закат на лазурном берегу ❤️',
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
    image: woman1,
    caption: 'Одна за всех тружусь в ночи, спасаю жизни!',
    time: 'сегодня 00:15',
    outgoing: false,
  },
  {
    kind: 'photo',
    image: woman23,
    caption: 'Ваша любимая Медсестра! ❤️',
    time: 'сегодня 00:18',
    outgoing: false,
  },
  {
    kind: 'photo',
    image: woman45,
    caption: '💉🩺💊🏥❤️',
    time: 'сегодня 00:20',
    outgoing: false,
  },
  {
    kind: 'photo',
    image: woman5,
    caption: '👩‍⚕️🩹🚑✨💪',
    time: 'сегодня 00:25',
    outgoing: false,
    tail: true,
  },
]
