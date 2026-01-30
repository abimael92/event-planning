"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { MapPin, Music, Utensils, Camera, CalendarIcon, DollarSign, Plus, CheckCircle } from "lucide-react"
import { format } from "date-fns"

const categoryIcons = {
  venue: MapPin,
  entertainment: Music,
  catering: Utensils,
  decoration: Camera,
}

const initialTasks = [
  {
    id: "1",
    category: "venue",
    title: "Book ceremony venue",
    completed: true,
    dueDate: new Date("2024-05-15"),
    vendor: "The Grand Ballroom",
    cost: 5000,
  },
  {
    id: "2",
    category: "venue",
    title: "Confirm reception hall",
    completed: true,
    dueDate: new Date("2024-05-20"),
    vendor: "The Grand Ballroom",
    cost: 8000,
  },
  {
    id: "3",
    category: "entertainment",
    title: "Hire wedding DJ",
    completed: false,
    dueDate: new Date("2024-06-01"),
    vendor: "Harmony DJ Services",
    cost: 1500,
  },
  {
    id: "4",
    category: "entertainment",
    title: "Book live band",
    completed: false,
    dueDate: new Date("2024-06-05"),
    vendor: "",
    cost: 3000,
  },
  {
    id: "5",
    category: "catering",
    title: "Finalize menu selection",
    completed: false,
    dueDate: new Date("2024-05-25"),
    vendor: "Elite Catering Co.",
    cost: 12000,
  },
  {
    id: "6",
    category: "catering",
    title: "Arrange bar service",
    completed: false,
    dueDate: new Date("2024-05-30"),
    vendor: "Elite Catering Co.",
    cost: 2500,
  },
  {
    id: "7",
    category: "decoration",
    title: "Order floral arrangements",
    completed: false,
    dueDate: new Date("2024-06-10"),
    vendor: "Bloom & Blossom",
    cost: 2000,
  },
  {
    id: "8",
    category: "decoration",
    title: "Setup lighting design",
    completed: false,
    dueDate: new Date("2024-06-12"),
    vendor: "",
    cost: 1800,
  },
]

export function ChecklistTasks() {
  const [tasks, setTasks] = useState(initialTasks)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [showAddTask, setShowAddTask] = useState(false)

  const toggleTask = (taskId: string) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)))
  }

  const categories = Object.keys(categoryIcons) as Array<keyof typeof categoryIcons>
  const completedTasks = tasks.filter((task) => task.completed).length
  const totalTasks = tasks.length
  const completionPercentage = (completedTasks / totalTasks) * 100

  const filteredTasks = selectedCategory ? tasks.filter((task) => task.category === selectedCategory) : tasks

  const getCategoryColor = (category: string) => {
    const colors = {
      venue: "bg-blue-100 text-blue-700 border-blue-200",
      entertainment: "bg-purple-100 text-purple-700 border-purple-200",
      catering: "bg-green-100 text-green-700 border-green-200",
      decoration: "bg-pink-100 text-pink-700 border-pink-200",
    }
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-700"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold">Tasks & Checklist</h1>
          <p className="text-muted-foreground mt-2">Track your event planning progress</p>
        </div>

        <Button
          onClick={() => setShowAddTask(true)}
          className="gradient-royal text-white hover:glow-primary transition-all duration-300"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Task
        </Button>
      </div>

      {/* Progress Overview */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Overall Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">
                {completedTasks} of {totalTasks} tasks completed
              </span>
              <span className="text-2xl font-bold text-primary">{Math.round(completionPercentage)}%</span>
            </div>
            <Progress value={completionPercentage} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Category Filters */}
      <div className="flex gap-3 flex-wrap">
        <Button
          variant={selectedCategory === null ? "default" : "outline"}
          onClick={() => setSelectedCategory(null)}
          className="capitalize"
        >
          All Categories
        </Button>
        {categories.map((category) => {
          const IconComponent = categoryIcons[category]
          const categoryTasks = tasks.filter((task) => task.category === category)
          const completedInCategory = categoryTasks.filter((task) => task.completed).length

          return (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="capitalize flex items-center gap-2"
            >
              <IconComponent className="w-4 h-4" />
              {category}
              <Badge variant="secondary" className="ml-1">
                {completedInCategory}/{categoryTasks.length}
              </Badge>
            </Button>
          )
        })}
      </div>

      {/* Tasks Grid */}
      <div className="grid gap-4">
        <AnimatePresence>
          {filteredTasks.map((task) => {
            const IconComponent = categoryIcons[task.category as keyof typeof categoryIcons]
            const isOverdue = new Date() > task.dueDate && !task.completed

            return (
              <div
                key={task.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: task.completed ? 0.6 : 1,
                  y: 0,
                  scale: task.completed ? 0.98 : 1,
                }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card
                  className={`border-2 transition-all duration-300 hover:shadow-lg ${
                    task.completed
                      ? "bg-green-50 border-green-200"
                      : isOverdue
                        ? "bg-red-50 border-red-200"
                        : "bg-white border-gray-200 hover:border-primary/30"
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Checkbox checked={task.completed} onCheckedChange={() => toggleTask(task.id)} className="mt-1" />

                      <div className="flex-1 space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center ${getCategoryColor(task.category)}`}
                            >
                              <IconComponent className="w-5 h-5" />
                            </div>
                            <div>
                              <h3
                                className={`font-semibold ${task.completed ? "line-through text-muted-foreground" : ""}`}
                              >
                                {task.title}
                              </h3>
                              <Badge variant="outline" className="mt-1 capitalize">
                                {task.category}
                              </Badge>
                            </div>
                          </div>

                          <div className="text-right space-y-1">
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <CalendarIcon className="w-4 h-4" />
                              <span className={isOverdue ? "text-red-600 font-semibold" : ""}>
                                {format(task.dueDate, "MMM dd")}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 text-sm font-semibold">
                              <DollarSign className="w-4 h-4" />
                              <span>${task.cost.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>

                        {task.vendor && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>Vendor:</span>
                            <Badge variant="secondary">{task.vendor}</Badge>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )
          })}
        </AnimatePresence>
      </div>
    </div>
  )
}
