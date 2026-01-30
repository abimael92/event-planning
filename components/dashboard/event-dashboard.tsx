"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Plus, Calendar, DollarSign, Users, TrendingUp } from "lucide-react"
import { EventCard } from "./event-card"
import { CreateEventModal } from "./create-event-modal"
import { StatsCard } from '../ui/stats-card'
// import { StatsCard } from "./stats-card"

// Mock data
const upcomingEvents = [
  {
    id: "1",
    title: "Sarah & Michael's Wedding",
    date: "2024-06-15",
    time: "4:00 PM",
    location: "The Grand Ballroom",
    budget: 50000,
    spent: 35000,
    status: "planning" as const,
    progress: 70,
    vendors: 8,
    image: "/elegant-wedding-venue.png",
  },
  {
    id: "2",
    title: "Corporate Gala 2024",
    date: "2024-07-20",
    time: "7:00 PM",
    location: "Downtown Convention Center",
    budget: 75000,
    spent: 25000,
    status: "planning" as const,
    progress: 40,
    vendors: 12,
    image: "/corporate-gala-venue.jpg",
  },
  {
    id: "3",
    title: "Emma's Sweet 16",
    date: "2024-08-10",
    time: "6:00 PM",
    location: "Garden Pavilion",
    budget: 15000,
    spent: 8000,
    status: "planning" as const,
    progress: 55,
    vendors: 5,
    image: "/sweet-16-party-venue.jpg",
  },
]

const recentActivity = [
  {
    id: 1,
    action: "Vendor confirmed",
    vendor: "Elite Catering Co.",
    event: "Sarah & Michael's Wedding",
    time: "2 hours ago",
  },
  {
    id: 2,
    action: "Payment processed",
    vendor: "Harmony DJ Services",
    event: "Corporate Gala 2024",
    time: "5 hours ago",
  },
  { id: 3, action: "Contract signed", vendor: "Bloom & Blossom Florists", event: "Emma's Sweet 16", time: "1 day ago" },
  {
    id: 4,
    action: "New message",
    vendor: "Lens & Light Photography",
    event: "Sarah & Michael's Wedding",
    time: "2 days ago",
  },
]

export function EventDashboard() {
  const [showCreateModal, setShowCreateModal] = useState(false)

  const totalBudget = upcomingEvents.reduce((sum, event) => sum + event.budget, 0)
  const totalSpent = upcomingEvents.reduce((sum, event) => sum + event.spent, 0)
  const totalVendors = upcomingEvents.reduce((sum, event) => sum + event.vendors, 0)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold text-balance">Welcome back, John</h1>
          <p className="text-muted-foreground mt-2">You have {upcomingEvents.length} events in planning</p>
        </div>
        <Button
          onClick={() => setShowCreateModal(true)}
          className="gradient-royal text-white hover:glow-primary transition-all duration-300"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Event
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Active Events"
          value={upcomingEvents.length.toString()}
          icon={Calendar}
          trend="+2 this month"
          color="primary"
        />
        <StatsCard
          title="Total Budget"
          value={`$${(totalBudget / 1000).toFixed(0)}k`}
          icon={DollarSign}
          trend="+12% from last month"
          color="secondary"
        />
        <StatsCard
          title="Vendors Booked"
          value={totalVendors.toString()}
          icon={Users}
          trend="+5 this week"
          color="accent"
        />
        <StatsCard
          title="Avg. Progress"
          value={`${Math.round(upcomingEvents.reduce((sum, event) => sum + event.progress, 0) / upcomingEvents.length)}%`}
          icon={TrendingUp}
          trend="On track"
          color="success"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Events Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-heading font-semibold">Upcoming Events</h2>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>

          <div className="space-y-4">
            {upcomingEvents.map((event, index) => (
              <div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <EventCard event={event} />
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Vendor Meeting
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Users className="w-4 h-4 mr-2" />
                Browse Vendors
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <DollarSign className="w-4 h-4 mr-2" />
                Review Payments
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Activity</CardTitle>
              <CardDescription>Latest updates from your events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-2" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">{activity.vendor}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Budget Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Budget Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span>Total Allocated</span>
                  <span className="font-semibold">${totalBudget.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Total Spent</span>
                  <span className="font-semibold">${totalSpent.toLocaleString()}</span>
                </div>
                <Progress value={(totalSpent / totalBudget) * 100} className="h-2" />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Remaining</span>
                  <span>${(totalBudget - totalSpent).toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Create Event Modal */}
      <CreateEventModal open={showCreateModal} onOpenChange={setShowCreateModal} />
    </div>
  )
}
