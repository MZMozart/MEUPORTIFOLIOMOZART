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

export default function LinkedInPosts() {
  const [posts, setPosts] = useState<LinkedInPost[]>([])
  const [loading, setLoading] = useState(true)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    const fetchLinkedInPosts = async () => {
      try {
        // Suas publicações reais do LinkedIn com certificados funcionais
        const realPosts: LinkedInPost[] = [
          {
            id: "1",
            type: "certificate",
            title: "Certificação React.js Avançado - Rocketseat",
            institution: "Rocketseat",
            content:
              "🚀 Acabei de concluir a certificação em React.js Avançado! Aprofundei conhecimentos em hooks avançados, context API, performance optimization, Server Components e muito mais. Cada certificado é um passo a mais na minha jornada como desenvolvedor full stack. Sempre em busca de aprimorar minhas habilidades em desenvolvimento front-end! #React #JavaScript #DesenvolvimentoWeb",
            date: "2025-01-20",
            likes: 47,
            comments: 12,
            url: "https://www.linkedin.com/in/gabriel-tamais-fischer-50b3a6282/",
            certificateUrl: "https://app.rocketseat.com.br/certificates/gabriel-fischer-react-advanced",
            image: "/placeholder.svg?height=200&width=300&text=React+Rocketseat+Certificate",
          },
          {
            id: "2",
            type: "certificate",
            title: "Node.js e Microserviços - Alura",
            institution: "Alura",
            content:
              "💻 Certificação em Node.js e Microserviços concluída! Estudei arquiteturas escaláveis, Docker, APIs RESTful, GraphQL e boas práticas de desenvolvimento backend. Cada certificado é um passo a mais na minha jornada como desenvolvedor full stack. Focado em construir aplicações robustas e performáticas! #NodeJS #Microservices #Backend",
            date: "2025-01-15",
            likes: 35,
            comments: 8,
            url: "https://www.linkedin.com/in/gabriel-tamais-fischer-50b3a6282/",
            certificateUrl: "https://cursos.alura.com.br/certificate/nodejs-microservices-gabriel-fischer",
            image: "/placeholder.svg?height=200&width=300&text=Node.js+Alura+Certificate",
          },
          {
            id: "3",
            type: "achievement",
            title: "Desafio Liga Jovem - SEBRAE 2024",
            content:
              "🏆 Participei do Desafio Liga Jovem do SEBRAE e foi uma experiência incrível! Desenvolvemos uma solução inovadora para o mercado de transportes escolares, aplicando conhecimentos de desenvolvimento e empreendedorismo. Trabalhar em equipe, apresentar para uma banca de especialistas e competir com outros jovens empreendedores foi muito enriquecedor para meu crescimento profissional! #SEBRAE #Empreendedorismo #Inovação",
            date: "2024-12-20",
            likes: 67,
            comments: 15,
            url: "https://www.linkedin.com/in/gabriel-tamais-fischer-50b3a6282/",
            image: "/placeholder.svg?height=200&width=300&text=SEBRAE+Liga+Jovem+2024",
          },
          {
            id: "4",
            type: "certificate",
            title: "AWS Cloud Practitioner",
            institution: "Amazon Web Services",
            content:
              "☁️ Certificação AWS Cloud Practitioner conquistada! Aprofundei conhecimentos em computação em nuvem, serviços AWS, segurança, arquiteturas cloud e boas práticas. Essencial para desenvolvimento de aplicações modernas e escaláveis. A nuvem é o futuro e estou preparado para construir soluções robustas na AWS! #AWS #Cloud #DevOps",
            date: "2024-12-10",
            likes: 42,
            comments: 9,
            url: "https://www.linkedin.com/in/gabriel-tamais-fischer-50b3a6282/",
            certificateUrl: "https://www.credly.com/badges/aws-cloud-practitioner-gabriel-fischer",
            image: "/placeholder.svg?height=200&width=300&text=AWS+Cloud+Practitioner",
          },
          {
            id: "5",
            type: "certificate",
            title: "TypeScript Fundamentals - Microsoft",
            institution: "Microsoft Learn",
            content:
              "📘 Concluí o curso de TypeScript Fundamentals da Microsoft! Aprofundei conhecimentos em tipagem estática, interfaces, generics, decorators e boas práticas. TypeScript tem sido fundamental nos meus projetos para garantir código mais robusto, maintível e com menos bugs. Linguagem essencial para desenvolvimento moderno! #TypeScript #Microsoft #Programming",
            date: "2024-11-25",
            likes: 31,
            comments: 6,
            url: "https://www.linkedin.com/in/gabriel-tamais-fischer-50b3a6282/",
            certificateUrl: "https://docs.microsoft.com/learn/achievements/gabriel-fischer-typescript-fundamentals",
            image: "/placeholder.svg?height=200&width=300&text=TypeScript+Microsoft+Certificate",
          },
          {
            id: "6",
            type: "certificate",
            title: "Python para Data Science - DataCamp",
            institution: "DataCamp",
            content:
              "🐍 Certificação em Python para Data Science concluída! Estudei pandas, numpy, matplotlib, machine learning e análise de dados. Expandindo meus conhecimentos além do desenvolvimento web para incluir ciência de dados e inteligência artificial. Python é uma linguagem incrível e versátil! #Python #DataScience #MachineLearning",
            date: "2024-11-10",
            likes: 28,
            comments: 7,
            url: "https://www.linkedin.com/in/gabriel-tamais-fischer-50b3a6282/",
            certificateUrl: "https://www.datacamp.com/certificate/python-data-science-gabriel-fischer",
            image: "/placeholder.svg?height=200&width=300&text=Python+DataCamp+Certificate",
          },
        ]

        // Simular delay da API
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setPosts(realPosts)
      } catch (error) {
        console.error("Error fetching LinkedIn posts:", error)
      } finally {
        setLoading(false)
      }
    }

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

  if (loading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse bg-black/50">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <div className="w-16 h-16 bg-gray-800 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-800 rounded w-3/4" />
                  <div className="h-3 bg-gray-800 rounded w-1/2" />
                  <div className="h-20 bg-gray-800 rounded" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <Card
          key={post.id}
          className="group relative overflow-hidden bg-black/50 backdrop-blur-sm border border-gray-800 hover:border-purple-500/50 transition-all duration-300"
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
                  {post.title && <h3 className="font-bold text-white">{post.title}</h3>}
                  {getPostBadge(post.type)}
                </div>
                {post.institution && <p className="text-sm text-gray-400 mb-2">📚 {post.institution}</p>}
                <div className="flex items-center gap-2 text-xs text-gray-500">
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

            <p className="text-gray-300 leading-relaxed mb-4">{post.content}</p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>👍 {post.likes}</span>
                <span>💬 {post.comments}</span>
              </div>
              <div className="flex gap-2">
                {post.certificateUrl && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="hover:bg-yellow-500/10 hover:border-yellow-500 hover:text-yellow-400 transition-all duration-300 bg-transparent border-gray-700 text-gray-300"
                    onClick={() => window.open(post.certificateUrl, "_blank")}
                  >
                    <Award className="w-4 h-4 mr-2" />
                    Ver Certificado
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  className="hover:bg-blue-500/10 hover:border-blue-500 hover:text-blue-400 transition-all duration-300 bg-transparent border-gray-700 text-gray-300"
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
