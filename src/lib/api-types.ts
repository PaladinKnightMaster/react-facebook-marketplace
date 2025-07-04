import { Listing, Message } from './supabase'

// API Response wrappers
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface ApiError {
  success: false
  error: string
  message?: string
}

export interface ApiSuccess<T = unknown> {
  success: true
  data: T
  message?: string
}

// Listings API types
export type ListingsResponse = ApiSuccess<Listing[]>
export type ListingResponse = ApiSuccess<Listing>
export interface CreateListingRequest {
  title: string
  description: string
  price: number
  category: string
  seller_email: string
  image_url?: string | null
  location: string
}

// Messages API types
export type MessagesResponse = ApiSuccess<Message[]>
export type MessageResponse = ApiSuccess<Message>
export interface CreateMessageRequest {
  listing_id: string
  buyer_email: string
  seller_email: string
  message: string
}

// Upload API types
export type UploadResponse = ApiSuccess<{ url: string }>

// Query parameters
export interface ListingsQuery {
  category?: string
  search?: string
  limit?: number
  offset?: number
}

export interface MessagesQuery {
  listing_id?: string
}

// Utility functions for API responses
export const createApiSuccess = <T>(data: T, message?: string): ApiSuccess<T> => ({
  success: true,
  data,
  message
})

export const createApiError = (error: string, message?: string): ApiError => ({
  success: false,
  error,
  message
})

// HTTP Status codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
} as const 