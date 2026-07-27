import { TAXI_DEMO_ORDER } from '../../data/taxiOrder'

type TripArrivalCardProps = {
  onTakeAnotherOrder: () => void
}

export function TripArrivalCard({ onTakeAnotherOrder }: TripArrivalCardProps) {
  const { pickup, destination, price, tariff } = TAXI_DEMO_ORDER

  return (
    <div className="absolute inset-x-0 bottom-0 z-30 rounded-t-[24px] bg-white px-4 pt-5 pb-[calc(16px+env(safe-area-inset-bottom,0px))] shadow-[0_-4px_24px_rgba(0,0,0,0.12)]">
      <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-[#E0E0E0]" />

      <h2 className="mb-1 text-[22px] font-bold text-[#212121]">Вы приехали</h2>
      <p className="mb-4 text-[14px] text-[#9E9E9E]">Поездка завершена</p>

      <div className="mb-4 flex gap-3 rounded-2xl bg-[#F7F7F7] px-4 py-3">
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
          <p className="text-[13px] text-[#9E9E9E]">{tariff}</p>
        </div>
      </div>

      <div className="mb-5 flex items-center justify-between border-t border-[#F0F0F0] pt-3">
        <span className="text-[14px] text-[#9E9E9E]">Оплата картой</span>
        <span className="text-[16px] font-semibold text-[#212121]">{price}</span>
      </div>

      <button
        type="button"
        onClick={onTakeAnotherOrder}
        className="w-full rounded-xl bg-[#FCE000] py-3.5 text-center active:bg-[#F5D800]"
      >
        <span className="block text-[17px] font-bold text-[#212121]">Взять другой заказ</span>
      </button>
    </div>
  )
}
