import { useCallback, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { TAXI_DEMO_ORDER } from '../data/taxiOrder'
import { playTaxiOrderSound, playTaxiRouteSound, unlockTaxiSounds } from '../lib/taxiOrderSound'
import { OrderCard } from '../components/Taxi/OrderCard'
import { OrderCountdownOverlay } from '../components/Taxi/OrderCountdownOverlay'
import {
  DriverMarker,
  IconBonus,
  IconChat,
  IconChevronRight,
  IconIncome,
  IconLightning,
  IconMenu,
  IconMessages,
  IconNavigation,
  IconOrders,
  IconPerson,
  IconSteeringWheel,
} from '../components/Taxi/TaxiIcons'
import { TaxiYandexMap } from '../components/Taxi/TaxiYandexMap'
import type { TaxiMapRoute } from '../lib/yandexMaps'

type OrderPhase = 'idle' | 'countdown' | 'ready-wait' | 'incoming' | 'accepted'

const ORDER_DELAY_AFTER_READY_MS = 5000

type MapOverlaysProps = {
  onSimulateOrder: () => void
  onReset: () => void
  showDriverMarker: boolean
}

function MapOverlays({ onSimulateOrder, onReset, showDriverMarker }: MapOverlaysProps) {
  return (
    <>
      <div className="absolute top-3 right-0 left-0 z-10 flex items-center justify-between px-3">
        <button
          type="button"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-[0_2px_10px_rgba(0,0,0,0.14)]"
          aria-label="Меню"
        >
          <IconMenu size={24} />
        </button>

        <button
          type="button"
          className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 shadow-[0_2px_10px_rgba(0,0,0,0.14)]"
        >
          <div className="px-1 text-left">
            <p className="text-[16px] leading-tight font-bold text-[#212121]">4 736,00 ₽</p>
            <p className="mt-0.5 text-[12px] leading-tight text-[#9E9E9E]">7 заказов</p>
          </div>
          <IconChevronRight size={16} />
        </button>

        <NavLink
          to="/"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#9E9E9E] shadow-[0_2px_10px_rgba(0,0,0,0.14)]"
          aria-label="Профиль"
        >
          <IconPerson />
        </NavLink>
      </div>

      <div className="absolute top-[88px] left-3 z-10 flex flex-col gap-3">
        <div className="flex h-14 w-14 flex-col items-center justify-center rounded-full bg-white text-center shadow-[0_2px_10px_rgba(0,0,0,0.14)]">
          <span className="text-[15px] leading-none font-bold text-[#212121]">+12</span>
          <span className="mt-0.5 text-[11px] leading-none text-[#212121]">занят</span>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-white px-4 py-3 shadow-[0_2px_10px_rgba(0,0,0,0.14)]">
          <IconLightning size={18} />
          <div className="text-[15px] leading-tight font-medium text-[#212121]">
            <span className="block">1,2</span>
            <span className="block text-[13px]">коэфф.</span>
          </div>
        </div>
      </div>

      <div className="absolute top-[88px] right-3 z-10 flex flex-col gap-3">
        <button
          type="button"
          onClick={onReset}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-[0_2px_10px_rgba(0,0,0,0.14)]"
          aria-label="Сбросить"
        >
          <IconChat size={24} />
        </button>
        <button
          type="button"
          onClick={onSimulateOrder}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-[0_2px_10px_rgba(0,0,0,0.14)]"
          aria-label="Симуляция заказа"
        >
          <IconNavigation size={24} />
        </button>
      </div>

      {showDriverMarker && <DriverMarker />}
    </>
  )
}

function StatsGrid() {
  const stats = [
    { value: '85', label: 'Активность', status: 'Высокая', statusColor: 'text-[#4CAF50]' },
    { value: '4,98', label: 'Рейтинг', status: 'Отличный', statusColor: 'text-[#4CAF50]' },
    { value: '100%', label: 'Принятые', status: 'Выполнены', statusColor: 'text-[#9E9E9E]' },
    { value: '7', label: 'Заказы', status: 'Сегодня', statusColor: 'text-[#9E9E9E]' },
  ]

  return (
    <div className="mx-3 grid grid-cols-4 rounded-2xl bg-white py-3 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
      {stats.map((stat) => (
        <div key={stat.label} className="border-r border-[#F0F0F0] px-2 text-center last:border-r-0">
          <p className="text-[20px] leading-tight font-bold text-[#212121]">{stat.value}</p>
          <p className="mt-0.5 text-[11px] text-[#9E9E9E]">{stat.label}</p>
          <p className={`text-[11px] font-medium ${stat.statusColor}`}>{stat.status}</p>
        </div>
      ))}
    </div>
  )
}

function BonusesCard() {
  return (
    <div className="mx-3 mt-2 flex items-center gap-3 rounded-2xl bg-white px-3 py-3 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
      <IconBonus />
      <div className="min-w-0 flex-1">
        <p className="text-[15px] font-medium text-[#212121]">Гарантии и бонусы</p>
        <p className="text-[13px] text-[#9E9E9E]">Бонусы по городу от 450 ₽</p>
      </div>
      <IconChevronRight />
    </div>
  )
}

function TaxiBottomNav() {
  const items = [
    { icon: IconSteeringWheel, label: 'Главная', active: true },
    { icon: IconOrders, label: 'Заказы', active: false },
    { icon: IconIncome, label: 'Доходы', active: false },
    { icon: IconMessages, label: 'Сообщения', active: false },
    { icon: IconPerson, label: 'Профиль', active: false },
  ]

  return (
    <nav className="shrink-0 border-t border-[#F0F0F0] bg-white pb-[env(safe-area-inset-bottom,8px)]">
      <div className="flex items-center justify-around px-2 py-2">
        {items.map(({ icon: Icon, label, active }) => (
          <button
            key={label}
            type="button"
            className={`flex flex-col items-center gap-0.5 px-2 py-1 ${active ? 'text-[#FCE000]' : 'text-[#9E9E9E]'}`}
          >
            <Icon />
            <span className={`text-[10px] ${active ? 'font-medium text-[#212121]' : ''}`}>{label}</span>
          </button>
        ))}
      </div>
      <div className="mx-auto mb-1 h-1 w-[134px] rounded-full bg-black" />
    </nav>
  )
}

export function TaxiPage() {
  const [orderPhase, setOrderPhase] = useState<OrderPhase>('idle')
  const [route, setRoute] = useState<TaxiMapRoute | null>(null)

  const handleReset = () => {
    setOrderPhase('idle')
    setRoute(null)
  }

  const handleSimulateOrder = () => {
    if (orderPhase !== 'idle') return

    unlockTaxiSounds()
    setOrderPhase('countdown')
  }

  const handleCountdownReady = useCallback(() => {
    setOrderPhase('ready-wait')
  }, [])

  useEffect(() => {
    if (orderPhase !== 'ready-wait') return

    const timer = window.setTimeout(() => {
      playTaxiOrderSound()
      setOrderPhase('incoming')
    }, ORDER_DELAY_AFTER_READY_MS)

    return () => clearTimeout(timer)
  }, [orderPhase])

  const handleAcceptOrder = () => {
    playTaxiRouteSound()
    setRoute({
      from: TAXI_DEMO_ORDER.pickup.coords,
      to: TAXI_DEMO_ORDER.destination.coords,
    })
    setOrderPhase('accepted')
  }

  return (
    <div className="relative flex min-h-dvh flex-col bg-[#F5F5F5] text-[#212121]">
      <div className="relative min-h-0 flex-1 overflow-hidden">
        <TaxiYandexMap route={route} />
        <MapOverlays
          onSimulateOrder={handleSimulateOrder}
          onReset={handleReset}
          showDriverMarker={orderPhase !== 'accepted'}
        />
        {orderPhase === 'incoming' && <OrderCard onAccept={handleAcceptOrder} />}
      </div>

      {(orderPhase === 'idle' || orderPhase === 'ready-wait') && (
        <div className="relative z-20 -mt-3 shrink-0 space-y-2 pb-2">
          <StatsGrid />
          <BonusesCard />
        </div>
      )}

      <TaxiBottomNav />

      {orderPhase === 'countdown' && (
        <OrderCountdownOverlay onReady={handleCountdownReady} />
      )}
    </div>
  )
}
