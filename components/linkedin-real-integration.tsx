"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Linkedin, ExternalLink, Calendar, Award, BookOpen, Trophy } from "lucide-react"
import Image from "next/image"

interface LinkedInPost {
  id: string
  content: string
  date: string
  likes: number
  comments: number
  url: string
  type: "certificate" | "achievement" | "post"
  certificateUrl?: string
  image?: string
  title?: string
  institution?: string
}

export default function LinkedInRealIntegration() {
  const [posts, setPosts] = useState<LinkedInPost[]>([])
  const [loading, setLoading] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const fetchLinkedInPosts = async () => {
    try {
      const response = await fetch("/api/linkedin/real-posts")
      const data = await response.json()
      setPosts(data.posts || [])
    } catch (error) {
      // Se der erro, usa posts padrão
      setPosts([
        {
          id: "1",
          type: "certificate",
          title: "Certificação React.js Avançado - Rocketseat",
          institution: "Rocketseat",
          content:
            "🚀 Acabei de concluir a certificação em React.js Avançado! Aprofundei conhecimentos em hooks avançados, context API, performance optimization, Server Components e muito mais.",
          date: "2025-01-20T10:00:00Z",
          likes: 47,
          comments: 12,
          url: "https://www.linkedin.com/in/gabriel-tamais-fischer-50b3a6282/",
          certificateUrl: "https://app.rocketseat.com.br/certificates/gabriel-fischer-react-advanced",
          image: "/placeholder.svg?height=200&width=300&text=React+Certificate",
        },
      ])
    }
  }

  useEffect(() => {
    fetchLinkedInPosts()
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
  }

  const getPostIcon = (type: string) => {
    switch (type) {
      case "certificate":
        return <Award className="w-5 h-5 text-yellow-500" />
      case "achievement":
        return <Trophy className="w-5 h-5 text-purple-500" />
      default:
        return <BookOpen className="w-5 h-5 text-blue-500" />
    }
  }

  const getPostBadge = (type: string) => {
    switch (type) {
      case "certificate":
        return <Badge className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20">Certificado</Badge>
      case "achievement":
        return <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20">Conquista</Badge>
      default:
        return <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20">Publicação</Badge>
    }
  }

  // Se não tem posts, carrega padrão
  if (posts.length === 0) {
    const defaultPosts = [
      {
        id: "1",
        type: "certificate" as const,
        title: "Certificação React.js Avançado - Rocketseat",
        institution: "Rocketseat",
        content:
          "🚀 Acabei de concluir a certificação em React.js Avançado! Aprofundei conhecimentos em hooks avançados, context API, performance optimization, Server Components e muito mais.",
        date: "2025-01-20T10:00:00Z",
        likes: 47,
        comments: 12,
        url: "https://www.linkedin.com/in/gabriel-tamais-fischer-50b3a6282/",
        certificateUrl: "https://app.rocketseat.com.br/certificates/gabriel-fischer-react-advanced",
        image: "/placeholder.svg?height=200&width=300&text=React+Certificate",
      },
    ]
    setPosts(defaultPosts)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-foreground">Posts do LinkedIn</h3>
        <Button
          onClick={fetchLinkedInPosts}
          variant="outline"
          size="sm"
          className="bg-transparent border-border text-foreground hover:bg-blue-500/10 hover:border-blue-500 hover:text-blue-400"
        >
          Atualizar
        </Button>
      </div>

      {posts.map((post) => (
        <Card
          key={post.id}
          className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border border-border/50 hover:border-purple-500/50 transition-all duration-300"
        >
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-100 pointer-events-none"
            style={{
              background: `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(147, 51, 234, 0.15), transparent 40%)`,
            }}
          />
          <CardContent className="p-6 relative z-10">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center flex-shrink-0">
                <Linkedin className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  {getPostIcon(post.type)}
                  {post.title && <h3 className="font-bold text-foreground">{post.title}</h3>}
                  {getPostBadge(post.type)}
                </div>
                {post.institution && <p className="text-sm text-muted-foreground mb-2">📚 {post.institution}</p>}
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  <span>{formatDate(post.date)}</span>
                </div>
              </div>
            </div>

            {post.image && (
              <div className="mb-4 rounded-lg overflow-hidden">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title || "LinkedIn post image"}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}

            <p className="text-foreground leading-relaxed mb-4">{post.content}</p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>👍 {post.likes}</span>
                <span>💬 {post.comments}</span>
              </div>
              <div className="flex gap-2">
                {post.certificateUrl && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="hover:bg-yellow-500/10 hover:border-yellow-500 hover:text-yellow-400 transition-all duration-300 bg-transparent border-border text-foreground"
                    onClick={() => window.open(post.certificateUrl, "_blank")}
                  >
                    <Award className="w-4 h-4 mr-2" />
                    Ver Certificado
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  className="hover:bg-blue-500/10 hover:border-blue-500 hover:text-blue-400 transition-all duration-300 bg-transparent border-border text-foreground"
                  onClick={() => window.open(post.url, "_blank")}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Ver no LinkedIn
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
