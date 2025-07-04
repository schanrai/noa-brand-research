"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, X, AlertCircle, Loader2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ConfirmationToastProps {
  type: "success" | "error" | "pending"
  company?: any
  message: string
  onDismiss: () => void
  autoHide?: boolean
  duration?: number
}

export default function ConfirmationToast({
  type,
  company,
  message,
  onDismiss,
  autoHide = true,
  duration = 5000,
}: ConfirmationToastProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (autoHide && type !== "pending") {
      const timer = setTimeout(() => {
        setIsVisible(false)
        setTimeout(onDismiss, 300) // Allow fade out animation
      }, duration)

      return () => clearTimeout(timer)
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
      <Card className={`w-[450px] shadow-xl border-2 ${getBackgroundColor()}`}>
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-0.5">{getIcon()}</div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  {company && (
                    <div className="flex items-center gap-3 mb-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={company.logo || "/placeholder.svg"} alt={company.companyName} />
                        <AvatarFallback className="bg-deep text-black text-xs font-bold">
                          {company.companyName.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                        {company.companyName}
                      </span>
                    </div>
                  )}
                  <p className="text-sm text-gray-700 leading-relaxed">{message}</p>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onDismiss}
                  className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600 ml-3 flex-shrink-0"
                  aria-label="Dismiss notification"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
