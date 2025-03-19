export interface AssessmentDate {
  id: string
  date: string
  color: string
}

export interface AssessmentScore {
  taskId: string
  score: number
  dateId: string
}

