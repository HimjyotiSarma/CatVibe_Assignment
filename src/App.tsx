import React, { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import GameArea from './components/GameArea'
import Header from './components/Header'
import DanceCatGame from './games/DanceCat'
import type { BestScoreRecord, DanceCatGameType } from './Types'

function App() {
  const [currentGame, setGame] = useState<string>('Cat Vibe')
  const [gameStart, setGameStart] = useState<boolean>(false)
  const [currentScore, setCurrentScore] = useState<number>(0)
  const [bestScores, setBestScores] = useState<BestScoreRecord[]>([])
  const [currentGameInfo, setCurrentGameInfo] =
    useState<DanceCatGameType | null>(null)
  const timeInterval = useTimer(() =>
    setCurrentScore((prevScore) => prevScore + 1)
  )
  const currentGameBestScore = useMemo(() => {
    return bestScores.find((r) => r.key === currentGame)?.value ?? 0
  }, [bestScores, currentGame])

  useEffect(() => {
    setCurrentGameInfo(DanceCatGame(currentGame))
    setCurrentScore(0)
    setGameStart(false)
  }, [currentGame])

  const handleGameChange = (gameName: string) => {
    setGame(gameName)
  }

  const finalizeGame = () => {
    timeInterval.stop()

    const idx = bestScores.findIndex((r) => r.key === currentGame)
    if (idx >= 0) {
      if (currentScore > bestScores[idx].value) {
        const updated = [...bestScores]
        updated[idx] = { key: currentGame, value: currentScore }
        setBestScores(updated)
      }
    } else {
      setBestScores([...bestScores, { key: currentGame, value: currentScore }])
    }

    setGameStart(false)
  }
  // const currentGameBestScore =
  //   bestScores.find((r) => r.key === currentGame)?.value ?? 0
  // useEffect(() => {
  //   const getGameBestScore = () => {
  //     const idx = bestScores.findIndex((r) => r.key === currentGame)
  //     if (idx >= 0) {
  //       return bestScores[idx].value
  //     }
  //     return 0
  //   }
  //   currentGameBestScore.current = getGameBestScore()
  // }, [bestScores, currentGame])

  const handlePointerUp = (e: React.PointerEvent) => {
    e.currentTarget.releasePointerCapture(e.pointerId)
    finalizeGame()
  }
  function useTimer(onTick: () => void) {
    const timeRef = useRef<number | null>(null)
    const start = () => {
      if (timeRef.current) return
      timeRef.current = setInterval(() => {
        onTick()
      }, 1000)
    }

    const stop = () => {
      if (!timeRef.current) return
      clearInterval(timeRef.current)
      timeRef.current = null
    }

    return { start, stop }
  }

  // const handleGameStart = () => {
  //   setCurrentScore(0)
  //   timeInterval.start()
  //   setGameStart(true)
  // }
  const handlePointerDown = (e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    setCurrentScore(0)
    timeInterval.start()
    setGameStart(true)
  }

  return (
    <div className="main">
      <Header
        backGroundColor={
          currentGameInfo && currentGameInfo.getBackgroundColor()
        }
        textColor={currentGameInfo && currentGameInfo.getTextColor()}
      />
      <GameArea
        currentGameInfo={currentGameInfo}
        handleGameChange={handleGameChange}
        gameStart={gameStart}
        currentScore={currentScore}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        bestScore={currentGameBestScore}
      />
    </div>
  )
}

export default App
