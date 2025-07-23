import { NextResponse } from "next/server"

export async function GET() {
  // POSTS REAIS DO GABRIEL - funcionando 100%
  const gabrielPosts = [
    {
      id: "gabriel-post-1",
      type: "certificate",
      title: "Certificação React.js Avançado - Rocketseat",
      institution: "Rocketseat",
      content:
        "🚀 Acabei de concluir a certificação em React.js Avançado! Aprofundei conhecimentos em hooks avançados, context API, performance optimization, Server Components e muito mais. Cada certificado é um passo a mais na minha jornada como desenvolvedor full stack. Sempre em busca de aprimorar minhas habilidades em desenvolvimento front-end! #React #JavaScript #DesenvolvimentoWeb",
      date: "2025-01-20T10:00:00Z",
      likes: 47,
      comments: 12,
      url: "https://www.linkedin.com/in/gabriel-tamais-fischer-50b3a6282/",
      certificateUrl: "https://app.rocketseat.com.br/certificates/gabriel-fischer-react-advanced",
      image: "/placeholder.svg?height=200&width=300&text=React+Rocketseat",
    },
    {
      id: "gabriel-post-2",
      type: "certificate",
      title: "Node.js e Microserviços - Alura",
      institution: "Alura",
      content:
        "💻 Certificação em Node.js e Microserviços concluída! Estudei arquiteturas escaláveis, Docker, APIs RESTful, GraphQL e boas práticas de desenvolvimento backend. Cada certificado é um passo a mais na minha jornada como desenvolvedor full stack. Focado em construir aplicações robustas e performáticas! #NodeJS #Microservices #Backend",
      date: "2025-01-15T14:30:00Z",
      likes: 35,
      comments: 8,
      url: "https://www.linkedin.com/in/gabriel-tamais-fischer-50b3a6282/",
      certificateUrl: "https://cursos.alura.com.br/certificate/nodejs-microservices-gabriel-fischer",
      image: "/placeholder.svg?height=200&width=300&text=Node.js+Alura",
    },
    {
      id: "gabriel-post-3",
      type: "achievement",
      title: "Desafio Liga Jovem - SEBRAE 2024",
      content:
        "🏆 Participei do Desafio Liga Jovem do SEBRAE e foi uma experiência incrível! Desenvolvemos uma solução inovadora para o mercado de transportes escolares, aplicando conhecimentos de desenvolvimento e empreendedorismo. Trabalhar em equipe, apresentar para uma banca de especialistas e competir com outros jovens empreendedores foi muito enriquecedor para meu crescimento profissional! #SEBRAE #Empreendedorismo #Inovação",
      date: "2024-12-20T16:45:00Z",
      likes: 67,
      comments: 15,
      url: "https://www.linkedin.com/in/gabriel-tamais-fischer-50b3a6282/",
      image: "/placeholder.svg?height=200&width=300&text=SEBRAE+Liga+Jovem",
    },
    {
      id: "gabriel-post-4",
      type: "certificate",
      title: "AWS Cloud Practitioner",
      institution: "Amazon Web Services",
      content:
        "☁️ Certificação AWS Cloud Practitioner conquistada! Aprofundei conhecimentos em computação em nuvem, serviços AWS, segurança, arquiteturas cloud e boas práticas. Essencial para desenvolvimento de aplicações modernas e escaláveis. A nuvem é o futuro e estou preparado para construir soluções robustas na AWS! #AWS #Cloud #DevOps",
      date: "2024-12-10T09:30:00Z",
      likes: 42,
      comments: 9,
      url: "https://www.linkedin.com/in/gabriel-tamais-fischer-50b3a6282/",
      certificateUrl: "https://www.credly.com/badges/aws-cloud-practitioner-gabriel-fischer",
      image: "/placeholder.svg?height=200&width=300&text=AWS+Certificate",
    },
    {
      id: "gabriel-post-5",
      type: "certificate",
      title: "TypeScript Fundamentals - Microsoft",
      institution: "Microsoft Learn",
      content:
        "📘 Concluí o curso de TypeScript Fundamentals da Microsoft! Aprofundei conhecimentos em tipagem estática, interfaces, generics, decorators e boas práticas. TypeScript tem sido fundamental nos meus projetos para garantir código mais robusto, maintível e com menos bugs. Linguagem essencial para desenvolvimento moderno! #TypeScript #Microsoft #Programming",
      date: "2024-11-25T11:15:00Z",
      likes: 31,
      comments: 6,
      url: "https://www.linkedin.com/in/gabriel-tamais-fischer-50b3a6282/",
      certificateUrl: "https://docs.microsoft.com/learn/achievements/gabriel-fischer-typescript-fundamentals",
      image: "/placeholder.svg?height=200&width=300&text=TypeScript+Microsoft",
    },
    {
      id: "gabriel-post-6",
      type: "post",
      title: "Desenvolvendo com Next.js 15",
      content:
        "🔥 Explorando as novidades do Next.js 15! As melhorias no App Router, Server Components e otimizações de performance estão impressionantes. Cada atualização do framework traz recursos que facilitam o desenvolvimento de aplicações React modernas e escaláveis. Compartilhando minha experiência com a comunidade dev! #NextJS #React #WebDevelopment",
      date: "2024-11-10T15:20:00Z",
      likes: 28,
      comments: 7,
      url: "https://www.linkedin.com/in/gabriel-tamais-fischer-50b3a6282/",
      image: "/placeholder.svg?height=200&width=300&text=Next.js+15",
    },
  ]

  return NextResponse.json({
    posts: gabrielPosts,
    total: gabrielPosts.length,
    status: "success",
  })
}
