"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Github, ExternalLink, MessageCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import GitHubContributions from "@/components/github-contributions"
import LightningEffects from "@/components/lightning-effects"
import SpotifyRealWidget from "@/components/spotify-real-widget"
import LinkedInSimpleWidget from "@/components/linkedin-simple-widget"

export default function HomePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Lightning Effects Background - SEMPRE VISÍVEL */}
      <LightningEffects />

      {/* Animated background pulses - SEMPRE VISÍVEL */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* About Me Card */}
          <Card className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border border-border/50 hover:border-purple-500/50 transition-all duration-300">
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-100 pointer-events-none"
              style={{
                background: `radial-gradient(200px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(147, 51, 234, 0.15), transparent 40%)`,
              }}
            />
            <CardContent className="p-8 relative z-10">
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="relative">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-purple-500/20">
                    <Image
                      src="/images/gabriel-photo.jpg"
                      alt="Gabriel Tamais Fischer"
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-background animate-pulse" />
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-foreground mb-1">Gabriel Tamais Fischer</h1>
                  <Badge variant="secondary" className="mb-4 bg-purple-500/10 text-purple-600 dark:text-purple-400">
                    DEV FULL STACK
                  </Badge>
                  <p className="text-muted-foreground leading-relaxed">
                    Desenvolvedor Full Stack, cursando Análise e Desenvolvimento de Sistemas. Domino Back-end e
                    Front-end, entregando sistemas robustos e interfaces intuitivas. Tenho pensamento analítico,
                    criatividade e foco em transformar desafios em soluções escaláveis e de alto impacto. Estou sempre
                    atualizado com as tendências e busco qualidade e performance em cada projeto.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Google Maps Card */}
          <Card className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border border-border/50 hover:border-purple-500/50 transition-all duration-300">
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-100 pointer-events-none"
              style={{
                background: `radial-gradient(200px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(147, 51, 234, 0.15), transparent 40%)`,
              }}
            />
            <CardContent className="p-0 relative z-10">
              <div className="h-full min-h-[300px] relative rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3654.8234567890!2d-46.5234567!3d-23.7123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sAv.%20Orlando%20Angelo%20Gastaldo%2C%2090%20-%20Taboa%C3%A3o%2C%20S%C3%A3o%20Bernardo%20do%20Campo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1234567890"
                  width="100%"
                  height="300"
                  style={{ border: 0, filter: "grayscale(100%) contrast(1.2)" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="group-hover:filter-none transition-all duration-300"
                />
                <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm rounded-lg px-3 py-2 border">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-purple-500" />
                    <span className="font-medium text-foreground">Taboão, SP</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Journey Card */}
          <Card className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border border-border/50 hover:border-purple-500/50 transition-all duration-300">
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-100 pointer-events-none"
              style={{
                background: `radial-gradient(200px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(147, 51, 234, 0.15), transparent 40%)`,
              }}
            />
            <CardContent className="p-8 relative z-10">
              <h3 className="text-xl font-bold mb-4 text-foreground">Minha Jornada</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Domino tanto Back-end quanto Front-end, garantindo sistemas robustos e interfaces intuitivas. Com
                pensamento analítico e criatividade, transformo desafios em resultados escaláveis e de alto impacto.
                Sempre atualizado com as últimas tendências, entregando qualidade e performance excepcionais...
              </p>
              <Link href="/sobre">
                <Button
                  variant="outline"
                  className="group/btn hover:bg-purple-500 hover:text-white hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 bg-transparent hover:scale-105"
                >
                  Ler mais
                  <ExternalLink className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* GitHub Contributions Card */}
          <Card className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border border-border/50 hover:border-purple-500/50 transition-all duration-300 cursor-pointer">
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-100 pointer-events-none"
              style={{
                background: `radial-gradient(200px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(147, 51, 234, 0.15), transparent 40%)`,
              }}
            />
            <CardContent
              className="p-8 relative z-10"
              onClick={() => window.open("https://github.com/MZMozart", "_blank")}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-foreground">GitHub Activity</h3>
                <Github className="w-6 h-6 text-muted-foreground" />
              </div>
              <GitHubContributions />
              <p className="text-sm text-muted-foreground mt-4">Contribuições nos últimos 12 meses</p>
            </CardContent>
          </Card>
        </div>

        {/* Third Row - CARDS DO MESMO TAMANHO */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Spotify Card */}
          <Card className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border border-border/50 hover:border-purple-500/50 transition-all duration-300">
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-100 pointer-events-none"
              style={{
                background: `radial-gradient(200px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(147, 51, 234, 0.15), transparent 40%)`,
              }}
            />
            <CardContent className="p-8 relative z-10">
              <SpotifyRealWidget />
            </CardContent>
          </Card>

          {/* LinkedIn Card - SIMPLIFICADO */}
          <Card className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border border-border/50 hover:border-purple-500/50 transition-all duration-300">
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-100 pointer-events-none"
              style={{
                background: `radial-gradient(200px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(147, 51, 234, 0.15), transparent 40%)`,
              }}
            />
            <CardContent className="p-8 relative z-10">
              <LinkedInSimpleWidget />
            </CardContent>
          </Card>
        </div>

        {/* Contact CTA Card */}
        <Card className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border border-border/50 hover:border-purple-500/50 transition-all duration-300">
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-100 pointer-events-none"
            style={{
              background: `radial-gradient(200px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(147, 51, 234, 0.15), transparent 40%)`,
            }}
          />
          <CardContent className="p-8 relative z-10 text-center">
            <h3 className="text-2xl font-bold mb-4 text-foreground">Tem um projeto interessante em mente? 👋</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Tem um projeto em mente? Precisa tirar uma ideia do papel ou quer trocar uma ideia sobre tecnologia? Vamos
              conversar!
            </p>
            <Link href="/contato">
              <Button className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25">
                <MessageCircle className="w-5 h-5 mr-2" />
                Contate-me
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
