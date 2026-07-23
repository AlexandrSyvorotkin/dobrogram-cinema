import messageSound from '../assets/tg/sound_17216.mp3'

const incomingMessageAudio = new Audio(messageSound)
incomingMessageAudio.preload = 'auto'

let unlocked = false

export function unlockMessageSounds() {
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

export function playIncomingMessageSound() {
  incomingMessageAudio.currentTime = 0
  void incomingMessageAudio.play().catch(() => {})
}

export const INCOMING_VOICE_REPLY_DELAY_MS = 5000

export const incomingVoiceReplyText = 'хорошо, я сегодня приеду'
