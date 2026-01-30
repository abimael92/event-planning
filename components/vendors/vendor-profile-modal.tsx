"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import {
  Star,
  MapPin,
  Heart,
  MessageSquare,
  Calendar,
  Phone,
  Mail,
  Globe,
  Verified,
  Award,
  Clock,
  DollarSign,
  Users,
  LogIn,
} from "lucide-react"
import { cn } from '../../app/shared/lib/utils'
import { useRouter } from "next/navigation"

interface Vendor {
  id: string
  name: string
  category: string
  location: string
  rating: number
  reviewCount: number
  priceRange: string
  image: string
  description: string
  specialties: string[]
  verified: boolean
  featured: boolean
  startingPrice: number
  portfolio: string[]
}

interface VendorProfileModalProps {
  vendor: Vendor
  open: boolean
  onOpenChange: (open: boolean) => void
  isFavorite: boolean
  onToggleFavorite: () => void
  onContactVendor?: () => void
  isPublic?: boolean
}

// Mock reviews data
const reviews = [
  {
    id: 1,
    author: "Sarah Johnson",
    rating: 5,
    date: "2024-01-15",
    event: "Wedding Reception",
    comment:
      "Absolutely incredible service! The team went above and beyond to make our wedding perfect. The attention to detail was outstanding.",
    avatar: "/reviewer-1.jpg",
  },
  {
    id: 2,
    author: "Michael Chen",
    rating: 5,
    date: "2024-01-10",
    event: "Corporate Gala",
    comment:
      "Professional, reliable, and exceeded all expectations. Our corporate event was a huge success thanks to their expertise.",
    avatar: "/reviewer-2.jpg",
  },
  {
    id: 3,
    author: "Emma Davis",
    rating: 4,
    date: "2024-01-05",
    event: "Birthday Party",
    comment:
      "Great experience overall. The team was responsive and delivered exactly what we discussed. Would definitely recommend!",
    avatar: "/reviewer-3.jpg",
  },
]

