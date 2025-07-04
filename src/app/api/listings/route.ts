import { NextRequest, NextResponse } from 'next/server'
import { listingsService } from '@/lib/database'
import { 
  createApiSuccess, 
  createApiError, 
  HTTP_STATUS,
  CreateListingRequest 
} from '@/lib/api-types'

// GET /api/listings - Browse listings with optional search/filter
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const search = searchParams.get('search')

    let listings
    
    if (search) {
      listings = await listingsService.search(search)
    } else if (category) {
      listings = await listingsService.getByCategory(category)
    } else {
      listings = await listingsService.getAll()
    }

    return NextResponse.json(
      createApiSuccess(listings, 'Listings retrieved successfully'),
      { 
        status: HTTP_STATUS.OK,
        headers: {
          'Cache-Control': 'public, max-age=60, s-maxage=300',
          'Vary': 'category, search'
        }
      }
    )
  } catch (error) {
    console.error('Error fetching listings:', error)
    return NextResponse.json(
      createApiError('Failed to fetch listings', 'Internal server error'),
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR }
    )
  }
}

// POST /api/listings - Create new listing
export async function POST(request: NextRequest) {
  try {
    const body: CreateListingRequest = await request.json()

    // Validate required fields
    if (!body.title || !body.description || !body.price || !body.category || !body.seller_email) {
      return NextResponse.json(
        createApiError('Missing required fields', 'title, description, price, category, and seller_email are required'),
        { status: HTTP_STATUS.BAD_REQUEST }
      )
    }

    // Validate price
    if (typeof body.price !== 'number' || body.price <= 0) {
      return NextResponse.json(
        createApiError('Invalid price', 'Price must be a positive number'),
        { status: HTTP_STATUS.BAD_REQUEST }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.seller_email)) {
      return NextResponse.json(
        createApiError('Invalid email', 'Please provide a valid email address'),
        { status: HTTP_STATUS.BAD_REQUEST }
      )
    }

    const listing = await listingsService.create({
      title: body.title.trim(),
      description: body.description.trim(),
      price: body.price,
      category: body.category,
      seller_email: body.seller_email.toLowerCase().trim(),
      image_url: body.image_url || null,
      location: body.location || 'Unknown'
    })

    if (!listing) {
      return NextResponse.json(
        createApiError('Failed to create listing', 'Database operation failed'),
        { status: HTTP_STATUS.INTERNAL_SERVER_ERROR }
      )
    }

    return NextResponse.json(
      createApiSuccess(listing, 'Listing created successfully'),
      { status: HTTP_STATUS.CREATED }
    )
  } catch (error) {
    console.error('Error creating listing:', error)
    
    // Handle JSON parsing errors
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        createApiError('Invalid JSON', 'Request body must be valid JSON'),
        { status: HTTP_STATUS.BAD_REQUEST }
      )
    }

    return NextResponse.json(
      createApiError('Failed to create listing', 'Internal server error'),
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR }
    )
  }
} 