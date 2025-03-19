"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { categories, type Category, type Task } from "../data/categories"
import { generatePDF } from "../utils/pdfGenerator"
import { SearchBar } from "./SearchBar"
import { useAssessment } from "../contexts/AssessmentContext"

interface SearchResult {
  categoryId: string
  taskId?: string
}

export default function AssessmentTable() {
  const [openDialog, setOpenDialog] = useState<string | null>(null)
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const { toast } = useToast()
  const { scores, updateScore, assessments, currentAssessmentId } = useAssessment()

  const handleScoreClick = (taskId: string, score: number) => {
    const currentAssessment = assessments.find((a) => a.id === currentAssessmentId)
    if (!currentAssessment) {
      toast({
        title: "Errore",
        description: "Seleziona prima una valutazione nella pagina del grafico.",
        variant: "destructive",
      })
      return
    }

    const taskScores = scores
      .filter((s) => s.taskId === taskId)
      .sort((a, b) => {
        const assessmentA = assessments.find((ass) => ass.id === a.assessmentId)
        const assessmentB = assessments.find((ass) => ass.id === b.assessmentId)
        return new Date(assessmentB?.date || "").getTime() - new Date(assessmentA?.date || "").getTime()
      })

    const currentScore = taskScores.find((s) => s.assessmentId === currentAssessmentId)
    const previousScore = taskScores[0] // Il punteggio più recente

    if (previousScore && previousScore.assessmentId !== currentAssessmentId && score <= previousScore.score) {
      toast({
        title: "Attenzione",
        description: "Il nuovo punteggio deve essere maggiore del precedente.",
        variant: "warning",
      })
      return
    }

    updateScore(taskId, score)
  }

  const handleGenerateReport = async () => {
    try {
      const scoresForPDF = scores.reduce(
        (acc, score) => {
          if (score.assessmentId === currentAssessmentId) {
            acc[score.taskId] = score.score
          }
          return acc
        },
        {} as Record<string, number>,
      )
      await generatePDF(scoresForPDF)
      toast({
        title: "Relazione generata",
        description: "La relazione PDF è stata creata e scaricata con successo.",
      })
    } catch (error) {
      toast({
        title: "Errore",
        description: "Si è verificato un errore durante la generazione del PDF.",
        variant: "destructive",
      })
    }
  }

  const handleSearch = useCallback((results: SearchResult[]) => {
    setSearchResults(results)
  }, [])

  const renderTask = (task: Task) => {
    const taskScores = scores
      .filter((s) => s.taskId === task.id)
      .sort((a, b) => {
        const assessmentA = assessments.find((ass) => ass.id === a.assessmentId)
        const assessmentB = assessments.find((ass) => ass.id === b.assessmentId)
        return new Date(assessmentB?.date || "").getTime() - new Date(assessmentA?.date || "").getTime()
      })

    return (
      <div key={task.id} className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow">
        <Dialog open={openDialog === task.id} onOpenChange={() => setOpenDialog(null)}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-16" onClick={() => setOpenDialog(task.id)}>
              {task.id}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{task.name}</DialogTitle>
            </DialogHeader>
            <div className="mt-2">
              <p className="mb-2">
                <strong>Obiettivo:</strong> {task.objective}
              </p>
              <p className="mb-2">
                <strong>Domanda:</strong> {task.question}
              </p>
              <p className="mb-2">
                <strong>Esempi:</strong> {task.examples}
              </p>
              <div>
                <strong>Criteri:</strong>
                <ul className="list-disc pl-5 mt-1">
                  {task.criteria.map((criterion, index) => (
                    <li key={index}>
                      {index}: {criterion}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        <div className="flex-1 flex justify-end space-x-2">
          {task.criteria.map((criterion, index) => {
            const buttonColors = taskScores.reduce((colors, score) => {
              if (score.score >= index) {
                const assessment = assessments.find((a) => a.id === score.assessmentId)
                if (assessment) {
                  colors.push(assessment.color)
                }
              }
              return colors
            }, [] as string[])

            const isCurrentScore = taskScores.find((s) => s.assessmentId === currentAssessmentId)?.score >= index

            return (
              <Button
                key={index}
                variant={buttonColors.length > 0 ? "default" : "outline"}
                className="w-10 h-10 relative overflow-hidden"
                onClick={() => handleScoreClick(task.id, index)}
              >
                {buttonColors.map((color, colorIndex) => (
                  <div
                    key={colorIndex}
                    className="absolute inset-0"
                    style={{
                      backgroundColor: color,
                      zIndex: buttonColors.length - colorIndex,
                      opacity: isCurrentScore && colorIndex === buttonColors.length - 1 ? 1 : 0.5,
                    }}
                  />
                ))}
                <span className="relative z-10">{index}</span>
              </Button>
            )
          })}
        </div>
      </div>
    )
  }

  const renderCategory = (category: Category) => (
    <div key={category.id} className="space-y-4 mb-8">
      <h2 className="text-2xl font-bold bg-gray-100 p-2 rounded">{category.name}</h2>
      {category.tasks
        .filter((task) => searchResults.length === 0 || searchResults.some((r) => r.taskId === task.id))
        .map(renderTask)}
    </div>
  )

  return (
    <div className="space-y-8">
      <SearchBar onSearch={handleSearch} />
      {categories
        .filter((category) => searchResults.length === 0 || searchResults.some((r) => r.categoryId === category.id))
        .map(renderCategory)}
      <Button onClick={handleGenerateReport} className="mt-6">
        Genera Relazione PDF
      </Button>
    </div>
  )
}

