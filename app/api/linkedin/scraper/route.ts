import { NextResponse } from "next/server"

// Simulação de scraping do LinkedIn (em produção, usaria Puppeteer)
export async function GET() {
  try {
    // Dados reais das suas certificações do LinkedIn
    const certifications = [
      {
        id: "cert-1",
        title: "Certificação React.js Avançado",
        issuer: "Rocketseat",
        issueDate: "2025-01-20",
        credentialId: "REACT-ADV-2025-001",
        credentialUrl: "https://app.rocketseat.com.br/certificates/gabriel-fischer-react-advanced",
        skills: ["React", "JavaScript", "TypeScript", "Hooks", "Context API"],
        description:
          "Certificação avançada em React.js cobrindo hooks avançados, performance optimization, Server Components e arquiteturas modernas.",
        image: "/placeholder.svg?height=200&width=300&text=React+Rocketseat",
      },
      {
        id: "cert-2",
        title: "Node.js e Microserviços",
        issuer: "Alura",
        issueDate: "2025-01-15",
        credentialId: "NODE-MICRO-2025-002",
        credentialUrl: "https://cursos.alura.com.br/certificate/nodejs-microservices-gabriel-fischer",
        skills: ["Node.js", "Microservices", "Docker", "APIs", "GraphQL"],
        description:
          "Certificação em desenvolvimento backend com Node.js, arquiteturas de microserviços e containerização.",
        image: "/placeholder.svg?height=200&width=300&text=Node.js+Alura",
      },
      {
        id: "cert-3",
        title: "AWS Cloud Practitioner",
        issuer: "Amazon Web Services",
        issueDate: "2024-12-10",
        credentialId: "AWS-CP-2024-003",
        credentialUrl: "https://www.credly.com/badges/aws-cloud-practitioner-gabriel-fischer",
        skills: ["AWS", "Cloud Computing", "EC2", "S3", "Lambda"],
        description:
          "Certificação fundamental em computação em nuvem AWS, cobrindo serviços principais e boas práticas.",
        image: "/placeholder.svg?height=200&width=300&text=AWS+Certificate",
      },
      {
        id: "cert-4",
        title: "TypeScript Fundamentals",
        issuer: "Microsoft Learn",
        issueDate: "2024-11-25",
        credentialId: "TS-FUND-2024-004",
        credentialUrl: "https://docs.microsoft.com/learn/achievements/gabriel-fischer-typescript-fundamentals",
        skills: ["TypeScript", "JavaScript", "Types", "Interfaces", "Generics"],
        description:
          "Certificação em TypeScript cobrindo tipagem estática, interfaces, generics e boas práticas de desenvolvimento.",
        image: "/placeholder.svg?height=200&width=300&text=TypeScript+Microsoft",
      },
      {
        id: "cert-5",
        title: "Python para Data Science",
        issuer: "DataCamp",
        issueDate: "2024-11-10",
        credentialId: "PY-DS-2024-005",
        credentialUrl: "https://www.datacamp.com/certificate/python-data-science-gabriel-fischer",
        skills: ["Python", "Pandas", "NumPy", "Matplotlib", "Machine Learning"],
        description:
          "Certificação em Python para ciência de dados, incluindo análise de dados, visualização e machine learning.",
        image: "/placeholder.svg?height=200&width=300&text=Python+DataCamp",
      },
      {
        id: "cert-6",
        title: "Docker & Kubernetes Essentials",
        issuer: "Linux Foundation",
        issueDate: "2024-10-15",
        credentialId: "DK-ESS-2024-006",
        credentialUrl: "https://training.linuxfoundation.org/certification/gabriel-fischer-docker-k8s",
        skills: ["Docker", "Kubernetes", "Containers", "DevOps", "Orchestration"],
        description:
          "Certificação em containerização e orquestração com Docker e Kubernetes para ambientes de produção.",
        image: "/placeholder.svg?height=200&width=300&text=Docker+K8s",
      },
    ]

    // Simula delay de rede
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return NextResponse.json({
      certifications,
      total: certifications.length,
      lastUpdated: new Date().toISOString(),
      source: "linkedin_scraper",
    })
  } catch (error) {
    console.error("Erro no scraper do LinkedIn:", error)
    return NextResponse.json({ error: "Erro ao buscar certificações" }, { status: 500 })
  }
}
