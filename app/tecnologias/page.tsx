"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"

export default function TechnologiesPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const technologies = {
    Frontend: [
      {
        name: "HTML",
        color: "#E34F26",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
      },
      {
        name: "CSS",
        color: "#1572B6",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
      },
      {
        name: "JavaScript",
        color: "#F7DF1E",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      },
      {
        name: "TypeScript",
        color: "#3178C6",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      },
      {
        name: "React",
        color: "#61DAFB",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      },
      {
        name: "Angular",
        color: "#DD0031",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg",
      },
    ],
    Backend: [
      {
        name: "Python",
        color: "#3776AB",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      },
      {
        name: "Node.js",
        color: "#339933",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      },
      {
        name: "Java",
        color: "#007396",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
      },
      {
        name: "PHP",
        color: "#777BB4",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
      },
      {
        name: "JavaScript",
        color: "#F7DF1E",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      },
      {
        name: "TypeScript",
        color: "#3178C6",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      },
      {
        name: "Docker",
        color: "#2496ED",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
      },
      {
        name: "AWS",
        color: "#FF9900",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg",
      },
    ],
    Database: [
      {
        name: "PostgreSQL",
        color: "#336791",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
      },
      {
        name: "MongoDB",
        color: "#47A248",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
      },
      {
        name: "MySQL",
        color: "#4479A1",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
      },
    ],
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
          <h1 className="text-4xl font-bold text-foreground mb-4">Tecnologias</h1>
          <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Trabalho com um conjunto moderno de tecnologias que me permite desenvolver aplicações escaláveis,
            performáticas e bem estruturadas. Cada ferramenta é escolhida com foco em produtividade, qualidade de código
            e uma experiência de uso fluida e eficiente.
          </p>
        </div>

        <div className="space-y-12">
          {Object.entries(technologies).map(([category, techs]) => (
            <div key={category}>
              <h2 className="text-2xl font-bold text-foreground mb-6">{category}</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {techs.map((tech) => (
                  <Card
                    key={tech.name}
                    className="group relative overflow-hidden bg-background/50 dark:bg-black/50 backdrop-blur-sm border border-border/50 hover:border-purple-500/50 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-2xl"
                    style={{
                      boxShadow: `0 0 0 0 ${tech.color}00`,
                      transition: "all 0.3s ease, box-shadow 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = `0 0 30px 5px ${tech.color}40, 0 0 60px 10px ${tech.color}20`
                      e.currentTarget.style.borderColor = `${tech.color}80`
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = `0 0 0 0 ${tech.color}00`
                      e.currentTarget.style.borderColor = ""
                    }}
                  >
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{
                        background: `radial-gradient(circle at center, ${tech.color}30 0%, ${tech.color}20 30%, transparent 70%)`,
                      }}
                    />
                    <CardContent className="p-6 text-center relative z-10">
                      <div
                        className="w-12 h-12 mx-auto mb-3 flex items-center justify-center group-hover:drop-shadow-lg transition-all duration-300"
                        style={{
                          filter: `drop-shadow(0 0 0px ${tech.color}00)`,
                          transition: "all 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.filter = `drop-shadow(0 0 15px ${tech.color}80) drop-shadow(0 0 25px ${tech.color}60)`
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.filter = `drop-shadow(0 0 0px ${tech.color}00)`
                        }}
                      >
                        <img
                          src={tech.icon || "/placeholder.svg"}
                          alt={tech.name}
                          className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-300"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.style.display = "none"
                            target.nextElementSibling?.classList.remove("hidden")
                          }}
                        />
                        <div className="text-3xl group-hover:scale-110 transition-transform duration-300 hidden">
                          {tech.name.charAt(0)}
                        </div>
                      </div>
                      <h3
                        className="font-semibold transition-all duration-300 group-hover:font-bold group-hover:scale-105"
                        style={{
                          color: `${tech.color}`,
                          textShadow: "0 0 0px transparent",
                          transition: "all 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.textShadow = `0 0 10px ${tech.color}80, 0 0 20px ${tech.color}60`
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.textShadow = "0 0 0px transparent"
                        }}
                      >
                        {tech.name}
                      </h3>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
