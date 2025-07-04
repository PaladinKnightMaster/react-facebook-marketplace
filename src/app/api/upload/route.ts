import { NextRequest, NextResponse } from 'next/server'
import { storageService, dbUtils } from '@/lib/database'
import { 
  createApiSuccess, 
  createApiError, 
  HTTP_STATUS 
} from '@/lib/api-types'

// POST /api/upload - Upload images to storage
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json(
        createApiError('No file provided', 'Please provide a file to upload'),
        { status: HTTP_STATUS.BAD_REQUEST }
      )
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        createApiError('Invalid file type', 'Only image files are allowed'),
        { status: HTTP_STATUS.BAD_REQUEST }
      )
    }

    // Validate file size (10MB limit)
    const maxSize = 10 * 1024 * 1024 // 10MB in bytes
    if (file.size > maxSize) {
      return NextResponse.json(
        createApiError('File too large', 'File size must be less than 10MB'),
        { status: HTTP_STATUS.BAD_REQUEST }
      )
    }

    // Validate file name
    if (!file.name || file.name.trim() === '') {
      return NextResponse.json(
        createApiError('Invalid file name', 'File must have a valid name'),
        { status: HTTP_STATUS.BAD_REQUEST }
      )
    }

    // Generate unique filename
    const fileName = dbUtils.generateImageFileName(file.name)

    // Upload file to storage
    const imageUrl = await storageService.uploadImage(file, fileName)

    if (!imageUrl) {
      return NextResponse.json(
        createApiError('Upload failed', 'Failed to upload image to storage'),
        { status: HTTP_STATUS.INTERNAL_SERVER_ERROR }
      )
    }

    // Optional: Verify the uploaded URL is accessible
    const isAccessible = await dbUtils.testImageUrl(imageUrl)
    if (!isAccessible) {
      console.warn('Uploaded image URL is not accessible:', imageUrl)
      // Don't fail the request, just log the warning
    }

    return NextResponse.json(
      createApiSuccess({ url: imageUrl }, 'Image uploaded successfully'),
      { status: HTTP_STATUS.CREATED }
    )
  } catch (error) {
    console.error('Error uploading image:', error)
    
    // Handle specific error types
    if (error instanceof Error) {
      if (error.message.includes('FormData')) {
        return NextResponse.json(
          createApiError('Invalid form data', 'Request must include multipart/form-data'),
          { status: HTTP_STATUS.BAD_REQUEST }
        )
      }
    }

    return NextResponse.json(
      createApiError('Upload failed', 'Internal server error during file upload'),
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR }
    )
  }
}

// GET /api/upload - Get upload information (optional)
export async function GET() {
  return NextResponse.json(
    createApiSuccess({
      maxFileSize: '10MB',
      allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
      uploadEndpoint: '/api/upload',
      method: 'POST',
      contentType: 'multipart/form-data',
      fieldName: 'file'
    }, 'Upload configuration retrieved'),
    { status: HTTP_STATUS.OK }
  )
} 