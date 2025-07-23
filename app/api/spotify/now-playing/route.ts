import { NextResponse } from "next/server"

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET
const SPOTIFY_REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN

async function getAccessToken() {
  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REFRESH_TOKEN) {
    throw new Error("MISSING_CREDENTIALS")
  }

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString("base64")}`,
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: SPOTIFY_REFRESH_TOKEN,
    }),
  })

  if (!response.ok) {
    throw new Error("TOKEN_FAILED")
  }

  const data = await response.json()
  return data.access_token
}

export async function GET() {
  try {
    const accessToken = await getAccessToken()

    // Tenta música atual
    let response = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (response.status === 200) {
      const text = await response.text()
      if (text) {
        const data = JSON.parse(text)
        if (data && data.item) {
          return NextResponse.json({
            track: {
              name: data.item.name,
              artist: data.item.artists.map((artist: any) => artist.name).join(", "),
              album: data.item.album.name,
              image: data.item.album.images[0]?.url || "/placeholder.svg?height=300&width=300",
              external_url: data.item.external_urls.spotify,
              is_playing: data.is_playing,
              progress_ms: data.progress_ms || 0,
              duration_ms: data.item.duration_ms,
            },
            status: "success",
          })
        }
      }
    }

    // Se não tem música atual, pega última tocada
    response = await fetch("https://api.spotify.com/v1/me/player/recently-played?limit=1", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (response.ok) {
      const data = await response.json()
      if (data.items && data.items.length > 0) {
        const item = data.items[0].track
        return NextResponse.json({
          track: {
            name: item.name,
            artist: item.artists.map((artist: any) => artist.name).join(", "),
            album: item.album.name,
            image: item.album.images[0]?.url || "/placeholder.svg?height=300&width=300",
            external_url: item.external_urls.spotify,
            is_playing: false,
            progress_ms: 0,
            duration_ms: item.duration_ms,
          },
          status: "success",
        })
      }
    }

    return NextResponse.json({ track: null, status: "success" })
  } catch (error) {
    const mockTrack = {
      name: "Bohemian Rhapsody",
      artist: "Queen",
      album: "A Night at the Opera",
      image: "/placeholder.svg?height=300&width=300&text=Queen+Album",
      external_url: "https://open.spotify.com/user/31n5txdgq2z2howu2igp5w4zoe6y",
      is_playing: true,
      progress_ms: 120000,
      duration_ms: 355000,
    }

    return NextResponse.json({
      track: mockTrack,
      status: "success",
      mock: true,
    })
  }
}
