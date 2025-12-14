"use client"

import { useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { Bot, User } from "lucide-react"

export interface Message {
  id: string
  text: string
  sender: "user" | "assistant"
  timestamp: Date
}

interface ChatBoxProps {
  messages: Message[]
}

export function ChatBox({ messages }: ChatBoxProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <div className="flex h-[500px] flex-col gap-4 overflow-y-auto p-4">
      {messages.map((message) => (
        <div key={message.id} className={cn("flex gap-3", message.sender === "user" ? "flex-row-reverse" : "flex-row")}>
          <Avatar className="h-8 w-8">
            <AvatarFallback className={message.sender === "user" ? "bg-primary" : "bg-secondary"}>
              {message.sender === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
            </AvatarFallback>
          </Avatar>

          <Card
            className={cn(
              "max-w-[80%] p-3",
              message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted",
            )}
          >
            <p className="text-sm leading-relaxed">{message.text}</p>
            <p
              className={cn(
                "mt-1 text-xs",
                message.sender === "user" ? "text-primary-foreground/70" : "text-muted-foreground",
              )}
            >
              {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </p>
          </Card>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  )
}
