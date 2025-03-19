"use client"

import type React from "react"
import { createContext, useState, useContext, type ReactNode } from "react"
import { format } from "date-fns"

interface Assessment {
  id: string
  date: string
  color: string
}

interface Score {
  taskId: string
  score: number
  assessmentId: string
}

interface AssessmentContextType {
  assessments: Assessment[]
  addAssessment: (color: string) => void
  scores: Score[]
  updateScore: (taskId: string, score: number) => void
  currentAssessmentId: string | null
  setCurrentAssessmentId: (id: string | null) => void
}

const AssessmentContext = createContext<AssessmentContextType | undefined>(undefined)

export const useAssessment = () => {
  const context = useContext(AssessmentContext)
  if (!context) {
    throw new Error("useAssessment must be used within an AssessmentProvider")
  }
  return context
}

export const AssessmentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [assessments, setAssessments] = useState<Assessment[]>([])
  const [scores, setScores] = useState<Score[]>([])
  const [currentAssessmentId, setCurrentAssessmentId] = useState<string | null>(null)

  const addAssessment = (color: string) => {
    const newAssessment = {
      id: Date.now().toString(),
      date: format(new Date(), "dd-MM-yy"),
      color,
    }
    setAssessments((prev) => [...prev, newAssessment])
    setCurrentAssessmentId(newAssessment.id)
  }

  const updateScore = (taskId: string, score: number) => {
    if (!currentAssessmentId) return

    setScores((prev) => {
      const existingScoreIndex = prev.findIndex((s) => s.taskId === taskId && s.assessmentId === currentAssessmentId)
      if (existingScoreIndex !== -1) {
        const newScores = [...prev]
        newScores[existingScoreIndex] = { ...newScores[existingScoreIndex], score }
        return newScores
      } else {
        return [...prev, { taskId, score, assessmentId: currentAssessmentId }]
      }
    })
  }

  return (
    <AssessmentContext.Provider
      value={{
        assessments,
        addAssessment,
        scores,
        updateScore,
        currentAssessmentId,
        setCurrentAssessmentId,
      }}
    >
      {children}
    </AssessmentContext.Provider>
  )
}

