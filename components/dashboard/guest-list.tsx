"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Search, UserPlus, Mail, Phone, Download, Filter, MoreHorizontal, CheckCircle, XCircle, User, MailIcon, PhoneIcon, ArrowLeft } from "lucide-react"
import { useTranslation } from "@/hooks/use-translation"

interface Guest {
    id: string
    name: string
    email: string
    phone: string
    status: 'invited' | 'confirmed' | 'declined' | 'pending'
    plusOne: boolean
    dietaryRestrictions: string
    notes: string
}

interface Event {
    id: string
    title: string
    date: string
    location: string
}

interface GuestListProps {
    event: Event
    onBack: () => void
}

// Mock guest data for each event
const mockGuestData: Record<string, Guest[]> = {
    "1": [
        { id: "1", name: "María García", email: "maria@example.com", phone: "+1 234 567 8901", status: 'confirmed', plusOne: true, dietaryRestrictions: "Vegetariano", notes: "Tío de la novia" },
        { id: "2", name: "Juan Rodríguez", email: "juan@example.com", phone: "+1 234 567 8902", status: 'invited', plusOne: false, dietaryRestrictions: "", notes: "Amigo del colegio" },
    ],
    "2": [
        { id: "3", name: "Ana Martínez", email: "ana@example.com", phone: "+1 234 567 8903", status: 'confirmed', plusOne: true, dietaryRestrictions: "Sin gluten", notes: "Colaboradora" },
        { id: "4", name: "Carlos López", email: "carlos@example.com", phone: "+1 234 567 8904", status: 'declined', plusOne: false, dietaryRestrictions: "", notes: "Invitado especial" },
    ],
    "3": [
        { id: "5", name: "Sofía Hernández", email: "sofia@example.com", phone: "+1 234 567 8905", status: 'confirmed', plusOne: true, dietaryRestrictions: "Vegano", notes: "Familia" },
        { id: "6", name: "Diego Pérez", email: "diego@example.com", phone: "+1 234 567 8906", status: 'invited', plusOne: false, dietaryRestrictions: "", notes: "Amigo de la familia" },
    ],
    "4": [
        { id: "7", name: "Laura Torres", email: "laura@example.com", phone: "+1 234 567 8907", status: 'confirmed', plusOne: false, dietaryRestrictions: "Sin lácteos", notes: "Amiga cercana" },
        { id: "8", name: "Miguel Sánchez", email: "miguel@example.com", phone: "+1 234 567 8908", status: 'pending', plusOne: true, dietaryRestrictions: "", notes: "Vecino" },
    ]
}

