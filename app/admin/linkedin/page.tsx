"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, Plus, ExternalLink } from "lucide-react"
import LinkedInSetupGuide from "@/components/linkedin-setup-guide"

interface LinkedInPost {
  id: string
  content: string
  date: string
  likes: number
  comments: number
  url: string
  type: "certificate" | "achievement" | "post"
  certificateUrl?: string
  title?: string
  institution?: string
}

export default function LinkedInAdminPage() {
  const [posts, setPosts] = useState<LinkedInPost[]>([])
  const [loading, setLoading] = useState(true)
  const [newPost, setNewPost] = useState<Partial<LinkedInPost>>({
    type: "post",
    date: new Date().toISOString(),
    likes: 0,
    comments: 0,
  })

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/linkedin/webhook")
      const data = await response.json()
      setPosts(data.posts || [])
    } catch (error) {
      console.error("Error fetching posts:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const addPost = async () => {
    if (!newPost.content || !newPost.url) return

    try {
      const response = await fetch("/api/linkedin/webhook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_WEBHOOK_SECRET || "seu_token_secreto_aqui"}`,
        },
        body: JSON.stringify({
          ...newPost,
          id: Date.now().toString(),
        }),
      })

      if (response.ok) {
        await fetchPosts()
        setNewPost({
          type: "post",
          date: new Date().toISOString(),
          likes: 0,
          comments: 0,
        })
      }
    } catch (error) {
      console.error("Error adding post:", error)
    }
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Gerenciar LinkedIn</h1>
          <p className="text-gray-400">Configure a integração e gerencie suas publicações</p>
        </div>

        {/* Setup Guide */}
        <div className="mb-8">
          <LinkedInSetupGuide />
        </div>

        {/* Add New Post */}
        <Card className="bg-black/50 border-gray-800 mb-8">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-white mb-4">Adicionar Post Manualmente</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Tipo</label>
                <select
                  value={newPost.type}
                  onChange={(e) => setNewPost({ ...newPost, type: e.target.value as any })}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white"
                >
                  <option value="post">Post</option>
                  <option value="certificate">Certificado</option>
                  <option value="achievement">Conquista</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">URL do LinkedIn</label>
                <Input
                  value={newPost.url || ""}
                  onChange={(e) => setNewPost({ ...newPost, url: e.target.value })}
                  placeholder="https://www.linkedin.com/posts/..."
                  className="bg-gray-900 border-gray-700 text-white"
                />
              </div>
            </div>

            {newPost.type === "certificate" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Título do Certificado</label>
                  <Input
                    value={newPost.title || ""}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                    placeholder="Nome do certificado"
                    className="bg-gray-900 border-gray-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">URL do Certificado</label>
                  <Input
                    value={newPost.certificateUrl || ""}
                    onChange={(e) => setNewPost({ ...newPost, certificateUrl: e.target.value })}
                    placeholder="https://certificado.com/..."
                    className="bg-gray-900 border-gray-700 text-white"
                  />
                </div>
              </div>
            )}

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">Conteúdo</label>
              <Textarea
                value={newPost.content || ""}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                placeholder="Texto da publicação..."
                rows={4}
                className="bg-gray-900 border-gray-700 text-white"
              />
            </div>

            <Button onClick={addPost} className="bg-purple-500 hover:bg-purple-600">
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Post
            </Button>
          </CardContent>
        </Card>

        {/* Posts List */}
        <Card className="bg-black/50 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Posts Salvos ({posts.length})</h3>
              <Button onClick={fetchPosts} variant="outline" className="bg-transparent border-gray-700 text-gray-300">
                <RefreshCw className="w-4 h-4 mr-2" />
                Atualizar
              </Button>
            </div>

            {loading ? (
              <div className="text-center py-8">
                <RefreshCw className="w-8 h-8 text-purple-400 mx-auto mb-2 animate-spin" />
                <p className="text-gray-400">Carregando posts...</p>
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-400">Nenhum post encontrado</p>
                <p className="text-sm text-gray-500 mt-2">Configure o webhook ou adicione posts manualmente</p>
              </div>
            ) : (
              <div className="space-y-4">
                {posts.map((post) => (
                  <div key={post.id} className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {post.title && <h4 className="font-semibold text-white">{post.title}</h4>}
                        <Badge
                          variant="secondary"
                          className={
                            post.type === "certificate"
                              ? "bg-yellow-500/10 text-yellow-400"
                              : post.type === "achievement"
                                ? "bg-purple-500/10 text-purple-400"
                                : "bg-blue-500/10 text-blue-400"
                          }
                        >
                          {post.type}
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(post.url, "_blank")}
                          className="text-gray-400 hover:text-blue-400"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <p className="text-gray-300 text-sm mb-3 line-clamp-3">{post.content}</p>

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{new Date(post.date).toLocaleDateString("pt-BR")}</span>
                      <div className="flex gap-4">
                        <span>👍 {post.likes}</span>
                        <span>💬 {post.comments}</span>
                      </div>
                    </div>

                    {post.certificateUrl && (
                      <div className="mt-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(post.certificateUrl, "_blank")}
                          className="bg-transparent border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10"
                        >
                          Ver Certificado
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
