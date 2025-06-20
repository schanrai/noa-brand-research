"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Database } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"

interface LeftSidebarProps {
  onSearch: (filters: any) => void
}

export default function LeftSidebar({ onSearch }: LeftSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [region, setRegion] = useState("")
  const [industry, setIndustry] = useState("")
  const [sponsorshipType, setSponsorshipType] = useState("")
  const [size, setSize] = useState("")
  const [revenue, setRevenue] = useState("")

  const handleSearch = () => {
    onSearch({
      query: searchQuery,
      region,
      industry,
      sponsorshipType,
      size,
      revenue,
    })
  }

  return (
    <div className="w-80 border-r border-gray-200 bg-edge pt-24 px-24 pb-24">
      <div className="space-y-24">
        <div>
          <div className="flex items-center gap-2 mb-24">
            <Database className="h-4 w-4 text-gray-600" />
            <h2 className="text-sm font-bold uppercase tracking-wide">Search CRM</h2>
          </div>
          <p className="text-body text-gray-600 mb-16 leading-relaxed">
            Search existing companies and contacts in your CRM database
          </p>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Company or contact..."
              className="pl-10 bg-white border-gray-200 text-body"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-24 flex-1 overflow-hidden">
          <h2 className="text-sm font-bold uppercase tracking-wide">Filters</h2>

          <ScrollArea className="h-[400px] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full">
            <div className="space-y-2 pr-4">
              <Select value={region} onValueChange={setRegion}>
                <SelectTrigger className="bg-white border-gray-200">
                  <SelectValue placeholder="Region" />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-200">
                  <div className="max-h-[200px] overflow-y-scroll">
                    <SelectItem value="north america">North America</SelectItem>
                    <SelectItem value="europe">Europe</SelectItem>
                    <SelectItem value="asia">Asia</SelectItem>
                    <SelectItem value="africa">Africa</SelectItem>
                    <SelectItem value="south america">South America</SelectItem>
                    <SelectItem value="oceania">Oceania</SelectItem>
                    <SelectItem value="middle east">Middle East</SelectItem>
                    <SelectItem value="central america">Central America</SelectItem>
                    <SelectItem value="caribbean">Caribbean</SelectItem>
                    <SelectItem value="eastern europe">Eastern Europe</SelectItem>
                  </div>
                </SelectContent>
              </Select>

              <Select value={industry} onValueChange={setIndustry}>
                <SelectTrigger className="bg-white border-gray-200">
                  <SelectValue placeholder="Industry" />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-200">
                  <div className="max-h-[200px] overflow-y-scroll">
                    <SelectItem value="agriculture">Agriculture, Forestry, Fishing, and Hunting</SelectItem>
                    <SelectItem value="arts">Arts, Entertainment, and Recreation</SelectItem>
                    <SelectItem value="construction">Construction</SelectItem>
                    <SelectItem value="consumer">Consumer Services</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="financial">Financial Services</SelectItem>
                    <SelectItem value="government">Government and Public Administration</SelectItem>
                    <SelectItem value="healthcare">Healthcare and Social Assistance</SelectItem>
                    <SelectItem value="hospitality">Hospitality and Food Services</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="mining">Mining, Oil, and Gas Extraction</SelectItem>
                    <SelectItem value="other">Other Professional and Administrative Support</SelectItem>
                    <SelectItem value="professional">Professional Services</SelectItem>
                    <SelectItem value="real estate">Real Estate and Rental Services</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="technology">Technology, Information, and Media</SelectItem>
                    <SelectItem value="transportation">Transportation, Logistics, and Warehousing</SelectItem>
                    <SelectItem value="utilities">Utilities & Energy</SelectItem>
                    <SelectItem value="waste">Waste Management and Remediation Services</SelectItem>
                  </div>
                </SelectContent>
              </Select>

              <Select value={sponsorshipType} onValueChange={setSponsorshipType}>
                <SelectTrigger className="bg-white border-gray-200">
                  <SelectValue placeholder="Sponsorship Type" />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-200">
                  <div className="max-h-[200px] overflow-y-scroll">
                    <SelectItem value="sports event">Sports Event</SelectItem>
                    <SelectItem value="sports team/player">Sports Team/Player</SelectItem>
                    <SelectItem value="music event">Music Event</SelectItem>
                    <SelectItem value="music artist">Music Artist</SelectItem>
                    <SelectItem value="arts & culture">Arts & Culture</SelectItem>
                    <SelectItem value="non-profit">Non-Profit</SelectItem>
                    <SelectItem value="environmental">Environmental</SelectItem>
                    <SelectItem value="conference">Conference</SelectItem>
                  </div>
                </SelectContent>
              </Select>

              <Select value={size} onValueChange={setSize}>
                <SelectTrigger className="bg-white border-gray-200">
                  <SelectValue placeholder="Size" />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-200">
                  <div className="max-h-[200px] overflow-y-scroll">
                    <SelectItem value="startup">Startup (1-50 employees)</SelectItem>
                    <SelectItem value="small">Small (51-500 employees)</SelectItem>
                    <SelectItem value="medium">Medium (501-2000 employees)</SelectItem>
                    <SelectItem value="large">Large (2001-10000 employees)</SelectItem>
                    <SelectItem value="enterprise">Enterprise (10000+ employees)</SelectItem>
                    <SelectItem value="micro">Micro (1-10 employees)</SelectItem>
                    <SelectItem value="sme">SME (11-250 employees)</SelectItem>
                  </div>
                </SelectContent>
              </Select>

              <Select value={revenue} onValueChange={setRevenue}>
                <SelectTrigger className="bg-white border-gray-200">
                  <SelectValue placeholder="Revenue" />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-200">
                  <div className="max-h-[200px] overflow-y-scroll">
                    <SelectItem value="under 10m">Under $10M</SelectItem>
                    <SelectItem value="10m-50m">$10M - $50M</SelectItem>
                    <SelectItem value="50m-100m">$50M - $100M</SelectItem>
                    <SelectItem value="100m-500m">$100M - $500M</SelectItem>
                    <SelectItem value="500m-1b">$500M - $1B</SelectItem>
                    <SelectItem value="1b-5b">$1B - $5B</SelectItem>
                    <SelectItem value="5b-10b">$5B - $10B</SelectItem>
                    <SelectItem value="over 10b">Over $10B</SelectItem>
                    <SelectItem value="under 1m">Under $1M</SelectItem>
                    <SelectItem value="1m-10m">$1M - $10M</SelectItem>
                  </div>
                </SelectContent>
              </Select>

              <div className="flex justify-end mt-4">
                <Button className="w-1/2 btn-premium bg-black text-white hover:bg-gray-800" onClick={handleSearch}>
                  Search
                </Button>
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}