export function GuestList({ event, onBack }: GuestListProps) {
    const [guests, setGuests] = useState<Guest[]>(mockGuestData[event.id] || [])
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState<string>("all")
    const { t } = useTranslation()

    const filteredGuests = guests.filter(guest => {
        const matchesSearch = guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            guest.email.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus = statusFilter === "all" || guest.status === statusFilter
        return matchesSearch && matchesStatus
    })

    const stats = {
        total: guests.length,
        confirmed: guests.filter(g => g.status === 'confirmed').length,
        invited: guests.filter(g => g.status === 'invited').length,
        declined: guests.filter(g => g.status === 'declined').length,
        pending: guests.filter(g => g.status === 'pending').length,
    }

    const getStatusBadge = (status: Guest['status']) => {
        const colors = {
            confirmed: "bg-green-100 text-green-800 border-green-200",
            invited: "bg-blue-100 text-blue-800 border-blue-200",
            declined: "bg-red-100 text-red-800 border-red-200",
            pending: "bg-yellow-100 text-yellow-800 border-yellow-200"
        }
        const labels = {
            confirmed: "Confirmado",
            invited: "Invitado",
            declined: "Rechazado",
            pending: "Pendiente"
        }
        return <Badge className={`${colors[status]} border`}>{labels[status]}</Badge>
    }

    const updateGuestStatus = (guestId: string, newStatus: Guest['status']) => {
        setGuests(guests.map(guest =>
            guest.id === guestId ? { ...guest, status: newStatus } : guest
        ))
    }

    const handleAddGuest = (newGuest: Guest) => {
        setGuests([...guests, { ...newGuest, id: Date.now().toString() }])
    }

    return (
        <div className="space-y-6 p-4 md:p-6">
            {/* Header with back button */}
            <div className="flex items-center gap-4">
                <Button
                    variant="ghost"
                    onClick={onBack}
                    className="hover:bg-primary/10"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Volver
                </Button>
                <div className="flex-1">
                    <h1 className="text-2xl md:text-3xl font-heading font-bold">Lista de Invitados</h1>
                    <p className="text-muted-foreground">
                        {event.title} • {new Date(event.date).toLocaleDateString('es-MX', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })} • {event.location}
                    </p>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-center">
                            <p className="text-2xl md:text-3xl font-bold">{stats.total}</p>
                            <p className="text-sm text-muted-foreground">Total Invitados</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="text-center">
                            <p className="text-2xl md:text-3xl font-bold text-green-600">{stats.confirmed}</p>
                            <p className="text-sm text-muted-foreground">Confirmados</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="text-center">
                            <p className="text-2xl md:text-3xl font-bold text-blue-600">{stats.invited}</p>
                            <p className="text-sm text-muted-foreground">Invitados</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="text-center">
                            <p className="text-2xl md:text-3xl font-bold text-yellow-600">{stats.pending}</p>
                            <p className="text-sm text-muted-foreground">Pendientes</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Filters and Search */}
            <Card>
                <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Buscar por nombre o email..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <Filter className="h-4 w-4 text-muted-foreground" />
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Filtrar por estado" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Todos los estados</SelectItem>
                                    <SelectItem value="confirmed">Confirmados</SelectItem>
                                    <SelectItem value="invited">Invitados</SelectItem>
                                    <SelectItem value="declined">Rechazados</SelectItem>
                                    <SelectItem value="pending">Pendientes</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="gradient-royal text-white">
                                    <UserPlus className="w-4 h-4 mr-2" />
                                    Agregar Invitado
                                </Button>
                            </DialogTrigger>
                            <AddGuestDialog onAdd={handleAddGuest} />
                        </Dialog>

                        <Button variant="outline">
                            <Download className="h-4 w-4 mr-2" />
                            Exportar
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Guest List Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Invitados ({filteredGuests.length})</CardTitle>
                    <CardDescription>
                        {stats.confirmed} confirmados de {stats.total} invitados
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nombre</TableHead>
                                <TableHead>Contacto</TableHead>
                                <TableHead>Estado</TableHead>
                                <TableHead>Acompañante</TableHead>
                                <TableHead>Restricciones</TableHead>
                                <TableHead className="text-right">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredGuests.map((guest) => (
                                <TableRow key={guest.id}>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-2">
                                            <User className="h-4 w-4 text-muted-foreground" />
                                            {guest.name}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <MailIcon className="h-3 w-3" />
                                                <span className="text-sm">{guest.email}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <PhoneIcon className="h-3 w-3" />
                                                <span className="text-sm">{guest.phone}</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>{getStatusBadge(guest.status)}</TableCell>
                                    <TableCell>
                                        <Checkbox checked={guest.plusOne} className="pointer-events-none" />
                                    </TableCell>
                                    <TableCell>
                                        {guest.dietaryRestrictions || "-"}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            {guest.status === 'invited' || guest.status === 'pending' ? (
                                                <>
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        onClick={() => updateGuestStatus(guest.id, 'confirmed')}
                                                    >
                                                        <CheckCircle className="h-4 w-4 text-green-600" />
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        onClick={() => updateGuestStatus(guest.id, 'declined')}
                                                    >
                                                        <XCircle className="h-4 w-4 text-red-600" />
                                                    </Button>
                                                </>
                                            ) : null}
                                            <Button size="sm" variant="ghost">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}

function AddGuestDialog({ onAdd }: { onAdd: (guest: Guest) => void }) {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [plusOne, setPlusOne] = useState(false)
    const [dietaryRestrictions, setDietaryRestrictions] = useState("")
    const [notes, setNotes] = useState("")

    const handleSubmit = () => {
        const newGuest: Guest = {
            id: Date.now().toString(),
            name,
            email,
            phone,
            status: 'invited',
            plusOne,
            dietaryRestrictions,
            notes
        }
        onAdd(newGuest)
        setName("")
        setEmail("")
        setPhone("")
        setPlusOne(false)
        setDietaryRestrictions("")
        setNotes("")
    }

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Agregar Nuevo Invitado</DialogTitle>
                <DialogDescription>
                    Completa la información del invitado para agregarlo a la lista.
                </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Nombre Completo *</Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Juan Pérez" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="juan@ejemplo.com" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone">Teléfono</Label>
                        <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 234 567 8900" />
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox id="plusOne" checked={plusOne} onCheckedChange={(checked) => setPlusOne(checked === true)} />
                    <Label htmlFor="plusOne">¿Trae acompañante?</Label>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="dietary">Restricciones Dietéticas</Label>
                    <Input id="dietary" value={dietaryRestrictions} onChange={(e) => setDietaryRestrictions(e.target.value)} placeholder="Vegetariano, sin gluten, etc." />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="notes">Notas</Label>
                    <textarea
                        id="notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Información adicional..."
                        className="w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    />
                </div>
                <Button onClick={handleSubmit} className="w-full gradient-royal text-white">
                    Agregar Invitado
                </Button>
            </div>
        </DialogContent>
    )
}