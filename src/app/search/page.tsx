"use client"

import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Search } from "lucide-react"
import { ProductGrid } from "@/components/marketplace/product-grid"

function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''

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
          <div className="flex items-center space-x-2">
            <Search className="w-5 h-5 text-gray-500" />
            <h1 className="text-xl font-semibold text-gray-900">
              Search Results
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Search Query Display */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {query ? (
              <>Results for &quot;{query}&quot;</>
            ) : (
              "Enter a search term"
            )}
          </h2>
        </div>

        {/* Search Results */}
        {query ? (
          <ProductGrid searchQuery={query} />
        ) : (
          /* Empty Search State */
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Start your search
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Use the search bar above to find specific items, or browse by category.
            </p>
            <Link href="/">
              <Button className="bg-facebook-blue hover:bg-facebook-blue-dark text-white">
                Browse Categories
              </Button>
            </Link>
          </div>
        )}

        {/* Search Suggestions */}
        {query && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Popular categories
            </h3>
            <div className="flex flex-wrap gap-2">
              {["Electronics", "Vehicles", "Home Goods", "Apparel", "Sporting Goods"].map((category) => (
                <Link 
                  key={category}
                  href={`/category/${category.toLowerCase().replace(' ', '-')}`}
                >
                  <Badge variant="outline" className="hover:bg-facebook-blue-light cursor-pointer">
                    {category}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Search className="w-8 h-8 text-gray-400 mx-auto mb-2 animate-pulse" />
          <p className="text-gray-600">Loading search results...</p>
        </div>
      </div>
    }>
      <SearchResults />
    </Suspense>
  )
} 