"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check, X, Loader2, ExternalLink, Undo2, AlertCircle } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface InlineConfirmationProps {
  company: any
  status: "pending" | "success" | "error"
  message: string
  onUndo?: () => void
  onViewCRM?: () => void
  onRetry?: () => void
  onDismiss?: () => void
}

export default function InlineConfirmation({
  company,
  status,
  message,
  onUndo,
  onViewCRM,
  onRetry,
  onDismiss,
}: InlineConfirmationProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (status === "success") {
      const timer = setTimeout(() => {
        setIsVisible(false)
        onDismiss?.()
      }, 8000)
      return () => clearTimeout(timer)
    }
  }, [status, onDismiss])

  if (!isVisible) return null

  const getStatusConfig = () => {
    switch (status) {
      case "pending":
        return {
          icon: <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />,
          bgColor: "bg-blue-50",
          borderColor: "border-blue-200",
          textColor: "text-blue-800",
        }
      case "success":
        return {
          icon: <Check className="h-5 w-5 text-green-600" />,
          bgColor: "bg-green-50",
          borderColor: "border-green-200",
          textColor: "text-green-800",
        }
      case "error":
        return {
          icon: <AlertCircle className="h-5 w-5 text-red-600" />,
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
          textColor: "text-red-800",
        }
    }
  }

  const config = getStatusConfig()

  return (
    <Card className={`mb-6 border-2 ${config.borderColor} ${config.bgColor} transition-all duration-300 ease-in-out`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 mt-1">{config.icon}</div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={company.logo || "/placeholder.svg"} alt={company.companyName} />
                  <AvatarFallback className="bg-deep text-black text-xs font-bold">
                    {company.companyName.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-900">{company.companyName}</h4>
                  <p className="text-xs text-gray-600 uppercase tracking-wide">{company.industry}</p>
                </div>
              </div>

              {onDismiss && status !== "pending" && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onDismiss}
                  className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
                  aria-label="Dismiss"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>

            <p className={`text-sm leading-relaxed mb-3 ${config.textColor}`}>{message}</p>

            {/* Action buttons */}
            <div className="flex items-center gap-2">
              {status === "success" && onUndo && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onUndo}
                  className="h-7 px-3 text-xs border-gray-300 hover:bg-white bg-transparent"
                >
                  <Undo2 className="h-3 w-3 mr-1" />
                  Undo
                </Button>
              )}

              {status === "success" && onViewCRM && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onViewCRM}
                  className="h-7 px-3 text-xs border-gray-300 hover:bg-white bg-transparent"
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  View in CRM
                </Button>
              )}

              {status === "error" && onRetry && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onRetry}
                  className="h-7 px-3 text-xs border-gray-300 hover:bg-white bg-transparent"
                >
                  Try Again
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
