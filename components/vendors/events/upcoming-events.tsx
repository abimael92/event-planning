// components/vendor/events/upcoming-events.tsx
"use client"

import { EventsList } from "./event-list"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"

interface UpcomingEventsProps {
    limit?: number
}

export function UpcomingEvents({ limit = 3 }: UpcomingEventsProps) {
    const router = useRouter()

    const handleViewAll = () => {
        router.push("/vendor/events")
    }

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        Upcoming Events
                    </CardTitle>
                    <CardDescription>
                        Your next {limit} upcoming events
                    </CardDescription>
                </div>
                <Button
                    variant="ghost"
                    size="sm"
                    className="gap-2"
                    onClick={handleViewAll}
                >
                    View All
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </CardHeader>
            <CardContent>
                <EventsList
                    statusFilter="confirmed"
                    limit={limit}
                    showActions={false}
                />
            </CardContent>
        </Card>
    )
}