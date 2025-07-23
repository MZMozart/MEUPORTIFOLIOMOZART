"use client"

import { useEffect, useRef } from "react"

interface Lightning {
  x: number
  y: number
  branches: { x: number; y: number }[]
  opacity: number
  duration: number
  startTime: number
}

export default function LightningEffects() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const lightnings: Lightning[] = []

    const createLightning = () => {
      const startX = Math.random() * window.innerWidth
      const startY = 0
      const branches: { x: number; y: number }[] = []

      let currentX = startX
      let currentY = startY

      // Create lightning branches
      while (currentY < window.innerHeight) {
        const nextX = currentX + (Math.random() - 0.5) * 100
        const nextY = currentY + Math.random() * 50 + 20

        branches.push({ x: nextX, y: nextY })
        currentX = nextX
        currentY = nextY

        // Random side branches
        if (Math.random() < 0.3) {
          const branchX = currentX + (Math.random() - 0.5) * 150
          const branchY = currentY + Math.random() * 100
          branches.push({ x: branchX, y: branchY })
        }
      }

      return {
        x: startX,
        y: startY,
        branches,
        opacity: 1,
        duration: 200 + Math.random() * 300,
        startTime: Date.now(),
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Create new lightning occasionally
      if (Math.random() < 0.001) {
        lightnings.push(createLightning())
      }

      // Draw and update lightnings
      lightnings.forEach((lightning, index) => {
        const elapsed = Date.now() - lightning.startTime
        const progress = elapsed / lightning.duration

        if (progress >= 1) {
          lightnings.splice(index, 1)
          return
        }

        // Flickering effect
        const flicker = Math.sin(elapsed * 0.05) * 0.5 + 0.5
        const opacity = (1 - progress) * flicker * 0.3

        ctx.strokeStyle = `rgba(147, 51, 234, ${opacity * 0.5})`
        ctx.lineWidth = 2 + Math.random() * 3
        ctx.shadowColor = "rgba(147, 51, 234, 0.8)"
        ctx.shadowBlur = 20

        ctx.beginPath()
        ctx.moveTo(lightning.x, lightning.y)

        lightning.branches.forEach((branch, i) => {
          if (i === 0) {
            ctx.lineTo(branch.x, branch.y)
          } else {
            // Create jagged lines
            const prevBranch = lightning.branches[i - 1]
            const midX = (prevBranch.x + branch.x) / 2 + (Math.random() - 0.5) * 20
            const midY = (prevBranch.y + branch.y) / 2

            ctx.quadraticCurveTo(midX, midY, branch.x, branch.y)
          }
        })

        ctx.stroke()

        // Add glow effect
        ctx.strokeStyle = `rgba(147, 51, 234, ${opacity * 0.3})`
        ctx.lineWidth = 8
        ctx.shadowBlur = 20
        ctx.stroke()
      })

      requestAnimationFrame(animate)
    }

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-100"
      style={{ mixBlendMode: "screen" }}
    />
  )
}
