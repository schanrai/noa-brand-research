"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Database } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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
    <div className="w-80 border-r border-gray-200 bg-edge p-24">
      <div className="space-y-24">
        <div>
          <div className="flex items-center gap-2 mb-16">
            <Database className="h-4 w-4 text-gray-600" />
            <h2 className="text-sm font-bold uppercase tracking-wide">Search CRM</h2>
          </div>
          <p className="text-xs text-gray-600 mb-16 leading-relaxed">
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

        <div className="space-y-24">
          <h2 className="text-sm font-bold uppercase tracking-wide">Filters</h2>

          <div className="space-y-2">
            <Select value={region} onValueChange={setRegion}>
              <SelectTrigger className="bg-white border-gray-200">
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-200">
                <SelectItem value="north america">North America</SelectItem>
                <SelectItem value="europe">Europe</SelectItem>
                <SelectItem value="asia">Asia</SelectItem>
                <SelectItem value="africa">Africa</SelectItem>
              </SelectContent>
            </Select>

            <Select value={industry} onValueChange={setIndustry}>
              <SelectTrigger className="bg-white border-gray-200">
                <SelectValue placeholder="Industry" />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-200">
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="energy">Energy</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
                <SelectItem value="transportation">Transportation</SelectItem>
                <SelectItem value="food & beverage">Food & Beverage</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sponsorshipType} onValueChange={setSponsorshipType}>
              <SelectTrigger className="bg-white border-gray-200">
                <SelectValue placeholder="Sponsorship Type" />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-200">
                <SelectItem value="sports events">Sports Events</SelectItem>
                <SelectItem value="conferences">Conferences</SelectItem>
                <SelectItem value="educational">Educational Programs</SelectItem>
                <SelectItem value="community">Community Projects</SelectItem>
              </SelectContent>
            </Select>

            <Select value={size} onValueChange={setSize}>
              <SelectTrigger className="bg-white border-gray-200">
                <SelectValue placeholder="Size" />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-200">
                <SelectItem value="small">Small (&lt;500 employees)</SelectItem>
                <SelectItem value="medium">Medium (500-2000 employees)</SelectItem>
                <SelectItem value="large">Large (2000+ employees)</SelectItem>
              </SelectContent>
            </Select>

            <Select value={revenue} onValueChange={setRevenue}>
              <SelectTrigger className="bg-white border-gray-200">
                <SelectValue placeholder="Revenue" />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-200">
                <SelectItem value="under 1b">Under $1B</SelectItem>
                <SelectItem value="1b-5b">$1B - $5B</SelectItem>
                <SelectItem value="over 5b">Over $5B</SelectItem>
              </SelectContent>
            </Select>

            <Button className="w-1/2 btn-premium bg-black text-white hover:bg-gray-800 mt-4" onClick={handleSearch}>
              Search
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
