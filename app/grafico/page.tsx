"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AssessmentChart } from "@/components/AssessmentChart"

export default function ChartPage() {
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-medium">La Valutazione delle Abilità Comunicative e di Apprendimento</h1>
        <Link href="/">
          <Button variant="outline" size="sm">
            Torna alla Valutazione
          </Button>
        </Link>
      </div>
      <AssessmentChart />
    </div>
  )
}

