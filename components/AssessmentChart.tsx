"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { categories } from "@/data/categories"
import { useAssessment } from "../contexts/AssessmentContext"

interface GridSection {
  title: string
  items: string[]
  maxSquares: number
}

const gridSections: GridSection[] = [
  {
    title: "Sintassi e\nGrammatica",
    items: Array.from({ length: 20 }, (_, i) => `J${20 - i}`),
    maxSquares: 4,
  },
  {
    title: "Abilità di\nGioco / Svago",
    items: Array.from({ length: 15 }, (_, i) => `K${15 - i}`),
    maxSquares: 4,
  },
  {
    title: "Abilità di\nInterazione\nSociale",
    items: Array.from({ length: 34 }, (_, i) => `L${34 - i}`),
    maxSquares: 4,
  },
  {
    title: "Istruzione di\nGruppo",
    items: Array.from({ length: 12 }, (_, i) => `M${12 - i}`),
    maxSquares: 4,
  },
  {
    title: "Routine\ndi Classe",
    items: Array.from({ length: 10 }, (_, i) => `N${10 - i}`),
    maxSquares: 4,
  },
  {
    title: "Risposte\nGeneralizzate",
    items: Array.from({ length: 6 }, (_, i) => `P${6 - i}`),
    maxSquares: 4,
  },
  {
    title: "Lettura",
    items: Array.from({ length: 17 }, (_, i) => `Q${17 - i}`),
    maxSquares: 4,
  },
  {
    title: "Matematica",
    items: Array.from({ length: 29 }, (_, i) => `R${29 - i}`),
    maxSquares: 4,
  },
]

export function AssessmentChart() {
  const [selectedColor, setSelectedColor] = useState("#00FF00")
  const { assessments, addAssessment, scores } = useAssessment()

  const getTaskMaxScore = (taskId: string) => {
    for (const category of categories) {
      const task = category.tasks.find((t) => t.id === taskId)
      if (task) {
        return task.criteria.length - 1
      }
    }
    return 4
  }

  const isImplementedTask = (taskId: string) => {
    const implementedTasks = ["J1", "J2", "J3", "J4", "J5", "J6", "J7", "K1", "K2", "K3", "K4", "K5", "K6", "K7"]
    return implementedTasks.includes(taskId)
  }

  const renderSection = (section: GridSection) => {
    const maxHeight = Math.max(...gridSections.map((s) => s.items.length))
    const emptySpacers = maxHeight - section.items.length

    return (
      <div key={section.title} className="flex flex-col items-center min-w-[100px] relative">
        {/* Empty spacers for alignment */}
        {Array.from({ length: emptySpacers }).map((_, idx) => (
          <div key={`spacer-${idx}`} className="h-[18px]" />
        ))}

        {/* Items */}
        {section.items.map((item) => {
          const maxScore = getTaskMaxScore(item)
          const implemented = isImplementedTask(item)
          const actualSquares = Math.min(maxScore, section.maxSquares)
          const taskScores = scores
            .filter((s) => s.taskId === item)
            .sort((a, b) => {
              const assessmentA = assessments.find((ass) => ass.id === a.assessmentId)
              const assessmentB = assessments.find((ass) => ass.id === b.assessmentId)
              return new Date(assessmentA?.date || "").getTime() - new Date(assessmentB?.date || "").getTime()
            })

          return (
            <div key={item} className="flex items-center gap-1 h-[18px] w-full justify-center">
              <span className="w-6 text-[10px] font-medium text-right">{item}</span>
              <div className="flex gap-[1px] w-16 justify-between">
                {Array.from({ length: actualSquares }).map((_, i) => {
                  const scoreForSquare = taskScores.find((s) => s.score > i)
                  const color = scoreForSquare
                    ? assessments.find((a) => a.id === scoreForSquare.assessmentId)?.color
                    : "white"

                  return (
                    <div
                      key={i}
                      className={`h-4 border border-gray-400 flex-1 ${!implemented ? "bg-gray-50" : ""}`}
                      style={{ backgroundColor: color }}
                    />
                  )
                })}
              </div>
            </div>
          )
        })}

        {/* Title at bottom */}
        <div className="absolute bottom-[-40px] left-0 right-0 text-[10px] font-medium text-center whitespace-pre-line">
          {section.title}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white p-6">
      {/* Legenda date e colori */}
      <div className="mb-6">
        <div className="border border-gray-300 p-4 inline-block">
          <div className="space-y-2">
            {assessments.map((assessment, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-4 h-4" style={{ backgroundColor: assessment.color }} />
                <span className="text-sm">{assessment.date}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 flex gap-4 items-center">
          <Input
            type="color"
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            className="w-20 h-8"
          />
          <Button onClick={() => addAssessment(selectedColor)} variant="outline" size="sm">
            Aggiungi Valutazione
          </Button>
        </div>
      </div>

      {/* Griglia principale */}
      <div className="relative">
        <div className="flex gap-8 justify-start overflow-x-auto pb-16">{gridSections.map(renderSection)}</div>
      </div>
    </div>
  )
}

