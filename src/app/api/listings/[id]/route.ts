import { NextRequest, NextResponse } from 'next/server'
import { listingsService } from '@/lib/database'
import { 
  createApiSuccess, 
  createApiError, 
  HTTP_STATUS 
} from '@/lib/api-types'

// GET /api/listings/[id] - Get specific listing by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // Validate ID format (basic UUID validation)
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    if (!uuidRegex.test(id)) {
      return NextResponse.json(
        createApiError('Invalid listing ID', 'Listing ID must be a valid UUID'),
        { status: HTTP_STATUS.BAD_REQUEST }
      )
    }

    const listing = await listingsService.getById(id)

    if (!listing) {
      return NextResponse.json(
        createApiError('Listing not found', `No listing found with ID: ${id}`),
        { status: HTTP_STATUS.NOT_FOUND }
      )
    }

    return NextResponse.json(
      createApiSuccess(listing, 'Listing retrieved successfully'),
      { 
        status: HTTP_STATUS.OK,
        headers: {
          'Cache-Control': 'public, max-age=300, s-maxage=600',
          'ETag': `"${listing.id}-${new Date(listing.updated_at).getTime()}"`
        }
      }
    )
  } catch (error) {
    console.error('Error fetching listing:', error)
    return NextResponse.json(
      createApiError('Failed to fetch listing', 'Internal server error'),
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR }
    )
  }
}

// PUT /api/listings/[id] - Update specific listing (optional for future use)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    // Validate ID format
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    if (!uuidRegex.test(id)) {
      return NextResponse.json(
        createApiError('Invalid listing ID', 'Listing ID must be a valid UUID'),
        { status: HTTP_STATUS.BAD_REQUEST }
      )
    }

    // Check if listing exists
    const existingListing = await listingsService.getById(id)
    if (!existingListing) {
      return NextResponse.json(
        createApiError('Listing not found', `No listing found with ID: ${id}`),
        { status: HTTP_STATUS.NOT_FOUND }
      )
    }

    // Update listing
    const updatedListing = await listingsService.update(id, body)

    if (!updatedListing) {
      return NextResponse.json(
        createApiError('Failed to update listing', 'Database operation failed'),
        { status: HTTP_STATUS.INTERNAL_SERVER_ERROR }
      )
    }

    return NextResponse.json(
      createApiSuccess(updatedListing, 'Listing updated successfully'),
      { status: HTTP_STATUS.OK }
    )
  } catch (error) {
    console.error('Error updating listing:', error)
    
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        createApiError('Invalid JSON', 'Request body must be valid JSON'),
        { status: HTTP_STATUS.BAD_REQUEST }
      )
    }

    return NextResponse.json(
      createApiError('Failed to update listing', 'Internal server error'),
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR }
    )
  }
}

// DELETE /api/listings/[id] - Delete specific listing (optional for future use)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // Validate ID format
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    if (!uuidRegex.test(id)) {
      return NextResponse.json(
        createApiError('Invalid listing ID', 'Listing ID must be a valid UUID'),
        { status: HTTP_STATUS.BAD_REQUEST }
      )
    }

    // Check if listing exists
    const existingListing = await listingsService.getById(id)
    if (!existingListing) {
      return NextResponse.json(
        createApiError('Listing not found', `No listing found with ID: ${id}`),
        { status: HTTP_STATUS.NOT_FOUND }
      )
    }

    const deleted = await listingsService.delete(id)

    if (!deleted) {
      return NextResponse.json(
        createApiError('Failed to delete listing', 'Database operation failed'),
        { status: HTTP_STATUS.INTERNAL_SERVER_ERROR }
      )
    }

    return NextResponse.json(
      createApiSuccess(null, 'Listing deleted successfully'),
      { status: HTTP_STATUS.OK }
    )
  } catch (error) {
    console.error('Error deleting listing:', error)
    return NextResponse.json(
      createApiError('Failed to delete listing', 'Internal server error'),
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR }
    )
  }
} 