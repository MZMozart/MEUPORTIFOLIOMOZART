import { Github, Linkedin, MessageSquare, CheckCircle, Instagram } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-background/98 backdrop-blur-xl border-t border-border/50 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Left Section */}
          <div>
            <h3 className="font-bold text-lg mb-2 text-foreground">Gabriel Tamais Fischer</h3>
            <p className="text-muted-foreground mb-1">Desenvolvedor Full Stack</p>
            <p className="text-muted-foreground">São Paulo, SP - Brasil</p>
          </div>

          {/* Middle Section */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Navegação</h4>
            <div className="space-y-2">
              <Link href="/" className="block text-muted-foreground hover:text-purple-400 transition-colors">
                Início
              </Link>
              <Link href="/sobre" className="block text-muted-foreground hover:text-purple-400 transition-colors">
                Sobre
              </Link>
              <Link href="/projetos" className="block text-muted-foreground hover:text-purple-400 transition-colors">
                Projetos
              </Link>
              <Link href="/tecnologias" className="block text-muted-foreground hover:text-purple-400 transition-colors">
                Tecnologias
              </Link>
              <Link href="/contato" className="block text-muted-foreground hover:text-purple-400 transition-colors">
                Contato
              </Link>
            </div>
          </div>

          {/* Right Section */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Contato</h4>
            <div className="flex gap-3">
              <a
                href="https://github.com/MZMozart"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-muted hover:bg-purple-500/20 hover:text-purple-400 hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 border border-border hover:scale-110 text-foreground"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/gabriel-tamais-fischer-50b3a6282/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-muted hover:bg-blue-500/20 hover:text-blue-400 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 border border-border hover:scale-110 text-foreground"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/mozart_m7/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-muted hover:bg-pink-500/20 hover:text-pink-400 hover:shadow-lg hover:shadow-pink-500/25 transition-all duration-300 border border-border hover:scale-110 text-foreground"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-muted hover:bg-indigo-500/20 hover:text-indigo-400 hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 border border-border hover:scale-110 text-foreground"
              >
                <MessageSquare className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">© 2025 Gabriel Fischer.</p>
          <div className="flex items-center gap-2 text-sm mt-4 md:mt-0">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span className="text-muted-foreground">Disponível para novos projetos</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
