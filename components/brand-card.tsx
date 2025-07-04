"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronUp, Check, X } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import ConfirmationModal from "./confirmation-modal"
import InlineConfirmation from "./inline-confirmation"
import ConfirmationToast from "./confirmation-toast"
import { useCRMActions } from "@/hooks/use-crm-actions"
import { useState } from "react"

interface BrandCardProps {
  company: any
  isExpanded: boolean
  onToggleExpand: () => void
  onApprove: () => void
  onReject: () => void
  showActions?: boolean
}

export default function BrandCard({
  company,
  isExpanded,
  onToggleExpand,
  onApprove,
  onReject,
  showActions = true,
}: BrandCardProps) {
  const [showModal, setShowModal] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [showInlineConfirmation, setShowInlineConfirmation] = useState(false)
  const [confirmationMethod, setConfirmationMethod] = useState<"modal" | "inline" | "toast">("modal")
  const { state, addToCRM, removeFromCRM, reset } = useCRMActions()

  const handleApproveClick = () => {
    // You can change this to test different confirmation methods
    setConfirmationMethod("modal")

    if (confirmationMethod === "modal") {
      setShowModal(true)
    } else if (confirmationMethod === "inline") {
      setShowInlineConfirmation(true)
      handleCRMAction()
    } else {
      setShowToast(true)
      handleCRMAction()
    }
  }

  const handleCRMAction = async () => {
    try {
      if (company.inCRM) {
        await addToCRM(company) // Update existing
      } else {
        await addToCRM(company) // Add new
      }
      onApprove()
    } catch (error) {
      console.error("CRM action failed:", error)
    }
  }

  const handleModalConfirm = async () => {
    await handleCRMAction()
    setShowModal(false)
  }

  const handleUndo = async () => {
    await removeFromCRM(company.id)
    setShowToast(false)
    setShowInlineConfirmation(false)
    reset()
  }

  const handleViewCRM = () => {
    // Navigate to CRM or open in new tab
    window.open(`/crm/companies/${company.id}`, "_blank")
  }

  const getConfirmationMessage = () => {
    if (state.error) {
      return state.error
    }
    if (state.isLoading) {
      return company.inCRM
        ? `Updating ${company.companyName} in your CRM...`
        : `Adding ${company.companyName} to your CRM...`
    }
    if (state.success) {
      return company.inCRM
        ? `${company.companyName} has been updated in your CRM with the latest research data and contacts.`
        : `${company.companyName} has been successfully added to your CRM. You can now track interactions and manage this relationship.`
    }
    return ""
  }

  const getConfirmationStatus = () => {
    if (state.error) return "error"
    if (state.isLoading) return "pending"
    if (state.success) return "success"
    return "pending"
  }

  return (
    <>
      {/* Inline confirmation - shows above the card */}
      {showInlineConfirmation && (
        <InlineConfirmation
          company={company}
          status={getConfirmationStatus()}
          message={getConfirmationMessage()}
          onUndo={state.success ? handleUndo : undefined}
          onViewCRM={state.success ? handleViewCRM : undefined}
          onRetry={state.error ? handleCRMAction : undefined}
          onDismiss={() => {
            setShowInlineConfirmation(false)
            reset()
          }}
        />
      )}

      <Card className="card-premium">
        <CardContent className="p-24">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-24">
              <Avatar className="h-16 w-16">
                <AvatarImage src={company.logo || "/placeholder.svg"} alt={company.companyName} />
                <AvatarFallback className="bg-deep text-black font-bold">
                  {company.companyName.substring(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-16">
                <div className="flex items-center gap-16">
                  <h3 className="text-xl font-bold uppercase tracking-wide">{company.companyName}</h3>
                  {company.inCRM && (
                    <Badge
                      variant="outline"
                      className="border-green-500 text-green-600 text-xs uppercase tracking-wide"
                    >
                      In CRM
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-600 font-medium uppercase tracking-wide">
                  {company.industry} • {company.hqLocation}
                </p>
                <p className="text-body text-gray-600 leading-relaxed max-w-2xl">
                  {company.description.substring(0, 120)}...
                </p>
                <div className="flex flex-wrap gap-8">
                  {company.regions.slice(0, 2).map((region: string, index: number) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-edge text-black text-xs uppercase tracking-wide"
                    >
                      {region}
                    </Badge>
                  ))}
                  {company.regions.length > 2 && (
                    <Badge variant="secondary" className="bg-edge text-black text-xs uppercase tracking-wide">
                      +{company.regions.length - 2} more
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onToggleExpand} className="hover-scale">
              {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              <span className="ml-2 text-xs uppercase tracking-wide">{isExpanded ? "Less" : "More"}</span>
            </Button>
          </div>
        </CardContent>
        {showActions && (
          <CardFooter className="flex justify-end gap-16 border-t border-gray-200 bg-edge px-24 py-16">
            <Button
              variant="outline"
              size="sm"
              onClick={onReject}
              className="btn-premium border-gray-200 hover-scale bg-transparent"
            >
              <X className="mr-2 h-4 w-4" />
              <span className="text-xs">Reject</span>
            </Button>
            <Button
              size="sm"
              onClick={handleApproveClick}
              className="btn-premium bg-black text-white hover:bg-gray-800"
              disabled={state.isLoading}
            >
              <Check className="mr-2 h-4 w-4" />
              <span className="text-xs">{company.inCRM ? "Update CRM" : "Approve for CRM"}</span>
            </Button>
          </CardFooter>
        )}
      </Card>

      {/* Modal confirmation */}
      <ConfirmationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        company={company}
        onConfirm={handleModalConfirm}
        onCancel={() => setShowModal(false)}
        isLoading={state.isLoading}
      />

      {/* Toast confirmation */}
      {showToast && (
        <ConfirmationToast
          type={getConfirmationStatus()}
          company={company}
          message={getConfirmationMessage()}
          onUndo={state.success ? handleUndo : undefined}
          onViewCRM={state.success ? handleViewCRM : undefined}
          onDismiss={() => {
            setShowToast(false)
            reset()
          }}
        />
      )}
    </>
  )
}
