# Development Guide

A comprehensive guide for developers working on the React Facebook Marketplace application.

## 🏗️ Architecture Overview

### Application Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (Next.js 15)                   │
├─────────────────────────────────────────────────────────────┤
│  Pages (App Router)  │  Components  │  State Management    │
│  ├── Homepage        │  ├── Layout  │  ├── React State     │
│  ├── Category        │  ├── UI      │  ├── API Client     │
│  ├── Search          │  └── Shared  │  └── Context         │
│  ├── Create Listing  │              │                      │
│  └── Item Detail     │              │                      │
├─────────────────────────────────────────────────────────────┤
│                    API Layer (Next.js API)                 │
├─────────────────────────────────────────────────────────────┤
│  Routes              │  Services    │  Validation          │
│  ├── /api/listings   │  ├── CRUD    │  ├── Input           │
│  ├── /api/messages   │  ├── Search  │  ├── File Upload     │
│  └── /api/upload     │  └── Auth    │  └── Error Handling  │
├─────────────────────────────────────────────────────────────┤
│                   Database (Supabase)                      │
├─────────────────────────────────────────────────────────────┤
│  PostgreSQL          │  Storage     │  Real-time           │
│  ├── listings        │  ├── Images  │  ├── Subscriptions   │
│  ├── messages        │  └── Files   │  └── Live Updates    │
│  └── RLS Policies    │              │                      │
└─────────────────────────────────────────────────────────────┘
```

### Technology Stack

#### Frontend Stack
- **Framework**: Next.js 15.3.4 (App Router)
- **React**: 19.0.0 (Latest features)
- **TypeScript**: 5.0 (Strict mode enabled)
- **Styling**: Tailwind CSS 3.4.0
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **State Management**: React hooks

#### Backend Stack
- **API**: Next.js API Routes (RESTful)
- **Database**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage
- **Authentication**: Supabase Auth (ready)
- **Real-time**: Supabase Realtime

## 📁 Project Structure

### Directory Layout

```
react-facebook-marketplace/
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── api/                    # API routes
│   │   │   ├── listings/           # Listings CRUD
│   │   │   ├── messages/           # Messaging
│   │   │   └── upload/             # File upload
│   │   ├── category/[slug]/        # Category pages
│   │   ├── create/                 # Create listing flow
│   │   ├── item/[id]/              # Item detail pages
│   │   └── search/                 # Search results
│   ├── components/                 # React components
│   │   ├── layout/                 # Layout components
│   │   ├── marketplace/            # Business components
│   │   └── ui/                     # Reusable UI
│   └── lib/                        # Utilities
│       ├── api-client.ts           # Frontend API client
│       ├── database.ts             # Database services
│       └── supabase.ts             # Supabase config
└── docs/                           # Documentation
```

## 🔄 Development Workflow

### Git Workflow

#### Branch Structure
- **main**: Production-ready code
- **develop**: Integration branch
- **feature/[name]**: Feature development
- **hotfix/[issue]**: Critical fixes

#### Feature Development Process

```bash
# 1. Start new feature
git checkout main
git pull origin main
git checkout -b feature/new-feature

# 2. Develop and test
npm run dev
npm run build
npm run lint

# 3. Commit and push
git add .
git commit -m "feat: add new feature"
git push origin feature/new-feature

# 4. Create Pull Request
# Submit PR via GitHub
# Request code review
# Address feedback and merge
```

### Code Quality Standards

#### TypeScript Guidelines
- Use strict mode
- No implicit any
- Explicit return types for functions
- Interface for component props

#### Component Structure
```tsx
// 1. Imports
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'

// 2. Types
interface ComponentProps {
  title: string
  onAction: () => void
}

// 3. Component
export function Component({ title, onAction }: ComponentProps) {
  const [loading, setLoading] = useState(false)
  
  const handleClick = () => {
    setLoading(true)
    onAction()
  }
  
  return (
    <div>
      <h1>{title}</h1>
      <Button onClick={handleClick} disabled={loading}>
        {loading ? 'Loading...' : 'Action'}
      </Button>
    </div>
  )
}
```

## 🔧 API Design Patterns

### RESTful Endpoints

```
GET    /api/listings              # List all listings
POST   /api/listings              # Create new listing
GET    /api/listings/{id}         # Get specific listing
PUT    /api/listings/{id}         # Update listing
DELETE /api/listings/{id}         # Delete listing

