"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Calendar, MapPin, DollarSign, Users, Clock, MoreHorizontal, Edit, Eye } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Event {
  id: string
  title: string
  date: string
  time: string
  location: string
  budget: number
  spent: number
  status: "planning" | "confirmed" | "completed"
  progress: number
  vendors: number
  image: string
}

interface EventCardProps {
  event: Event
}

const statusColors = {
  planning: "bg-yellow-100 text-yellow-800 border-yellow-200",
  confirmed: "bg-green-100 text-green-800 border-green-200",
  completed: "bg-blue-100 text-blue-800 border-blue-200",
}

export function EventCard({ event }: EventCardProps) {
  const budgetPercentage = (event.spent / event.budget) * 100

  return (
    <div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20">
        <div className="flex">
          {/* Event Image */}
          <div className="w-32 h-32 flex-shrink-0">
            <img src={event.image || "/placeholder.svg"} alt={event.title} className="w-full h-full object-cover" />
          </div>

          {/* Event Details */}
          <CardContent className="flex-1 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-heading font-semibold text-lg text-balance">{event.title}</h3>
                  <Badge variant="outline" className={statusColors[event.status]}>
                    {event.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{event.vendors} vendors</span>
                  </div>
                </div>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Event
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Progress and Budget */}
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Planning Progress</span>
                  <span className="font-medium">{event.progress}%</span>
                </div>
                <Progress value={event.progress} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Budget Used</span>
                  <span className="font-medium">
                    ${event.spent.toLocaleString()} / ${event.budget.toLocaleString()}
                  </span>
                </div>
                <Progress
                  value={budgetPercentage}
                  className="h-2"
                  // Change color based on budget usage
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 mt-4">
              <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                <Users className="w-4 h-4 mr-2" />
                Vendors
              </Button>
              <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                <DollarSign className="w-4 h-4 mr-2" />
                Budget
              </Button>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  )
}
