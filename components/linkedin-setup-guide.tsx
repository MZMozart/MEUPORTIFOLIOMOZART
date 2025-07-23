"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Zap, ExternalLink, Copy, CheckCircle, Webhook, Settings, Code, Play } from "lucide-react"

export default function LinkedInSetupGuide() {
  const [copiedUrl, setCopiedUrl] = useState(false)
  const [copiedToken, setCopiedToken] = useState(false)
  const [copiedPayload, setCopiedPayload] = useState(false)

  const siteUrl = typeof window !== "undefined" ? window.location.origin : "https://seu-site.vercel.app"
  const webhookUrl = `${siteUrl}/api/linkedin/webhook`
  const secretToken = process.env.NEXT_PUBLIC_WEBHOOK_SECRET || "linkedin_webhook_2025"

  const zapierPayload = {
    text: "{{text}}",
    url: "{{url}}",
    date: "{{created_time}}",
    likes: "{{num_likes}}",
    comments: "{{num_comments}}",
    type: "post",
    title: "{{title}}",
    image: "{{image_url}}",
  }

  const copyToClipboard = (text: string, type: "url" | "token" | "payload") => {
    navigator.clipboard.writeText(text)
    if (type === "url") {
      setCopiedUrl(true)
      setTimeout(() => setCopiedUrl(false), 2000)
    } else if (type === "token") {
      setCopiedToken(true)
      setTimeout(() => setCopiedToken(false), 2000)
    } else {
      setCopiedPayload(true)
      setTimeout(() => setCopiedPayload(false), 2000)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-blue-500/20">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="w-8 h-8 text-blue-400" />
            <div>
              <h2 className="text-2xl font-bold text-white">LinkedIn → Portfólio Automático</h2>
              <p className="text-blue-300">Configure uma vez, funciona para sempre! 🚀</p>
            </div>
            <Badge className="bg-green-500/10 text-green-400 border-green-500/20 ml-auto">100% Automático</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="bg-black/30 rounded-lg p-4">
              <div className="text-2xl mb-2">📱</div>
              <p className="text-white font-semibold">Você posta no LinkedIn</p>
            </div>
            <div className="bg-black/30 rounded-lg p-4">
              <div className="text-2xl mb-2">⚡</div>
              <p className="text-white font-semibold">Zapier detecta automaticamente</p>
            </div>
            <div className="bg-black/30 rounded-lg p-4">
              <div className="text-2xl mb-2">🎯</div>
              <p className="text-white font-semibold">Seu site atualiza sozinho</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Passo 1: Zapier */}
      <Card className="bg-black/50 border-orange-500/20">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
              1
            </div>
            <h3 className="text-xl font-bold text-white">Configure o Zapier</h3>
            <Badge className="bg-orange-500/10 text-orange-400 border-orange-500/20">5 minutos</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-gray-900 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-3">Configuração do Zap:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Trigger:</span>
                    <Badge variant="secondary" className="bg-blue-500/10 text-blue-400">
                      LinkedIn
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Event:</span>
                    <Badge variant="secondary" className="bg-blue-500/10 text-blue-400">
                      New Post
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Action:</span>
                    <Badge variant="secondary" className="bg-purple-500/10 text-purple-400">
                      Webhook
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Method:</span>
                    <Badge variant="secondary" className="bg-green-500/10 text-green-400">
                      POST
                    </Badge>
                  </div>
                </div>
              </div>

              <Button
                className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                onClick={() => window.open("https://zapier.com/apps/linkedin/integrations/webhook", "_blank")}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Abrir Zapier (Grátis)
              </Button>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-900 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-3">Passos no Zapier:</h4>
                <ol className="text-sm text-gray-300 space-y-1 list-decimal list-inside">
                  <li>Crie uma conta no Zapier</li>
                  <li>Clique em "Create Zap"</li>
                  <li>Escolha LinkedIn como Trigger</li>
                  <li>Selecione "New Post"</li>
                  <li>Conecte sua conta do LinkedIn</li>
                  <li>Escolha Webhook como Action</li>
                  <li>Configure com os dados abaixo ⬇️</li>
                </ol>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Passo 2: Webhook Config */}
      <Card className="bg-black/50 border-purple-500/20">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
              2
            </div>
            <h3 className="text-xl font-bold text-white">Configuração do Webhook</h3>
            <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20">Cole no Zapier</Badge>
          </div>

          <div className="space-y-4">
            {/* URL */}
            <div className="bg-gray-900 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-white">URL do Webhook:</label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(webhookUrl, "url")}
                  className="h-8 px-3"
                >
                  {copiedUrl ? <CheckCircle className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
              <code className="text-sm text-green-400 break-all bg-black/50 p-2 rounded block">{webhookUrl}</code>
            </div>

            {/* Headers */}
            <div className="bg-gray-900 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-white">Authorization Header:</label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(`Bearer ${secretToken}`, "token")}
                  className="h-8 px-3"
                >
                  {copiedToken ? <CheckCircle className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
              <code className="text-sm text-yellow-400 bg-black/50 p-2 rounded block">Bearer {secretToken}</code>
            </div>

            {/* Payload */}
            <div className="bg-gray-900 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-white">Payload (JSON):</label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(JSON.stringify(zapierPayload, null, 2), "payload")}
                  className="h-8 px-3"
                >
                  {copiedPayload ? <CheckCircle className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
              <pre className="text-xs text-blue-300 bg-black/50 p-3 rounded overflow-x-auto">
                {JSON.stringify(zapierPayload, null, 2)}
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Passo 3: Teste */}
      <Card className="bg-black/50 border-green-500/20">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
              3
            </div>
            <h3 className="text-xl font-bold text-white">Teste e Ative</h3>
            <Badge className="bg-green-500/10 text-green-400 border-green-500/20">Quase lá!</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-gray-900 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <Play className="w-4 h-4" />
                  Como testar:
                </h4>
                <ol className="text-sm text-gray-300 space-y-1 list-decimal list-inside">
                  <li>No Zapier, clique em "Test & Continue"</li>
                  <li>Faça um post no seu LinkedIn</li>
                  <li>Volte aqui e atualize a página</li>
                  <li>Seu post deve aparecer automaticamente!</li>
                </ol>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-green-900/20 border border-green-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-green-400 mb-2">✅ Funcionando?</h4>
                <p className="text-sm text-green-300">
                  Seus posts do LinkedIn aparecerão automaticamente na página inicial e na seção "Sobre".
                </p>
              </div>

              <div className="bg-yellow-900/20 border border-yellow-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-400 mb-2">⚠️ Não funcionou?</h4>
                <p className="text-sm text-yellow-300">
                  Verifique se a URL e o token estão corretos no Zapier. Pode levar alguns minutos para sincronizar.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Status */}
      <Card className="bg-black/50 border-gray-700">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Settings className="w-6 h-6 text-gray-400" />
            <h3 className="text-xl font-bold text-white">Status da Integração</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-900 rounded-lg p-4 text-center">
              <Webhook className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <p className="text-white font-semibold">Webhook</p>
              <p className="text-green-400 text-sm">✅ Ativo</p>
            </div>

            <div className="bg-gray-900 rounded-lg p-4 text-center">
              <Code className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <p className="text-white font-semibold">API</p>
              <p className="text-green-400 text-sm">✅ Funcionando</p>
            </div>

            <div className="bg-gray-900 rounded-lg p-4 text-center">
              <Zap className="w-8 h-8 text-orange-400 mx-auto mb-2" />
              <p className="text-white font-semibold">Zapier</p>
              <p className="text-yellow-400 text-sm">⚠️ Configure</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
