import messageSound from '../assets/tg/sound_17216.mp3'

const incomingMessageAudio = new Audio(messageSound)
incomingMessageAudio.preload = 'auto'

let unlocked = false

export function unlockTelegramSounds() {
  if (unlocked) return
  unlocked = true

  incomingMessageAudio.volume = 0
  const playPromise = incomingMessageAudio.play()
  if (!playPromise) return

  playPromise
    .then(() => {
      incomingMessageAudio.pause()
      incomingMessageAudio.currentTime = 0
      incomingMessageAudio.volume = 1
    })
    .catch(() => {
      incomingMessageAudio.volume = 1
    })
}

export function playTelegramIncomingSound() {
  incomingMessageAudio.currentTime = 0
  void incomingMessageAudio.play().catch(() => {})
}

export const INCOMING_VOICE_REPLY_DELAY_MS = 5000

export const incomingVoiceReplyText =
  'блин ну ты прикинь там короче полный треш ахахах я до сих пор не понимаю как это вообще случилось типа серьёзно??? потом этот чел подошёл и такой "вы кто" а мы ну сами понимаете лол'
