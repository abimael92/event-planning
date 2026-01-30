"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from '../../app/shared/lib/utils'

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

interface ChatSidebarProps {
  conversations: Conversation[]
  selectedConversation: Conversation | null
  onSelectConversation: (conversation: Conversation) => void
}

export function ChatSidebar({ conversations, selectedConversation, onSelectConversation }: ChatSidebarProps) {
  return (
    <div className="flex-1 overflow-y-auto">
      {conversations.map((conversation, index) => (
        <div
          key={conversation.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={cn(
            "p-4 border-b border-gray-50 cursor-pointer hover:bg-gray-50 transition-colors",
            selectedConversation?.id === conversation.id && "bg-purple-50 border-purple-100",
          )}
          onClick={() => onSelectConversation(conversation)}
        >
          <div className="flex items-start space-x-3">
            <div className="relative">
              <Avatar className="w-10 h-10">
                <AvatarImage src={conversation.vendorAvatar || "/placeholder.svg"} />
                <AvatarFallback>{conversation.vendorName[0]}</AvatarFallback>
              </Avatar>
              {conversation.isOnline && (
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-semibold text-gray-900 truncate">{conversation.vendorName}</h3>
                <span className="text-xs text-gray-500">{conversation.timestamp}</span>
              </div>
              <div className="flex items-center space-x-2 mb-2">
                <Badge variant="outline" className="text-xs">
                  {conversation.vendorType}
                </Badge>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs text-gray-500 truncate">{conversation.eventName}</span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600 truncate flex-1">{conversation.lastMessage}</p>
                {conversation.unreadCount > 0 && (
                  <Badge className="ml-2 bg-purple-600 text-white text-xs px-2 py-1">{conversation.unreadCount}</Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
