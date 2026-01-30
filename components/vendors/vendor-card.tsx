"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Heart, Eye, MessageSquare, Verified } from "lucide-react"
import { cn } from '../../app/shared/lib/utils'

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
}

interface VendorCardProps {
  vendor: Vendor
  viewMode: "grid" | "list"
  isFavorite: boolean
  onToggleFavorite: () => void
  onViewProfile: () => void
  onContactVendor?: () => void // Add this
  isPublic?: boolean // Add this
}

export function VendorCard({ vendor, viewMode, isFavorite, onToggleFavorite, onViewProfile }: VendorCardProps) {
  if (viewMode === "list") {
    return (
      <div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
        <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20">
          <div className="flex">
            {/* Image */}
            <div className="w-48 h-32 flex-shrink-0 relative">
              <img src={vendor.image || "/placeholder.svg"} alt={vendor.name} className="w-full h-full object-cover" />
              {vendor.featured && (
                <Badge className="absolute top-2 left-2 bg-gradient-to-r from-primary to-secondary text-white">
                  Featured
                </Badge>
              )}
            </div>

            {/* Content */}
            <CardContent className="flex-1 p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-heading font-semibold text-lg">{vendor.name}</h3>
                    {vendor.verified && <Verified className="w-4 h-4 text-primary" />}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{vendor.category}</p>
                  <p className="text-sm text-muted-foreground line-clamp-2">{vendor.description}</p>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onToggleFavorite}
                  className={cn("ml-2", isFavorite && "text-red-500")}
                >
                  <Heart className={cn("w-4 h-4", isFavorite && "fill-current")} />
                </Button>
              </div>

              <div className="flex items-center gap-4 mb-3 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{vendor.rating}</span>
                  <span className="text-muted-foreground">({vendor.reviewCount})</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{vendor.location}</span>
                </div>
                <Badge variant="outline">{vendor.priceRange}</Badge>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {vendor.specialties.slice(0, 2).map((specialty) => (
                    <Badge key={specialty} variant="secondary" className="text-xs">
                      {specialty}
                    </Badge>
                  ))}
                  {vendor.specialties.length > 2 && (
                    <Badge variant="secondary" className="text-xs">
                      +{vendor.specialties.length - 2} more
                    </Badge>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <MessageSquare className="w-4 h-4 mr-1" />
                    Message
                  </Button>
                  <Button size="sm" onClick={onViewProfile} className="gradient-royal text-white">
                    <Eye className="w-4 h-4 mr-1" />
                    View Profile
                  </Button>
                </div>
              </div>
            </CardContent>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-border/50 hover:border-primary/20 group">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={vendor.image || "/placeholder.svg"}
            alt={vendor.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            {vendor.featured && (
              <Badge className="bg-gradient-to-r from-primary to-secondary text-white">Featured</Badge>
            )}
            {vendor.verified && (
              <Badge variant="secondary" className="bg-white/90 text-primary">
                <Verified className="w-3 h-3 mr-1" />
                Verified
              </Badge>
            )}
          </div>

          {/* Favorite Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleFavorite}
            className={cn("absolute top-3 right-3 bg-white/90 hover:bg-white", isFavorite && "text-red-500")}
          >
            <Heart className={cn("w-4 h-4", isFavorite && "fill-current")} />
          </Button>

          {/* Price */}
          <div className="absolute bottom-3 right-3">
            <Badge className="bg-black/70 text-white">From ${vendor.startingPrice}</Badge>
          </div>
        </div>

        {/* Content */}
        <CardContent className="p-4">
          <div className="mb-3">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-heading font-semibold text-lg text-balance">{vendor.name}</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-2">{vendor.category}</p>
            <p className="text-sm text-muted-foreground line-clamp-2">{vendor.description}</p>
          </div>

          <div className="flex items-center gap-3 mb-3 text-sm">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{vendor.rating}</span>
              <span className="text-muted-foreground">({vendor.reviewCount})</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>{vendor.location}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1 mb-4">
            {vendor.specialties.slice(0, 2).map((specialty) => (
              <Badge key={specialty} variant="secondary" className="text-xs">
                {specialty}
              </Badge>
            ))}
            {vendor.specialties.length > 2 && (
              <Badge variant="secondary" className="text-xs">
                +{vendor.specialties.length - 2}
              </Badge>
            )}
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1 bg-transparent">
              <MessageSquare className="w-4 h-4 mr-1" />
              Message
            </Button>
            <Button size="sm" onClick={onViewProfile} className="flex-1 gradient-royal text-white">
              <Eye className="w-4 h-4 mr-1" />
              View
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
