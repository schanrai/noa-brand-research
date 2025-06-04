"use client"

import { useState } from "react"
import TopNavigation from "@/components/top-navigation"
import LeftSidebar from "@/components/left-sidebar"
import MainContent from "@/components/main-content"
import RightSidebar from "@/components/right-sidebar"
import brandsData from "@/data/brands.json"

export default function Home() {
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [selectedCompany, setSelectedCompany] = useState<any>(null)
  const [searchStage, setSearchStage] = useState<"initial" | "region" | "division" | "results">("initial")
  const [filters, setFilters] = useState({
    region: "",
    industry: "",
    sponsorshipType: "",
    size: "",
    revenue: "",
  })

  const handleSearch = (newFilters: any) => {
    setFilters({ ...filters, ...newFilters })

    // Filter companies based on the selected filters
    let results = [...brandsData.companies]

    if (newFilters.region) {
      results = results.filter((company) =>
        company.regions.some((region: string) => region.toLowerCase().includes(newFilters.region.toLowerCase())),
      )
    }

    if (newFilters.industry) {
      results = results.filter((company) => company.industry.toLowerCase().includes(newFilters.industry.toLowerCase()))
    }

    if (newFilters.sponsorshipType) {
      results = results.filter((company) =>
        company.sponsorshipTypes.some((type: string) =>
          type.toLowerCase().includes(newFilters.sponsorshipType.toLowerCase()),
        ),
      )
    }

    setSearchResults(results)
    setSearchStage("results")
  }

  const handleCompanySelect = (company: any) => {
    setSelectedCompany(company)
  }

  const handleApprove = (companyId: string) => {
    // In a real app, this would send data to the backend
    console.log(`Company ${companyId} approved for CRM`)
    // For now, just show a simulated success message
    alert(`Company approved for CRM!`)
  }

  const handleReject = (companyId: string) => {
    // In a real app, this would send data to the backend
    console.log(`Company ${companyId} rejected`)
    // For now, just show a simulated success message
    alert(`Company rejected!`)
  }

  const handleChatResponse = (stage: string, value: string) => {
    if (stage === "region") {
      setSearchStage("region")
      // In a real app, this would update the chat history
    } else if (stage === "division") {
      setSearchStage("division")
      // In a real app, this would update the chat history
    } else if (stage === "results") {
      // Create a mock company based on the user's input or find existing one
      let companyResult = brandsData.companies.find((company) =>
        company.companyName.toLowerCase().includes(value.toLowerCase()),
      )

      // If no existing company matches, create a mock one
      if (!companyResult) {
        companyResult = {
          id: "generated-1",
          companyName: value,
          industry: "Technology",
          hqLocation: "San Francisco, CA",
          division: "Consumer Electronics",
          description: `${value} is a leading global company with operations across multiple markets and divisions. The company has established itself as a key player in its industry with a focus on innovation and strategic partnerships.`,
          foundingDate: "2010-01-01",
          regions: ["North America", "Europe", "Asia Pacific"],
          annualRevenue: "$3.2B",
          lastFunding: "$200M Series D (2023)",
          totalFunding: "$500M",
          website: `https://${value.toLowerCase().replace(/\s+/g, "")}.com`,
          employees: 4200,
          targetAudience: "Global consumers and enterprise clients",
          sponsorshipTypes: ["Sports Events", "Tech Conferences", "Community Programs"],
          keySponsorships: ["Innovation Summit", "Global Partnership Awards", "Technology Excellence Program"],
          strategicFocus: "Expanding global market presence and strategic partnerships",
          profileURL: `/companies/${value.toLowerCase().replace(/\s+/g, "-")}`,
          outreachProfile: "Actively seeking strategic partnerships and sponsorship opportunities",
          lastUpdated: new Date().toISOString().split("T")[0],
          logo: "/placeholder.svg?height=80&width=80",
          inCRM: false,
          contacts: [
            {
              name: "John Smith",
              email: `john.smith@${value.toLowerCase().replace(/\s+/g, "")}.com`,
              title: "VP of Strategic Partnerships",
              source: "AI Research",
              relationshipNotes: "Generated contact based on company research",
            },
          ],
        }
      }

      setSearchResults([companyResult])
      setSearchStage("results")
    }
  }

  return (
    <div className="flex h-screen flex-col">
      <TopNavigation />
      <div className="flex flex-1 overflow-hidden">
        <LeftSidebar onSearch={handleSearch} />
        <MainContent
          searchResults={searchResults}
          selectedCompany={selectedCompany}
          onSelectCompany={handleCompanySelect}
          onApprove={handleApprove}
          onReject={handleReject}
          searchStage={searchStage}
          onChatResponse={handleChatResponse}
        />
        <RightSidebar />
      </div>
    </div>
  )
}
