import orderSound from '../assets/taxi/заказ.mp3'
import routeSound from '../assets/taxi/маршрут.mp3'

const orderAudio = new Audio(orderSound)
const routeAudio = new Audio(routeSound)

orderAudio.preload = 'auto'
routeAudio.preload = 'auto'

let unlocked = false

/** iOS Safari разрешает звук только после жеста пользователя — вызывать при нажатии на звезду */
export function unlockTaxiSounds() {
  if (unlocked) return
  unlocked = true

  for (const audio of [orderAudio, routeAudio]) {
    audio.volume = 0
    const playPromise = audio.play()
    if (!playPromise) continue

    playPromise
      .then(() => {
        audio.pause()
        audio.currentTime = 0
        audio.volume = 1
      })
      .catch(() => {
        audio.volume = 1
      })
  }
}

function playSound(audio: HTMLAudioElement) {
  audio.currentTime = 0
  void audio.play().catch(() => {})
}

export function playTaxiOrderSound() {
  playSound(orderAudio)
}

export function playTaxiRouteSound() {
  playSound(routeAudio)
}
