"use client"

import { useState, useEffect } from "react"
import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface SpotifyTrack {
  name: string
  artist: string
  album: string
  image: string
  external_url: string
  is_playing: boolean
  progress_ms: number
  duration_ms: number
}

const DEFAULT_TRACK: SpotifyTrack = {
  name: "Bohemian Rhapsody",
  artist: "Queen",
  album: "A Night at the Opera",
  image: "/placeholder.svg?height=300&width=300&text=Queen",
  external_url: "https://open.spotify.com/user/31n5txdgq2z2howu2igp5w4zoe6y",
  is_playing: false,
  progress_ms: 0,
  duration_ms: 355000,
}

export default function SpotifyRealWidget() {
  const [track, setTrack] = useState<SpotifyTrack>(DEFAULT_TRACK)

  const fetchCurrentTrack = async () => {
    try {
      const response = await fetch("/api/spotify/now-playing")
      const data = await response.json()
      if (data.track) {
        setTrack(data.track)
      } else {
        setTrack(DEFAULT_TRACK)
      }
    } catch {
      setTrack(DEFAULT_TRACK)
    }
  }

  useEffect(() => {
    fetchCurrentTrack()
  }, [])

  return (
    <div className="space-y-4">
      {/* Header igual ao LinkedIn */}
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-lg flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-8 h-8 text-white fill-current">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-foreground">Spotify</h3>
          <p className="text-sm text-muted-foreground">{track.is_playing ? "Tocando agora" : "Última música"}</p>
        </div>
        <ExternalLink
          className="w-5 h-5 text-muted-foreground hover:text-green-500 cursor-pointer transition-colors"
          onClick={() => window.open(track.external_url, "_blank")}
        />
      </div>

      {/* Banner da música */}
      <div className="relative group cursor-pointer transition-transform duration-300 hover:scale-105 mb-4">
        <div className="aspect-[16/9] rounded-lg overflow-hidden bg-muted shadow-lg">
          <Image
            src={track.image || "/placeholder.svg"}
            alt={`${track.album} cover`}
            width={400}
            height={225}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            unoptimized
          />

          {/* Status indicator */}
          {track.is_playing && (
            <div className="absolute top-4 right-4">
              <div className="flex items-center gap-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                TOCANDO
              </div>
            </div>
          )}

          {/* Info overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <h4 className="font-bold text-white text-lg leading-tight mb-1 truncate">{track.name}</h4>
            <p className="text-gray-300 text-sm truncate">{track.artist}</p>
          </div>
        </div>
      </div>

      {/* Botão para ouvir */}
      <Button
        variant="outline"
        className="w-full hover:bg-green-500 hover:text-white hover:border-green-500 hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300 bg-transparent hover:scale-105"
        onClick={() => window.open(track.external_url, "_blank")}
      >
        <ExternalLink className="w-4 h-4 mr-2" />
        Ouvir no Spotify
      </Button>
    </div>
  )
}
