import { NextRequest, NextResponse } from 'next/server'
import { messagesService } from '@/lib/database'
import { 
  createApiSuccess, 
  createApiError, 
  HTTP_STATUS,
  CreateMessageRequest 
} from '@/lib/api-types'

// GET /api/messages - Get messages for a listing
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const listingId = searchParams.get('listing_id')

    if (!listingId) {
      return NextResponse.json(
        createApiError('Missing listing_id', 'listing_id query parameter is required'),
        { status: HTTP_STATUS.BAD_REQUEST }
      )
    }

    // Validate listing ID format (basic UUID validation)
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    if (!uuidRegex.test(listingId)) {
      return NextResponse.json(
        createApiError('Invalid listing ID', 'listing_id must be a valid UUID'),
        { status: HTTP_STATUS.BAD_REQUEST }
      )
    }

    const messages = await messagesService.getByListing(listingId)

    return NextResponse.json(
      createApiSuccess(messages, 'Messages retrieved successfully'),
      { status: HTTP_STATUS.OK }
    )
  } catch (error) {
    console.error('Error fetching messages:', error)
    return NextResponse.json(
      createApiError('Failed to fetch messages', 'Internal server error'),
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR }
    )
  }
}

// POST /api/messages - Send message to seller
export async function POST(request: NextRequest) {
  try {
    const body: CreateMessageRequest = await request.json()

    // Validate required fields
    if (!body.listing_id || !body.buyer_email || !body.seller_email || !body.message) {
      return NextResponse.json(
        createApiError('Missing required fields', 'listing_id, buyer_email, seller_email, and message are required'),
        { status: HTTP_STATUS.BAD_REQUEST }
      )
    }

    // Validate listing ID format
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    if (!uuidRegex.test(body.listing_id)) {
      return NextResponse.json(
        createApiError('Invalid listing ID', 'listing_id must be a valid UUID'),
        { status: HTTP_STATUS.BAD_REQUEST }
      )
    }

    // Validate email formats
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.buyer_email)) {
      return NextResponse.json(
        createApiError('Invalid buyer email', 'buyer_email must be a valid email address'),
        { status: HTTP_STATUS.BAD_REQUEST }
      )
    }

    if (!emailRegex.test(body.seller_email)) {
      return NextResponse.json(
        createApiError('Invalid seller email', 'seller_email must be a valid email address'),
        { status: HTTP_STATUS.BAD_REQUEST }
      )
    }

    // Validate message length
    const trimmedMessage = body.message.trim()
    if (trimmedMessage.length < 1) {
      return NextResponse.json(
        createApiError('Empty message', 'Message cannot be empty'),
        { status: HTTP_STATUS.BAD_REQUEST }
      )
    }

    if (trimmedMessage.length > 1000) {
      return NextResponse.json(
        createApiError('Message too long', 'Message cannot exceed 1000 characters'),
        { status: HTTP_STATUS.BAD_REQUEST }
      )
    }

    // Prevent users from sending messages to themselves
    if (body.buyer_email.toLowerCase() === body.seller_email.toLowerCase()) {
      return NextResponse.json(
        createApiError('Invalid recipient', 'Cannot send message to yourself'),
        { status: HTTP_STATUS.BAD_REQUEST }
      )
    }

    const message = await messagesService.create({
      listing_id: body.listing_id,
      buyer_email: body.buyer_email.toLowerCase().trim(),
      seller_email: body.seller_email.toLowerCase().trim(),
      message: trimmedMessage
    })

    if (!message) {
      return NextResponse.json(
        createApiError('Failed to send message', 'Database operation failed'),
        { status: HTTP_STATUS.INTERNAL_SERVER_ERROR }
      )
    }

    return NextResponse.json(
      createApiSuccess(message, 'Message sent successfully'),
      { status: HTTP_STATUS.CREATED }
    )
  } catch (error) {
    console.error('Error sending message:', error)
    
    // Handle JSON parsing errors
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        createApiError('Invalid JSON', 'Request body must be valid JSON'),
        { status: HTTP_STATUS.BAD_REQUEST }
      )
    }

    return NextResponse.json(
      createApiError('Failed to send message', 'Internal server error'),
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR }
    )
  }
} 