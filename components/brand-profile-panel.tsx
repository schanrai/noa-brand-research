"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import ContactInfoPanel from "./contact-info-panel"

interface BrandProfilePanelProps {
  company: any
}

export default function BrandProfilePanel({ company }: BrandProfilePanelProps) {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <Card>
      <CardContent className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4 bg-edge border border-gray-200 p-1 rounded-lg">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-sm text-gray-600 hover:text-black transition-colors"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="report"
              className="data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-sm text-gray-600 hover:text-black transition-colors"
            >
              Full Report
            </TabsTrigger>
            <TabsTrigger
              value="contacts"
              className="data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-sm text-gray-600 hover:text-black transition-colors"
            >
              Contacts
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">Company Overview</h3>
              <p className="mt-2 text-muted-foreground">{company.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium">Industry</h4>
                <p className="text-sm text-muted-foreground">{company.industry}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium">Founded</h4>
                <p className="text-sm text-muted-foreground">{new Date(company.foundingDate).toLocaleDateString()}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium">Website</h4>
                <p className="text-sm text-muted-foreground">{company.website}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium">Headquarters</h4>
                <p className="text-sm text-muted-foreground">{company.hqLocation}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium">Annual Revenue</h4>
                <p className="text-sm text-muted-foreground">{company.annualRevenue}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium">Employees</h4>
                <p className="text-sm text-muted-foreground">{company.employees.toLocaleString()}</p>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium">Sponsorship Type</h4>
              <p className="text-sm text-muted-foreground">
                {company.sponsorshipTypes?.join(", ") || "Sports event, Conference, Non-profit"}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-medium">Strategic Focus</h4>
              <p className="text-sm text-muted-foreground">{company.strategicFocus}</p>
            </div>

            <div className="flex justify-end pt-2">
              <p className="text-xs text-muted-foreground">
                <span className="font-medium">Last Updated:</span> {new Date(company.lastUpdated).toLocaleDateString()}
              </p>
            </div>
          </TabsContent>

          <TabsContent value="report" className="space-y-4">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="company-background">
                <AccordionTrigger>Company Background</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground">
                    {company.companyName} was founded on {new Date(company.foundingDate).toLocaleDateString()}
                    and has grown to become a significant player in the {company.industry} industry. With headquarters
                    in {company.hqLocation}, the company has expanded its operations to {company.regions.join(", ")}.
                    The company currently employs approximately
                    {company.employees.toLocaleString()} people worldwide.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="financial-overview">
                <AccordionTrigger>Financial Overview</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground">
                    {company.companyName} reports annual revenue of {company.annualRevenue}. Their last funding round
                    was {company.lastFunding}, bringing their total funding to {company.totalFunding}. The company has
                    shown steady growth in the {company.industry} sector, with strategic investments in
                    {company.division}.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="sponsorship-history">
                <AccordionTrigger>Sponsorship History</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground">
                    {company.companyName} has been active in sponsorships across
                    {company.sponsorshipTypes.join(", ")}. Key sponsorships include
                    {company.keySponsorships.join(", ")}. Their sponsorship strategy aligns with their focus on{" "}
                    {company.strategicFocus}.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="market-position">
                <AccordionTrigger>Market Position</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground">
                    Within the {company.industry} industry, {company.companyName} has positioned itself as a key player
                    in the {company.division} division. Their target audience primarily consists of{" "}
                    {company.targetAudience}. The company's strategic focus on {company.strategicFocus} has helped them
                    maintain a competitive edge in the market.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div>
              <h3 className="mb-2 text-lg font-semibold">Sources</h3>
              <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                <li>
                  Company website: <span className="text-primary">{company.website}</span>
                </li>
                <li>Annual report (2023)</li>
                <li>Industry analysis by Market Research Firm</li>
                <li>Press releases and news articles</li>
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="contacts">
            {company.contacts.map((contact: any, index: number) => (
              <ContactInfoPanel key={index} contact={contact} />
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
