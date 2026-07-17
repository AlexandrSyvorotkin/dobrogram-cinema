import orderSound from '../assets/taxi/заказ.mp3'
import routeSound from '../assets/taxi/маршрут.mp3'

function playSound(src: string) {
  const audio = new Audio(src)
  void audio.play().catch(() => {})
}

export function playTaxiOrderSound() {
  playSound(orderSound)
}

export function playTaxiRouteSound() {
  playSound(routeSound)
}
