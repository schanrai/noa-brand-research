"use client"

import { useState } from "react"
import CoPilotInterface from "./co-pilot-interface"
import BrandCard from "./brand-card"
import BrandProfilePanel from "./brand-profile-panel"

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

      {searchStage === "results" && (
        <div className="space-y-48">
          <div className="text-center space-y-24">
            <div className="animate-pulse">
              <div className="h-2 bg-gray-300 rounded w-3/4 mx-auto mb-4"></div>
              <div className="h-2 bg-gray-300 rounded w-1/2 mx-auto mb-4"></div>
              <div className="h-2 bg-gray-300 rounded w-2/3 mx-auto"></div>
            </div>
            <div className="space-y-16">
              <h2 className="text-2xl font-bold uppercase tracking-wide">Analyzing Company Data</h2>
              <div className="space-y-8 text-gray-600">
                <p>🔍 Gathering company information...</p>
                <p>📊 Analyzing financial data and market position...</p>
                <p>🤝 Reviewing partnership history and sponsorship activities...</p>
                <p>📈 Evaluating strategic focus and growth opportunities...</p>
              </div>
            </div>
          </div>

          {/* Show results after a delay - in real app this would be when LLM completes */}
          <div className="space-y-24 mt-48">
            <h2 className="text-3xl font-bold uppercase tracking-wide">Research Results</h2>
            <div className="space-y-24">
              {/* Show the first company as the searched result */}
              <div className="space-y-24">
                <BrandCard
                  company={
                    searchResults[0] || {
                      id: "searched-company",
                      companyName: "Real Company",
                      industry: "Conglomerate",
                      hqLocation: "Mumbai, India",
                      division: "Wealth Management",
                      description:
                        "Real Company is a leading Indian conglomerate with diverse business interests spanning financial services, technology, and infrastructure. Their Wealth Management division focuses on high-net-worth individuals and institutional clients across the Indian market.",
                      foundingDate: "1995-03-15",
                      regions: ["India", "Asia Pacific"],
                      annualRevenue: "$3.2B",
                      lastFunding: "Public Company",
                      totalFunding: "N/A",
                      website: "https://realcompany.in",
                      employees: 12500,
                      targetAudience: "High-net-worth individuals, institutional investors, corporate clients",
                      sponsorshipTypes: ["Financial Conferences", "Educational Initiatives", "Sports Events"],
                      keySponsorships: [
                        "India Investment Summit",
                        "Financial Literacy Program",
                        "Cricket Championship",
                      ],
                      strategicFocus:
                        "Expanding digital wealth management platform and sustainable investment solutions",
                      profileURL: "/companies/realcompany",
                      outreachProfile: "Selective partnerships focused on brand prestige and market expansion",
                      lastUpdated: "2023-12-15",
                      logo: "/placeholder.svg?height=80&width=80",
                      inCRM: false,
                      contacts: [
                        {
                          name: "Rajesh Sharma",
                          email: "rajesh.sharma@realcompany.in",
                          title: "Head of Strategic Partnerships - Wealth Management",
                          source: "Industry Conference",
                          relationshipNotes: "Interested in premium brand collaborations for HNI segment",
                        },
                      ],
                    }
                  }
                  isExpanded={expandedCompanyId === "searched-company"}
                  onToggleExpand={() => handleToggleExpand("searched-company")}
                  onApprove={() => onApprove("searched-company")}
                  onReject={() => onReject("searched-company")}
                />

                {expandedCompanyId === "searched-company" && (
                  <BrandProfilePanel
                    company={
                      searchResults[0] || {
                        id: "searched-company",
                        companyName: "Real Company",
                        industry: "Conglomerate",
                        hqLocation: "Mumbai, India",
                        division: "Wealth Management",
                        description:
                          "Real Company is a leading Indian conglomerate with diverse business interests spanning financial services, technology, and infrastructure. Their Wealth Management division focuses on high-net-worth individuals and institutional clients across the Indian market.",
                        foundingDate: "1995-03-15",
                        regions: ["India", "Asia Pacific"],
                        annualRevenue: "$3.2B",
                        lastFunding: "Public Company",
                        totalFunding: "N/A",
                        website: "https://realcompany.in",
                        employees: 12500,
                        targetAudience: "High-net-worth individuals, institutional investors, corporate clients",
                        sponsorshipTypes: ["Financial Conferences", "Educational Initiatives", "Sports Events"],
                        keySponsorships: [
                          "India Investment Summit",
                          "Financial Literacy Program",
                          "Cricket Championship",
                        ],
                        strategicFocus:
                          "Expanding digital wealth management platform and sustainable investment solutions",
                        profileURL: "/companies/realcompany",
                        outreachProfile: "Selective partnerships focused on brand prestige and market expansion",
                        lastUpdated: "2023-12-15",
                        logo: "/placeholder.svg?height=80&width=80",
                        inCRM: false,
                        contacts: [
                          {
                            name: "Rajesh Sharma",
                            email: "rajesh.sharma@realcompany.in",
                            title: "Head of Strategic Partnerships - Wealth Management",
                            source: "Industry Conference",
                            relationshipNotes: "Interested in premium brand collaborations for HNI segment",
                          },
                        ],
                      }
                    }
                  />
                )}
              </div>
            </div>
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
