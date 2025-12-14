"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, X } from "lucide-react"
import type { Appointment } from "@/store/appointment-store"
import { format } from "date-fns"

interface AppointmentCardProps {
  appointment: Appointment
  onCancel?: (id: string) => void
}

export function AppointmentCard({ appointment, onCancel }: AppointmentCardProps) {
  const getStatusColor = (status: Appointment["status"]) => {
    switch (status) {
      case "upcoming":
        return "bg-secondary text-secondary-foreground"
      case "completed":
        return "bg-primary text-primary-foreground"
      case "cancelled":
        return "bg-destructive text-destructive-foreground"
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg">{appointment.doctorName}</CardTitle>
          <Badge className={getStatusColor(appointment.status)}>{appointment.status}</Badge>
        </div>
        <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span>{format(new Date(appointment.date), "MMMM dd, yyyy")}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span>{appointment.time}</span>
        </div>
      </CardContent>
      {appointment.status === "upcoming" && onCancel && (
        <CardFooter>
          <Button variant="destructive" size="sm" onClick={() => onCancel(appointment.id)} className="w-full">
            <X className="mr-2 h-4 w-4" />
            Cancel Appointment
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