GET    /api/messages?listing_id=X # Get messages
POST   /api/messages              # Send message
POST   /api/upload                # Upload file
```

### Response Format

```typescript
// Success Response
{
  "success": true,
  "data": { /* actual data */ },
  "message": "Operation completed"
}

// Error Response
{
  "success": false,
  "error": "Error type",
  "message": "Human-readable message"
}
```

### Database Service Pattern

```typescript
export const listingsService = {
  async getAll(limit = 50): Promise<Listing[]> {
    const { data, error } = await supabase
      .from('listings')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit)
    
    if (error) throw new Error(error.message)
    return data || []
  },
  
  async create(listing: CreateListingData): Promise<Listing> {
    const { data, error } = await supabase
      .from('listings')
      .insert([listing])
      .select()
      .single()
    
    if (error) throw new Error(error.message)
    return data
  }
}
```

## 🚀 Performance Optimization

### Frontend Performance

#### Image Optimization
```tsx
<Image
  src={imageUrl}
  alt={altText}
  fill
  sizes="(max-width: 768px) 100vw, 50vw"
  priority={index === 0}
  quality={85}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

#### Code Splitting
```typescript
// Dynamic imports
const LazyComponent = dynamic(() => import('./LazyComponent'), {
  loading: () => <LoadingSpinner />
})
```

### Backend Performance

#### Database Optimization
```sql
-- Essential indexes
CREATE INDEX idx_listings_category ON listings(category);
CREATE INDEX idx_listings_created_at ON listings(created_at DESC);
CREATE INDEX idx_listings_search ON listings USING gin(to_tsvector('english', title || ' ' || description));
```

#### API Caching
```typescript
return NextResponse.json(data, {
  headers: {
    'Cache-Control': 'public, max-age=60, s-maxage=300',
    'ETag': generateETag(data)
  }
})
```

## 🔒 Security Best Practices

### Input Validation
```typescript
const CreateListingSchema = z.object({
  title: z.string().min(3).max(255),
  price: z.number().positive(),
  category: z.enum([/* valid categories */]),
  seller_email: z.string().email()
})
```

### File Upload Security
```typescript
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

function validateFile(file: File): boolean {
  return ALLOWED_TYPES.includes(file.type) && 
         file.size <= MAX_FILE_SIZE
}
```

## 🧪 Testing Strategy

### Unit Testing
```tsx
describe('ProductGrid', () => {
  it('displays loading state initially', () => {
    render(<ProductGrid />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })
})
```

### Integration Testing
```typescript
describe('/api/listings', () => {
  it('creates a new listing', async () => {
    const response = await fetch('/api/listings', {
      method: 'POST',
      body: JSON.stringify(mockListing)
    })
    
    expect(response.status).toBe(201)
  })
})
```

## 🚀 Deployment

### Vercel Configuration
```json
{
  "functions": {
    "src/app/api/**/*.ts": {
      "maxDuration": 30
    }
  },
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=60"
        }
      ]
    }
  ]
}
```

### Environment Variables
```bash
# Production
NEXT_PUBLIC_SUPABASE_URL=production_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=production_key
NEXT_PUBLIC_SITE_URL=https://your-production-domain.com
```

## 📊 Monitoring

### Error Tracking
```typescript
export class ErrorBoundary extends React.Component {
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error:', error, errorInfo)
    
    if (process.env.NODE_ENV === 'production') {
      // Send to error tracking service
    }
  }
}
```

### Performance Metrics
```typescript
export function reportWebVitals(metric: any) {
  if (process.env.NODE_ENV === 'production') {
    analytics.track('web_vital', {
      name: metric.name,
      value: metric.value
    })
  }
}
```

## 🛠️ Development Tools

### Available Scripts
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit"
  }
}
```

### VS Code Configuration
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "tailwindCSS.experimental.classRegex": [
    "class\\s*[=:]\\s*[\"'`]([^\"'`]*)[\"'`]"
  ]
}
```

## 📚 Resources

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

### Best Practices
- [React Best Practices](https://react.dev/learn)
- [TypeScript Guidelines](https://typescript-eslint.io/rules/)
- [Web Accessibility](https://www.w3.org/WAI/WCAG21/quickref/)

---

This guide provides the foundation for effective development on the React Facebook Marketplace application. 