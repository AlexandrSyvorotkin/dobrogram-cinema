import { useLocation } from 'react-router-dom'
import { DesktopTelegram } from '../components/Telegram/DesktopTelegram'
import { TelegramChat } from '../components/Telegram/TelegramChat'

export function MainPage() {
  const { pathname } = useLocation()

  if (pathname === '/desktop/telegram') {
    return <DesktopTelegram />
  }

  return <TelegramChat />
}
