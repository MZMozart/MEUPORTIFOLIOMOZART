"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Sun, Moon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Header() {
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!mounted) return null

  const navItems = [
    { href: "/sobre", label: "Sobre" },
    { href: "/projetos", label: "Projetos" },
    { href: "/tecnologias", label: "Tecnologias" },
    { href: "/contato", label: "Contato" },
  ]

  const toggleToLight = () => {
    setTheme("light")
    // FORÇA O FUNDO BRANCO IMEDIATAMENTE
    document.documentElement.classList.add("light")
    document.documentElement.classList.remove("dark")
    document.body.style.backgroundColor = "white"
    document.body.style.color = "black"
  }

  const toggleToDark = () => {
    setTheme("dark")
    // VOLTA AO NORMAL
    document.documentElement.classList.add("dark")
    document.documentElement.classList.remove("light")
    document.body.style.backgroundColor = "black"
    document.body.style.color = "white"
  }

  return (
    <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300">
      <nav className="bg-background/95 backdrop-blur-xl rounded-full px-6 py-3 shadow-2xl border border-border/50">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-bold text-lg text-foreground hover:text-purple-400 transition-colors">
            GF
          </Link>

          <div className="flex items-center gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-all duration-300 hover:text-purple-400 hover:scale-105 text-foreground ${
                  pathname === item.href ? "text-purple-400" : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {/* Botão SOL - Modo Claro */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleToLight}
              className={`rounded-full w-9 h-9 p-0 transition-all duration-300 ${
                theme === "light"
                  ? "bg-yellow-500/20 text-yellow-500 shadow-lg shadow-yellow-500/25 scale-110"
                  : "hover:bg-yellow-500/20 hover:text-yellow-500 hover:shadow-lg hover:shadow-yellow-500/25 hover:scale-110 text-foreground"
              }`}
              title="Modo Claro"
            >
              <Sun className="w-4 h-4" />
            </Button>

            {/* Botão LUA - Modo Escuro */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleToDark}
              className={`rounded-full w-9 h-9 p-0 transition-all duration-300 ${
                theme === "dark"
                  ? "bg-purple-500/20 text-purple-400 shadow-lg shadow-purple-500/25 scale-110"
                  : "hover:bg-purple-500/20 hover:text-purple-400 hover:shadow-lg hover:shadow-purple-500/25 hover:scale-110 text-foreground"
              }`}
              title="Modo Escuro"
            >
              <Moon className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </nav>
    </header>
  )
}
