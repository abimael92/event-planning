// app/vendor/events/create/page.tsx
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { EventForm } from "@/components/vendors/events/event-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export default function CreateEventPage() {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleBack = () => {
        router.back()
    }

    const handleSubmit = async (eventData: any) => {
        setIsSubmitting(true)

        // Simulate API call
        setTimeout(() => {
            toast.success("Event created successfully!")
            router.push("/vendor/events")
            setIsSubmitting(false)
        }, 1500)
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleBack}
                    className="h-8 w-8"
                >
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Create New Event</h1>
                    <p className="text-muted-foreground">
                        Set up a new event for your clients
                    </p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Event Details</CardTitle>
                    <CardDescription>
                        Fill in the details for your new event
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <EventForm
                        onSubmit={handleSubmit}
                        isSubmitting={isSubmitting}
                    />
                </CardContent>
            </Card>
        </div>
    )
}