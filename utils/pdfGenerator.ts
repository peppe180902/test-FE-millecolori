import { jsPDF } from "jspdf"
import { categories, type Task } from "../data/categories"

function getTaskResult(task: Task, score: number): string {
  const criterion = task.criteria[score].toLowerCase()
  // Rimuoviamo il punto interrogativo dalla domanda, se presente
  const question = task.question.replace(/\?$/, "")
  return `${question} ${criterion}.`
}

export const generatePDF = async (scores: Record<string, number>) => {
  const doc = new jsPDF()

  doc.setFontSize(18)
  doc.text("ABLLS - Relazione di Valutazione", 20, 20)

  doc.setFontSize(12)
  let yPosition = 40

  let report = "La valutazione dello studente ha evidenziato quanto segue:\n\n"

  categories.forEach((category) => {
    category.tasks.forEach((task) => {
      if (scores[task.id] !== undefined) {
        const taskResult = getTaskResult(task, scores[task.id])
        report += `${taskResult}\n\n`
      }
    })
  })

  const splitReport = doc.splitTextToSize(report, 170)

  splitReport.forEach((line) => {
    if (yPosition > 280) {
      doc.addPage()
      yPosition = 20
    }
    doc.text(line, 20, yPosition)
    yPosition += 7
  })

  doc.save("relazione_valutazione.pdf")
}

