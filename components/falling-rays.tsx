"use client"

import { useEffect, useRef } from "react"

interface Ray {
  x: number
  y: number
  length: number
  speed: number
  opacity: number
  depth: number
}

export default function FallingRays() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const rays: Ray[] = []
    const numRays = 50

    // Initialize rays
    for (let i = 0; i < numRays; i++) {
      rays.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * -window.innerHeight,
        length: Math.random() * 100 + 50,
        speed: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.1,
        depth: Math.random() * 0.8 + 0.2,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      rays.forEach((ray) => {
        // Update position
        ray.y += ray.speed * ray.depth

        // Reset ray when it goes off screen
        if (ray.y > window.innerHeight + ray.length) {
          ray.y = -ray.length
          ray.x = Math.random() * window.innerWidth
        }

        // Draw ray
        const gradient = ctx.createLinearGradient(ray.x, ray.y, ray.x, ray.y + ray.length)
        gradient.addColorStop(0, `rgba(147, 51, 234, 0)`)
        gradient.addColorStop(0.5, `rgba(147, 51, 234, ${ray.opacity * ray.depth})`)
        gradient.addColorStop(1, `rgba(147, 51, 234, 0)`)

        ctx.strokeStyle = gradient
        ctx.lineWidth = 2 * ray.depth
        ctx.beginPath()
        ctx.moveTo(ray.x, ray.y)
        ctx.lineTo(ray.x, ray.y + ray.length)
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
      className="fixed inset-0 pointer-events-none z-0 dark:opacity-100 opacity-30"
      style={{ mixBlendMode: "screen" }}
    />
  )
}
