"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, X, AlertCircle, ExternalLink, Loader2, Undo2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ConfirmationToastProps {
  type: "success" | "error" | "pending"
  company?: any
  message: string
  onUndo?: () => void
  onViewCRM?: () => void
  onDismiss: () => void
  autoHide?: boolean
  duration?: number
}

export default function ConfirmationToast({
  type,
  company,
  message,
  onUndo,
  onViewCRM,
  onDismiss,
  autoHide = true,
  duration = 5000,
}: ConfirmationToastProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [progress, setProgress] = useState(100)

  useEffect(() => {
    if (autoHide && type !== "pending") {
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev <= 0) {
            clearInterval(progressInterval)
            setIsVisible(false)
            setTimeout(onDismiss, 300) // Allow fade out animation
            return 0
          }
          return prev - 100 / (duration / 100)
        })
      }, 100)

      return () => clearInterval(progressInterval)
    }
  }, [autoHide, type, duration, onDismiss])

  const getIcon = () => {
    switch (type) {
      case "success":
        return <Check className="h-5 w-5 text-green-600" />
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-600" />
      case "pending":
        return <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />
    }
  }

  const getBackgroundColor = () => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200"
      case "error":
        return "bg-red-50 border-red-200"
      case "pending":
        return "bg-blue-50 border-blue-200"
    }
  }

  const getProgressColor = () => {
    switch (type) {
      case "success":
        return "bg-green-500"
      case "error":
        return "bg-red-500"
      case "pending":
        return "bg-blue-500"
    }
  }

  if (!isVisible) return null

  return (
    <div
      className={`fixed top-28 right-1/2 transform translate-x-1/2 z-50 transition-all duration-300 ease-in-out ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
      role="alert"
      aria-live="polite"
      aria-atomic="true"
    >
      <Card className={`w-[500px] shadow-xl border-2 ${getBackgroundColor()}`}>
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 mt-1">{getIcon()}</div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  {company && (
                    <div className="flex items-center gap-3 mb-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={company.logo || "/placeholder.svg"} alt={company.companyName} />
                        <AvatarFallback className="bg-deep text-black text-xs font-bold">
                          {company.companyName.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <span className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                          {company.companyName}
                        </span>
                        <p className="text-xs text-gray-600 uppercase tracking-wide">{company.industry}</p>
                      </div>
                    </div>
                  )}
                  <p className="text-sm text-gray-700 leading-relaxed">{message}</p>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onDismiss}
                  className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600 ml-4"
                  aria-label="Dismiss notification"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Action buttons */}
              {(onUndo || onViewCRM) && (
                <div className="flex items-center gap-3 mt-4">
                  {onUndo && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={onUndo}
                      className="h-8 px-4 text-xs border-gray-300 hover:bg-gray-50 bg-transparent"
                    >
                      <Undo2 className="h-3 w-3 mr-2" />
                      Undo
                    </Button>
                  )}
                  {onViewCRM && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={onViewCRM}
                      className="h-8 px-4 text-xs border-gray-300 hover:bg-gray-50 bg-transparent"
                    >
                      <ExternalLink className="h-3 w-3 mr-2" />
                      View in CRM
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Progress bar for auto-hide */}
          {autoHide && type !== "pending" && (
            <div className="mt-4 h-1 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-100 ease-linear ${getProgressColor()}`}
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
