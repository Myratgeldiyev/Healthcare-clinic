"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { useAuthStore } from "@/store/auth-store"
import { useAppointmentStore } from "@/store/appointment-store"
import { AlertCircle, CalendarIcon, CheckCircle2, ChevronRight } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { motion, AnimatePresence } from "framer-motion"
import { format, addDays, isAfter, isBefore, startOfDay } from "date-fns"

export default function AppointmentsPage() {
  const router = useRouter()
  const { isAuthenticated, user } = useAuthStore()
  const { doctors, addAppointment, getAvailableTimes } = useAppointmentStore()

  const [step, setStep] = useState(1)
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleDoctorSelect = (doctorId: string) => {
    setSelectedDoctor(doctorId)
    setSelectedDate(undefined)
    setSelectedTime(null)
  }

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date)
    setSelectedTime(null)
  }

  const handleBookAppointment = () => {
    if (!isAuthenticated || !user) {
      router.push("/login")
      return
    }

    if (!selectedDoctor || !selectedDate || !selectedTime) return

    const doctor = doctors.find((d) => d.id === selectedDoctor)
    if (!doctor) return

    addAppointment({
      userId: user.id,
      doctorId: doctor.id,
      doctorName: doctor.name,
      specialty: doctor.specialty,
      date: selectedDate.toISOString(),
      time: selectedTime,
      status: "upcoming",
    })

    setShowSuccess(true)
    setTimeout(() => {
      router.push("/profile")
    }, 2000)
  }

  const doctor = selectedDoctor ? doctors.find((d) => d.id === selectedDoctor) : null
  const availableTimes =
    selectedDoctor && selectedDate ? getAvailableTimes(selectedDoctor, selectedDate.toISOString()) : []

  // Date validation
  const today = startOfDay(new Date())
  const maxDate = addDays(today, 60)

  const isDayAvailable = (date: Date) => {
    if (!doctor) return false
    const dayName = format(date, "EEEE")
    return doctor.availability.includes(dayName)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <div className="flex-1 px-4 py-12">
        <div className="container mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Book an Appointment</h1>
            <p className="mt-2 text-muted-foreground">Schedule your visit in three easy steps</p>
          </motion.div>

          {/* Progress Steps */}
          <div className="mt-8 flex items-center justify-between">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex flex-1 items-center">
                <div className="flex items-center gap-2">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full font-semibold ${
                      step >= s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {s}
                  </div>
                  <span className="hidden text-sm font-medium md:inline">
                    {s === 1 ? "Select Doctor" : s === 2 ? "Choose Date" : "Pick Time"}
                  </span>
                </div>
                {s < 3 && <ChevronRight className="mx-2 h-5 w-5 flex-1 text-muted-foreground" />}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {showSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="mt-8"
              >
                <Alert className="border-primary bg-primary/10">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <AlertDescription className="text-base">
                    Appointment booked successfully! Redirecting to your profile...
                  </AlertDescription>
                </Alert>
              </motion.div>
            ) : (
              <>
                {/* Step 1: Select Doctor */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="mt-8"
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle>Select a Doctor</CardTitle>
                        <CardDescription>Choose the specialist you would like to see</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <RadioGroup value={selectedDoctor || ""} onValueChange={handleDoctorSelect}>
                          <div className="grid gap-4 md:grid-cols-2">
                            {doctors.map((doc) => (
                              <Label
                                key={doc.id}
                                htmlFor={doc.id}
                                className="cursor-pointer rounded-lg border-2 p-4 transition-colors hover:border-primary [&:has(:checked)]:border-primary [&:has(:checked)]:bg-primary/5"
                              >
                                <RadioGroupItem value={doc.id} id={doc.id} className="sr-only" />
                                <div className="flex items-start gap-4">
                                  <img
                                    src={doc.image || "/placeholder.svg"}
                                    alt={doc.name}
                                    className="h-20 w-20 rounded-lg object-cover"
                                  />
                                  <div className="flex-1">
                                    <div className="font-semibold">{doc.name}</div>
                                    <div className="text-sm text-muted-foreground">{doc.specialty}</div>
                                    <div className="mt-2 flex flex-wrap gap-1">
                                      {doc.availability.slice(0, 3).map((day) => (
                                        <Badge key={day} variant="secondary" className="text-xs">
                                          {day.substring(0, 3)}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </Label>
                            ))}
                          </div>
                        </RadioGroup>
                        <Button className="mt-6 w-full" disabled={!selectedDoctor} onClick={() => setStep(2)}>
                          Continue
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {/* Step 2: Select Date */}
                {step === 2 && doctor && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="mt-8"
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle>Choose a Date</CardTitle>
                        <CardDescription>
                          {doctor.name} is available on: {doctor.availability.join(", ")}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-center">
                          <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={handleDateSelect}
                            disabled={(date) =>
                              isBefore(date, today) || isAfter(date, maxDate) || !isDayAvailable(date)
                            }
                            className="rounded-md border"
                          />
                        </div>
                        {selectedDate && (
                          <Alert className="mt-4">
                            <CalendarIcon className="h-4 w-4" />
                            <AlertDescription>Selected: {format(selectedDate, "MMMM dd, yyyy")}</AlertDescription>
                          </Alert>
                        )}
                        <div className="mt-6 flex gap-2">
                          <Button variant="outline" className="w-full bg-transparent" onClick={() => setStep(1)}>
                            Back
                          </Button>
                          <Button className="w-full" disabled={!selectedDate} onClick={() => setStep(3)}>
                            Continue
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {/* Step 3: Select Time */}
                {step === 3 && selectedDate && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="mt-8"
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle>Select Time Slot</CardTitle>
                        <CardDescription>Choose an available time for your appointment</CardDescription>
                      </CardHeader>
                      <CardContent>
                        {availableTimes.length > 0 ? (
                          <RadioGroup value={selectedTime || ""} onValueChange={setSelectedTime}>
                            <div className="grid grid-cols-3 gap-3 md:grid-cols-4">
                              {availableTimes.map((time) => (
                                <Label
                                  key={time}
                                  htmlFor={time}
                                  className="cursor-pointer rounded-lg border-2 p-3 text-center transition-colors hover:border-primary [&:has(:checked)]:border-primary [&:has(:checked)]:bg-primary/5"
                                >
                                  <RadioGroupItem value={time} id={time} className="sr-only" />
                                  <div className="text-sm font-medium">{time}</div>
                                </Label>
                              ))}
                            </div>
                          </RadioGroup>
                        ) : (
                          <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>
                              No available time slots for this date. Please select a different date.
                            </AlertDescription>
                          </Alert>
                        )}
                        <div className="mt-6 flex gap-2">
                          <Button variant="outline" className="w-full bg-transparent" onClick={() => setStep(2)}>
                            Back
                          </Button>
                          <Button className="w-full" disabled={!selectedTime} onClick={handleBookAppointment}>
                            Confirm Booking
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </>
            )}
          </AnimatePresence>
        </div>
      </div>

      <Footer />
    </div>
  )
}
