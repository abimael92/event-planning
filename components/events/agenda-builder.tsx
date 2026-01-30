"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, GripVertical, Mic, Music, Camera, Utensils, Gift, Clock } from "lucide-react"

const activityIcons = {
  speech: Mic,
  music: Music,
  photo: Camera,
  dining: Utensils,
  ceremony: Gift,
  break: Clock,
}

const initialAgenda = [
  { id: "1", time: "4:00 PM", title: "Guest Arrival & Cocktails", type: "ceremony", duration: 60 },
  { id: "2", time: "5:00 PM", title: "Wedding Ceremony", type: "ceremony", duration: 45 },
  { id: "3", time: "5:45 PM", title: "Photo Session", type: "photo", duration: 30 },
  { id: "4", time: "6:15 PM", title: "Reception Begins", type: "music", duration: 30 },
  { id: "5", time: "6:45 PM", title: "Dinner Service", type: "dining", duration: 90 },
  { id: "6", time: "8:15 PM", title: "Speeches & Toasts", type: "speech", duration: 30 },
  { id: "7", time: "8:45 PM", title: "First Dance", type: "music", duration: 15 },
  { id: "8", time: "9:00 PM", title: "Dancing & Celebration", type: "music", duration: 180 },
]

export function AgendaBuilder() {
  const [agenda, setAgenda] = useState(initialAgenda)
  const [showAddModal, setShowAddModal] = useState(false)
  const [newItem, setNewItem] = useState({ title: "", type: "ceremony", duration: 30 })

  const addAgendaItem = () => {
    const newId = (agenda.length + 1).toString()
    const lastItem = agenda[agenda.length - 1]
    const lastTime = new Date(`2024-01-01 ${lastItem.time}`)
    lastTime.setMinutes(lastTime.getMinutes() + lastItem.duration)
    const newTime = lastTime.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })

    setAgenda([
      ...agenda,
      {
        id: newId,
        time: newTime,
        title: newItem.title,
        type: newItem.type as keyof typeof activityIcons,
        duration: newItem.duration,
      },
    ])

    setNewItem({ title: "", type: "ceremony", duration: 30 })
    setShowAddModal(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold">Agenda Builder</h1>
          <p className="text-muted-foreground mt-2">Drag and drop to reorder your event timeline</p>
        </div>

        <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
          <DialogTrigger asChild>
            <Button className="gradient-royal text-white hover:glow-primary transition-all duration-300">
              <Plus className="w-4 h-4 mr-2" />
              Add Activity
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Activity</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Activity Title</Label>
                <Input
                  id="title"
                  value={newItem.title}
                  onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                  placeholder="e.g., Cake Cutting Ceremony"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input
                  id="duration"
                  type="number"
                  value={newItem.duration}
                  onChange={(e) => setNewItem({ ...newItem, duration: Number.parseInt(e.target.value) })}
                />
              </div>
              <Button onClick={addAgendaItem} className="w-full">
                Add Activity
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Timeline View */}
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Event Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Reorder.Group axis="y" values={agenda} onReorder={setAgenda} className="space-y-3">
                {agenda.map((item) => {
                  const IconComponent = activityIcons[item.type as keyof typeof activityIcons]
                  return (
                    <Reorder.Item key={item.id} value={item}>
                      <div
                        whileHover={{ scale: 1.02 }}
                        whileDrag={{ scale: 1.05 }}
                        className="flex items-center gap-4 p-4 bg-gradient-to-r from-white to-gray-50 rounded-xl border-2 border-gray-100 hover:border-primary/30 transition-all duration-300 cursor-grab active:cursor-grabbing"
                      >
                        <GripVertical className="w-5 h-5 text-muted-foreground" />

                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <IconComponent className="w-6 h-6 text-primary" />
                        </div>

                        <div className="flex-1">
                          <h3 className="font-semibold">{item.title}</h3>
                          <p className="text-sm text-muted-foreground">{item.duration} minutes</p>
                        </div>

                        <div className="text-right">
                          <p className="font-semibold text-primary">{item.time}</p>
                        </div>
                      </div>
                    </Reorder.Item>
                  )
                })}
              </Reorder.Group>
            </CardContent>
          </Card>
        </div>

        {/* Activity Categories */}
        <div className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Activity Categories</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.entries(activityIcons).map(([type, IconComponent]) => (
                <div
                  key={type}
                  className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                    <IconComponent className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-medium capitalize">{type}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Timeline Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Total Activities</span>
                  <span className="font-semibold">{agenda.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Duration</span>
                  <span className="font-semibold">
                    {Math.floor(agenda.reduce((sum, item) => sum + item.duration, 0) / 60)}h{" "}
                    {agenda.reduce((sum, item) => sum + item.duration, 0) % 60}m
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Start Time</span>
                  <span className="font-semibold">{agenda[0]?.time}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
