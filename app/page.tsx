import Link from "next/link"
import AssessmentTable from "../components/AssessmentTable"
import { Toaster } from "@/components/ui/toaster"
import { Button } from "@/components/ui/button"
import { BarChart3 } from "lucide-react"

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">ABLLS</h1>
        <Link href="/grafico">
          <Button variant="outline">
            <BarChart3 className="w-4 h-4 mr-2" />
            Visualizza Grafico
          </Button>
        </Link>
      </div>
      <AssessmentTable />
      <Toaster />
    </main>
  )
}

