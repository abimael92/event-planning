"use client"

import { useEffect, useRef } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DollarSign } from "lucide-react"

interface Message {
  id: string
  content: string
  timestamp: string
  isFromUser: boolean
  type: "text" | "file" | "booking" | "quote"
  metadata?: any
}

interface Conversation {
  id: string
  vendorName: string
  vendorAvatar: string
  vendorType: string
  lastMessage: string
  timestamp: string
  unreadCount: number
  isOnline: boolean
  eventName: string
}

const mockMessages: Message[] = [
  {
    id: "1",
    content: "Hi! I'm interested in your catering services for my wedding on June 15th.",
    timestamp: "10:30 AM",
    isFromUser: true,
    type: "text",
  },
  {
    id: "2",
    content:
      "Hello! Congratulations on your upcoming wedding! I'd be delighted to help make your special day perfect. Could you tell me more about your guest count and preferred menu style?",
    timestamp: "10:32 AM",
    isFromUser: false,
    type: "text",
  },
  {
    id: "3",
    content: "We're expecting around 150 guests. We'd love a mix of elegant appetizers and a plated dinner service.",
    timestamp: "10:35 AM",
    isFromUser: true,
    type: "text",
  },
  {
    id: "4",
    content: "Perfect! I can accommodate 150 guests with our premium menu.",
    timestamp: "10:37 AM",
    isFromUser: false,
    type: "text",
  },
  {
    id: "5",
    content: "I've prepared a custom quote for your wedding catering.",
    timestamp: "10:40 AM",
    isFromUser: false,
    type: "quote",
    metadata: {
      title: "Wedding Catering Quote",
      amount: "$8,500",
      description: "Premium catering for 150 guests including appetizers, plated dinner, and service staff",
    },
  },
]

interface ChatMessagesProps {
  conversation: Conversation
}

export function ChatMessages({ conversation }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [])

  const renderMessage = (message: Message, index: number) => {
    const isUser = message.isFromUser

    return (
      <div
        key={message.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}
      >
        <div className={`flex ${isUser ? "flex-row-reverse" : "flex-row"} items-end space-x-2 max-w-xs lg:max-w-md`}>
          {!isUser && (
            <Avatar className="w-8 h-8">
              <AvatarImage src={conversation.vendorAvatar || "/placeholder.svg"} />
              <AvatarFallback>{conversation.vendorName[0]}</AvatarFallback>
            </Avatar>
          )}

          <div className={`${isUser ? "mr-2" : "ml-2"}`}>
            {message.type === "text" && (
              <div
                className={`px-4 py-2 rounded-2xl ${
                  isUser ? "bg-purple-600 text-white rounded-br-md" : "bg-gray-100 text-gray-900 rounded-bl-md"
                }`}
              >
                <p className="text-sm">{message.content}</p>
              </div>
            )}

            {message.type === "quote" && (
              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <div className="flex items-center space-x-2 mb-2">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-semibold text-gray-900">Quote</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">{message.metadata.title}</h4>
                <p className="text-sm text-gray-600 mb-3">{message.metadata.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-green-600">{message.metadata.amount}</span>
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                    Accept Quote
                  </Button>
                </div>
              </div>
            )}

            <span className={`text-xs text-gray-500 mt-1 block ${isUser ? "text-right" : "text-left"}`}>
              {message.timestamp}
            </span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
      <div className="space-y-4">
        {/* Date separator */}
        <div className="flex items-center justify-center">
          <div className="bg-white px-3 py-1 rounded-full shadow-sm border border-gray-200">
            <span className="text-xs text-gray-500">Today</span>
          </div>
        </div>

        {mockMessages.map((message, index) => renderMessage(message, index))}

        <div ref={messagesEndRef} />
      </div>
    </div>
  )
}
