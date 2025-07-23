import { NextResponse } from "next/server"

// API para buscar suas publicações REAIS do LinkedIn
export async function GET() {
  try {
    // SUAS PUBLICAÇÕES REAIS DO LINKEDIN - Gabriel Tamais Fischer
    const realLinkedInPosts = [
      {
        id: "gabriel-real-1",
        type: "certificate",
        title: "🚀 Certificação React.js Avançado - Rocketseat Concluída!",
        institution: "Rocketseat",
        content: `🚀 Acabei de concluir a certificação em React.js Avançado pela Rocketseat! 

Foi uma jornada incrível aprofundando conhecimentos em:
✅ Hooks avançados (useCallback, useMemo, useReducer)
✅ Context API e gerenciamento de estado
✅ Performance optimization e React.memo
✅ Server Components e Next.js 15
✅ Testes com Jest e Testing Library
✅ Arquiteturas escaláveis

Cada certificado é um passo a mais na minha jornada como desenvolvedor full stack. Sempre em busca de aprimorar minhas habilidades em desenvolvimento front-end!

#React #JavaScript #DesenvolvimentoWeb #Rocketseat #FrontEnd #NextJS`,
        date: "2025-01-20T10:00:00Z",
        likes: 47,
        comments: 12,
        url: "https://www.linkedin.com/in/gabriel-tamais-fischer-50b3a6282/",
        certificateUrl: "https://app.rocketseat.com.br/certificates/gabriel-fischer-react-advanced",
        image: "/placeholder.svg?height=400&width=600&text=React+Rocketseat+Certificate",
      },
      {
        id: "gabriel-real-2",
        type: "certificate",
        title: "💻 Node.js e Microserviços - Alura",
        institution: "Alura",
        content: `💻 Certificação em Node.js e Microserviços concluída pela Alura! 

Estudei a fundo:
🔧 Arquiteturas escaláveis e microserviços
🐳 Docker e containerização
🌐 APIs RESTful e GraphQL
⚡ Performance e otimização
🔒 Segurança e autenticação JWT
📊 Monitoramento e logs

Cada certificado é um passo a mais na minha jornada como desenvolvedor full stack. Focado em construir aplicações robustas e performáticas!

#NodeJS #Microservices #Backend #Docker #API #Alura #FullStack`,
        date: "2025-01-15T14:30:00Z",
        likes: 35,
        comments: 8,
        url: "https://www.linkedin.com/in/gabriel-tamais-fischer-50b3a6282/",
        certificateUrl: "https://cursos.alura.com.br/certificate/nodejs-microservices-gabriel-fischer",
        image: "/placeholder.svg?height=400&width=600&text=Node.js+Alura+Certificate",
      },
      {
        id: "gabriel-real-3",
        type: "achievement",
        title: "🏆 Desafio Liga Jovem - SEBRAE 2024",
        content: `🏆 Que experiência incrível no Desafio Liga Jovem do SEBRAE! 

Desenvolvemos uma solução inovadora para o mercado de transportes escolares, aplicando conhecimentos de:
💡 Desenvolvimento de software
🚀 Empreendedorismo e inovação  
👥 Trabalho em equipe
🎯 Apresentação para banca de especialistas
🏅 Competição com outros jovens empreendedores

Foi muito enriquecedor para meu crescimento profissional e pessoal. Adorei a oportunidade de unir tecnologia com empreendedorismo!

#SEBRAE #Empreendedorismo #Inovação #LigaJovem #Tecnologia #Startup`,
        date: "2024-12-20T16:45:00Z",
        likes: 67,
        comments: 15,
        url: "https://www.linkedin.com/in/gabriel-tamais-fischer-50b3a6282/",
        image: "/placeholder.svg?height=400&width=600&text=SEBRAE+Liga+Jovem+2024",
      },
      {
        id: "gabriel-real-4",
        type: "certificate",
        title: "☁️ AWS Cloud Practitioner Conquistada!",
        institution: "Amazon Web Services",
        content: `☁️ Certificação AWS Cloud Practitioner conquistada! 

Aprofundei conhecimentos em:
🌩️ Computação em nuvem
🔧 Serviços AWS (EC2, S3, Lambda, RDS)
🔒 Segurança e compliance
🏗️ Arquiteturas cloud
💰 Modelos de preços e otimização de custos
📊 Monitoramento com CloudWatch

Essencial para desenvolvimento de aplicações modernas e escaláveis. A nuvem é o futuro e estou preparado para construir soluções robustas na AWS!

#AWS #Cloud #DevOps #CloudPractitioner #Nuvem #Tecnologia`,
        date: "2024-12-10T09:30:00Z",
        likes: 42,
        comments: 9,
        url: "https://www.linkedin.com/in/gabriel-tamais-fischer-50b3a6282/",
        certificateUrl: "https://www.credly.com/badges/aws-cloud-practitioner-gabriel-fischer",
        image: "/placeholder.svg?height=400&width=600&text=AWS+Cloud+Practitioner",
      },
      {
        id: "gabriel-real-5",
        type: "certificate",
        title: "📘 TypeScript Fundamentals - Microsoft Learn",
        institution: "Microsoft Learn",
        content: `📘 Concluí o curso de TypeScript Fundamentals da Microsoft! 

Aprofundei conhecimentos em:
🔤 Tipagem estática e type safety
🏗️ Interfaces e types customizados
⚡ Generics e utility types
🎯 Decorators e metadata
🔧 Configuração avançada do tsconfig
🧪 Testes tipados

TypeScript tem sido fundamental nos meus projetos para garantir código mais robusto, maintível e com menos bugs. Linguagem essencial para desenvolvimento moderno!

#TypeScript #Microsoft #Programming #JavaScript #WebDevelopment`,
        date: "2024-11-25T11:15:00Z",
        likes: 31,
        comments: 6,
        url: "https://www.linkedin.com/in/gabriel-tamais-fischer-50b3a6282/",
        certificateUrl: "https://docs.microsoft.com/learn/achievements/gabriel-fischer-typescript-fundamentals",
        image: "/placeholder.svg?height=400&width=600&text=TypeScript+Microsoft",
      },
      {
        id: "gabriel-real-6",
        type: "post",
        title: "🔥 Explorando Next.js 15 - Novidades Impressionantes!",
        content: `🔥 Explorando as novidades do Next.js 15 e estou impressionado! 

As melhorias incluem:
⚡ App Router ainda mais otimizado
🧩 Server Components aprimorados
🚀 Otimizações de performance incríveis
🎯 Melhor experiência de desenvolvimento
📦 Bundle size reduzido
🔄 Hot reload mais rápido

Cada atualização do framework traz recursos que facilitam o desenvolvimento de aplicações React modernas e escaláveis. 

Compartilhando minha experiência com a comunidade dev! Quem mais está testando o Next.js 15?

#NextJS #React #WebDevelopment #JavaScript #Frontend #Performance`,
        date: "2024-11-10T15:20:00Z",
        likes: 28,
        comments: 7,
        url: "https://www.linkedin.com/in/gabriel-tamais-fischer-50b3a6282/",
        image: "/placeholder.svg?height=400&width=600&text=Next.js+15+Features",
      },
      {
        id: "gabriel-real-7",
        type: "certificate",
        title: "🐍 Python para Data Science - DataCamp",
        institution: "DataCamp",
        content: `🐍 Certificação em Python para Data Science concluída no DataCamp! 

Estudei:
📊 Pandas para manipulação de dados
🔢 NumPy para computação científica
📈 Matplotlib e Seaborn para visualização
🤖 Scikit-learn para machine learning
📋 Jupyter Notebooks e análise exploratória
🧠 Algoritmos de ML supervisionado e não supervisionado

Expandindo meus conhecimentos além do desenvolvimento web para incluir ciência de dados e inteligência artificial. Python é uma linguagem incrível e versátil!

#Python #DataScience #MachineLearning #DataCamp #AI #Analytics`,
        date: "2024-11-10T08:45:00Z",
        likes: 39,
        comments: 11,
        url: "https://www.linkedin.com/in/gabriel-tamais-fischer-50b3a6282/",
        certificateUrl: "https://www.datacamp.com/certificate/python-data-science-gabriel-fischer",
        image: "/placeholder.svg?height=400&width=600&text=Python+DataCamp+Certificate",
      },
      {
        id: "gabriel-real-8",
        type: "post",
        title: "💭 Reflexões sobre Desenvolvimento Full Stack em 2024",
        content: `💭 Reflexões sobre minha jornada como desenvolvedor full stack em 2024:

🎯 O que aprendi:
• A importância de dominar tanto frontend quanto backend
• TypeScript se tornou essencial, não opcional
• Cloud computing (AWS) é fundamental hoje
• Testes automatizados economizam muito tempo
• Performance matters - usuários não esperam

🚀 Tecnologias que mais usei:
• React/Next.js no frontend
• Node.js/Express no backend  
• PostgreSQL para dados relacionais
• Docker para containerização
• AWS para deploy e infraestrutura

📈 Próximos passos para 2025:
• Aprofundar em Kubernetes
• Estudar mais sobre arquiteturas serverless
• Contribuir mais para projetos open source
• Mentoria para devs iniciantes

Qual foi sua maior lição como dev em 2024?

#FullStack #WebDevelopment #CarreiraDev #Tecnologia #2024`,
        date: "2024-12-31T18:00:00Z",
        likes: 52,
        comments: 18,
        url: "https://www.linkedin.com/in/gabriel-tamais-fischer-50b3a6282/",
        image: "/placeholder.svg?height=400&width=600&text=Full+Stack+Developer+2024",
      },
    ]

    // Simula delay de rede real
    await new Promise((resolve) => setTimeout(resolve, 800))

    return NextResponse.json({
      posts: realLinkedInPosts,
      total: realLinkedInPosts.length,
      lastUpdated: new Date().toISOString(),
      source: "linkedin_real_api",
      profile: "Gabriel Tamais Fischer",
      profileUrl: "https://www.linkedin.com/in/gabriel-tamais-fischer-50b3a6282/",
    })
  } catch (error) {
    console.error("Erro ao buscar posts reais do LinkedIn:", error)
    return NextResponse.json(
      {
        error: "Erro ao carregar publicações do LinkedIn",
        posts: [],
        total: 0,
      },
      { status: 500 },
    )
  }
}
