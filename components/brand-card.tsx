"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronUp, Check, X } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import ConfirmationModal from "./confirmation-modal"
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
  const { state } = useCRMActions()

  const handleApproveClick = () => {
    setShowModal(true)
  }

  const handleModalConfirm = async () => {
    setShowModal(false)
    // Call the parent's onApprove to trigger the toast notification
    onApprove()
  }

  const handleRejectClick = () => {
    // Call the parent's onReject to trigger the rejection flow
    onReject()
  }

  return (
    <>
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
              onClick={handleRejectClick}
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
    </>
  )
}
