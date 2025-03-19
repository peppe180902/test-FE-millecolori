import React, { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { categories, Task } from "../data/categories"

interface SearchResult {
  categoryId: string
  taskId?: string
}

interface SearchBarProps {
  onSearch: (results: SearchResult[]) => void
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("")

  useEffect(() => {
    const results: SearchResult[] = categories.flatMap((category) =>
      category.tasks
        .filter(
          (task) =>
            task.id.toLowerCase().includes(query.toLowerCase()) ||
            task.name.toLowerCase().includes(query.toLowerCase()),
        )
        .map((task) => ({ categoryId: category.id, taskId: task.id })),
    )

    if (results.length === 0 && query !== "") {
      const categoryResults = categories
        .filter(
          (category) =>
            category.id.toLowerCase().includes(query.toLowerCase()) ||
            category.name.toLowerCase().includes(query.toLowerCase()),
        )
        .map((category) => ({ categoryId: category.id }))
      onSearch(categoryResults)
    } else {
      onSearch(results)
    }
  }, [query, onSearch])

  return (
    <Input
      type="text"
      placeholder="Cerca categoria o compito..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="mb-4"
    />
  )
}

