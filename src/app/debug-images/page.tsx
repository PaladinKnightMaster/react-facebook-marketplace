"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { listingsService, dbUtils } from "@/lib/database"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Listing } from "@/lib/supabase"

export default function DebugImagesPage() {
  const [listings, setListings] = useState<Listing[]>([])
  const [testUrl, setTestUrl] = useState("")
  const [testResults, setTestResults] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchListings = async () => {
      const data = await listingsService.getAll()
      setListings(data)
    }
    fetchListings()
  }, [])

  const addResult = (message: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`])
  }

  const testImageUrl = async (url: string) => {
    if (!url) return
    
    setLoading(true)
    setTestResults([])
    
    try {
      addResult(`Testing URL: ${url}`)
      
      // Test 1: URL validation
      const isValid = dbUtils.isValidImageUrl(url)
      addResult(`URL validation: ${isValid ? '✅ Valid' : '❌ Invalid'}`)
      
      // Test 2: Accessibility test
      const isAccessible = await dbUtils.testImageUrl(url)
      addResult(`URL accessibility: ${isAccessible ? '✅ Accessible' : '❌ Not accessible'}`)
      
      // Test 3: Try to load as image
      const img = new window.Image()
      img.crossOrigin = 'anonymous'
      
      const imageLoadPromise = new Promise((resolve) => {
        img.onload = () => {
          addResult(`✅ Image loaded successfully (${img.width}x${img.height})`)
          resolve('success')
        }
        img.onerror = () => {
          addResult(`❌ Image failed to load`)
          resolve('error')
        }
      })
      
      img.src = url
      await imageLoadPromise
      
    } catch (error) {
      addResult(`❌ Test failed: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Manual URL Test */}
        <Card>
          <CardHeader>
            <CardTitle>Manual Image URL Test</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Enter image URL to test"
                value={testUrl}
                onChange={(e) => setTestUrl(e.target.value)}
                className="flex-1"
              />
              <Button 
                onClick={() => testImageUrl(testUrl)}
                disabled={loading || !testUrl}
              >
                {loading ? "Testing..." : "Test URL"}
              </Button>
            </div>
            
            {testResults.length > 0 && (
              <div className="bg-black text-green-400 p-4 rounded font-mono text-sm max-h-48 overflow-y-auto">
                {testResults.map((result, index) => (
                  <div key={index} className="mb-1">
                    {result}
                  </div>
                ))}
              </div>
            )}
            
            {testUrl && (
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Preview:</h4>
                <div className="w-64 h-64 bg-gray-100 rounded border relative">
                  <Image
                    src={testUrl}
                    alt="Test image"
                    fill
                    className="object-cover rounded"
                    onError={() => addResult("❌ Next.js Image component failed to load")}
                    onLoad={() => addResult("✅ Next.js Image component loaded successfully")}
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Current Listings Debug */}
        <Card>
          <CardHeader>
            <CardTitle>Current Listings Image URLs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {listings.length === 0 ? (
                <p className="text-gray-500">No listings found</p>
              ) : (
                listings.map((listing) => (
                  <div key={listing.id} className="border rounded p-4">
                    <div className="flex items-start gap-4">
                      <div className="w-20 h-20 bg-gray-100 rounded relative flex-shrink-0">
                        {listing.image_url ? (
                          <Image
                            src={listing.image_url}
                            alt={listing.title}
                            fill
                            className="object-cover rounded"
                            onError={() => console.log('Image failed:', listing.image_url)}
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center text-xs">
                            No Image
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{listing.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{dbUtils.formatPrice(listing.price)}</p>
                        <div className="text-xs space-y-1">
                          <div><strong>Image URL:</strong></div>
                          <div className="font-mono text-xs bg-gray-100 p-2 rounded break-all">
                            {listing.image_url || 'No image URL'}
                          </div>
                        </div>
                        <div className="mt-2 flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setTestUrl(listing.image_url || '')
                              testImageUrl(listing.image_url || '')
                            }}
                            disabled={!listing.image_url}
                          >
                            Test URL
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              if (listing.image_url) {
                                window.open(listing.image_url, '_blank')
                              }
                            }}
                            disabled={!listing.image_url}
                          >
                            Open URL
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 