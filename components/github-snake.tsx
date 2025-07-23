"use client"

import { useEffect, useRef, useState } from "react"

interface SnakeSegment {
  x: number
  y: number
}

export default function GitHubSnake() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [snake, setSnake] = useState<SnakeSegment[]>([{ x: 0, y: 0 }])
  const [direction, setDirection] = useState({ x: 1, y: 0 })
  const [contributions, setContributions] = useState<number[][]>([])
  const [gameStarted, setGameStarted] = useState(false)

  const GRID_SIZE = 12
  const COLS = 53
  const ROWS = 7

  useEffect(() => {
    // Generate contribution data (mock GitHub-like data)
    const generateContributions = () => {
      const data: number[][][] = []
      for (let week = 0; week < COLS; week++) {
        const weekData: number[][] = []
        for (let day = 0; day < ROWS; day++) {
          const intensity = Math.random()
          weekData.push([
            week,
            day,
            intensity > 0.8 ? 4 : intensity > 0.6 ? 3 : intensity > 0.4 ? 2 : intensity > 0.2 ? 1 : 0,
          ])
        }
        data.push(weekData)
      }
      return data.flat()
    }

    const contribData = generateContributions()
    const grid: number[][] = Array(ROWS)
      .fill(null)
      .map(() => Array(COLS).fill(0))

    contribData.forEach(([week, day, intensity]) => {
      if (week < COLS && day < ROWS) {
        grid[day][week] = intensity
      }
    })

    setContributions(grid)
  }, [])

  useEffect(() => {
    if (!gameStarted || contributions.length === 0) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const gameLoop = setInterval(() => {
      // Clear canvas
      ctx.fillStyle = "transparent"
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw contribution grid
      contributions.forEach((row, y) => {
        row.forEach((intensity, x) => {
          const colors = [
            "#161b22", // 0 contributions
            "#0e4429", // 1-3 contributions
            "#006d32", // 4-6 contributions
            "#26a641", // 7-9 contributions
            "#39d353", // 10+ contributions
          ]

          ctx.fillStyle = colors[intensity] || colors[0]
          ctx.fillRect(x * GRID_SIZE + 2, y * GRID_SIZE + 2, GRID_SIZE - 2, GRID_SIZE - 2)
        })
      })

      // Update snake position
      setSnake((prevSnake) => {
        const newSnake = [...prevSnake]
        const head = { ...newSnake[0] }

        head.x += direction.x
        head.y += direction.y

        // Wrap around edges
        if (head.x >= COLS) head.x = 0
        if (head.x < 0) head.x = COLS - 1
        if (head.y >= ROWS) head.y = 0
        if (head.y < 0) head.y = ROWS - 1

        newSnake.unshift(head)

        // Check if snake ate a contribution
        if (contributions[head.y] && contributions[head.y][head.x] > 0) {
          // Don't remove tail (snake grows)
          setContributions((prev) => {
            const newContribs = [...prev]
            newContribs[head.y] = [...newContribs[head.y]]
            newContribs[head.y][head.x] = 0
            return newContribs
          })
        } else {
          newSnake.pop() // Remove tail
        }

        // Change direction randomly sometimes
        if (Math.random() < 0.1) {
          const directions = [
            { x: 1, y: 0 },
            { x: -1, y: 0 },
            { x: 0, y: 1 },
            { x: 0, y: -1 },
          ]
          setDirection(directions[Math.floor(Math.random() * directions.length)])
        }

        return newSnake
      })

      // Draw snake
      snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? "#7c3aed" : "#a855f7" // Purple snake
        ctx.fillRect(segment.x * GRID_SIZE + 3, segment.y * GRID_SIZE + 3, GRID_SIZE - 4, GRID_SIZE - 4)
      })
    }, 150)

    return () => clearInterval(gameLoop)
  }, [gameStarted, contributions, snake, direction])

  useEffect(() => {
    const timer = setTimeout(() => setGameStarted(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="w-full overflow-x-auto">
      <canvas
        ref={canvasRef}
        width={COLS * GRID_SIZE + 4}
        height={ROWS * GRID_SIZE + 4}
        className="border border-border/20 rounded bg-[#0d1117] dark:bg-[#0d1117]"
        style={{ minWidth: `${COLS * GRID_SIZE + 4}px` }}
      />
    </div>
  )
}
