import { type NextRequest, NextResponse } from "next/server"
import { writeFile, readFile, mkdir } from "fs/promises"
import { existsSync } from "fs"
import path from "path"

// Webhook para receber dados do Zapier quando você postar no LinkedIn
export async function POST(request: NextRequest) {
  try {
    console.log("📨 Webhook do LinkedIn recebido")

    const data = await request.json()
    console.log("📦 Dados recebidos:", data)

    // Validação básica de segurança
    const authHeader = request.headers.get("authorization")
    const expectedToken = process.env.WEBHOOK_SECRET_TOKEN || "linkedin_webhook_2025"

    if (authHeader !== `Bearer ${expectedToken}`) {
      console.log("❌ Token inválido:", authHeader)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Estrutura do post do LinkedIn
    const linkedinPost = {
      id: data.id || `post_${Date.now()}`,
      content: data.text || data.content || data.message || "",
      date: data.date || data.created_at || new Date().toISOString(),
      likes: Number.parseInt(data.likes) || 0,
      comments: Number.parseInt(data.comments) || 0,
      url: data.url || data.postUrl || data.link || "",
      type: data.type || "post",
      certificateUrl: data.certificateUrl || data.certificate_url || null,
      title: data.title || null,
      institution: data.institution || null,
      image: data.image || data.imageUrl || null,
      author: "Gabriel Tamais Fischer",
      platform: "linkedin",
    }

    console.log("✅ Post processado:", linkedinPost)

    // Salva no arquivo JSON
    const dataDir = path.join(process.cwd(), "data")
    const dataPath = path.join(dataDir, "linkedin-posts.json")

    try {
      // Cria o diretório se não existir
      if (!existsSync(dataDir)) {
        await mkdir(dataDir, { recursive: true })
        console.log("📁 Diretório data/ criado")
      }

      // Lê posts existentes
      let existingPosts = []
      if (existsSync(dataPath)) {
        try {
          const fileContent = await readFile(dataPath, "utf8")
          existingPosts = JSON.parse(fileContent)
          console.log(`📚 ${existingPosts.length} posts existentes carregados`)
        } catch (parseError) {
          console.log("⚠️ Erro ao ler posts existentes, criando novo arquivo")
          existingPosts = []
        }
      }

      // Verifica se o post já existe (evita duplicatas)
      const existingPost = existingPosts.find((p) => p.url === linkedinPost.url || p.id === linkedinPost.id)
      if (existingPost) {
        console.log("⚠️ Post já existe, atualizando...")
        const index = existingPosts.findIndex((p) => p.id === existingPost.id)
        existingPosts[index] = { ...existingPost, ...linkedinPost }
      } else {
        // Adiciona o novo post no início
        existingPosts.unshift(linkedinPost)
        console.log("✅ Novo post adicionado")
      }

      // Mantém apenas os últimos 100 posts
      existingPosts = existingPosts.slice(0, 100)

      // Salva de volta
      await writeFile(dataPath, JSON.stringify(existingPosts, null, 2))
      console.log(`💾 ${existingPosts.length} posts salvos`)

      return NextResponse.json({
        success: true,
        message: "Post do LinkedIn salvo com sucesso",
        post: linkedinPost,
        total: existingPosts.length,
      })
    } catch (fileError) {
      console.error("❌ Erro ao salvar post:", fileError)
      return NextResponse.json({ error: "Erro ao salvar post" }, { status: 500 })
    }
  } catch (error) {
    console.error("❌ Erro no webhook do LinkedIn:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

// Endpoint para ler os posts salvos
export async function GET() {
  try {
    console.log("📖 Lendo posts do LinkedIn...")

    const dataPath = path.join(process.cwd(), "data", "linkedin-posts.json")

    if (!existsSync(dataPath)) {
      console.log("📄 Arquivo de posts não existe, retornando vazio")
      return NextResponse.json({
        posts: [],
        total: 0,
        lastUpdated: new Date().toISOString(),
        source: "empty",
      })
    }

    try {
      const fileContent = await readFile(dataPath, "utf8")
      const posts = JSON.parse(fileContent)

      console.log(`✅ ${posts.length} posts carregados`)

      return NextResponse.json({
        posts,
        total: posts.length,
        lastUpdated: new Date().toISOString(),
        source: "file",
      })
    } catch (parseError) {
      console.error("❌ Erro ao parsear posts:", parseError)
      return NextResponse.json({
        posts: [],
        total: 0,
        lastUpdated: new Date().toISOString(),
        source: "error",
        error: "Erro ao ler arquivo",
      })
    }
  } catch (error) {
    console.error("❌ Erro ao ler posts do LinkedIn:", error)
    return NextResponse.json({ error: "Erro ao carregar posts" }, { status: 500 })
  }
}
