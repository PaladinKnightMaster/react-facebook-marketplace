"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Share, MessageCircle, MapPin, Calendar, Eye, Star } from "lucide-react"

// Mock data for item detail
const mockItem = {
  id: "1",
  title: "MacBook Air M2 - Like New",
  price: 1200,
  images: [
    "/api/placeholder/400/400",
    "/api/placeholder/400/400",
    "/api/placeholder/400/400",
  ],
  description: "MacBook Air with M2 chip in excellent condition. Used for light programming and web browsing. Comes with original charger and box. No scratches or dents. Battery health is at 94%. Perfect for students or professionals.",
  location: "Palo Alto, CA",
  seller: {
    name: "Sarah Chen",
    avatar: "/api/placeholder/40/40",
    joinedDate: "March 2020",
    rating: 4.9,
    totalRatings: 47
  },
  category: "Electronics",
  condition: "Like New",
  postedDate: "2 days ago",
  views: 124,
  saves: 12,
  specs: {
    "Processor": "Apple M2",
    "Memory": "8GB",
    "Storage": "256GB SSD",
    "Screen": "13.6-inch Liquid Retina",
    "Color": "Midnight"
  }
}

export default function ItemDetailPage() {
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
              </div>
              
              {/* Image Thumbnails */}
              <div className="flex space-x-2 p-4 bg-gray-50">
                {mockItem.images.map((_, index) => (
                  <div key={index} className="w-16 h-16 bg-facebook-blue-light rounded border-2 border-facebook-blue cursor-pointer">
                    <div 
                      className="w-full h-full opacity-30"
                      style={{
                        backgroundImage: `
                          linear-gradient(45deg, #1877F2 25%, transparent 25%),
                          linear-gradient(-45deg, #1877F2 25%, transparent 25%),
                          linear-gradient(45deg, transparent 75%, #1877F2 75%),
                          linear-gradient(-45deg, transparent 75%, #1877F2 75%)
                        `,
                        backgroundSize: '6px 6px',
                        backgroundPosition: '0 0, 0 3px, 3px -3px, -3px 0px'
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Item Details */}
            <Card className="mt-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Item Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(mockItem.specs).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-gray-100 last:border-b-0">
                      <span className="text-gray-600">{key}</span>
                      <span className="font-medium text-gray-900">{value}</span>
                    </div>
                  ))}
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
                    ${mockItem.price.toLocaleString()}
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
                
                <h1 className="text-2xl font-bold text-gray-900 mb-4">{mockItem.title}</h1>
                
                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {mockItem.location}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {mockItem.postedDate}
                  </div>
                  <div className="flex items-center">
                    <Eye className="w-4 h-4 mr-1" />
                    {mockItem.views}
                  </div>
                </div>

                <div className="flex space-x-2 mb-6">
                  <Badge variant="secondary">{mockItem.category}</Badge>
                  <Badge variant="outline">{mockItem.condition}</Badge>
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
                    <AvatarImage src={mockItem.seller.avatar} />
                    <AvatarFallback>{mockItem.seller.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-gray-900">{mockItem.seller.name}</div>
                    <div className="text-sm text-gray-600">Joined {mockItem.seller.joinedDate}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < Math.floor(mockItem.seller.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {mockItem.seller.rating} ({mockItem.seller.totalRatings} reviews)
                  </span>
                </div>

                <Separator className="my-4" />

                <Button variant="outline" className="w-full">
                  View Seller Profile
                </Button>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Description</h3>
                <p className="text-gray-700 leading-relaxed">{mockItem.description}</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Similar Items */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Similar Items</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200 cursor-pointer">
                <div className="aspect-square bg-facebook-blue-light relative">
                  <div 
                    className="w-full h-full opacity-30"
                    style={{
                      backgroundImage: `
                        linear-gradient(45deg, #1877F2 25%, transparent 25%),
                        linear-gradient(-45deg, #1877F2 25%, transparent 25%),
                        linear-gradient(45deg, transparent 75%, #1877F2 75%),
                        linear-gradient(-45deg, transparent 75%, #1877F2 75%)
                      `,
                      backgroundSize: '10px 10px',
                      backgroundPosition: '0 0, 0 5px, 5px -5px, -5px 0px'
                    }}
                  />
                </div>
                
                <div className="p-3">
                  <div className="font-semibold text-sm text-gray-900 mb-1">
                    ${800 + (i * 100)}
                  </div>
                  <div className="text-xs text-gray-600 mb-2 line-clamp-2">
                    Similar MacBook Air
                  </div>
                  <div className="text-xs text-gray-500">
                    {mockItem.location}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 