"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Github,
  ExternalLink,
  Calendar,
  Folder,
  Star,
  GitFork,
  RefreshCw,
  AlertCircle,
  Download,
  Play,
  Code,
  FileText,
  Terminal,
  Eye,
} from "lucide-react"
import ProjectFileExplorer from "@/components/project-file-explorer"

interface GitHubRepo {
  id: number
  name: string
  description: string
  html_url: string
  homepage: string
  language: string
  languages_url: string
  stargazers_count: number
  forks_count: number
  created_at: string
  updated_at: string
  topics: string[]
  clone_url: string
  size: number
  default_branch: string
  visibility: string
  archived: boolean
}

export default function ProjectsPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [selectedProject, setSelectedProject] = useState<GitHubRepo | null>(null)
  const [projects, setProjects] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showFileExplorer, setShowFileExplorer] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const fetchGitHubProjects = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch("/api/github/repos", {
        cache: "no-store",
      })

      const data = await response.json()

      if (data.error) {
        setError(data.error)
        return
      }

      setProjects(data.repos || [])
    } catch (error) {
      console.error("Error fetching GitHub projects:", error)
      setError("Erro ao carregar repositórios do GitHub")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchGitHubProjects()
  }, [])

  const generateProjectPreview = (project: GitHubRepo) => {
    if (project.homepage) {
      return project.homepage
    }

    if (project.name.includes("github.io") || project.topics?.includes("github-pages")) {
      return `https://mzmozart.github.io/${project.name}`
    }

    if (project.topics?.includes("vercel") || project.topics?.includes("netlify")) {
      return `https://${project.name.toLowerCase()}.vercel.app`
    }

    return null
  }

  const getLanguageColor = (language: string) => {
    const colors: { [key: string]: string } = {
      JavaScript: "#f1e05a",
      TypeScript: "#2b7489",
      Python: "#3572A5",
      Java: "#b07219",
      HTML: "#e34c26",
      CSS: "#563d7c",
      PHP: "#4F5D95",
      React: "#61dafb",
      Vue: "#4FC08D",
      "C++": "#f34b7d",
      "C#": "#239120",
      Go: "#00ADD8",
      Rust: "#dea584",
      Swift: "#fa7343",
      Kotlin: "#7F52FF",
    }
    return colors[language] || "#8b949e"
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 KB"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i]
  }

  const getInstallInstructions = (project: GitHubRepo) => {
    const instructions: { [key: string]: string[] } = {
      JavaScript: [
        "# Clone o repositório",
        `git clone ${project.clone_url}`,
        "",
        "# Entre na pasta do projeto",
        `cd ${project.name}`,
        "",
        "# Instale as dependências",
        "npm install",
        "",
        "# Execute o projeto",
        "npm start",
        "",
        "# Para desenvolvimento:",
        "npm run dev",
      ],
      TypeScript: [
        "# Clone o repositório",
        `git clone ${project.clone_url}`,
        "",
        "# Entre na pasta do projeto",
        `cd ${project.name}`,
        "",
        "# Instale as dependências",
        "npm install",
        "",
        "# Compile o TypeScript",
        "npm run build",
        "",
        "# Execute o projeto",
        "npm start",
        "",
        "# Para desenvolvimento:",
        "npm run dev",
      ],
      Python: [
        "# Clone o repositório",
        `git clone ${project.clone_url}`,
        "",
        "# Entre na pasta do projeto",
        `cd ${project.name}`,
        "",
        "# Crie um ambiente virtual",
        "python -m venv venv",
        "",
        "# Ative o ambiente virtual",
        "# Windows: venv\\Scripts\\activate",
        "# Linux/Mac: source venv/bin/activate",
        "",
        "# Instale as dependências",
        "pip install -r requirements.txt",
        "",
        "# Execute o projeto",
        "python main.py",
      ],
      React: [
        "# Clone o repositório",
        `git clone ${project.clone_url}`,
        "",
        "# Entre na pasta do projeto",
        `cd ${project.name}`,
        "",
        "# Instale as dependências",
        "npm install",
        "",
        "# Execute em modo desenvolvimento",
        "npm run dev",
        "",
        "# Ou execute com:",
        "npm start",
        "",
        "# Para build de produção:",
        "npm run build",
      ],
      default: [
        "# Clone o repositório",
        `git clone ${project.clone_url}`,
        "",
        "# Entre na pasta do projeto",
        `cd ${project.name}`,
        "",
        "# Siga as instruções no README.md",
        "# para configurar e executar o projeto",
      ],
    }

    return instructions[project.language] || instructions.default
  }

  if (selectedProject) {
    const previewUrl = generateProjectPreview(selectedProject)
    const installInstructions = getInstallInstructions(selectedProject)

    return (
      <div className="min-h-screen bg-background relative overflow-hidden">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="outline"
              onClick={() => setSelectedProject(null)}
              className="hover:bg-purple-500/10 hover:border-purple-500 hover:text-purple-500 hover:shadow-lg hover:shadow-purple-500/25 hover:scale-105 transition-all duration-300 bg-transparent border-gray-700 text-foreground"
            >
              ← Voltar aos projetos
            </Button>

            <div className="flex gap-2">
              <Button
                variant={showFileExplorer ? "default" : "outline"}
                onClick={() => setShowFileExplorer(!showFileExplorer)}
                className={
                  showFileExplorer
                    ? "bg-purple-500 hover:bg-purple-600"
                    : "hover:bg-purple-500/10 hover:border-purple-500 hover:text-purple-500 bg-transparent border-gray-700 text-foreground"
                }
              >
                <Eye className="w-4 h-4 mr-2" />
                {showFileExplorer ? "Ocultar" : "Explorar"} Arquivos
              </Button>
            </div>
          </div>

          {/* File Explorer */}
          {showFileExplorer && (
            <Card className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border border-gray-800 mb-8">
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-100 pointer-events-none"
                style={{
                  background: `radial-gradient(200px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(147, 51, 234, 0.2), transparent 40%)`,
                }}
              />
              <CardContent className="p-6 relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <Code className="w-6 h-6 text-purple-400" />
                  <h2 className="text-xl font-bold text-foreground">Explorador de Arquivos - {selectedProject.name}</h2>
                  <Badge variant="secondary" className="bg-purple-500/10 text-purple-400">
                    {selectedProject.language}
                  </Badge>
                </div>
                <ProjectFileExplorer project={selectedProject} />
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Project Preview */}
            <Card className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border border-gray-800">
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-100 pointer-events-none"
                style={{
                  background: `radial-gradient(200px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(147, 51, 234, 0.2), transparent 40%)`,
                }}
              />
              <CardContent className="p-0 relative z-10">
                <div className="aspect-video relative overflow-hidden">
                  {previewUrl ? (
                    <iframe
                      src={previewUrl}
                      className="w-full h-full border-0"
                      title={`Preview of ${selectedProject.name}`}
                      sandbox="allow-scripts allow-same-origin"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                      <div className="text-center">
                        <Github className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">Preview não disponível</p>
                        <p className="text-sm text-gray-500">Use o explorador de arquivos para ver o código</p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-2xl font-bold text-foreground">{selectedProject.name}</h1>
                    {selectedProject.archived && (
                      <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-400">
                        Arquivado
                      </Badge>
                    )}
                    <Badge variant="secondary" className="bg-gray-500/10 text-gray-400">
                      {selectedProject.visibility}
                    </Badge>
                  </div>
                  <p className="text-gray-300 mb-4">{selectedProject.description || "Sem descrição disponível"}</p>

                  <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>Criado: {new Date(selectedProject.created_at).toLocaleDateString("pt-BR")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <RefreshCw className="w-4 h-4" />
                      <span>Atualizado: {new Date(selectedProject.updated_at).toLocaleDateString("pt-BR")}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm text-muted-foreground">{selectedProject.stargazers_count}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <GitFork className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-muted-foreground">{selectedProject.forks_count}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Folder className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-muted-foreground">
                        {formatFileSize(selectedProject.size * 1024)}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedProject.topics?.map((topic: string) => (
                      <Badge
                        key={topic}
                        variant="secondary"
                        className="bg-purple-500/10 text-purple-400 border-purple-500/20"
                      >
                        {topic}
                      </Badge>
                    ))}
                    {selectedProject.language && (
                      <Badge
                        variant="secondary"
                        className="flex items-center gap-2"
                        style={{
                          backgroundColor: `${getLanguageColor(selectedProject.language)}20`,
                          color: getLanguageColor(selectedProject.language),
                        }}
                      >
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: getLanguageColor(selectedProject.language) }}
                        />
                        {selectedProject.language}
                      </Badge>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <Button
                      asChild
                      className="bg-purple-500 hover:bg-purple-600 hover:shadow-lg hover:shadow-purple-500/25 hover:scale-105 transition-all duration-300"
                    >
                      <a href={selectedProject.html_url} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        Ver Repositório
                      </a>
                    </Button>
                    {previewUrl && (
                      <Button
                        variant="outline"
                        asChild
                        className="hover:bg-blue-500/10 hover:border-blue-500 hover:text-blue-500 hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105 transition-all duration-300 bg-transparent border-gray-700 text-gray-300"
                      >
                        <a href={previewUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Ver Demo
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Project Info */}
            <Card className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border border-gray-800">
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-100 pointer-events-none"
                style={{
                  background: `radial-gradient(200px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(147, 51, 234, 0.2), transparent 40%)`,
                }}
              />
              <CardContent className="p-6 relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <Folder className="w-6 h-6 text-blue-400" />
                  <h2 className="text-xl font-bold text-foreground">Informações do Projeto</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <Code className="w-4 h-4" />
                      Branch Principal
                    </h3>
                    <Badge variant="secondary" className="bg-green-500/10 text-green-400">
                      {selectedProject.default_branch}
                    </Badge>
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      Clone URL
                    </h3>
                    <div className="bg-gray-900 rounded-lg p-3 font-mono text-sm text-gray-300 break-all">
                      {selectedProject.clone_url}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Tamanho do Projeto:</h3>
                    <p className="text-gray-300">{formatFileSize(selectedProject.size * 1024)}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Última Atualização:</h3>
                    <p className="text-gray-300">{new Date(selectedProject.updated_at).toLocaleDateString("pt-BR")}</p>
                  </div>

                  {selectedProject.topics && selectedProject.topics.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Tags do Projeto:</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.topics.map((topic) => (
                          <Badge key={topic} variant="secondary" className="bg-blue-500/10 text-blue-400 text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Installation Instructions */}
          <Card className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border border-gray-800">
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-100 pointer-events-none"
              style={{
                background: `radial-gradient(200px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(147, 51, 234, 0.2), transparent 40%)`,
              }}
            />
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <Terminal className="w-6 h-6 text-green-400" />
                <h2 className="text-xl font-bold text-foreground">Como Baixar e Testar</h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Instruções de Instalação */}
                <div>
                  <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Play className="w-4 h-4 text-blue-400" />
                    Passo a Passo
                  </h3>
                  <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm space-y-1">
                    {installInstructions.map((line, index) => (
                      <div key={index} className={line.startsWith("#") ? "text-green-400" : "text-gray-300"}>
                        {line}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Requisitos e Informações */}
                <div>
                  <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-yellow-400" />
                    Requisitos
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-gray-900 rounded-lg p-4">
                      <h4 className="font-medium text-foreground mb-2">Tecnologia Principal:</h4>
                      <Badge
                        className="flex items-center gap-2 w-fit"
                        style={{
                          backgroundColor: `${getLanguageColor(selectedProject.language)}20`,
                          color: getLanguageColor(selectedProject.language),
                        }}
                      >
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: getLanguageColor(selectedProject.language) }}
                        />
                        {selectedProject.language || "Não especificado"}
                      </Badge>
                    </div>

                    <div className="bg-gray-900 rounded-lg p-4">
                      <h4 className="font-medium text-foreground mb-2">Pré-requisitos:</h4>
                      <ul className="text-gray-300 text-sm space-y-1">
                        {selectedProject.language === "JavaScript" && (
                          <>
                            <li>• Node.js (v16 ou superior)</li>
                            <li>• npm ou yarn</li>
                          </>
                        )}
                        {selectedProject.language === "TypeScript" && (
                          <>
                            <li>• Node.js (v16 ou superior)</li>
                            <li>• npm ou yarn</li>
                            <li>• TypeScript</li>
                          </>
                        )}
                        {selectedProject.language === "Python" && (
                          <>
                            <li>• Python 3.8+</li>
                            <li>• pip</li>
                            <li>• venv (recomendado)</li>
                          </>
                        )}
                        {selectedProject.language === "React" && (
                          <>
                            <li>• Node.js (v16 ou superior)</li>
                            <li>• npm ou yarn</li>
                            <li>• Navegador moderno</li>
                          </>
                        )}
                        {!["JavaScript", "TypeScript", "Python", "React"].includes(selectedProject.language) && (
                          <li>• Consulte o README.md do projeto</li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Botões de Ação */}
              <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-gray-700">
                <Button
                  asChild
                  className="bg-green-500 hover:bg-green-600 hover:shadow-lg hover:shadow-green-500/25 hover:scale-105 transition-all duration-300"
                >
                  <a
                    href={`${selectedProject.html_url}/archive/refs/heads/${selectedProject.default_branch}.zip`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Baixar ZIP
                  </a>
                </Button>
                <Button
                  variant="outline"
                  asChild
                  className="hover:bg-purple-500/10 hover:border-purple-500 hover:text-purple-500 hover:shadow-lg hover:shadow-purple-500/25 hover:scale-105 transition-all duration-300 bg-transparent border-gray-700 text-gray-300"
                >
                  <a href={selectedProject.html_url} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2" />
                    Ver no GitHub
                  </a>
                </Button>
                {previewUrl && (
                  <Button
                    variant="outline"
                    asChild
                    className="hover:bg-blue-500/10 hover:border-blue-500 hover:text-blue-500 hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105 transition-all duration-300 bg-transparent border-gray-700 text-gray-300"
                  >
                    <a href={previewUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Testar Online
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background relative overflow-hidden">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
            <p className="text-muted-foreground">Carregando repositórios do GitHub...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background relative overflow-hidden">
        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-foreground mb-2">Erro ao carregar projetos</h2>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button onClick={fetchGitHubProjects} className="bg-purple-500 hover:bg-purple-600 transition-colors">
              <RefreshCw className="w-4 h-4 mr-2" />
              Tentar novamente
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Meus Projetos</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Todos os meus repositórios do GitHub atualizados automaticamente. Total de {projects.length} projetos
            encontrados. Clique em qualquer projeto para ver detalhes, explorar arquivos e instruções de instalação.
          </p>
          <Button
            onClick={fetchGitHubProjects}
            variant="outline"
            className="mt-4 bg-transparent border-gray-700 text-gray-300 hover:bg-purple-500/10 hover:border-purple-500 hover:text-purple-400"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Atualizar Repositórios
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border border-gray-800 hover:border-purple-500/50 transition-all duration-300 cursor-pointer hover:scale-105"
              onClick={() => setSelectedProject(project)}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-100 pointer-events-none"
                style={{
                  background: `radial-gradient(200px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(147, 51, 234, 0.2), transparent 40%)`,
                }}
              />
              <CardContent className="p-0 relative z-10">
                <div className="aspect-video relative overflow-hidden bg-gray-900">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Github className="w-12 h-12 text-muted-foreground" />
                  </div>
                  {project.archived && (
                    <div className="absolute top-2 right-2">
                      <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-400 text-xs">
                        Arquivado
                      </Badge>
                    </div>
                  )}
                  <div className="absolute bottom-2 left-2">
                    <Badge variant="secondary" className="bg-purple-500/10 text-purple-400 text-xs">
                      <Eye className="w-3 h-3 mr-1" />
                      Explorar código
                    </Badge>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">{project.name}</h3>
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {project.description || "Sem descrição disponível"}
                  </p>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm text-muted-foreground">{project.stargazers_count}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <GitFork className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-muted-foreground">{project.forks_count}</span>
                    </div>
                    {project.language && (
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: getLanguageColor(project.language) }}
                        />
                        <span className="text-sm text-muted-foreground">{project.language}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      {new Date(project.updated_at).toLocaleDateString("pt-BR")}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-purple-400">
                      <Code className="w-3 h-3" />
                      Ver detalhes
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
