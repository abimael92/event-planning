"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Send, Paperclip, CheckCheck, Clock, Phone, Video } from "lucide-react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { mockConversations, mockMessages } from "@/data/mock-data"

const conversations = [
  {
    id: "1",
    name: "Salón Los Arcos",
    avatar: "SA",
    lastMessage: "Confirmado el horario para el 15 de junio",
    time: "10:30 AM",
    unread: 2,
    online: true
  },
  {
    id: "2",
    name: "Banquetes La Casona",
    avatar: "BC",
    lastMessage: "Menú personalizado listo para revisión",
    time: "Ayer",
    unread: 0,
    online: false
  },
  {
    id: "3",
    name: "Mariachi Los Chihuahuenses",
    avatar: "ML",
    lastMessage: "Repertorio actualizado enviado",
    time: "2 días",
    unread: 1,
    online: true
  },
  {
    id: "4",
    name: "Decoraciones Elegantes",
    avatar: "DE",
    lastMessage: "Presupuesto de decoración floral",
    time: "3 días",
    unread: 0,
    online: false
  }
]

export default function MessagesPage() {
  const [activeChat, setActiveChat] = useState("1")
  const [message, setMessage] = useState("")

  const activeConversation = conversations.find(c => c.id === activeChat)
  const currentMessages = mockMessages[activeChat] || []

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log("Sending:", message)
      setMessage("")
    }
  }
  
  return (
    <ProtectedRoute>
        <div className="h-full">
          <DashboardLayout>
            <div className="w-full h-[calc(100vh-8rem)] p-4 md:p-6 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
                {/* Conversations List */}
                <Card className="lg:col-span-1 overflow-hidden">
                  <CardHeader className="pb-4">
                    <CardTitle>Mensajes</CardTitle>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Buscar conversaciones..." className="pl-9" />
                    </div>
                  </CardHeader>
                  <CardContent className="p-0 overflow-y-auto max-h-[calc(100vh-16rem)]">
                    {conversations.map((convo) => (
                      <div
                        key={convo.id}
                        onClick={() => setActiveChat(convo.id)}
                        className={`
                    p-4 border-b cursor-pointer transition-colors
                    ${activeChat === convo.id ? 'bg-blue-50' : 'hover:bg-gray-50'}
                  `}
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <Avatar>
                              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
                                {convo.avatar}
                              </AvatarFallback>
                            </Avatar>
                            {convo.online && (
                              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <h4 className="font-semibold truncate">{convo.name}</h4>
                              <span className="text-xs text-muted-foreground">{convo.time}</span>
                            </div>
                            <p className="text-sm text-muted-foreground truncate">{convo.lastMessage}</p>
                          </div>
                          {convo.unread > 0 && (
                            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                              {convo.unread}
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Chat Area */}
                <Card className="lg:col-span-2 flex flex-col">
                  {activeConversation && (
                    <>
                      <CardHeader className="pb-4 border-b">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
                                {activeConversation.avatar}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <CardTitle>{activeConversation.name}</CardTitle>
                              <CardDescription className="flex items-center gap-1">
                                {activeConversation.online ? (
                                  <>
                                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                                    <span>En línea</span>
                                  </>
                                ) : (
                                  <>
                                    <Clock className="w-3 h-3" />
                                    <span>Visto hace 2h</span>
                                  </>
                                )}
                              </CardDescription>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon">
                              <Phone className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Video className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
                        {currentMessages.map((msg) => (
                          <div
                            key={msg.id}
                            className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div className={`
                        max-w-[70%] rounded-2xl p-4
                        ${msg.sender === 'me'
                                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-br-none'
                                : 'bg-gray-100 text-gray-900 rounded-bl-none'}
                      `}>
                              <p>{msg.text}</p>
                              <div className={`text-xs mt-2 flex items-center gap-1 ${msg.sender === 'me' ? 'text-blue-100' : 'text-gray-500'}`}>
                                {msg.time}
                                {msg.sender === 'me' && <CheckCheck className="w-3 h-3" />}
                              </div>
                            </div>
                          </div>
                        ))}
                      </CardContent>

                      <div className="p-4 border-t">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon">
                            <Paperclip className="w-4 h-4" />
                          </Button>
                          <Input
                            placeholder="Escribe un mensaje..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                            className="flex-1"
                          />
                          <Button onClick={handleSendMessage}>
                            <Send className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                </Card>
              </div>
            </div>
          </DashboardLayout>
        </div>
    </ProtectedRoute>
  )
}

