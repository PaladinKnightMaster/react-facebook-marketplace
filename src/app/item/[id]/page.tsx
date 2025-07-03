"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft } from "lucide-react"

// Mock item data
const mockItem = {
  id: 1,
  title: "Bike 24 inch",
  price: "$99",
  location: "Palo Alto, CA",
  listedTime: "1 hour ago",
  seller: {
    name: "Wei Gu",
    avatar: "/placeholder-avatar.jpg"
  },
  description: "Great bike in excellent condition. Perfect for commuting or recreational riding."
}

export default function ItemDetailPage({ params }: { params: { id: string } }) {
  const [message, setMessage] = useState("I want to buy your bike!")

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

      <div className="flex">
        {/* Image Section */}
        <div className="flex-1 p-8">
          <div className="max-w-2xl">
            <div className="aspect-square bg-facebook-blue-light rounded-lg relative overflow-hidden">
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
          </div>
        </div>

        {/* Details Section */}
        <div className="w-96 bg-white border-l border-gray-200 p-6">
          <div className="space-y-6">
            {/* Title and Price */}
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">{mockItem.title}</h1>
              <div className="text-2xl font-bold text-gray-900">{mockItem.price}</div>
            </div>

            {/* Location and Time */}
            <div className="text-sm text-gray-500">
              Listed {mockItem.listedTime}<br />
              in {mockItem.location}
            </div>

            {/* Seller Information */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">Seller Information</h3>
              <div className="text-sm text-gray-600">{mockItem.seller.name}</div>
            </div>

            {/* Message Section */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">Send seller a message</h3>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                rows={4}
                className="mb-4"
              />
              <Button className="w-full bg-facebook-blue hover:bg-facebook-blue-dark text-white">
                Send
              </Button>
            </div>

            {/* Description */}
            {mockItem.description && (
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Description</h3>
                <p className="text-sm text-gray-600">{mockItem.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 