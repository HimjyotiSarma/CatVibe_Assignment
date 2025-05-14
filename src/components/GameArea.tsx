import { useEffect, useState } from 'react'
import { gameInfos } from '../assets/games'
import type { DanceCatGameType } from '../Types'
import '../styles/GamerArea.style.css'
import adjustHexColor from '../utils/adjustHexColor'

const GameArea = ({
  currentGameInfo,
  handleGameChange,
  gameStart,
  currentScore,
  onPointerDown,
  onPointerUp,
  bestScore,
}: {
  currentGameInfo: DanceCatGameType | null
  handleGameChange: (game: string) => void
  gameStart: boolean
  currentScore: number
  onPointerDown: (e: React.PointerEvent) => void
  onPointerUp: (e: React.PointerEvent) => void
  bestScore: number
}) => {
  const [toggleGameMenu, setToggleGameMenu] = useState(false)
  const [assetsLoaded, setAssetsLoaded] = useState({ image: false, gif: false })
  const imageUrl = currentGameInfo?.getImageUrl()
  const gifUrl = currentGameInfo?.getGifUrl()
  const gameName = currentGameInfo?.getGameName()

  useEffect(() => {
    setAssetsLoaded({ image: false, gif: false })
  }, [currentGameInfo])

  // const [gameStart, setGameStart] = useState(false)
  const allGamesNames = gameInfos.map((game) => game.name)

  const baseColor = currentGameInfo?.getBackgroundColor() ?? '#84cfdf'
  // darken by 60 (out of 255)—tweak this to taste
  const darkerColor = adjustHexColor(baseColor, -80)

  // useEffect(() => {
  //   if (gameStart) {
  //     currentGameInfo?.playAudio()
  //   } else {
  //     currentGameInfo?.stopAudio()
  //   }
  // }, [])
  if (gameStart) {
    currentGameInfo?.playAudio()
  } else {
    currentGameInfo?.stopAudio()
  }
  // const handleGameMenu =
  if (!currentGameInfo) {
    return (
      <div className="game_section">
        <h4>Please Select a game to continue</h4>
      </div>
    )
  }
  return (
    <div
      className="game_section"
      style={{
        // backgroundColor: currentGameInfo.getBackgroundColor() ?? '#84cfdf',
        backgroundImage: `radial-gradient(
          circle at center,
          ${baseColor},
          ${darkerColor}
        )`,
      }}
    >
      <div className="game_top_section">
        <button
          className="selectGame"
          onClick={() => setToggleGameMenu(!toggleGameMenu)}
        >
          SELECT GAME
        </button>
        {toggleGameMenu && (
          <div className="game_menu">
            {allGamesNames.map((gameName) => (
              <button
                key={gameName}
                className="game_menu_item"
                onClick={() => {
                  handleGameChange(gameName)
                  setToggleGameMenu(false)
                }}
              >
                {gameName.toUpperCase()}
              </button>
            ))}
          </div>
        )}
        <div className="bestScoreArea">
          Best Score: <span>{bestScore}</span>
        </div>
      </div>

      <div
        className="game_bottom_section"
        onPointerDown={(e) => {
          onPointerDown(e)
          setToggleGameMenu(false)
        }}
        onPointerUp={onPointerUp}
      >
        {!assetsLoaded.image && !assetsLoaded.gif && (
          <div className="loader">
            <div className="spinner" />
          </div>
        )}
        {!gameStart && (
          <div className="game_image_section">
            <img
              src={imageUrl}
              alt={gameName + 'game paused'}
              onLoad={() => setAssetsLoaded((s) => ({ ...s, image: true }))}
            />
          </div>
        )}
        {gameStart && (
          <div className="game_gif_section">
            <img
              src={gifUrl}
              alt={gameName + ' game started'}
              onLoad={() => setAssetsLoaded((s) => ({ ...s, gif: true }))}
            />
          </div>
        )}
      </div>
      <div className="game_score_section">
        <div className="score">{currentScore}</div>
      </div>
    </div>
  )
}
export default GameArea
