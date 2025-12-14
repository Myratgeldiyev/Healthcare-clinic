"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

interface User {
  id: string
  email: string
  name: string
  phone?: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string, phone?: string) => Promise<boolean>
  logout: () => void
  updateProfile: (updates: Partial<User>) => void
}

// Mock user database
const mockUsers: Array<User & { password: string }> = [
  {
    id: "1",
    email: "demo@clinic.com",
    password: "demo123",
    name: "Demo User",
    phone: "+1234567890",
  },
]

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500))

        const user = mockUsers.find((u) => u.email === email && u.password === password)

        if (user) {
          const { password: _, ...userData } = user
          set({ user: userData, isAuthenticated: true })
          return true
        }
        return false
      },

      register: async (name: string, email: string, password: string, phone?: string) => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500))

        // Check if user already exists
        if (mockUsers.find((u) => u.email === email)) {
          return false
        }

        const newUser = {
          id: `${mockUsers.length + 1}`,
          email,
          password,
          name,
          phone,
        }

        mockUsers.push(newUser)
        const { password: _, ...userData } = newUser
        set({ user: userData, isAuthenticated: true })
        return true
      },

      logout: () => {
        set({ user: null, isAuthenticated: false })
      },

      updateProfile: (updates: Partial<User>) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        }))
      },
    }),
    {
      name: "auth-storage",
    },
  ),
)
