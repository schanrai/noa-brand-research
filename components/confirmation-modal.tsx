"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Building2, Users, MapPin, DollarSign, Calendar, AlertTriangle } from "lucide-react"

interface ConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  company: any
  onConfirm: () => void
  onCancel: () => void
  isLoading?: boolean
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  company,
  onConfirm,
  onCancel,
  isLoading = false,
}: ConfirmationModalProps) {
  const [showDetails, setShowDetails] = useState(false)

  if (!company) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto bg-white border border-gray-200"
        aria-describedby="confirmation-description"
      >
        <DialogHeader className="space-y-4 pb-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={company.logo || "/placeholder.svg"} alt={company.companyName} />
              <AvatarFallback className="bg-deep text-black font-bold text-lg">
                {company.companyName.substring(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <DialogTitle className="text-xl font-bold uppercase tracking-wide text-left">
                Add {company.companyName} to CRM?
              </DialogTitle>
              <p className="text-sm text-gray-600 font-medium uppercase tracking-wide mt-1">
                {company.industry} • {company.hqLocation}
              </p>
            </div>
          </div>
        </DialogHeader>

        <DialogDescription id="confirmation-description" className="text-base text-gray-700 leading-relaxed">
          This will add {company.companyName} to your CRM with all available contact information and research data.
          You'll be able to track interactions and manage the relationship from your CRM dashboard.
        </DialogDescription>

        <div className="space-y-6 py-4">
          {/* Quick company overview */}
          <div className="bg-edge rounded-lg p-5 space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wide">Company Overview</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-gray-500" />
                <span className="text-gray-700">{company.employees?.toLocaleString()} employees</span>
              </div>
              <div className="flex items-center gap-3">
                <DollarSign className="h-5 w-5 text-gray-500" />
                <span className="text-gray-700">{company.annualRevenue}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-gray-500" />
                <span className="text-gray-700">{company.regions?.length} regions</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-gray-500" />
                <span className="text-gray-700">Founded {new Date(company.foundingDate).getFullYear()}</span>
              </div>
            </div>
          </div>

          {/* Contact information preview */}
          {company.contacts && company.contacts.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-semibold uppercase tracking-wide">
                Contacts to be added ({company.contacts.length})
              </h4>
              <div className="space-y-3">
                {company.contacts.slice(0, 2).map((contact: any, index: number) => (
                  <div key={index} className="flex items-center gap-4 p-3 bg-white rounded-lg border border-gray-100">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-gray-100 text-gray-600 text-sm">
                        {contact.name
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-sm font-medium">{contact.name}</div>
                      <div className="text-xs text-gray-500">{contact.title}</div>
                    </div>
                  </div>
                ))}
                {company.contacts.length > 2 && (
                  <div className="text-sm text-gray-500 pl-3">+{company.contacts.length - 2} more contacts</div>
                )}
              </div>
            </div>
          )}

          {/* Warning for existing CRM entries */}
          {company.inCRM && (
            <div className="flex items-start gap-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-medium text-yellow-800">Company already in CRM</div>
                <div className="text-sm text-yellow-700 mt-1">
                  This will update existing records with new research data and contacts.
                </div>
              </div>
            </div>
          )}

          {/* Expandable details */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowDetails(!showDetails)}
            className="w-full justify-center text-sm text-gray-600 hover:text-gray-800"
          >
            {showDetails ? "Hide" : "Show"} additional details
          </Button>

          {showDetails && (
            <div className="space-y-4 pt-4 border-t border-gray-100">
              <div>
                <h5 className="text-sm font-semibold uppercase tracking-wide mb-3">Sponsorship Types</h5>
                <div className="flex flex-wrap gap-2">
                  {company.sponsorshipTypes?.slice(0, 3).map((type: string, index: number) => (
                    <Badge key={index} variant="secondary" className="text-sm px-3 py-1">
                      {type}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h5 className="text-sm font-semibold uppercase tracking-wide mb-2">Strategic Focus</h5>
                <div className="text-sm text-gray-600 leading-relaxed">{company.strategicFocus}</div>
              </div>
            </div>
          )}
        </div>

        <Separator className="my-4" />

        <DialogFooter className="flex-col sm:flex-row gap-3 pt-4">
          <Button
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
            className="w-full sm:w-auto border-gray-200 hover:bg-gray-50 bg-transparent px-6 py-2"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            disabled={isLoading}
            className="w-full sm:w-auto bg-black text-white hover:bg-gray-800 disabled:opacity-50 px-6 py-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Adding to CRM...
              </>
            ) : (
              <>
                <Building2 className="h-4 w-4 mr-2" />
                Add to CRM
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
