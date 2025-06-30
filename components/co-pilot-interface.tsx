"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send, Lightbulb, Star, Loader2, Network } from "lucide-react"

interface CoPilotInterfaceProps {
  stage: "initial" | "region" | "division" | "results" | "feedback"
  onResponse: (stage: string, value: string) => void
  feedbackMode?: boolean
  onFeedbackComplete?: () => void
}

export default function CoPilotInterface({
  stage,
  onResponse,
  feedbackMode = false,
  onFeedbackComplete,
}: CoPilotInterfaceProps) {
  const [userInput, setUserInput] = useState("")
  const [conversationHistory, setConversationHistory] = useState([
    {
      role: "assistant",
      content: feedbackMode
        ? "I see you'd like to make some changes to the research results. What specific adjustments would you like me to make to better match what you're looking for?"
        : "Hey Chris, which company would you like to research today?",
      timestamp: new Date(),
    },
  ])
  const [companyName, setCompanyName] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingSteps, setProcessingSteps] = useState<string[]>([])
  const [currentStage, setCurrentStage] = useState(feedbackMode ? "feedback" : stage)

  // Simulate LLM working in the background
  useEffect(() => {
    if (isProcessing) {
      const steps =
        currentStage === "processing-feedback"
          ? [
              "Processing your feedback...",
              "Updating research parameters...",
              "Re-analyzing company data...",
              "Refining search results...",
              "Generating updated report...",
            ]
          : [
              "Searching for company information...",
              `Finding recent news about ${companyName}...`,
              "Analyzing market position...",
              "Gathering financial data...",
              "Identifying key partnerships...",
              "Compiling sponsorship history...",
              "Analyzing target audience...",
              "Generating comprehensive report...",
            ]

      let currentStep = 0
      const interval = setInterval(() => {
        if (currentStep < steps.length) {
          setProcessingSteps((prev) => [...prev, steps[currentStep]])
          currentStep++
        } else {
          clearInterval(interval)
          // Transition to results after processing is complete
          setTimeout(() => {
            setIsProcessing(false)
            if (currentStage === "processing-feedback") {
              onFeedbackComplete?.()
            } else {
              onResponse("results", companyName)
            }
          }, 1500)
        }
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [isProcessing, companyName, onResponse, currentStage, onFeedbackComplete])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!userInput.trim()) return

    // Add user message to conversation
    const newUserMessage = {
      role: "user",
      content: userInput,
      timestamp: new Date(),
    }

    let assistantResponse = ""
    let nextStage = ""

    if (currentStage === "initial") {
      setCompanyName(userInput)
      assistantResponse = `Great! As ${userInput} is a global company, would you like me to focus on a specific geographical market? They operate in the US, India and Japan.`
      nextStage = "region"
      setCurrentStage("region")
    } else if (currentStage === "region") {
      assistantResponse = `Of course! Since ${companyName} is a conglomerate, is there a specific area of the company or division which you would like me to focus on?`
      nextStage = "division"
      setCurrentStage("division")
    } else if (currentStage === "division") {
      assistantResponse = `Makes sense - I'll draft an initial full report and once you approve it, I will then summarize into a concise brand summary. Sound good?`
      nextStage = "confirmation"
      setCurrentStage("confirmation")
    } else if (currentStage === "confirmation") {
      // Handle user's affirmative response
      assistantResponse = "Great! Let me gather all the relevant information for you. This might take a moment..."
      setIsProcessing(true)
      nextStage = "processing"
      setCurrentStage("processing")
    } else if (currentStage === "feedback") {
      assistantResponse =
        "Thanks for the feedback! Let me update the research with your requirements. This will take a moment..."
      setIsProcessing(true)
      nextStage = "processing-feedback"
      setCurrentStage("processing-feedback")

      // After processing, complete the feedback cycle
      setTimeout(() => {
        setIsProcessing(false)
        onFeedbackComplete?.()
      }, 3000)
    }

    const newAssistantMessage = {
      role: "assistant",
      content: assistantResponse,
      timestamp: new Date(),
    }

    setConversationHistory((prev) => [...prev, newUserMessage, newAssistantMessage])

    if (currentStage !== "confirmation" && currentStage !== "processing") {
      onResponse(nextStage, userInput)
    }

    setUserInput("")
  }

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="mb-48 ml-24 -mt-24">
        <div className="flex items-center gap-3 mb-16">
          <Network className="h-5 w-5 text-gray-600" />
          <h1 className="text-base font-bold uppercase tracking-wide">AI Research Co-Pilot</h1>
        </div>
        <p className="text-body text-gray-600">
          Search the web and research your company using our AI-powered co-pilot
        </p>
      </div>

      {isProcessing ? (
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="text-center space-y-24 max-w-2xl">
            <div className="flex items-center justify-center">
              <Loader2 className="h-12 w-12 animate-spin text-black" />
            </div>
            <h2 className="text-xl font-bold uppercase tracking-wide">Generating Brand Research</h2>
            <div className="space-y-16 text-left">
              {processingSteps.map((step, index) => (
                <div key={index} className="flex items-center gap-16">
                  <div className="w-4 h-4 rounded-full bg-black"></div>
                  <p className="text-body text-gray-800">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Conversation Thread */}
          <div className="flex-1 space-y-24 mb-24">
            {conversationHistory.map((message, index) => (
              <div
                key={index}
                className={`flex items-start gap-16 ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.role === "assistant" && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center bg-white">
                    <Lightbulb className="h-4 w-4 text-gray-600" />
                  </div>
                )}

                <div className={`max-w-[80%] ${message.role === "user" ? "text-right" : "text-left"}`}>
                  <p className="text-body text-gray-800 leading-relaxed">{message.content}</p>
                </div>

                {message.role === "user" && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center bg-white">
                    <Star className="h-4 w-4 text-gray-600" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 pt-24">
            <form onSubmit={handleSubmit} className="flex gap-16">
              <Input
                placeholder="Type your response..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="flex-1 bg-white border-gray-200"
              />
              <Button type="submit" size="icon" className="bg-black text-white hover:bg-gray-800">
                <Send className="h-4 w-4" />
                <span className="sr-only">Send</span>
              </Button>
            </form>
          </div>
        </>
      )}
    </div>
  )
}
