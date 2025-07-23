"use client"

import { useState, useEffect } from "react"
import { Music, Play, Pause } from "lucide-react"
import Image from "next/image"

interface SpotifyTrack {
  name: string
  artist: string
  album: string
  image: string
  external_url: string
  preview_url?: string
  is_playing: boolean
  progress_ms: number
  duration_ms: number
}

export default function SpotifyNowPlaying() {
  const [currentTrack, setCurrentTrack] = useState<SpotifyTrack | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCurrentTrack = async () => {
      try {
        // For demonstration, using mock data
        // To implement real Spotify integration, you need:
        // 1. Spotify Web API credentials
        // 2. OAuth authentication
        // 3. Access token management

        const mockTrack: SpotifyTrack = {
          name: "Bohemian Rhapsody",
          artist: "Queen",
          album: "A Night at the Opera",
          image: "/placeholder.svg?height=80&width=80&text=Queen",
          external_url: "https://open.spotify.com/user/31n5txdgq2z2howu2igp5w4zoe6y",
          is_playing: true,
          progress_ms: 120000,
          duration_ms: 355000,
        }

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setCurrentTrack(mockTrack)

        // Real implementation would be:
        /*
        const response = await fetch('/api/spotify/now-playing');
        const data = await response.json();
        
        if (data.error) {
          setError(data.error);
        } else {
          setCurrentTrack(data.track);
        }
        */
      } catch (err) {
        setError("Erro ao carregar dados do Spotify")
      } finally {
        setLoading(false)
      }
    }

    fetchCurrentTrack()

    // Refresh every 30 seconds
    const interval = setInterval(fetchCurrentTrack, 30000)
    return () => clearInterval(interval)
  }, [])

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  if (loading) {
    return (
      <div className="flex items-center gap-4 animate-pulse">
        <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg" />
        <div className="flex-1">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-4">
        <Music className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
        <p className="text-sm text-muted-foreground">{error}</p>
      </div>
    )
  }

  if (!currentTrack) {
    return (
      <div className="text-center py-4">
        <Music className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
        <p className="text-sm text-muted-foreground">Nenhuma música tocando</p>
      </div>
    )
  }

  const progressPercent = (currentTrack.progress_ms / currentTrack.duration_ms) * 100

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative w-16 h-16 rounded-lg overflow-hidden group">
          <Image
            src={currentTrack.image || "/placeholder.svg"}
            alt={`${currentTrack.album} cover`}
            width={64}
            height={64}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            {currentTrack.is_playing ? (
              <Pause className="w-6 h-6 text-white" />
            ) : (
              <Play className="w-6 h-6 text-white" />
            )}
          </div>
          {currentTrack.is_playing && (
            <div className="absolute bottom-1 right-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-white fill-current">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" />
              </svg>
            </div>
            <h3 className="font-bold text-foreground text-sm truncate">
              {currentTrack.is_playing ? "Tocando agora" : "Pausado"}
            </h3>
          </div>
          <p className="text-sm text-muted-foreground mb-1">
            {currentTrack.is_playing ? "Ouvindo no Spotify" : "Última música"}
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <div>
          <p className="font-medium text-foreground truncate">{currentTrack.name}</p>
          <p className="text-sm text-muted-foreground truncate">{currentTrack.artist}</p>
        </div>

        {/* Progress bar */}
        <div className="space-y-1">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
            <div
              className="bg-green-500 h-1 rounded-full transition-all duration-1000"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{formatTime(currentTrack.progress_ms)}</span>
            <span>{formatTime(currentTrack.duration_ms)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
