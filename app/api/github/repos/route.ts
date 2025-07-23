import { NextResponse } from "next/server"

export async function GET() {
  try {
    const response = await fetch("https://api.github.com/users/MZMozart/repos?sort=updated&per_page=100", {
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "Portfolio-App",
      },
      next: { revalidate: 300 }, // Cache por 5 minutos
    })

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`)
    }

    const repos = await response.json()

    // Filtra apenas repositórios próprios (não forks) e adiciona informações extras
    const filteredRepos = repos
      .filter((repo: any) => !repo.fork)
      .map((repo: any) => ({
        id: repo.id,
        name: repo.name,
        description: repo.description,
        html_url: repo.html_url,
        homepage: repo.homepage,
        language: repo.language,
        languages_url: repo.languages_url,
        stargazers_count: repo.stargazers_count,
        forks_count: repo.forks_count,
        created_at: repo.created_at,
        updated_at: repo.updated_at,
        topics: repo.topics || [],
        clone_url: repo.clone_url,
        size: repo.size,
        default_branch: repo.default_branch,
        visibility: repo.visibility,
        archived: repo.archived,
      }))

    return NextResponse.json({ repos: filteredRepos })
  } catch (error) {
    console.error("Error fetching GitHub repos:", error)
    return NextResponse.json({ error: "Failed to fetch repositories" }, { status: 500 })
  }
}
