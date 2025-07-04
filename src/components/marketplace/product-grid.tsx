"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { getListings, searchListings, getListingsByCategory } from "@/lib/api-client"
import { dbUtils } from "@/lib/database"
import { Listing } from "@/lib/supabase"

interface ProductGridProps {
  category?: string
  searchQuery?: string
}

export function ProductGrid({ category, searchQuery }: ProductGridProps) {
  const [listings, setListings] = useState<Listing[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set())

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true)
        setError(null)
        
        let data: Listing[] = []
        
        if (searchQuery) {
          data = await searchListings(searchQuery)
        } else if (category) {
          data = await getListingsByCategory(category)
        } else {
          data = await getListings()
        }
        
        setListings(data)
      } catch (err) {
        console.error('Error fetching listings:', err)
        setError('Failed to load listings')
      } finally {
        setLoading(false)
      }
    }

    fetchListings()
  }, [category, searchQuery])

  const handleImageError = (listingId: string) => {
    console.log('Image failed to load for listing:', listingId)
    setImageErrors(prev => new Set(prev).add(listingId))
  }

  const shouldShowImage = (listing: Listing) => {
    return listing.image_url && 
           dbUtils.isValidImageUrl(listing.image_url) && 
           !imageErrors.has(listing.id)
  }

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {Array.from({ length: 10 }, (_, i) => (
          <div key={i} className="bg-white rounded-lg border border-gray-200 overflow-hidden animate-pulse">
            <div className="aspect-square bg-gray-200" />
            <div className="p-3">
              <div className="h-6 bg-gray-200 rounded mb-2" />
              <div className="h-4 bg-gray-200 rounded mb-2" />
              <div className="h-3 bg-gray-200 rounded" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="text-facebook-blue hover:underline"
        >
          Try again
        </button>
      </div>
    )
  }

  if (listings.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 mb-4">
          {searchQuery 
            ? `No listings found for "${searchQuery}"`
            : category 
            ? `No listings found in this category`
            : 'No listings available'}
        </p>
        <Link 
          href="/create"
          className="text-facebook-blue hover:underline"
        >
          Create the first listing
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {listings.map((listing) => (
        <Link 
          key={listing.id} 
          href={`/item/${listing.id}`}
          className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200 cursor-pointer"
        >
          <div className="aspect-square bg-facebook-blue-light relative overflow-hidden">
            {shouldShowImage(listing) ? (
              <Image
                src={listing.image_url!}
                alt={listing.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                onError={() => handleImageError(listing.id)}
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
                  backgroundSize: '10px 10px',
                  backgroundPosition: '0 0, 0 5px, 5px -5px, -5px 0px'
                }}
              />
            )}
          </div>
          
          <div className="p-3">
            <div className="font-semibold text-lg text-gray-900 mb-1">
              {dbUtils.formatPrice(listing.price)}
            </div>
            <div className="text-sm text-gray-600 mb-2 line-clamp-2">
              {listing.title}
            </div>
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs text-gray-500">
                {listing.location}
              </div>
              <Badge variant="secondary" className="text-xs">
                {listing.category}
              </Badge>
            </div>
            <div className="text-xs text-gray-400">
              {dbUtils.formatDate(listing.created_at)}
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
} 