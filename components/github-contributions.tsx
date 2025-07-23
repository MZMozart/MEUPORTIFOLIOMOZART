"use client"

import { useEffect, useState } from "react"

interface ContributionDay {
  date: string
  count: number
  level: number
}

export default function GitHubContributions() {
  const [contributions, setContributions] = useState<ContributionDay[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        // For real implementation, you would use GitHub GraphQL API
        // For now, we'll generate realistic contribution data
        const generateRealisticContributions = () => {
          const data: ContributionDay[] = []
          const today = new Date()
          const oneYearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate())

          for (let d = new Date(oneYearAgo); d <= today; d.setDate(d.getDate() + 1)) {
            const dayOfWeek = d.getDay()
            const isWeekend = dayOfWeek === 0 || dayOfWeek === 6

            // More realistic contribution patterns
            let count = 0
            const random = Math.random()

            if (!isWeekend) {
              if (random < 0.7) count = Math.floor(Math.random() * 8) + 1
              else if (random < 0.9) count = Math.floor(Math.random() * 15) + 8
              else count = Math.floor(Math.random() * 25) + 15
            } else {
              if (random < 0.4) count = Math.floor(Math.random() * 3)
              else if (random < 0.7) count = Math.floor(Math.random() * 8) + 1
            }

            const level = count === 0 ? 0 : count < 3 ? 1 : count < 7 ? 2 : count < 12 ? 3 : 4

            data.push({
              date: d.toISOString().split("T")[0],
              count,
              level,
            })
          }

          return data
        }

        const data = generateRealisticContributions()
        setContributions(data)
      } catch (error) {
        console.error("Error fetching contributions:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchContributions()
  }, [])

  if (loading) {
    return (
      <div className="w-full overflow-x-auto">
        <div className="grid grid-cols-53 gap-1 min-w-[636px]">
          {Array.from({ length: 371 }, (_, i) => (
            <div key={i} className="w-3 h-3 bg-gray-200 dark:bg-gray-700 rounded-sm animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  const getColorClass = (level: number) => {
    const colors = [
      "bg-gray-200 dark:bg-gray-800", // 0 contributions
      "bg-green-200 dark:bg-green-900", // 1-2 contributions
      "bg-green-300 dark:bg-green-700", // 3-6 contributions
      "bg-green-400 dark:bg-green-500", // 7-11 contributions
      "bg-green-500 dark:bg-green-400", // 12+ contributions
    ]
    return colors[level] || colors[0]
  }

  // Group contributions by weeks
  const weeks: ContributionDay[][] = []
  let currentWeek: ContributionDay[] = []

  contributions.forEach((day, index) => {
    const date = new Date(day.date)
    const dayOfWeek = date.getDay()

    if (dayOfWeek === 0 && currentWeek.length > 0) {
      weeks.push(currentWeek)
      currentWeek = []
    }

    currentWeek.push(day)

    if (index === contributions.length - 1) {
      weeks.push(currentWeek)
    }
  })

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex gap-1 min-w-[636px]">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-1">
            {Array.from({ length: 7 }, (_, dayIndex) => {
              const day = week.find((d) => new Date(d.date).getDay() === dayIndex)
              return (
                <div
                  key={dayIndex}
                  className={`w-3 h-3 rounded-sm transition-all duration-200 hover:scale-110 ${
                    day ? getColorClass(day.level) : "bg-gray-100 dark:bg-gray-800"
                  }`}
                  title={day ? `${day.count} contributions on ${day.date}` : "No contributions"}
                />
              )
            })}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
        <span>Menos</span>
        <div className="flex gap-1">
          {[0, 1, 2, 3, 4].map((level) => (
            <div key={level} className={`w-3 h-3 rounded-sm ${getColorClass(level)}`} />
          ))}
        </div>
        <span>Mais</span>
      </div>
    </div>
  )
}
