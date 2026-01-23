// app/vendor/events/page.tsx - VENDOR version
"use client"

import { useState } from "react"
import { EventsList } from "@/components/vendors/events"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Calendar, Filter, Search, Plus } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export default function VendorEventsPage() {
    const [search, setSearch] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const router = useRouter()

    const handleCreateEvent = () => {
        router.push("/vendor/events/create")
        toast.success("Creating new event...")
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Events</h1>
                    <p className="text-muted-foreground">
                        Manage your upcoming and past events
                    </p>
                </div>
                <Button onClick={handleCreateEvent} className="gap-2">
                    <Plus className="h-4 w-4" />
                    Create Event
                </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search events..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-9"
                    />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Events</SelectItem>
                        <SelectItem value="confirmed">Confirmed</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <EventsList
                search={search}
                statusFilter={statusFilter}
            />
        </div>
    )
}