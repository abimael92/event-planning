"use client"

import type React from "react"

import { useState } from "react"
import { Send, Paperclip, Smile, Calendar, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export function ChatInput() {
  const [message, setMessage] = useState("")

  const handleSend = () => {
    if (message.trim()) {
      // Handle sending message
      console.log("Sending message:", message)
      setMessage("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="p-6 border-t border-gray-100 bg-white">
      <div className="flex items-end space-x-3">
        <div className="flex-1">
          <div className="relative">
            <Input
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pr-12 py-3 rounded-xl border-gray-200 focus:border-purple-300 focus:ring-purple-200"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
              <Button variant="ghost" size="sm" className="p-1 h-auto">
                <Smile className="w-4 h-4 text-gray-400" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm">
                <Paperclip className="w-4 h-4 text-gray-400" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48 p-2">
              <div className="space-y-1">
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Meeting
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Send Quote
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <Paperclip className="w-4 h-4 mr-2" />
                  Attach File
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          <div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={handleSend}
              disabled={!message.trim()}
              className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl px-4 py-3"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
