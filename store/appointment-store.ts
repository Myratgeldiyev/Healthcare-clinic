"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface Doctor {
  id: string
  name: string
  specialty: string
  image: string
  availability: string[]
}

export interface Appointment {
  id: string
  userId: string
  doctorId: string
  doctorName: string
  specialty: string
  date: string
  time: string
  status: "upcoming" | "completed" | "cancelled"
  createdAt: string
}

interface AppointmentState {
  appointments: Appointment[]
  doctors: Doctor[]
  addAppointment: (appointment: Omit<Appointment, "id" | "createdAt">) => void
  cancelAppointment: (id: string) => void
  getAvailableTimes: (doctorId: string, date: string) => string[]
  getUserAppointments: (userId: string) => Appointment[]
}

// Mock doctors data
const mockDoctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    specialty: "General Medicine",
    image: "/female-doctor.png",
    availability: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    specialty: "Cardiology",
    image: "/male-doctor-cardiologist.jpg",
    availability: ["Monday", "Wednesday", "Friday"],
  },
  {
    id: "3",
    name: "Dr. Emily Williams",
    specialty: "Pediatrics",
    image: "/female-pediatrician.png",
    availability: ["Tuesday", "Thursday", "Friday"],
  },
  {
    id: "4",
    name: "Dr. James Brown",
    specialty: "Orthopedics",
    image: "/male-orthopedic-doctor.png",
    availability: ["Monday", "Tuesday", "Thursday"],
  },
]

// Available time slots
const timeSlots = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
]

export const useAppointmentStore = create<AppointmentState>()(
  persist(
    (set, get) => ({
      appointments: [],
      doctors: mockDoctors,

      addAppointment: (appointment) => {
        const newAppointment: Appointment = {
          ...appointment,
          id: `${Date.now()}`,
          createdAt: new Date().toISOString(),
        }
        set((state) => ({
          appointments: [...state.appointments, newAppointment],
        }))
      },

      cancelAppointment: (id) => {
        set((state) => ({
          appointments: state.appointments.map((apt) =>
            apt.id === id ? { ...apt, status: "cancelled" as const } : apt,
          ),
        }))
      },

      getAvailableTimes: (doctorId, date) => {
        const appointments = get().appointments
        const bookedTimes = appointments
          .filter((apt) => apt.doctorId === doctorId && apt.date === date && apt.status !== "cancelled")
          .map((apt) => apt.time)

        return timeSlots.filter((time) => !bookedTimes.includes(time))
      },

      getUserAppointments: (userId) => {
        return get().appointments.filter((apt) => apt.userId === userId)
      },
    }),
    {
      name: "appointment-storage",
    },
  ),
)
