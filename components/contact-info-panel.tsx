"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Mail, User } from "lucide-react"

interface ContactInfoPanelProps {
  contact: any
}

export default function ContactInfoPanel({ contact }: ContactInfoPanelProps) {
  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <Avatar className="h-12 w-12">
            <AvatarFallback className="bg-primary text-primary-foreground">
              {contact.name
                .split(" ")
                .map((n: string) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          <div className="space-y-2">
            <div>
              <h3 className="text-lg font-semibold">{contact.name}</h3>
              <p className="text-sm text-muted-foreground">{contact.title}</p>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{contact.email}</span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <User className="h-4 w-4 text-muted-foreground" />
              <span>Source: {contact.source}</span>
            </div>

            <div className="mt-2">
              <h4 className="text-sm font-medium">Relationship Notes</h4>
              <p className="text-sm text-muted-foreground">{contact.relationshipNotes}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
