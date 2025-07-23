"use client"

import { useState, useEffect } from "react"
import { Linkedin, ExternalLink, Calendar, Award } from "lucide-react"
import { Button } from "@/components/ui/button"

interface LinkedInPost {
  id: string
  content: string
  date: string
  likes: number
  comments: number
  url: string
  type?: string
  certificateUrl?: string
  title?: string
}

const DEFAULT_POST: LinkedInPost = {
  id: "default",
  type: "certificate",
  title: "Certificação React.js Avançado - Rocketseat",
  content:
    "🚀 Acabei de concluir a certificação em React.js Avançado! Aprofundei conhecimentos em hooks avançados, context API, performance optimization e muito mais.",
  date: "2025-01-20T10:00:00Z",
  likes: 47,
  comments: 12,
  url: "https://www.linkedin.com/in/gabriel-tamais-fischer-50b3a6282/",
  certificateUrl: "https://app.rocketseat.com.br/certificates/gabriel-fischer-react-advanced",
}

export default function LinkedInWidget() {
  const [latestPost, setLatestPost] = useState<LinkedInPost>(DEFAULT_POST)
  const [loading, setLoading] = useState(false)

  const fetchLinkedInPost = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/linkedin/real-posts")
      const data = await response.json()
      if (data.posts && data.posts.length > 0) {
        setLatestPost(data.posts[0])
      }
    } catch {
      setLatestPost(DEFAULT_POST)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLinkedInPost()
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    if (diffDays === 1) return "Há 1 dia"
    if (diffDays < 7) return `Há ${diffDays} dias`
    if (diffDays < 30) return `Há ${Math.floor(diffDays / 7)} semanas`
    return `Há ${Math.floor(diffDays / 30)} meses`
  }

  if (loading) {
    return (
      <div className="flex items-center gap-4 animate-pulse">
        <div className="w-16 h-16 bg-muted rounded-lg" />
        <div className="flex-1">
          <div className="h-4 bg-muted rounded mb-2" />
          <div className="h-3 bg-muted rounded w-2/3" />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
          <Linkedin className="w-8 h-8 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-foreground">LinkedIn</h3>
          <p className="text-sm text-muted-foreground">Última publicação</p>
        </div>
        <ExternalLink
          className="w-5 h-5 text-muted-foreground hover:text-blue-500 cursor-pointer transition-colors"
          onClick={() => window.open(latestPost.url, "_blank")}
        />
      </div>

      {/* Título do certificado */}
      {latestPost.title && (
        <div className="flex items-center gap-2 mb-3">
          <Award className="w-4 h-4 text-yellow-500" />
          <h4 className="font-semibold text-foreground text-sm">{latestPost.title}</h4>
        </div>
      )}

      {/* Conteúdo */}
      <div className="space-y-3">
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4">{latestPost.content}</p>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="w-3 h-3" />
            <span>{formatDate(latestPost.date)}</span>
          </div>
          <div className="flex items-center gap-4">
            <span>👍 {latestPost.likes}</span>
            <span>💬 {latestPost.comments}</span>
          </div>
        </div>

        {/* Botões */}
        <div className="pt-3 border-t border-border flex gap-2">
          {latestPost.certificateUrl && (
            <Button
              onClick={() => window.open(latestPost.certificateUrl!, "_blank")}
              variant="outline"
              size="sm"
              className="text-xs bg-transparent border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10 hover:border-yellow-500"
            >
              <Award className="w-3 h-3 mr-1" />
              Ver Certificado
            </Button>
          )}
          <Button
            onClick={() => window.open(latestPost.url, "_blank")}
            variant="outline"
            size="sm"
            className="text-xs bg-transparent border-blue-500/50 text-blue-400 hover:bg-blue-500/10 hover:border-blue-500"
          >
            Ver no LinkedIn →
          </Button>
        </div>
      </div>
    </div>
  )
}
