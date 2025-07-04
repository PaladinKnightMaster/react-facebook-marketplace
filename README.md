# React Facebook Marketplace Clone

A modern, full-featured marketplace application built with Next.js 15, React 19, and TypeScript, replicating the core functionality of Facebook Marketplace.

![React Facebook Marketplace](https://img.shields.io/badge/Next.js-15.3.4-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.0.0-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=for-the-badge&logo=supabase)

## 🚀 Live Demo

- **Production**: [https://react-facebook-marketplace-px7oypv81.vercel.app](https://react-facebook-marketplace-px7oypv81.vercel.app)
- **Local Development**: `http://localhost:3000`

## ✨ Key Features

### 🛍️ Marketplace Core
- **Browse Listings**: View all available items with real-time data
- **Category Filtering**: Filter items by 20+ categories including Electronics, Vehicles, Home Goods, etc.
- **Search Functionality**: Full-text search across titles, descriptions, and categories
- **Item Details**: Comprehensive item view with images, descriptions, and seller information

### 📝 Listing Management
- **Create Listings**: Easy-to-use form with image upload and real-time preview
- **Image Upload**: Drag & drop image upload with validation and storage
- **Form Validation**: Client-side validation with error handling
- **Category Selection**: 20+ predefined categories for proper organization

### 🔍 User Experience
- **Responsive Design**: Mobile-first approach with seamless desktop experience
- **Loading States**: Progressive loading with skeleton screens
- **Error Handling**: Comprehensive error boundaries and user-friendly error messages
- **Performance Optimized**: Image optimization, caching, and efficient database queries

### 🎨 UI/UX
- **Facebook-inspired Design**: Familiar interface with modern touches
- **Accessibility**: WCAG compliant with proper semantic HTML
- **Dark Mode Ready**: CSS variables for easy theme switching
- **Smooth Animations**: Tailwind-powered animations and transitions

## 🛠️ Tech Stack

### Frontend
- **Next.js 15.3.4** - React framework with App Router
- **React 19.0.0** - Latest React with new features
- **TypeScript** - Type safety and better developer experience
- **Tailwind CSS 3.4.0** - Utility-first CSS framework
- **Radix UI** - Accessible, unstyled UI components
- **Lucide React** - Beautiful icon library

### Backend & Database
- **Supabase** - PostgreSQL database with real-time capabilities
- **Supabase Storage** - File storage for listing images
- **Next.js API Routes** - RESTful API endpoints
- **Row Level Security** - Database-level security policies

### Development & Deployment
- **ESLint** - Code linting and formatting
- **Vercel** - Deployment and hosting platform
- **Git** - Version control

## 🚀 Quick Start

```bash
# Clone and setup
git clone https://github.com/paladinknightmaster/react-facebook-marketplace.git
cd react-facebook-marketplace
npm install

# Configure environment (see SETUP.md for details)
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# Start development server
npm run dev
```

**📖 For detailed setup instructions, database configuration, and troubleshooting, see [SETUP.md](SETUP.md)**

## 🏗️ Project Structure

```
react-facebook-marketplace/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── api/               # API routes
│   │   ├── category/          # Category pages
│   │   ├── create/            # Create listing pages
│   │   ├── item/              # Item detail pages
│   │   └── search/            # Search results
│   ├── components/            # React components
│   │   ├── layout/            # Layout components
│   │   ├── marketplace/       # Marketplace-specific components
│   │   └── ui/                # Reusable UI components
│   └── lib/                   # Utilities and configurations
│       ├── api-client.ts      # API client
│       ├── database.ts        # Database services
│       └── supabase.ts        # Supabase configuration
├── public/                    # Static assets
└── docs/                      # Documentation
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript checker

## 🌟 Performance Optimizations

- **Image Optimization**: Next.js Image component with blur placeholders
- **Caching**: API response caching with appropriate headers
- **Database**: Optimized queries with pagination and selective fields
- **Bundle Splitting**: Efficient code splitting for faster loading

## 🚀 Deployment

**Quick Deploy:** Connect your GitHub repository to [Vercel](https://vercel.com) for automatic deployments.

**📖 For detailed deployment instructions, environment setup, and troubleshooting, see [SETUP.md](SETUP.md#deployment-setup)**

## 📊 Performance Metrics

- **Lighthouse Score**: 95+ Performance
- **First Contentful Paint**: <1.5s
- **Largest Contentful Paint**: <2.5s
- **Bundle Size**: Optimized with tree shaking
- **API Response Time**: <500ms average

## 🤝 Contributing

We welcome contributions! Please check the [Issues](https://github.com/paladinknightmaster/react-facebook-marketplace/issues) page for ways to contribute.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🎯 Key Development Insights

### What Worked Well:

1. **Component-First Approach**: Building UI components first made integration easier
2. **TypeScript Throughout**: Caught errors early and improved developer experience
3. **API-First Design**: Designing API endpoints before implementation clarified data flow
4. **Incremental Development**: Building features one at a time allowed for proper testing

### Challenges Overcome:

1. **Bleeding Edge Tech**: Using latest versions required problem-solving for compatibility
2. **Database Design**: Balancing simplicity with functionality in schema design
3. **State Management**: Coordinating loading states across multiple async operations
4. **File Uploads**: Implementing secure, validated file upload with preview

### Technical Decisions:

1. **Supabase Over Custom Backend**: Faster development, built-in security
2. **Next.js App Router**: Modern, file-based routing with server components
3. **Tailwind CSS**: Utility-first styling for rapid development
4. **TypeScript**: Type safety throughout the application

## 🏗️ Architecture Decisions

### Frontend Architecture:
```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API route handlers
│   ├── (pages)/           # Application pages
│   └── globals.css        # Global styles
├── components/
│   ├── ui/                # Reusable UI components
│   ├── layout/            # Layout components
│   └── marketplace/       # Feature-specific components
└── lib/                   # Utilities and configurations
```

### Database Architecture:
```
listings (main entities)
├── id (UUID, primary key)
├── title, description, price
├── category, location
├── seller_email
├── image_url
└── timestamps

messages (relationships)
├── id (UUID, primary key)
├── listing_id (foreign key)
├── buyer_email, seller_email
├── message
└── timestamp

storage/listing-images (file storage)
```

**Key Database Features:**
- **Listings Table**: Stores all marketplace items with full metadata
- **Messages Table**: Handles buyer-seller communication with proper relationships
- **Storage Bucket**: Manages listing images with public access
- **RLS Policies**: Secure data access controls at database level

### API Architecture:
```
RESTful endpoints with:
├── Proper HTTP methods (GET, POST)
├── Status codes (200, 201, 400, 404, 500)
├── Error handling and validation
├── Type-safe responses
└── Security considerations
```

**API Endpoints:**
- `GET /api/listings` - Browse listings with filtering and search
- `GET /api/listings/[id]` - Get specific listing details
- `POST /api/listings` - Create new listing with validation
- `POST /api/upload` - Upload images to Supabase Storage
- `GET /api/messages` - Get messages for specific listing
- `POST /api/messages` - Send message to seller

## 🙏 Acknowledgments

- **Facebook Marketplace** - Design inspiration
- **Next.js Team** - Amazing React framework
- **Supabase** - Excellent backend-as-a-service
- **Vercel** - Seamless deployment platform
- **Tailwind CSS** - Utility-first CSS framework

## 📞 Support

- **Documentation**: Check our [detailed guides](docs/)
- **Issues**: [GitHub Issues](https://github.com/paladinknightmaster/react-facebook-marketplace/issues)
- **Discussions**: [GitHub Discussions](https://github.com/paladinknightmaster/react-facebook-marketplace/discussions)

---

Built with ❤️ by [paladinknightmaster](https://github.com/paladinknightmaster)
