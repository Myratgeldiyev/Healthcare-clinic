"use client"

import type React from "react"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProtectedRoute } from "@/components/protected-route"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChatBox, type Message } from "@/components/chat-box"
import { Send, Loader2 } from "lucide-react"
import { motion } from "framer-motion"

// Simulated responses from clinic assistant
const simulatedResponses = [
  "Thank you for reaching out! How can I assist you today?",
  "I'm here to help. Our clinic is open Monday through Friday, 8 AM to 6 PM.",
  "You can book an appointment through our online booking system or call us at (555) 123-4567.",
  "Our doctors specialize in General Medicine, Cardiology, Pediatrics, and Orthopedics.",
  "We accept most major insurance plans. Please bring your insurance card to your appointment.",
  "For urgent medical issues, please call 911 or visit the nearest emergency room.",
  "Would you like me to help you schedule an appointment?",
  "Our clinic is located at 123 Medical Center Dr, Health City, HC 12345.",
  "You can cancel or reschedule your appointment up to 24 hours in advance.",
  "Is there anything else I can help you with today?",
]

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your virtual clinic assistant. How can I help you today?",
      sender: "assistant",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim() || isTyping) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate assistant typing delay
    setTimeout(
      () => {
        const randomResponse = simulatedResponses[Math.floor(Math.random() * simulatedResponses.length)]
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: randomResponse,
          sender: "assistant",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, assistantMessage])
        setIsTyping(false)
      },
      1000 + Math.random() * 1500,
    )
  }

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen flex-col">
        <Navbar />

        <div className="flex-1 px-4 py-12">
          <div className="container mx-auto max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Chat with Us</h1>
              <p className="mt-2 text-muted-foreground">Get instant answers to your healthcare questions</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-8"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Clinic Assistant</CardTitle>
                  <CardDescription>Ask about appointments, services, or general inquiries</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <ChatBox messages={messages} />

                  {isTyping && (
                    <div className="flex items-center gap-2 px-4 pb-4 text-sm text-muted-foreground">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Assistant is typing...</span>
                    </div>
                  )}

                  <form onSubmit={handleSendMessage} className="border-t p-4">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Type your message..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        disabled={isTyping}
                        className="flex-1"
                      />
                      <Button type="submit" disabled={!inputValue.trim() || isTyping}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>

              <div className="mt-4 rounded-lg bg-muted p-4 text-sm text-muted-foreground">
                <p className="font-semibold">Quick Tips:</p>
                <ul className="mt-2 list-inside list-disc space-y-1">
                  <li>Ask about our services and specialties</li>
                  <li>Inquire about appointment availability</li>
                  <li>Get information about insurance and billing</li>
                  <li>Learn about our clinic hours and location</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>

        <Footer />
      </div>
    </ProtectedRoute>
  )
}
