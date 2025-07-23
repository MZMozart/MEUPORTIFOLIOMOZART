"use client"

import { Linkedin, ExternalLink } from "lucide-react"

export default function LinkedInSimpleWidget() {
  const handleLinkedInClick = () => {
    window.open("https://www.linkedin.com/in/gabriel-tamais-fischer-50b3a6282/", "_blank")
  }

  return (
    <div className="space-y-4">
      {/* Header igual ao Spotify */}
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
          <Linkedin className="w-8 h-8 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-foreground">LinkedIn</h3>
          <p className="text-sm text-muted-foreground">Perfil profissional</p>
        </div>
        <ExternalLink
          className="w-5 h-5 text-muted-foreground hover:text-blue-500 cursor-pointer transition-colors"
          onClick={handleLinkedInClick}
        />
      </div>

      {/* Banner do LinkedIn */}
      <div
        className="relative group cursor-pointer transition-transform duration-300 hover:scale-105 mb-4"
        onClick={handleLinkedInClick}
      >
        <div className="aspect-[16/9] rounded-lg overflow-hidden bg-gradient-to-br from-blue-500 to-blue-700 shadow-lg flex items-center justify-center">
          <div className="text-center text-white">
            <Linkedin className="w-16 h-16 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
            <h4 className="font-bold text-xl mb-2">Gabriel Tamais Fischer</h4>
            <p className="text-blue-100">Desenvolvedor Full Stack</p>
          </div>

          {/* Overlay hover */}
          <div className="absolute inset-0 bg-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>

      {/* Botão para acessar */}
      <button
        onClick={handleLinkedInClick}
        className="w-full py-3 px-4 bg-transparent border border-blue-500/50 text-blue-400 rounded-lg hover:bg-blue-500/10 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
      >
        <ExternalLink className="w-4 h-4" />
        Ver perfil no LinkedIn
      </button>
    </div>
  )
}
