"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MessageCircle, Send, Phone } from "lucide-react"

export default function ContactPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
  }

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Olá Gabriel! Vim através do seu portfólio e gostaria de conversar sobre um projeto.`,
    )
    window.open(`https://wa.me/5511984673159?text=${message}`, "_blank")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background dark:from-black dark:via-black dark:to-black relative overflow-hidden">
      {/* Animated background pulses */}
      <div className="fixed inset-0 pointer-events-none dark:block hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Vamos conversar!</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Tem um projeto em mente? Quer discutir uma oportunidade ou apenas trocar uma ideia sobre tecnologia? Ficarei
            feliz em conversar com você.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="group relative overflow-hidden bg-background/50 dark:bg-black/50 backdrop-blur-sm border border-border/50 hover:border-purple-500/50 transition-all duration-300 mb-8">
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{
                background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(147, 51, 234, 0.1), transparent 40%)`,
              }}
            />
            <CardContent className="p-8 relative z-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-foreground">
                      Nome*
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Seu nome"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="bg-background/50 border-border/50 focus:border-purple-500 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground">
                      E-mail*
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="bg-background/50 border-border/50 focus:border-purple-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-foreground">
                    Assunto
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="Sobre o que você gostaria de conversar?"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="bg-background/50 border-border/50 focus:border-purple-500 transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-foreground">
                    Mensagem*
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Conte-me mais sobre seu projeto ou o que está pensando..."
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="bg-background/50 border-border/50 focus:border-purple-500 transition-colors resize-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    type="submit"
                    className="flex-1 bg-purple-500 hover:bg-purple-600 text-white transition-all duration-300 hover:scale-105"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Enviar mensagem
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleWhatsApp}
                    className="flex-1 hover:bg-green-500/10 hover:border-green-500 hover:text-green-500 transition-all duration-300 bg-transparent"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    WhatsApp
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground text-center">
                  Ao enviar esta mensagem, você concorda que eu possa responder usando o e-mail fornecido. Seus dados
                  não serão compartilhados com terceiros.
                </p>
              </form>
            </CardContent>
          </Card>

          {/* Quick Contact Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card
              className="group relative overflow-hidden bg-background/50 dark:bg-black/50 backdrop-blur-sm border border-border/50 hover:border-green-500/50 transition-all duration-300 cursor-pointer"
              onClick={handleWhatsApp}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(34, 197, 94, 0.1), transparent 40%)`,
                }}
              />
              <CardContent className="p-6 text-center relative z-10">
                <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-500/20 transition-colors">
                  <MessageCircle className="w-6 h-6 text-green-500" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">WhatsApp</h3>
                <p className="text-sm text-muted-foreground">Resposta rápida e direta</p>
              </CardContent>
            </Card>

            <Card className="group relative overflow-hidden bg-background/50 dark:bg-black/50 backdrop-blur-sm border border-border/50 hover:border-blue-500/50 transition-all duration-300">
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.1), transparent 40%)`,
                }}
              />
              <CardContent className="p-6 text-center relative z-10">
                <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-500/20 transition-colors">
                  <Send className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">E-mail</h3>
                <p className="text-sm text-muted-foreground">Para conversas mais detalhadas</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
