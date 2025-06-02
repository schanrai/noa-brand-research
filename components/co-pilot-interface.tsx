"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface CoPilotInterfaceProps {
  stage: "initial" | "region" | "division" | "results"
  onResponse: (stage: string, value: string) => void
}

export default function CoPilotInterface({ stage, onResponse }: CoPilotInterfaceProps) {
  const [userInput, setUserInput] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!userInput.trim()) return

    if (stage === "initial") {
      onResponse("region", userInput)
    } else if (stage === "region") {
      onResponse("division", userInput)
    } else if (stage === "division") {
      onResponse("results", userInput)
    }

    setUserInput("")
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 space-y-4 p-4">
        <div className="flex items-start gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="AI" />
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
          <div className="rounded-lg bg-muted p-4">
            {stage === "initial" && <p>Hey Chris, which company would you like to research today?</p>}
            {stage === "region" && (
              <p>Great! I found several companies in that sector. Are you interested in a specific region?</p>
            )}
            {stage === "division" && (
              <p>Perfect! I found a few matches. Would you like to focus on a specific division or product category?</p>
            )}
          </div>
        </div>
      </div>

      <div className="border-t p-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            placeholder="Type your response..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </div>
    </div>
  )
}
