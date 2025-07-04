import { Loader2 } from 'lucide-react'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function LoadingSpinner({ size = 'md', className = '' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  }

  return (
    <Loader2 className={`animate-spin ${sizeClasses[size]} ${className}`} />
  )
}

interface LoadingStateProps {
  message?: string
  className?: string
}

export function LoadingState({ message = 'Loading...', className = '' }: LoadingStateProps) {
  return (
    <div className={`flex items-center justify-center min-h-96 p-8 ${className}`}>
      <div className="text-center">
        <LoadingSpinner size="lg" className="text-facebook-blue mx-auto mb-4" />
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  )
}

interface LoadingCardProps {
  className?: string
}

export function LoadingCard({ className = '' }: LoadingCardProps) {
  return (
    <div className={`bg-white rounded-lg border border-gray-200 overflow-hidden animate-pulse ${className}`}>
      <div className="aspect-square bg-gray-200" />
      <div className="p-3">
        <div className="h-6 bg-gray-200 rounded mb-2" />
        <div className="h-4 bg-gray-200 rounded mb-2" />
        <div className="h-3 bg-gray-200 rounded" />
      </div>
    </div>
  )
}

interface LoadingGridProps {
  count?: number
  className?: string
}

export function LoadingGrid({ count = 10, className = '' }: LoadingGridProps) {
  return (
    <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 ${className}`}>
      {Array.from({ length: count }, (_, i) => (
        <LoadingCard key={i} />
      ))}
    </div>
  )
}

interface LoadingButtonProps {
  children: React.ReactNode
  isLoading?: boolean
  className?: string
  [key: string]: unknown
}

export function LoadingButton({ 
  children, 
  isLoading = false, 
  className = '', 
  ...props 
}: LoadingButtonProps) {
  return (
    <button 
      className={`inline-flex items-center justify-center ${className}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading && <LoadingSpinner size="sm" className="mr-2" />}
      {children}
    </button>
  )
}

// Progressive loading skeleton for marketplace items
export function ProgressiveLoadingGrid({ count = 10, className = '' }: LoadingGridProps) {
  return (
    <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 ${className}`}>
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="aspect-square bg-gradient-to-br from-facebook-blue-light to-gray-100 animate-pulse" />
          <div className="p-3 space-y-2">
            <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse" />
            <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-3/4 animate-pulse" />
            <div className="flex justify-between items-center">
              <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/2 animate-pulse" />
              <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/4 animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
} 