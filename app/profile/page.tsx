"use client"

import type React from "react"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProtectedRoute } from "@/components/protected-route"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AppointmentCard } from "@/components/appointment-card"
import { useAuthStore } from "@/store/auth-store"
import { useAppointmentStore } from "@/store/appointment-store"
import { User, Calendar, CheckCircle2 } from "lucide-react"
import { motion } from "framer-motion"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function ProfilePage() {
  const { user, updateProfile } = useAuthStore()
  const { getUserAppointments, cancelAppointment } = useAppointmentStore()

  const [name, setName] = useState(user?.name || "")
  const [phone, setPhone] = useState(user?.phone || "")
  const [showSuccess, setShowSuccess] = useState(false)

  const appointments = user ? getUserAppointments(user.id) : []
  const upcomingAppointments = appointments.filter((apt) => apt.status === "upcoming")
  const pastAppointments = appointments.filter((apt) => apt.status === "completed" || apt.status === "cancelled")

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault()
    updateProfile({ name, phone })
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleCancelAppointment = (id: string) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      cancelAppointment(id)
    }
  }

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen flex-col">
        <Navbar />

        <div className="flex-1 px-4 py-12">
          <div className="container mx-auto max-w-6xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">My Profile</h1>
              <p className="mt-2 text-muted-foreground">Manage your account and appointments</p>
            </motion.div>

            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {/* Profile Info */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="lg:col-span-1"
              >
                <Card>
                  <CardHeader>
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                      <User className="h-10 w-10 text-primary" />
                    </div>
                    <CardTitle className="mt-4">{user?.name}</CardTitle>
                    <CardDescription>{user?.email}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleUpdateProfile} className="space-y-4">
                      {showSuccess && (
                        <Alert className="border-primary bg-primary/10">
                          <CheckCircle2 className="h-4 w-4 text-primary" />
                          <AlertDescription>Profile updated successfully!</AlertDescription>
                        </Alert>
                      )}

                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" value={user?.email} disabled className="bg-muted" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>

                      <Button type="submit" className="w-full">
                        Update Profile
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Appointments */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:col-span-2"
              >
                <Card>
                  <CardHeader>
                    <CardTitle>My Appointments</CardTitle>
                    <CardDescription>View and manage your scheduled appointments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="upcoming" className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="upcoming">Upcoming ({upcomingAppointments.length})</TabsTrigger>
                        <TabsTrigger value="past">Past ({pastAppointments.length})</TabsTrigger>
                      </TabsList>

                      <TabsContent value="upcoming" className="mt-6">
                        {upcomingAppointments.length > 0 ? (
                          <div className="grid gap-4">
                            {upcomingAppointments.map((appointment) => (
                              <AppointmentCard
                                key={appointment.id}
                                appointment={appointment}
                                onCancel={handleCancelAppointment}
                              />
                            ))}
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center py-12 text-center">
                            <Calendar className="h-12 w-12 text-muted-foreground" />
                            <h3 className="mt-4 text-lg font-semibold">No upcoming appointments</h3>
                            <p className="mt-2 text-sm text-muted-foreground">
                              You don't have any scheduled appointments yet.
                            </p>
                            <Button className="mt-6" asChild>
                              <a href="/appointments">Book an Appointment</a>
                            </Button>
                          </div>
                        )}
                      </TabsContent>

                      <TabsContent value="past" className="mt-6">
                        {pastAppointments.length > 0 ? (
                          <div className="grid gap-4">
                            {pastAppointments.map((appointment) => (
                              <AppointmentCard key={appointment.id} appointment={appointment} />
                            ))}
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center py-12 text-center">
                            <Calendar className="h-12 w-12 text-muted-foreground" />
                            <h3 className="mt-4 text-lg font-semibold">No past appointments</h3>
                            <p className="mt-2 text-sm text-muted-foreground">
                              Your appointment history will appear here.
                            </p>
                          </div>
                        )}
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </ProtectedRoute>
  )
}
