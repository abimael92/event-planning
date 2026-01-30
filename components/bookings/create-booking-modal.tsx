"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { format } from "date-fns"
import { CalendarIcon, DollarSign } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { cn } from '../../app/shared/lib/utils'

interface CreateBookingModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface BookingFormData {
  vendorId: string
  eventId: string
  serviceDate: Date
  services: string[]
  budget: number
  specialRequests: string
  urgency: string
}

// Mock data
const mockVendors = [
  { id: "1", name: "Elite Catering Co.", category: "Catering" },
  { id: "2", name: "Harmony DJ Services", category: "DJ & Music" },
  { id: "3", name: "The Grand Ballroom", category: "Venue" },
  { id: "4", name: "Lens & Light Photography", category: "Photography" },
  { id: "5", name: "Bloom & Blossom Florists", category: "Florist" },
]

const mockEvents = [
  { id: "1", name: "Sarah & Michael's Wedding", date: "2024-06-15" },
  { id: "2", name: "Corporate Gala 2024", date: "2024-07-20" },
  { id: "3", name: "Emma's Sweet 16", date: "2024-08-10" },
]

const serviceOptions = {
  Catering: ["Premium Menu", "Wine Pairing", "Service Staff", "Bar Service"],
  "DJ & Music": ["DJ Service", "Sound System", "Lighting", "MC Services"],
  Venue: ["Venue Rental", "Tables & Chairs", "Decorations", "Setup Service"],
  Photography: ["Event Photography", "Portrait Session", "Digital Gallery", "Prints"],
  Florist: ["Centerpieces", "Bridal Bouquet", "Ceremony Decor", "Reception Arrangements"],
}

export function CreateBookingModal({ open, onOpenChange }: CreateBookingModalProps) {
  const [step, setStep] = useState(1)
  const [selectedVendor, setSelectedVendor] = useState<(typeof mockVendors)[0] | null>(null)
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [serviceDate, setServiceDate] = useState<Date>()
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<BookingFormData>()

  const onSubmit = async (data: BookingFormData) => {
    setIsLoading(true)
    try {
      // TODO: Implement actual booking creation
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast({
        title: "Booking Request Sent!",
        description: "Your booking request has been sent to the vendor.",
      })
      onOpenChange(false)
      setStep(1)
      reset()
      setSelectedVendor(null)
      setSelectedServices([])
      setServiceDate(undefined)
    } catch (error) {
      toast({
        title: "Booking failed",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const nextStep = () => setStep(step + 1)
  const prevStep = () => setStep(step - 1)

  const handleVendorSelect = (vendorId: string) => {
    const vendor = mockVendors.find((v) => v.id === vendorId)
    setSelectedVendor(vendor || null)
    setValue("vendorId", vendorId)
  }

  const handleServiceToggle = (service: string) => {
    const updated = selectedServices.includes(service)
      ? selectedServices.filter((s) => s !== service)
      : [...selectedServices, service]
    setSelectedServices(updated)
    setValue("services", updated)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-heading">Create New Booking</DialogTitle>
          <DialogDescription>Request services from your preferred vendors</DialogDescription>
        </DialogHeader>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center space-x-2 mb-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all",
                i === step
                  ? "bg-primary text-white"
                  : i < step
                    ? "bg-green-500 text-white"
                    : "bg-muted text-muted-foreground",
              )}
            >
              {i}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <AnimatePresence mode="wait">
            {step === 1 && (
              <div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="eventId">Select Event</Label>
                  <Select onValueChange={(value) => setValue("eventId", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose an event" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockEvents.map((event) => (
                        <SelectItem key={event.id} value={event.id}>
                          {event.name} - {event.date}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.eventId && <p className="text-sm text-destructive">{errors.eventId.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vendorId">Select Vendor</Label>
                  <Select onValueChange={handleVendorSelect}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a vendor" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockVendors.map((vendor) => (
                        <SelectItem key={vendor.id} value={vendor.id}>
                          {vendor.name} - {vendor.category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.vendorId && <p className="text-sm text-destructive">{errors.vendorId.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label>Service Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !serviceDate && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {serviceDate ? format(serviceDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={serviceDate}
                        onSelect={(date) => {
                          setServiceDate(date)
                          setValue("serviceDate", date!)
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            )}

            {step === 2 && (
              <div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label>Select Services</Label>
                  {selectedVendor && (
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Available services from {selectedVendor.name}:</p>
                      <div className="grid grid-cols-1 gap-2">
                        {serviceOptions[selectedVendor.category as keyof typeof serviceOptions]?.map((service) => (
                          <div key={service} className="flex items-center space-x-2">
                            <Checkbox
                              id={service}
                              checked={selectedServices.includes(service)}
                              onCheckedChange={() => handleServiceToggle(service)}
                            />
                            <Label htmlFor={service} className="text-sm">
                              {service}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {!selectedVendor && <p className="text-sm text-muted-foreground">Please select a vendor first</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget">Budget Range</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="budget"
                      type="number"
                      placeholder="5000"
                      className="pl-10"
                      {...register("budget", {
                        required: "Budget is required",
                        min: { value: 100, message: "Budget must be at least $100" },
                      })}
                    />
                  </div>
                  {errors.budget && <p className="text-sm text-destructive">{errors.budget.message}</p>}
                </div>
              </div>
            )}

            {step === 3 && (
              <div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="specialRequests">Special Requests</Label>
                  <Textarea
                    id="specialRequests"
                    placeholder="Any special requirements, dietary restrictions, or additional notes..."
                    className="min-h-[100px]"
                    {...register("specialRequests")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="urgency">Urgency Level</Label>
                  <Select onValueChange={(value) => setValue("urgency", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="How urgent is this request?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low - Standard response time</SelectItem>
                      <SelectItem value="medium">Medium - Within 24 hours</SelectItem>
                      <SelectItem value="high">High - Within 12 hours</SelectItem>
                      <SelectItem value="urgent">Urgent - ASAP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {step === 4 && (
              <div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-3">Booking Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Vendor:</span>
                      <span className="font-medium">{selectedVendor?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Service Date:</span>
                      <span className="font-medium">{serviceDate ? format(serviceDate, "PPP") : "Not selected"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Services:</span>
                      <span className="font-medium">{selectedServices.length} selected</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Budget:</span>
                      <span className="font-medium">${watch("budget")?.toLocaleString() || "0"}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h4 className="font-semibold mb-2 text-blue-800">What happens next?</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Your request will be sent to the vendor</li>
                    <li>• They'll review and respond within 24-48 hours</li>
                    <li>• You'll receive a detailed quote and proposal</li>
                    <li>• Once approved, you can sign the contract and make payment</li>
                  </ul>
                </div>
              </div>
            )}
          </AnimatePresence>

          <div className="flex justify-between mt-6">
            <Button type="button" variant="outline" onClick={prevStep} disabled={step === 1}>
              Previous
            </Button>

            {step < 4 ? (
              <Button type="button" onClick={nextStep} disabled={step === 2 && !selectedVendor}>
                Next
              </Button>
            ) : (
              <Button type="submit" className="gradient-royal text-white" disabled={isLoading}>
                {isLoading ? "Sending Request..." : "Send Booking Request"}
              </Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
