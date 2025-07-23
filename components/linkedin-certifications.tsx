"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Award, ExternalLink, Calendar, RefreshCw, Linkedin } from "lucide-react"
import Image from "next/image"

interface Certification {
  id: string
  title: string
  issuer: string
  issueDate: string
  credentialId: string
  credentialUrl: string
  skills: string[]
  description: string
  image: string
}

export default function LinkedInCertifications() {
  const [certifications, setCertifications] = useState<Certification[]>([])
  const [loading, setLoading] = useState(true)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const fetchCertifications = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/linkedin/scraper")
      const data = await response.json()
      setCertifications(data.certifications || [])
    } catch (error) {
      console.error("Erro ao buscar certificações:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCertifications()
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("pt-BR", {
      month: "long",
      year: "numeric",
    })
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">Certificações</h2>
          <RefreshCw className="w-6 h-6 text-muted-foreground animate-spin" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="animate-pulse bg-card/50">
              <CardContent className="p-6">
                <div className="aspect-video bg-muted rounded-lg mb-4" />
                <div className="h-4 bg-muted rounded mb-2" />
                <div className="h-3 bg-muted rounded w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Linkedin className="w-8 h-8 text-blue-500" />
          <h2 className="text-2xl font-bold text-foreground">Certificações LinkedIn</h2>
          <Badge className="bg-green-500/10 text-green-400 border-green-500/20">
            {certifications.length} certificados
          </Badge>
        </div>
        <Button
          onClick={fetchCertifications}
          variant="outline"
          size="sm"
          className="bg-transparent border-border text-foreground hover:bg-muted"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Atualizar
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certifications.map((cert) => (
          <Card
            key={cert.id}
            className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border border-border/50 hover:border-purple-500/50 transition-all duration-300 cursor-pointer hover:scale-105"
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-100 pointer-events-none"
              style={{
                background: `radial-gradient(200px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(147, 51, 234, 0.15), transparent 40%)`,
              }}
            />
            <CardContent className="p-0 relative z-10">
              {/* Imagem do certificado */}
              <div className="aspect-video relative overflow-hidden">
                <Image
                  src={cert.image || "/placeholder.svg"}
                  alt={cert.title}
                  width={400}
                  height={225}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3">
                  <Badge className="bg-yellow-500/90 text-yellow-900 border-yellow-500">
                    <Award className="w-3 h-3 mr-1" />
                    Certificado
                  </Badge>
                </div>
              </div>

              {/* Conteúdo */}
              <div className="p-6">
                <h3 className="font-bold text-foreground text-lg mb-2 line-clamp-2">{cert.title}</h3>
                <p className="text-muted-foreground text-sm mb-3">{cert.issuer}</p>

                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                  <Calendar className="w-3 h-3" />
                  <span>{formatDate(cert.issueDate)}</span>
                </div>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{cert.description}</p>

                {/* Skills */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {cert.skills.slice(0, 3).map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="text-xs bg-purple-500/10 text-purple-400 border-purple-500/20"
                    >
                      {skill}
                    </Badge>
                  ))}
                  {cert.skills.length > 3 && (
                    <Badge variant="secondary" className="text-xs bg-muted text-muted-foreground">
                      +{cert.skills.length - 3}
                    </Badge>
                  )}
                </div>

                {/* Botão */}
                <Button
                  onClick={() => window.open(cert.credentialUrl, "_blank")}
                  variant="outline"
                  size="sm"
                  className="w-full bg-transparent border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10 hover:border-yellow-500"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Ver Certificado
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
