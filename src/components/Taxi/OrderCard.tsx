import { TAXI_DEMO_ORDER } from '../../data/taxiOrder'
import { IconLightning } from './TaxiIcons'

type OrderCardProps = {
  onAccept: () => void
}

export function OrderCard({ onAccept }: OrderCardProps) {
  const { pickup, destination, price, etaMinutes, surge, tariff } = TAXI_DEMO_ORDER

  return (
    <div className="absolute right-3 bottom-4 left-3 z-30 rounded-2xl bg-white px-4 py-4 shadow-[0_4px_24px_rgba(0,0,0,0.16)]">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-[#FCE000] px-2 py-0.5 text-[13px] font-semibold text-[#212121]">
            Приоритет
          </span>
          <span className="text-[13px] text-[#9E9E9E]">• {etaMinutes} мин</span>
        </div>
        <span className="text-[13px] text-[#9E9E9E]">Ближайшая подача</span>
      </div>

      <div className="flex gap-3">
        <div className="flex flex-col items-center pt-1">
          <div className="h-2.5 w-2.5 rounded-full bg-[#FCE000]" />
          <div className="my-1 w-px flex-1 bg-[#E0E0E0]" />
          <div className="h-2.5 w-2.5 rounded-full border-2 border-[#212121]" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-[15px] font-medium text-[#212121]">{pickup.title}</p>
          <p className="text-[13px] text-[#9E9E9E]">{pickup.subtitle}</p>
          <div className="my-2" />
          <p className="text-[15px] font-medium text-[#212121]">{destination.title}</p>
          <p className="text-[13px] text-[#9E9E9E]">{destination.subtitle}</p>
        </div>

        <div className="shrink-0 text-right">
          <p className="text-[22px] leading-tight font-bold text-[#212121]">{price}</p>
          <p className="text-[13px] text-[#9E9E9E]">+1 точка</p>
          <div className="mt-1 flex items-center justify-end gap-0.5">
            <IconLightning size={14} />
            <span className="text-[13px] font-medium text-[#7B61FF]">{surge}</span>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={onAccept}
        className="mt-4 w-full rounded-xl bg-[#FCE000] py-3.5 text-center active:bg-[#F5D800]"
      >
        <span className="block text-[17px] font-bold text-[#212121]">Принять</span>
        <span className="block text-[13px] text-[#212121]/70">{tariff}</span>
      </button>
    </div>
  )
}
