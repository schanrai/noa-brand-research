"use client"

import { useState } from "react"
import CoPilotInterface from "./co-pilot-interface"
import BrandCard from "./brand-card"
import BrandProfilePanel from "./brand-profile-panel"
import { Lightbulb } from "lucide-react"

interface MainContentProps {
  searchResults: any[]
  selectedCompany: any
  onSelectCompany: (company: any) => void
  onApprove: (companyId: string) => void
  onReject: (companyId: string) => void
  searchStage: "initial" | "region" | "division" | "results"
  onChatResponse: (stage: string, value: string) => void
}

export default function MainContent({
  searchResults,
  selectedCompany,
  onSelectCompany,
  onApprove,
  onReject,
  searchStage,
  onChatResponse,
}: MainContentProps) {
  const [expandedCompanyId, setExpandedCompanyId] = useState<string | null>(null)

  const handleToggleExpand = (companyId: string) => {
    if (expandedCompanyId === companyId) {
      setExpandedCompanyId(null)
    } else {
      setExpandedCompanyId(companyId)
      const company = searchResults.find((c) => c.id === companyId)
      if (company) {
        onSelectCompany(company)
      }
    }
  }

  return (
    <div className="flex-1 overflow-auto p-48 bg-main">
      {searchStage !== "results" && <CoPilotInterface stage={searchStage} onResponse={onChatResponse} />}

      {searchStage === "results" && searchResults.length > 0 && (
        <div className="space-y-48">
          <div>
            <h3 className="text-base font-bold uppercase tracking-wide mb-16">Research Result</h3>
            <div className="flex items-start gap-16 mb-48 p-24 border border-gray-200 rounded-lg bg-white">
              <div className="flex-shrink-0 w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center bg-white">
                <Lightbulb className="h-4 w-4 text-gray-600" />
              </div>
              <p className="text-body text-gray-800 leading-relaxed">
                Chris, here are the results of your search for {searchResults[0]?.companyName || "the company"}, for the
                division of {searchResults[0]?.regions[0] || "North America"}.... now please approve or reject
              </p>
            </div>
          </div>

          <div className="space-y-24">
            {searchResults.map((company) => (
              <div key={company.id} className="space-y-24">
                <BrandCard
                  company={company}
                  isExpanded={expandedCompanyId === company.id}
                  onToggleExpand={() => handleToggleExpand(company.id)}
                  onApprove={() => onApprove(company.id)}
                  onReject={() => onReject(company.id)}
                />

                {expandedCompanyId === company.id && <BrandProfilePanel company={company} />}
              </div>
            ))}
          </div>
        </div>
      )}

      {searchStage === "results" && searchResults.length === 0 && (
        <div className="flex h-full items-center justify-center">
          <div className="text-center space-y-16">
            <h2 className="text-2xl font-bold uppercase tracking-wide">No results found</h2>
            <p className="text-gray-600 text-body">Try adjusting your search filters</p>
          </div>
        </div>
      )}
    </div>
  )
}
