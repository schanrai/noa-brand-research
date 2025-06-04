"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Message {
  role: "assistant" | "user"
  content: string
}

interface CoPilotInterfaceProps {
  stage: "initial" | "region" | "division" | "results"
  onResponse: (stage: string, value: string) => void
}

export default function CoPilotInterface({ stage, onResponse }: CoPilotInterfaceProps) {
  const [userInput, setUserInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hey Chris, which company would you like to research today?",
    },
  ])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!userInput.trim()) return

    // Add user message to conversation
    const newUserMessage: Message = {
      role: "user",
      content: userInput,
    }

    let aiResponse = ""
    const companyName = userInput

    if (stage === "initial") {
      aiResponse = `Great! As ${companyName} is a global company, would you like me to focus on a specific geographical market? They operate in the US, India and Japan.`
      onResponse("region", userInput)
    } else if (stage === "region") {
      aiResponse = `Of course! Since ${messages.find((m) => m.role === "user")?.content || "the company"} is a conglomerate, is there a specific area of the company or division which you would like me to focus on?`
      onResponse("division", userInput)
    } else if (stage === "division") {
      aiResponse =
        "Makes sense - I'll draft an initial full report and once you approve it, I will then summarize into a concise brand summary. Sound good!"
      onResponse("results", userInput)
    }

    // Add both user message and AI response to conversation
    const newAiMessage: Message = {
      role: "assistant",
      content: aiResponse,
    }

    setMessages((prev) => [...prev, newUserMessage, newAiMessage])
    setUserInput("")
  }

  return (
    <div className="flex h-full flex-col">
      <div className="p-4 border-b">
        <h1 className="text-lg font-semibold">NOA Research Co-Pilot</h1>
        <p className="text-sm text-muted-foreground">The weather today is sunny with a high of 15°F.</p>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex items-start gap-3 ${message.role === "user" ? "justify-end" : ""}`}>
              {message.role === "assistant" && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="AI" />
                  <AvatarFallback className="text-xs">AI</AvatarFallback>
                </Avatar>
              )}
              <div
                className={`rounded-lg p-3 max-w-[80%] ${
                  message.role === "assistant" ? "bg-muted" : "bg-primary text-primary-foreground ml-auto"
                }`}
              >
                <p className="text-sm">{message.content}</p>
              </div>
              {message.role === "user" && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                  <AvatarFallback className="text-xs">C</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

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
