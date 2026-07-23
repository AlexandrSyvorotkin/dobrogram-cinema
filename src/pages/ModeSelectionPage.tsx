import { useLocation } from 'react-router-dom'
import { RouteMenuContent } from '../components/RouteSwitcher/RouteMenuContent'

export function ModeSelectionPage() {
  const { pathname } = useLocation()

  return (
    <main className="flex min-h-dvh w-full items-center justify-center bg-[#f4f4f5] px-4 py-8">
      <div className="w-full max-w-[520px] rounded-[24px] bg-white px-4 py-5 shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
        <h1 className="mb-1 text-[22px] font-semibold text-black">Выбор режима</h1>
        <p className="mb-5 text-[14px] text-[#707579]">Выберите, что показать на экране</p>
        <RouteMenuContent pathname={pathname} />
      </div>
    </main>
  )
}
