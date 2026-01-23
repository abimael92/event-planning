// components/vendor/events/event-list.tsx
"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "sonner"
import {
    Calendar,
    Clock,
    DollarSign,
    Users,
    MapPin,
    MoreVertical,
    Eye,
    Edit,
    Trash2,
    CheckCircle,
    XCircle,
    RefreshCw,
    Download,
    Share2,
    Filter,
    ChevronRight,
    Mail,
    Phone,
    FileText,
    Tag,
    AlertCircle,
    Check,
    X
} from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

// Mock data types
export interface Event {
    id: string
    title: string
    client: string
    clientEmail: string
    clientPhone?: string
    date: string
    time: string
    endTime?: string
    location: string
    status: 'confirmed' | 'pending' | 'completed' | 'cancelled' | 'draft'
    revenue: number
    deposit: number
    type: string
    progress: number
    attendees: number
    notes?: string
    createdAt: string
    updatedAt: string
    tags: string[]
}

export interface EventsListProps {
    search?: string
    statusFilter?: string
    showActions?: boolean
    limit?: number
}

export function EventsList({ search = "", statusFilter = "all", showActions = true, limit }: EventsListProps) {

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
                <Button variant="ghost" size="sm" className="gap-2">
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