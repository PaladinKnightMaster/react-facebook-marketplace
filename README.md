# Facebook Marketplace Clone

A React 19 and Next.js 15 application that replicates Facebook Marketplace functionality with modern UI components.

## Features

- **Homepage**: Marketplace with categories sidebar and product grid
- **Create Listing Flow**: Type selection and detailed listing form with live preview
- **Item Details**: Individual item pages with seller information and messaging
- **Categories**: Browse items by category (Vehicles, Electronics, Home Goods, etc.)
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Frontend**: React 19 + Next.js 15 (App Router)
- **Styling**: Tailwind CSS + shadcn/ui components
- **Icons**: Lucide React
- **TypeScript**: Full type safety

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Homepage
│   ├── create/            # Listing creation flow
│   │   ├── page.tsx       # Type selection
│   │   └── item/page.tsx  # Item creation form
│   ├── item/[id]/         # Item detail pages
│   └── category/[slug]/   # Category pages
├── components/
│   ├── layout/
│   │   └── header.tsx     # Main navigation header
│   ├── marketplace/
│   │   ├── categories-sidebar.tsx
│   │   └── product-grid.tsx
│   └── ui/                # shadcn/ui components
└── lib/
    └── utils.ts           # Utility functions
```

## Pages

- **`/`** - Homepage with marketplace listings
- **`/create`** - Choose listing type
- **`/create/item`** - Create new item listing  
- **`/item/[id]`** - View item details
- **`/category/[slug]`** - Browse category items

## Design Features

- Facebook-style header with logo and navigation
- Categories sidebar with all major marketplace categories
- Product grid with crosshatch placeholder images
- Real-time form preview during listing creation
- Responsive layout for all screen sizes
- Hover effects and smooth transitions

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Customization

The app uses mock data for demonstration. To connect to a real backend:

1. Replace mock data in components with API calls
2. Add authentication for user management
3. Implement real image upload functionality
4. Add search and filtering capabilities
5. Connect messaging system to a real backend

## Components

### Key Components

- **Header**: Navigation with search and user actions
- **CategoriesSidebar**: Left navigation with marketplace categories
- **ProductGrid**: Responsive grid of marketplace items
- **Item Forms**: Create listing forms with live preview

### UI Components (shadcn/ui)

- Button, Input, Textarea
- Card, Badge, Avatar
- Select, Dialog, Separator

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this project for learning or as a starting point for your own marketplace application.
