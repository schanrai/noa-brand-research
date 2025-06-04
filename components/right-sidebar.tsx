"use client"

import { useState, useEffect } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import brandsData from "@/data/brands.json"

export default function RightSidebar() {
  const [chatHistory, setChatHistory] = useState<any[]>([])
  const [recentlyViewed, setRecentlyViewed] = useState<any[]>([])

  useEffect(() => {
    setChatHistory(brandsData.chatHistory)
    const recentIds = brandsData.recentlyViewed
    const recentCompanies = brandsData.companies.filter((company) => recentIds.includes(company.id))
    setRecentlyViewed(recentCompanies)
  }, [])

  return (
    <div className="w-80 border-l border-gray-200 bg-edge pt-24 px-24 pb-24">
      <div className="space-y-48">
        <div>
          <h2 className="mb-24 text-sm font-bold uppercase tracking-wide">AI Co-pilot History</h2>
          <ScrollArea className="h-[300px] rounded-lg border border-gray-200 bg-white p-16">
            <div className="space-y-16">
              {chatHistory.map((message, index) => (
                <div key={index} className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg p-16 ${
                      message.role === "assistant" ? "bg-deep text-gray-600" : "bg-black text-white"
                    }`}
                  >
                    <p className="text-sm text-body leading-relaxed">{message.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        <Separator className="bg-gray-200" />

        <div>
          <h2 className="mb-24 text-sm font-bold uppercase tracking-wide">Recently Viewed Companies</h2>
          <div className="space-y-8">
            {recentlyViewed.map((company) => (
              <div
                key={company.id}
                className="flex items-center gap-16 rounded-lg p-16 hover:bg-white transition-all duration-200 cursor-pointer hover-scale"
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage src={company.logo || "/placeholder.svg"} alt={company.companyName} />
                  <AvatarFallback className="bg-deep text-black font-bold text-xs">
                    {company.companyName.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-bold uppercase tracking-wide">{company.companyName}</p>
                  <p className="text-xs text-gray-600 uppercase tracking-wide">{company.industry}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
