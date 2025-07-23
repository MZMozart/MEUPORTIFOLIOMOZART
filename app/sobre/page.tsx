"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Code, GraduationCap, Briefcase, Globe } from "lucide-react"
import Image from "next/image"

export default function AboutPage() {
  const [age, setAge] = useState(21)
  const [yearsOfExperience, setYearsOfExperience] = useState(3)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const calculateAge = () => {
      const birthDate = new Date("2004-02-04")
      const today = new Date()
      const calculatedAge = today.getFullYear() - birthDate.getFullYear()
      const monthDiff = today.getMonth() - birthDate.getMonth()

      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        setAge(calculatedAge - 1)
      } else {
        setAge(calculatedAge)
      }
    }

    const calculateExperience = () => {
      const startDate = new Date("2021-01-01")
      const today = new Date()
      const years = Math.floor((today.getTime() - startDate.getTime()) / (365.25 * 24 * 60 * 60 * 1000))
      setYearsOfExperience(Math.max(3, years))
    }

    calculateAge()
    calculateExperience()

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const interests = [
    "Desenvolvimento Web",
    "Banco de Dados",
    "Apps Mobile",
    "Desenvolvimento de software",
    "Open Source",
    "Inteligência Artificial",
  ]

  const education = [
    {
      title: "Análise e Desenvolvimento de Sistemas",
      institution: "USCS - Universidade Municipal de São Caetano do Sul",
      period: "2024 - 2026 (4º semestre)",
      status: "Em andamento",
      icon: <GraduationCap className="w-5 h-5 text-blue-500" />,
    },
    {
      title: "Ensino Médio Técnico em Informática",
      institution: "ETEC Jorge Street",
      period: "2021 - 2023",
      status: "Concluído",
      icon: <GraduationCap className="w-5 h-5 text-green-500" />,
    },
  ]

  const experiences = [
    {
      title: "Sistema de SAC com Chatbot",
      description: "Sistema de SAC integrado com chatbot em chat de tempo real",
      technologies: ["React", "SQL Server"],
      type: "Em desenvolvimento",
      icon: <Briefcase className="w-5 h-5 text-purple-500" />,
    },
    {
      title: "Sistema Imobiliário",
      description: "Desenvolvimento de sistema completo para gestão imobiliária",
      technologies: ["Angular", "MySQL"],
      type: "Projeto",
      icon: <Briefcase className="w-5 h-5 text-blue-500" />,
    },
    {
      title: "Site de Vendas",
      description: "Desenvolvimento de plataforma de vendas online completa",
      technologies: ["HTML", "CSS", "JavaScript", "SQL"],
      type: "Projeto",
      icon: <Briefcase className="w-5 h-5 text-green-500" />,
    },
    {
      title: "Sistema de Cadastros com Geolocalização",
      description: "Projeto para partido político com sistema de cadastros e geolocalização",
      technologies: ["Python"],
      type: "Freelancer",
      icon: <Briefcase className="w-5 h-5 text-orange-500" />,
    },
  ]

  const languages = [
    { name: "Português", level: "Nativo", color: "text-green-500" },
    { name: "Inglês", level: "Intermediário", color: "text-blue-500" },
    { name: "Espanhol", level: "Básico", color: "text-yellow-500" },
  ]

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated background pulses - só no modo escuro */}
      <div className="fixed inset-0 pointer-events-none dark:block hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Hero Section */}
        <Card className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border border-border/50 hover:border-purple-500/50 transition-all duration-300 mb-8">
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-75 pointer-events-none"
            style={{
              background: `radial-gradient(300px circle at ${mousePosition.x - (typeof window !== "undefined" ? window.scrollX : 0)}px ${mousePosition.y - (typeof window !== "undefined" ? window.scrollY : 0)}px, rgba(147, 51, 234, 0.15), transparent 40%)`,
            }}
          />
          <CardContent className="p-8 relative z-10">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-shrink-0">
                <div className="w-48 h-48 rounded-2xl overflow-hidden border-4 border-purple-500/20">
                  <Image
                    src="/images/gabriel-photo.jpg"
                    alt="Gabriel Tamais Fischer"
                    width={192}
                    height={192}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-foreground mb-4">Sobre mim</h1>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Domino tanto Back-end quanto Front-end, garantindo sistemas robustos e interfaces intuitivas. Com
                  pensamento analítico e criatividade, transformo desafios em resultados escaláveis e de alto impacto.
                  Sempre atualizado com as últimas tendências, entregando qualidade e performance excepcionais.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Atualmente cursando Análise e Desenvolvimento de Sistemas (4º semestre) na USCS, combino conhecimento
                  acadêmico com experiência prática para entregar soluções robustas e escaláveis. Minha abordagem é
                  sempre focada na qualidade do código, performance e experiência do usuário.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Quando não estou codando, gosto de me manter atualizado com as últimas tendências em tecnologia,
                  contribuir para projetos open source e compartilhar conhecimento com a comunidade de desenvolvedores.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border border-border/50 hover:border-purple-500/50 transition-all duration-300">
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-75 pointer-events-none"
              style={{
                background: `radial-gradient(300px circle at ${mousePosition.x - (typeof window !== "undefined" ? window.scrollX : 0)}px ${mousePosition.y - (typeof window !== "undefined" ? window.scrollY : 0)}px, rgba(147, 51, 234, 0.15), transparent 40%)`,
              }}
            />
            <CardContent className="p-6 text-center relative z-10">
              <MapPin className="w-8 h-8 text-purple-500 mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-1">Localização</h3>
              <p className="text-muted-foreground">São Bernardo do Campo, SP</p>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border border-border/50 hover:border-purple-500/50 transition-all duration-300">
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-75 pointer-events-none"
              style={{
                background: `radial-gradient(300px circle at ${mousePosition.x - (typeof window !== "undefined" ? window.scrollX : 0)}px ${mousePosition.y - (typeof window !== "undefined" ? window.scrollY : 0)}px, rgba(147, 51, 234, 0.15), transparent 40%)`,
              }}
            />
            <CardContent className="p-6 text-center relative z-10">
              <Calendar className="w-8 h-8 text-purple-500 mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-1">Idade</h3>
              <p className="text-muted-foreground">{age} anos</p>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border border-border/50 hover:border-purple-500/50 transition-all duration-300">
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-75 pointer-events-none"
              style={{
                background: `radial-gradient(300px circle at ${mousePosition.x - (typeof window !== "undefined" ? window.scrollX : 0)}px ${mousePosition.y - (typeof window !== "undefined" ? window.scrollY : 0)}px, rgba(147, 51, 234, 0.15), transparent 40%)`,
              }}
            />
            <CardContent className="p-6 text-center relative z-10">
              <Code className="w-8 h-8 text-purple-500 mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-1">Experiência</h3>
              <p className="text-muted-foreground">+{yearsOfExperience} anos</p>
            </CardContent>
          </Card>
        </div>

        {/* Formação Acadêmica */}
        <Card className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border border-border/50 hover:border-purple-500/50 transition-all duration-300 mb-8">
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-75 pointer-events-none"
            style={{
              background: `radial-gradient(300px circle at ${mousePosition.x - (typeof window !== "undefined" ? window.scrollX : 0)}px ${mousePosition.y - (typeof window !== "undefined" ? window.scrollY : 0)}px, rgba(147, 51, 234, 0.15), transparent 40%)`,
            }}
          />
          <CardContent className="p-8 relative z-10">
            <h2 className="text-2xl font-bold text-foreground mb-6">Formação Acadêmica</h2>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                  <div className="flex-shrink-0">{edu.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground mb-1">{edu.title}</h3>
                    <p className="text-blue-400 font-medium mb-1">{edu.institution}</p>
                    <p className="text-muted-foreground mb-2">{edu.period}</p>
                    <Badge
                      variant="secondary"
                      className={
                        edu.status === "Em andamento"
                          ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                          : "bg-green-500/10 text-green-400 border-green-500/20"
                      }
                    >
                      {edu.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Experiência Profissional */}
        <Card className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border border-border/50 hover:border-purple-500/50 transition-all duration-300 mb-8">
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-75 pointer-events-none"
            style={{
              background: `radial-gradient(300px circle at ${mousePosition.x - (typeof window !== "undefined" ? window.scrollX : 0)}px ${mousePosition.y - (typeof window !== "undefined" ? window.scrollY : 0)}px, rgba(147, 51, 234, 0.15), transparent 40%)`,
            }}
          />
          <CardContent className="p-8 relative z-10">
            <h2 className="text-2xl font-bold text-foreground mb-6">Experiência Profissional & Projetos</h2>
            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                  <div className="flex-shrink-0">{exp.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-foreground">{exp.title}</h3>
                      <Badge variant="secondary" className="bg-purple-500/10 text-purple-400 border-purple-500/20">
                        {exp.type}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-3">{exp.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, techIndex) => (
                        <Badge
                          key={techIndex}
                          variant="secondary"
                          className="bg-blue-500/10 text-blue-400 border-blue-500/20 text-xs"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Idiomas */}
        <Card className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border border-border/50 hover:border-purple-500/50 transition-all duration-300 mb-8">
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-75 pointer-events-none"
            style={{
              background: `radial-gradient(300px circle at ${mousePosition.x - (typeof window !== "undefined" ? window.scrollX : 0)}px ${mousePosition.y - (typeof window !== "undefined" ? window.scrollY : 0)}px, rgba(147, 51, 234, 0.15), transparent 40%)`,
            }}
          />
          <CardContent className="p-8 relative z-10">
            <h2 className="text-2xl font-bold text-foreground mb-6">Idiomas</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {languages.map((lang, index) => (
                <div key={index} className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                  <Globe className={`w-5 h-5 ${lang.color}`} />
                  <div>
                    <h3 className="font-semibold text-foreground">{lang.name}</h3>
                    <p className="text-sm text-muted-foreground">{lang.level}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Interests */}
        <Card className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border border-border/50 hover:border-purple-500/50 transition-all duration-300">
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-75 pointer-events-none"
            style={{
              background: `radial-gradient(300px circle at ${mousePosition.x - (typeof window !== "undefined" ? window.scrollX : 0)}px ${mousePosition.y - (typeof window !== "undefined" ? window.scrollY : 0)}px, rgba(147, 51, 234, 0.15), transparent 40%)`,
            }}
          />
          <CardContent className="p-8 relative z-10">
            <h2 className="text-2xl font-bold text-foreground mb-6">Interesses</h2>
            <div className="flex flex-wrap gap-3">
              {interests.map((interest, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 transition-colors px-4 py-2 border-purple-500/20"
                >
                  {interest}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
