// components/vendor/events/event-form.tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Calendar, Clock, MapPin, Users, DollarSign, FileText } from "lucide-react"

const eventFormSchema = z.object({
    title: z.string().min(5, "Title must be at least 5 characters"),
    clientName: z.string().min(2, "Client name is required"),
    clientEmail: z.string().email("Invalid email address"),
    clientPhone: z.string().optional(),
    eventDate: z.string().min(1, "Event date is required"),
    startTime: z.string().min(1, "Start time is required"),
    endTime: z.string().min(1, "End time is required"),
    location: z.string().min(5, "Location is required"),
    eventType: z.enum(["corporate", "wedding", "quinceañera", "graduation", "conference", "birthday", "anniversary"]),
    attendees: z.coerce.number().min(1, "At least 1 attendee is required"),
    totalRevenue: z.coerce.number().min(0, "Revenue must be positive"),
    depositAmount: z.coerce.number().min(0),
    notes: z.string().optional(),
    tags: z.string().optional(),
})

interface EventFormProps {
    onSubmit: (data: z.infer<typeof eventFormSchema>) => void
    isSubmitting?: boolean
    initialData?: Partial<z.infer<typeof eventFormSchema>>
}

export function EventForm({ onSubmit, isSubmitting = false, initialData }: EventFormProps) {
    const form = useForm<z.infer<typeof eventFormSchema>>({
        resolver: zodResolver(eventFormSchema),
        defaultValues: initialData || {
            title: "",
            clientName: "",
            clientEmail: "",
            clientPhone: "",
            eventDate: "",
            startTime: "",
            endTime: "",
            location: "",
            eventType: "corporate",
            attendees: 1,
            totalRevenue: 0,
            depositAmount: 0,
            notes: "",
            tags: "",
        },
    })

    const handleSubmit = (data: z.infer<typeof eventFormSchema>) => {
        onSubmit(data)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Basic Info */}
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Event Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter event title" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="eventType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Event Type</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select event type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="corporate">Corporate</SelectItem>
                                            <SelectItem value="wedding">Wedding</SelectItem>
                                            <SelectItem value="quinceañera">XV Años</SelectItem>
                                            <SelectItem value="graduation">Graduation</SelectItem>
                                            <SelectItem value="conference">Conference</SelectItem>
                                            <SelectItem value="birthday">Birthday</SelectItem>
                                            <SelectItem value="anniversary">Anniversary</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="location"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Location</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                            <Input className="pl-10" placeholder="Enter venue address" {...field} />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Date & Time */}
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="eventDate"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Event Date</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                            <Input type="date" className="pl-10" {...field} />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="startTime"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Start Time</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Clock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                                <Input type="time" className="pl-10" {...field} />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="endTime"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>End Time</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Clock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                                <Input type="time" className="pl-10" {...field} />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                </div>

                {/* Client Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FormField
                        control={form.control}
                        name="clientName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Client Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter client name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="clientEmail"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Client Email</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="client@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="clientPhone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Client Phone (Optional)</FormLabel>
                                <FormControl>
                                    <Input placeholder="+1 (555) 123-4567" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* Event Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FormField
                        control={form.control}
                        name="attendees"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Number of Attendees</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Users className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                        <Input type="number" min="1" className="pl-10" {...field} />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="totalRevenue"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Total Revenue (MXN)</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                        <Input type="number" min="0" className="pl-10" {...field} />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="depositAmount"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Deposit Amount (MXN)</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                        <Input type="number" min="0" className="pl-10" {...field} />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* Additional Info */}
                <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Event Notes (Optional)</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Textarea className="pl-10 min-h-[100px]" placeholder="Add any special requirements, notes, or instructions..." {...field} />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tags (Optional)</FormLabel>
                            <FormControl>
                                <Input placeholder="corporate, premium, outdoors (comma separated)" {...field} />
                            </FormControl>
                            <FormDescription>
                                Add tags to help organize and filter your events
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex justify-end gap-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => window.history.back()}
                        disabled={isSubmitting}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Creating Event..." : "Create Event"}
                    </Button>
                </div>
            </form>
        </Form>
    )
}