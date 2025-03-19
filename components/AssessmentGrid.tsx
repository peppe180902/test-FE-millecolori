"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { categories } from "../data/categories"
import type { AssessmentDate, AssessmentScore } from "../types/assessment"

interface AssessmentGridProps {
  scores: AssessmentScore[]
  dates: AssessmentDate[]
  onAddDate: (date: AssessmentDate) => void
}

export function AssessmentGrid({ scores, dates, onAddDate }: AssessmentGridProps) {
  const [selectedColor, setSelectedColor] = useState("#00ff00")

  const getSquareColor = (taskId: string, squareIndex: number) => {
    const taskScores = scores
      .filter((score) => score.taskId === taskId)
      .sort((a, b) => {
        const dateA = dates.find((d) => d.id === a.dateId)?.date || ""
        const dateB = dates.find((d) => d.id === b.dateId)?.date || ""
        return new Date(dateA).getTime() - new Date(dateB).getTime()
      })

    for (const score of taskScores) {
      if (squareIndex < score.score) {
        const date = dates.find((d) => d.id === score.dateId)
        return date?.color || "transparent"
      }
    }
    return "transparent"
  }

  const handleAddDate = () => {
    const newDate: AssessmentDate = {
      id: new Date().getTime().toString(),
      date: new Date().toISOString().split("T")[0],
      color: selectedColor,
    }
    onAddDate(newDate)
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow">
        <input
          type="color"
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
          className="w-12 h-12"
        />
        <Button onClick={handleAddDate}>Aggiungi Data Valutazione</Button>
      </div>

      <div className="flex gap-4 p-4 bg-white rounded-lg shadow">
        {dates.map((date) => (
          <div key={date.id} className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: date.color }} />
            <span>{date.date}</span>
          </div>
        ))}
      </div>

      <div className="grid gap-8">
        {categories.map((category) => (
          <div key={category.id} className="space-y-2">
            <h3 className="font-bold">{category.name}</h3>
            <div className="grid gap-1">
              {category.tasks.map((task) => (
                <div key={task.id} className="flex items-center gap-2">
                  <span className="w-12">{task.id}</span>
                  <div className="flex gap-1">
                    {Array.from({ length: task.criteria.length - 1 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-6 h-6 border border-gray-300"
                        style={{ backgroundColor: getSquareColor(task.id, i) }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

