"use client"

import { useState, useEffect } from "react"
import { Music } from "lucide-react"
import Image from "next/image"

interface SpotifyTrack {
  name: string
  artist: string
  album: string
  image: string
  external_url: string
  preview_url?: string
  is_playing: boolean
}

export default function SpotifyWidget() {
  const [currentTrack, setCurrentTrack] = useState<SpotifyTrack | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // For now, we'll use mock data since Spotify API requires authentication
    // To implement real Spotify integration, you'll need:
    // 1. Spotify Web API credentials
    // 2. OAuth flow for user authentication
    // 3. Server-side API routes to handle tokens

    const mockTrack: SpotifyTrack = {
      name: "Bohemian Rhapsody",
      artist: "Queen",
      album: "A Night at the Opera",
      image: "/placeholder.svg?height=80&width=80",
      external_url: "https://open.spotify.com/user/31n5txdgq2z2howu2igp5w4zoe6y",
      is_playing: true,
    }

    // Simulate API call delay
    setTimeout(() => {
      setCurrentTrack(mockTrack)
      setLoading(false)
    }, 1000)

    // For real implementation, you would do:
    // fetchCurrentlyPlaying()
  }, [])

  const fetchCurrentlyPlaying = async () => {
    try {
      // This would be your API route that handles Spotify authentication
      const response = await fetch("/api/spotify/currently-playing")
      const data = await response.json()
      setCurrentTrack(data.track)
    } catch (error) {
      console.error("Error fetching Spotify data:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
        <div className="flex-1">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2" />
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-2/3" />
        </div>
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

  return (
    <div className="flex items-center gap-4 mb-4">
      <div className="w-16 h-16 rounded-lg overflow-hidden relative">
        <Image
          src={currentTrack.image || "/placeholder.svg"}
          alt={`${currentTrack.album} cover`}
          width={64}
          height={64}
          className="w-full h-full object-cover"
        />
        {currentTrack.is_playing && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          </div>
        )}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-4 h-4 text-white fill-current">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" />
            </svg>
          </div>
          <h3 className="font-bold text-foreground text-sm">
            {currentTrack.is_playing ? "Tocando agora" : "Última música"}
          </h3>
        </div>
        <p className="text-sm text-muted-foreground">Última música ouvida</p>
      </div>
    </div>
  )
}
