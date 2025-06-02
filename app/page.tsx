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
      // Simulate search based on the conversation
      const filteredResults = brandsData.companies.filter(
        (company) =>
          company.regions.some((region) => region.toLowerCase().includes(value.toLowerCase())) ||
          company.division.toLowerCase().includes(value.toLowerCase()),
      )
      setSearchResults(filteredResults)
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
