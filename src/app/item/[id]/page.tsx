"use client"

import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Share, MessageCircle, MapPin, Calendar, ArrowLeft } from "lucide-react"
import { getListing } from "@/lib/api-client"
import { dbUtils } from "@/lib/database"
import { Listing } from "@/lib/supabase"

export default function ItemDetailPage() {
  const params = useParams()
  const [listing, setListing] = useState<Listing | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    const fetchListing = async () => {
      if (!params.id || typeof params.id !== 'string') return
      
      try {
        setLoading(true)
        setError(null)
        
        const data = await getListing(params.id)
        
        if (data) {
          setListing(data)
        } else {
          setError('Listing not found')
        }
      } catch (err) {
        console.error('Error fetching listing:', err)
        setError('Failed to load listing')
      } finally {
        setLoading(false)
      }
    }

    fetchListing()
  }, [params.id])

  const handleImageError = () => {
    console.log('Image failed to load for listing:', params.id)
    setImageError(true)
  }

  const shouldShowImage = (listing: Listing) => {
    return listing.image_url && 
           dbUtils.isValidImageUrl(listing.image_url) && 
           !imageError
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-semibold text-gray-900">Marketplace</h1>
          </div>
        </div>
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-facebook-blue mx-auto mb-4"></div>
            <p className="text-gray-600">Loading listing...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !listing) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-semibold text-gray-900">Marketplace</h1>
          </div>
        </div>
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <Link href="/">
              <Button className="bg-facebook-blue hover:bg-facebook-blue-dark text-white">
                Back to Marketplace
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Get seller initials for avatar
  const getSellerInitials = (email: string) => {
    const name = email.split('@')[0]
    return name.charAt(0).toUpperCase()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center space-x-4">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-semibold text-gray-900">Marketplace</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg overflow-hidden">
              {/* Main Image */}
              <div className="aspect-square bg-facebook-blue-light relative">
                {shouldShowImage(listing) ? (
                  <Image
                    src={listing.image_url!}
                    alt={listing.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    onError={handleImageError}
                  />
                ) : (
                  <div 
                    className="w-full h-full opacity-30"
                    style={{
                      backgroundImage: `
                        linear-gradient(45deg, #1877F2 25%, transparent 25%),
                        linear-gradient(-45deg, #1877F2 25%, transparent 25%),
                        linear-gradient(45deg, transparent 75%, #1877F2 75%),
                        linear-gradient(-45deg, transparent 75%, #1877F2 75%)
                      `,
                      backgroundSize: '20px 20px',
                      backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
                    }}
                  />
                )}
              </div>
            </div>

            {/* Item Details */}
            <Card className="mt-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Item Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Category</span>
                    <span className="font-medium text-gray-900">{listing.category}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Location</span>
                    <span className="font-medium text-gray-900">{listing.location}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Posted</span>
                    <span className="font-medium text-gray-900">{dbUtils.formatDate(listing.created_at)}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Updated</span>
                    <span className="font-medium text-gray-900">{dbUtils.formatDate(listing.updated_at)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Info & Actions */}
          <div className="space-y-6">
            {/* Price & Title */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-3xl font-bold text-gray-900">
                    {dbUtils.formatPrice(listing.price)}
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="icon">
                      <Heart className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Share className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <h1 className="text-2xl font-bold text-gray-900 mb-4">{listing.title}</h1>
                
                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {listing.location}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {dbUtils.formatDate(listing.created_at)}
                  </div>
                </div>

                <div className="flex space-x-2 mb-6">
                  <Badge variant="secondary">{listing.category}</Badge>
                </div>

                <Button className="w-full bg-facebook-blue hover:bg-facebook-blue-dark text-white mb-3">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Message Seller
                </Button>
                
                <Button variant="outline" className="w-full">
                  Make Offer
                </Button>
              </CardContent>
            </Card>

            {/* Seller Info */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Seller Information</h3>
                
                <div className="flex items-center space-x-4 mb-4">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-facebook-blue text-white">
                      {getSellerInitials(listing.seller_email)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-gray-900">{listing.seller_email.split('@')[0]}</div>
                    <div className="text-sm text-gray-600">Member since {dbUtils.formatDate(listing.created_at)}</div>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="text-sm text-gray-600 mb-4">
                  Contact: {listing.seller_email}
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Description</h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {listing.description}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 