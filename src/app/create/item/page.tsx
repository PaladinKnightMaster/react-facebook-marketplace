"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Upload, AlertCircle } from "lucide-react"

interface FormData {
  title: string
  price: string
  email: string
  description: string
  category: string
  photos: File[]
}

interface FormErrors {
  title?: string
  price?: string
  email?: string
  description?: string
  category?: string
  photos?: string
}

const categories = [
  { value: "electronics", label: "Electronics" },
  { value: "vehicles", label: "Vehicles" },
  { value: "home-goods", label: "Home Goods" },
  { value: "apparel", label: "Apparel" },
  { value: "sports", label: "Sporting Goods" },
  { value: "books", label: "Books & Media" },
  { value: "toys", label: "Toys & Games" },
  { value: "other", label: "Other" }
]

export default function CreateItemPage() {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    price: "",
    email: "",
    description: "",
    category: "",
    photos: []
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isDragOver, setIsDragOver] = useState(false)

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const formatPrice = (value: string) => {
    // Remove non-digits except decimal point
    const cleanValue = value.replace(/[^\d.]/g, '')
    
    // Handle decimal places (max 2)
    const parts = cleanValue.split('.')
    if (parts.length > 2) {
      return formData.price // Return previous value if multiple decimals
    }
    if (parts[1] && parts[1].length > 2) {
      parts[1] = parts[1].substring(0, 2)
    }
    
    const formattedValue = parts.join('.')
    updateFormData('price', formattedValue)
  }

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = "Title is required"
    } else if (formData.title.length < 3) {
      newErrors.title = "Title must be at least 3 characters"
    }

    if (!formData.price.trim()) {
      newErrors.price = "Price is required"
    } else if (isNaN(parseFloat(formData.price))) {
      newErrors.price = "Please enter a valid price"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.category) {
      newErrors.category = "Please select a category"
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required"
    } else if (formData.description.length < 10) {
      newErrors.description = "Description must be at least 10 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const files = Array.from(e.dataTransfer.files).filter(file => 
      file.type.startsWith('image/')
    )
    
    if (files.length > 0) {
      setFormData(prev => ({ 
        ...prev, 
        photos: [...prev.photos, ...files].slice(0, 5) // Max 5 photos
      }))
    }
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).filter(file => 
      file.type.startsWith('image/')
    )
    
    if (files.length > 0) {
      setFormData(prev => ({ 
        ...prev, 
        photos: [...prev.photos, ...files].slice(0, 5) // Max 5 photos
      }))
    }
  }

  const removePhoto = (index: number) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = () => {
    if (validateForm()) {
      console.log("Form submitted:", formData)
      // Handle form submission
    }
  }

  const displayPrice = formData.price ? `$${formData.price}` : "Price"

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/create">
              <Button variant="ghost" size="icon">
                <X className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-semibold text-gray-900">Create Item Listing</h1>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Form Section */}
        <div className="flex-1 p-8 max-w-md">
          <div className="space-y-6">
            {/* Photo Upload with Drag & Drop */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Photos <span className="text-red-500">*</span>
              </label>
              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-all cursor-pointer ${
                  isDragOver 
                    ? "border-facebook-blue bg-facebook-blue-light" 
                    : "border-gray-300 hover:border-gray-400"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => document.getElementById('photo-input')?.click()}
              >
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-1">
                  {isDragOver ? "Drop photos here" : "Click or drag photos here"}
                </p>
                <p className="text-xs text-gray-500">
                  Up to 5 photos, JPG, PNG (Max 10MB each)
                </p>
                <input
                  id="photo-input"
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileSelect}
                />
              </div>
              
              {/* Photo Previews */}
              {formData.photos.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.photos.map((photo, index) => (
                    <div key={index} className="relative">
                      <Image
                        src={URL.createObjectURL(photo)}
                        alt={`Preview ${index + 1}`}
                        width={64}
                        height={64}
                        className="w-16 h-16 object-cover rounded border"
                      />
                      <button
                        onClick={() => removePhoto(index)}
                        className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {errors.photos && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.photos}
                </p>
              )}
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title <span className="text-red-500">*</span>
              </label>
              <Input
                placeholder="What are you selling?"
                value={formData.title}
                onChange={(e) => updateFormData("title", e.target.value)}
                className={errors.title ? "border-red-500" : ""}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.title}
                </p>
              )}
            </div>

            {/* Category Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <Select value={formData.category} onValueChange={(value) => updateFormData("category", value)}>
                <SelectTrigger className={errors.category ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.category}
                </p>
              )}
            </div>

            {/* Price with Formatting */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <Input
                  placeholder="0.00"
                  value={formData.price}
                  onChange={(e) => formatPrice(e.target.value)}
                  className={`pl-8 ${errors.price ? "border-red-500" : ""}`}
                />
              </div>
              {errors.price && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.price}
                </p>
              )}
            </div>

            {/* Email with Validation */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <Input
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(e) => updateFormData("email", e.target.value)}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <Textarea
                placeholder="Describe your item in detail..."
                rows={6}
                value={formData.description}
                onChange={(e) => updateFormData("description", e.target.value)}
                className={errors.description ? "border-red-500" : ""}
              />
              <p className="text-xs text-gray-500 mt-1">
                {formData.description.length}/500 characters
              </p>
              {errors.description && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.description}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button 
              onClick={handleSubmit}
              className="w-full bg-facebook-blue hover:bg-facebook-blue-dark text-white"
            >
              Create Listing
            </Button>
          </div>
        </div>

        {/* Enhanced Preview Section */}
        <div className="flex-1 p-8">
          <div className="bg-white rounded-lg border border-gray-200 max-w-md sticky top-8">
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview</h3>
              
              {/* Preview Image */}
              <div className="aspect-square bg-facebook-blue-light rounded-lg mb-4 relative overflow-hidden">
                {formData.photos.length > 0 ? (
                  <Image
                    src={URL.createObjectURL(formData.photos[0])}
                    alt="Preview"
                    fill
                    className="object-cover"
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
                {formData.photos.length > 1 && (
                  <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                    +{formData.photos.length - 1} more
                  </div>
                )}
              </div>

              {/* Preview Content */}
              <div className="space-y-2">
                <div className="text-xl font-bold text-gray-900">
                  {displayPrice}
                </div>
                <div className="text-lg text-gray-900">
                  {formData.title || "Item Title"}
                </div>
                {formData.category && (
                  <div className="text-sm text-facebook-blue font-medium">
                    {categories.find(c => c.value === formData.category)?.label}
                  </div>
                )}
                <div className="text-sm text-gray-500 mt-4">
                  Listed just now<br />
                  in Palo Alto, CA
                </div>
                {formData.description && (
                  <div className="text-sm text-gray-600 mt-3">
                    {formData.description.substring(0, 100)}
                    {formData.description.length > 100 && "..."}
                  </div>
                )}
                <div className="mt-6">
                  <div className="text-sm font-medium text-gray-900 mb-1">Seller Information</div>
                  <div className="text-sm text-gray-600">
                    {formData.email || "seller@example.com"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 