export function VendorProfileModal({
  vendor,
  open,
  onOpenChange,
  isFavorite,
  onToggleFavorite,
  onContactVendor,
  isPublic = false,
}: VendorProfileModalProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const router = useRouter()

  const handleAction = (action: "book" | "message" | "quote" | "favorite") => {
    if (isPublic) {
      // Redirect to signup for public users
      router.push("/auth/signup")
    } else {
      // Handle action for logged-in users
      switch (action) {
        case "book":
          // Implement booking logic
          break
        case "message":
          // Implement messaging logic
          break
        case "quote":
          // Implement quote request logic
          break
        case "favorite":
          onToggleFavorite()
          break
      }
    }
  }

  const handleContactClick = () => {
    if (onContactVendor) {
      onContactVendor()
    } else if (isPublic) {
      router.push("/auth/signup")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <div className="relative">
          {/* Header Image */}
          <div className="relative h-64 overflow-hidden">
            <img src={vendor.image || "/placeholder.svg"} alt={vendor.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

            {/* Header Content */}
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-heading font-bold">{vendor.name}</h1>
                    {vendor.verified && <Verified className="w-6 h-6 text-primary" />}
                    {vendor.featured && <Badge className="bg-gradient-to-r from-primary to-secondary">Featured</Badge>}
                  </div>
                  <p className="text-lg opacity-90 mb-2">{vendor.category}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{vendor.rating}</span>
                      <span className="opacity-75">({vendor.reviewCount} reviews)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{vendor.location}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleAction("favorite")}
                    className={cn(
                      "bg-white/20 hover:bg-white/30",
                      isFavorite && "text-red-500",
                      isPublic && "cursor-pointer"
                    )}
                  >
                    <Heart className={cn("w-4 h-4", isFavorite && "fill-current")} />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Public User Notice */}
          {isPublic && (
            <div className="bg-blue-50 border-b border-blue-200 px-6 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <LogIn className="w-4 h-4 text-blue-600" />
                  <p className="text-sm text-blue-800">
                    Sign up to contact vendors, save favorites, and get personalized quotes
                  </p>
                </div>
                <Button size="sm" onClick={() => router.push("/auth/signup")}>
                  Get Started
                </Button>
              </div>
            </div>
          )}

          {/* Content */}
          <div className="p-6">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="contact">Contact</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6 mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Main Info */}
                  <div className="lg:col-span-2 space-y-6">
                    <div>
                      <h3 className="text-xl font-heading font-semibold mb-3">About</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {vendor.description} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-heading font-semibold mb-3">Specialties</h3>
                      <div className="flex flex-wrap gap-2">
                        {vendor.specialties.map((specialty) => (
                          <Badge key={specialty} variant="secondary" className="px-3 py-1">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-heading font-semibold mb-3">Services & Pricing</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 border border-border rounded-lg">
                          <span>Basic Package</span>
                          <span className="font-semibold">From ${vendor.startingPrice}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 border border-border rounded-lg">
                          <span>Premium Package</span>
                          <span className="font-semibold">From ${vendor.startingPrice * 2}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 border border-border rounded-lg">
                          <span>Luxury Package</span>
                          <span className="font-semibold">From ${vendor.startingPrice * 3}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Sidebar */}
                  <div className="space-y-4">
                    <Card>
                      <CardContent className="p-4 space-y-4">
                        <div className="flex items-center gap-3">
                          <Award className="w-5 h-5 text-primary" />
                          <div>
                            <p className="font-medium">Top Rated</p>
                            <p className="text-sm text-muted-foreground">99% client satisfaction</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Clock className="w-5 h-5 text-primary" />
                          <div>
                            <p className="font-medium">Quick Response</p>
                            <p className="text-sm text-muted-foreground">Responds within 2 hours</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Users className="w-5 h-5 text-primary" />
                          <div>
                            <p className="font-medium">Experienced</p>
                            <p className="text-sm text-muted-foreground">500+ events completed</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="space-y-2">
                      <Button
                        className="w-full gradient-royal text-white"
                        onClick={() => handleAction("book")}
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        {isPublic ? "Sign Up to Book" : "Book Consultation"}
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full bg-transparent"
                        onClick={() => handleAction("message")}
                      >
                        <MessageSquare className="w-4 h-4 mr-2" />
                        {isPublic ? "Sign Up to Message" : "Send Message"}
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full bg-transparent"
                        onClick={() => handleAction("quote")}
                      >
                        <DollarSign className="w-4 h-4 mr-2" />
                        {isPublic ? "Sign Up for Quote" : "Request Quote"}
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="portfolio" className="mt-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-heading font-semibold">Portfolio</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {vendor.portfolio.map((image, index) => (
                      <div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        className="relative aspect-square rounded-lg overflow-hidden cursor-pointer"
                        onClick={() => setSelectedImage(index)}
                      >
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`Portfolio ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-heading font-semibold">Reviews</h3>
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{vendor.rating}</span>
                      <span className="text-muted-foreground">({vendor.reviewCount} reviews)</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <Card key={review.id}>
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <img
                              src={review.avatar || "/placeholder.svg"}
                              alt={review.author}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <div>
                                  <p className="font-medium">{review.author}</p>
                                  <p className="text-sm text-muted-foreground">{review.event}</p>
                                </div>
                                <div className="flex items-center gap-1">
                                  {Array.from({ length: review.rating }).map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                  ))}
                                  <span className="text-sm text-muted-foreground ml-2">{review.date}</span>
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground">{review.comment}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="contact" className="mt-6">
                <div className="space-y-6">
                  <h3 className="text-xl font-heading font-semibold">Contact Information</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardContent className="p-4 space-y-4">
                        <div className="flex items-center gap-3">
                          <Phone className="w-5 h-5 text-primary" />
                          <div>
                            <p className="font-medium">Phone</p>
                            <p className="text-sm text-muted-foreground">(555) 123-4567</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Mail className="w-5 h-5 text-primary" />
                          <div>
                            <p className="font-medium">Email</p>
                            <p className="text-sm text-muted-foreground">
                              contact@{vendor.name.toLowerCase().replace(/\s+/g, "")}.com
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Globe className="w-5 h-5 text-primary" />
                          <div>
                            <p className="font-medium">Website</p>
                            <p className="text-sm text-muted-foreground">
                              www.{vendor.name.toLowerCase().replace(/\s+/g, "")}.com
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-medium mb-3">Business Hours</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Monday - Friday</span>
                            <span>9:00 AM - 6:00 PM</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Saturday</span>
                            <span>10:00 AM - 4:00 PM</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Sunday</span>
                            <span>By Appointment</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Contact CTA for Public Users */}
                  {isPublic && (
                    <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
                      <CardContent className="p-6 text-center">
                        <h4 className="font-heading font-semibold text-lg mb-2">
                          Ready to Contact This Vendor?
                        </h4>
                        <p className="text-muted-foreground mb-4">
                          Join Planora to send messages, request quotes, and book consultations directly with vendors.
                        </p>
                        <div className="flex gap-3 justify-center">
                          <Button onClick={() => router.push("/auth/signup")}>
                            Sign Up Free
                          </Button>
                          <Button variant="outline" onClick={() => router.push("/auth/login")}>
                            Sign In
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}