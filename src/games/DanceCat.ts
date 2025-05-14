import { gameInfos } from '../assets/games'
// interface CatObjType {
//   audio: HTMLAudioElement
//   backgroundColor: string | null
//   background_img_path: string | null
//   gameScore: number
// }

function DanceCatGame(gameName: string) {
  const gameDetail = gameInfos.find((game) => game.name == gameName)
  const CatObj = {
    audio: new Audio('/audios/' + gameDetail?.audioFile),
    backgroundColor: gameDetail?.backgroundColor,
    textColor: gameDetail?.textColor,
    // background_img_path: gameDetail?.backgroundImage,
    gamesOffImg: gameDetail?.gameOffImage,
    gamesOnGif: gameDetail?.gameOnGif,
  }

  const playAudio = () => {
    CatObj.audio.play()
    CatObj.audio.loop = true
  }
  const stopAudio = () => {
    CatObj.audio.pause()
    CatObj.audio.currentTime = 0
  }

  //   const gameStart = () => {
  //     CatObj.audio.play()
  //   }

  const changeBackgroundColor = (background_color: string) => {
    CatObj.backgroundColor = background_color
  }

  // const increaseScore = () => {
  //   CatObj.gameScore += 1
  // }

  // const decreaseScore = () => {
  //   CatObj.gameScore -= 1
  // }

  // const getBackgroundImg = () => {
  //   if (CatObj.background_img_path) {
  //     return `url(${CatObj.background_img_path})`
  //   }
  //   return null
  // }

  const getBackgroundColor = () => {
    if (CatObj.backgroundColor) {
      return CatObj.backgroundColor
    }
    return null
  }

  const getTextColor = () => {
    if (CatObj.textColor) {
      return CatObj.textColor
    }
    return null
  }

  const getImageUrl = () => {
    if (CatObj.gamesOffImg) {
      return '/images/' + `${CatObj.gamesOffImg}`
    }
    return '/images/peeping_cat.PNG'
  }

  const getGifUrl = () => {
    if (CatObj.gamesOnGif) {
      return '/gifs/' + `${CatObj.gamesOnGif}`
    }
    return '/gifs/dancingCat.gif'
  }

  const getGameName = () => {
    return gameDetail?.name
  }

  return {
    playAudio,
    stopAudio,
    changeBackgroundColor,
    getBackgroundColor,
    // getBackgroundImg,
    getTextColor,
    getImageUrl,
    getGameName,
    getGifUrl,
  }
}

export default DanceCatGame
