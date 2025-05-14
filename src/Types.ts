export interface gameInfosTypes {
  name: string
  backgroundColor: string | null
  textColor: string | null
  // backgroundImage: string | null
  audioFile: string
  gameOffImage: string
  gameOnGif: string
  timeOutGif: string | null
}
export interface DanceCatGameType {
  playAudio: () => void
  stopAudio: () => void
  changeBackgroundColor: (color: string) => void
  getBackgroundColor: () => string | null
  // getBackgroundImg: () => string | null
  getTextColor: () => string | null
  getImageUrl: () => string
  getGameName: () => string | undefined
  getGifUrl: () => string
}

export interface BestScoreRecord {
  key: string
  value: number
}
