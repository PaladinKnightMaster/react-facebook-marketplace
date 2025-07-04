# Setup Guide

A comprehensive guide to setting up the React Facebook Marketplace application for development.

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your system:

### Required Software

- **Node.js**: Version 18.0 or higher
  - Download from [nodejs.org](https://nodejs.org/)
  - Verify installation: `node --version`

- **npm**: Usually comes with Node.js
  - Verify installation: `npm --version`
  - Alternative: [Yarn](https://yarnpkg.com/) or [pnpm](https://pnpm.io/)

- **Git**: For version control
  - Download from [git-scm.com](https://git-scm.com/)
  - Verify installation: `git --version`

### Required Services

- **Supabase Account**: For database and storage
  - Sign up at [supabase.com](https://supabase.com/)
  - Create a new project

- **Vercel Account** (optional, for deployment):
  - Sign up at [vercel.com](https://vercel.com/)

## 🚀 Quick Setup

### 1. Clone the Repository

```bash
# Clone the repository
git clone https://github.com/paladinknightmaster/react-facebook-marketplace.git

# Navigate to the project directory
cd react-facebook-marketplace

# Verify the project structure
ls -la
```

### 2. Install Dependencies

```bash
# Install all dependencies
npm install

# Or using yarn
yarn install

# Or using pnpm
pnpm install
```

### 3. Environment Configuration

Create your environment file:

```bash
# Copy the example environment file
cp .env.example .env.local

# Open the file in your preferred editor
nano .env.local
# or
code .env.local
```

Add your Supabase credentials:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional: For production deployments
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Database Setup

#### Option A: Using Supabase Dashboard (Recommended)

1. **Navigate to your Supabase project**
2. **Go to the SQL Editor**
3. **Run the following SQL commands:**

```sql
-- Create listings table
CREATE TABLE IF NOT EXISTS public.listings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    category VARCHAR(100) NOT NULL,
    seller_email VARCHAR(255) NOT NULL,
    image_url TEXT,
    location VARCHAR(255) DEFAULT 'Unknown',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create messages table
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    listing_id UUID NOT NULL REFERENCES public.listings(id) ON DELETE CASCADE,
    buyer_email VARCHAR(255) NOT NULL,
    seller_email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_listings_category ON public.listings(category);
CREATE INDEX IF NOT EXISTS idx_listings_created_at ON public.listings(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_listings_price ON public.listings(price);
CREATE INDEX IF NOT EXISTS idx_messages_listing_id ON public.messages(listing_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON public.messages(created_at);

-- Enable Row Level Security
ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Anyone can view listings" ON public.listings
    FOR SELECT USING (true);

CREATE POLICY "Anyone can create listings" ON public.listings
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can view messages" ON public.messages
    FOR SELECT USING (true);

CREATE POLICY "Anyone can create messages" ON public.messages
    FOR INSERT WITH CHECK (true);

-- Create storage bucket for images
INSERT INTO storage.buckets (id, name, public) VALUES ('listing-images', 'listing-images', true);

-- Create storage policy
CREATE POLICY "Anyone can view images" ON storage.objects
    FOR SELECT USING (bucket_id = 'listing-images');

CREATE POLICY "Anyone can upload images" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'listing-images');
```

#### Option B: Using Supabase CLI

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link your project
supabase link --project-ref your-project-ref

# Apply migrations (if you have migration files)
supabase db push
```

### 5. Add Sample Data (Optional)

To populate your database with sample data:

```sql
-- Insert sample listings
INSERT INTO public.listings (title, description, price, category, seller_email, location) VALUES
('iPhone 13 Pro', 'Excellent condition iPhone 13 Pro with original box and accessories', 899.99, 'Electronics', 'john.doe@example.com', 'San Francisco, CA'),
('Honda Civic 2020', 'Well-maintained Honda Civic with low mileage', 18500.00, 'Vehicles', 'jane.smith@example.com', 'Los Angeles, CA'),
('Dining Table Set', 'Beautiful wooden dining table with 6 chairs', 450.00, 'Home Goods', 'bob.johnson@example.com', 'New York, NY'),
('MacBook Pro M2', 'Brand new MacBook Pro with M2 chip, 16GB RAM', 2299.99, 'Electronics', 'alice.brown@example.com', 'Seattle, WA'),
('Toyota Camry 2019', 'Reliable Toyota Camry in great condition', 16800.00, 'Vehicles', 'mike.wilson@example.com', 'Austin, TX');
```

### 6. Start Development Server

```bash
# Start the development server
npm run dev

# The application will be available at:
# http://localhost:3000
```

## 🔧 Development Environment Setup

### IDE Configuration

#### VS Code (Recommended)

Install these extensions:

```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-typescript-next",
    "ms-vscode.vscode-eslint",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
```

#### VS Code Settings

Create `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "tailwindCSS.experimental.classRegex": [
    "class\\s*[=:]\\s*[\"'`]([^\"'`]*)[\"'`]"
  ]
}
```

### Code Quality Tools

#### ESLint Configuration

The project includes ESLint configuration. To run linting:

```bash
# Check for linting errors
npm run lint

# Fix auto-fixable issues
npm run lint -- --fix
```

#### TypeScript Configuration

The project uses TypeScript with strict mode enabled. To check types:

```bash
# Type checking
npm run type-check

# Build with type checking
npm run build
```

### Environment Variables

Create different environment files for different environments:

#### Development (`.env.local`)
```env
NEXT_PUBLIC_SUPABASE_URL=your_dev_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_dev_anon_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

#### Production (`.env.production`)
```env
NEXT_PUBLIC_SUPABASE_URL=your_prod_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_prod_anon_key
NEXT_PUBLIC_SITE_URL=https://your-production-domain.com
```

## 🐛 Troubleshooting

### Common Issues

#### 1. Node.js Version Issues

```bash
# Check Node.js version
node --version

# If version is too old, update Node.js
# Or use nvm (Node Version Manager)
nvm install 18
nvm use 18
```

#### 2. Package Installation Errors

```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### 3. Supabase Connection Issues

```bash
# Verify environment variables
echo $NEXT_PUBLIC_SUPABASE_URL
echo $NEXT_PUBLIC_SUPABASE_ANON_KEY

# Test connection in browser console
fetch('your_supabase_url/rest/v1/listings', {
  headers: {
    'apikey': 'your_anon_key'
  }
})
```

#### 4. Port Already in Use

```bash
# Kill process using port 3000
lsof -ti:3000 | xargs kill -9

# Or start on different port
npm run dev -- --port 3001
```

#### 5. Build Errors

```bash
# Clear Next.js cache
rm -rf .next

# Rebuild
npm run build
```

### Database Issues

#### 1. RLS Policies Not Working

```sql
-- Check if RLS is enabled
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public';

-- Re-enable RLS if needed
ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;
```

#### 2. Storage Upload Issues

```sql
-- Check storage bucket exists
SELECT * FROM storage.buckets WHERE id = 'listing-images';

-- Recreate bucket if needed
INSERT INTO storage.buckets (id, name, public) 
VALUES ('listing-images', 'listing-images', true);
```

## 📊 Development Workflow

### 1. Feature Development

```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes
# ... code changes ...

# Test changes
npm run dev
npm run build
npm run lint

# Commit changes
git add .
git commit -m "Add new feature"

# Push to remote
git push origin feature/new-feature
```

### 2. Testing

```bash
# Run development server
npm run dev

# Test in browser
# - Homepage: http://localhost:3000
# - Create listing: http://localhost:3000/create/item
# - Categories: http://localhost:3000/category/electronics
# - Search: http://localhost:3000/search?q=test
```

### 3. Production Build

```bash
# Build for production
npm run build

# Test production build locally
npm start

# Check build output
ls -la .next/static/
```

## 🚀 Deployment Setup

### Vercel Deployment

1. **Connect Repository**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Environment Variables**
   - Add all environment variables from `.env.local`
   - Set `NEXT_PUBLIC_SITE_URL` to your domain

3. **Deploy**
   - Vercel will automatically build and deploy
   - Your app will be available at your assigned Vercel URL

### Manual Deployment

```bash
# Build the application
npm run build

# Start production server
npm start

# Or export static files
npm run export
```

## 📝 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## 🆘 Getting Help

If you encounter issues:

1. Check the [troubleshooting section](#troubleshooting)
2. Search [GitHub Issues](https://github.com/paladinknightmaster/react-facebook-marketplace/issues)
3. Create a new issue with detailed information
4. Check the documentation for solutions

---

Happy coding! 🚀 