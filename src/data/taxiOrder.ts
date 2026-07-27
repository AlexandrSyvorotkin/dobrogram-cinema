export type TaxiRoutePoint = {
  title: string
  subtitle: string
  coords: [number, number]
}

export const TAXI_DEMO_ORDER = {
  pickup: {
    title: 'проспект Мира, 24',
    subtitle: 'Энск',
    // Калининский район — север города, без подписи «Новосибирск» в кадре маршрута
    coords: [55.0798, 82.9586] as [number, number],
  },
  destination: {
    title: 'улица Садовая, 5',
    subtitle: 'Энск',
    coords: [55.0656, 82.9274] as [number, number],
  },
  price: '387 ₽',
  etaMinutes: 7,
  surge: '× 1.2',
  tariff: 'Экспресс',
}
