import { CategoriesSidebar } from "@/components/marketplace/categories-sidebar"
import { ProductGrid } from "@/components/marketplace/product-grid"

const categoryNames: { [key: string]: string } = {
  "vehicles": "Vehicles",
  "property-rentals": "Property Rentals", 
  "apparel": "Apparel",
  "classifieds": "Classifieds",
  "electronics": "Electronics",
  "entertainment": "Entertainment",
  "family": "Family",
  "free-stuff": "Free Stuff",
  "garden-outdoor": "Garden & Outdoor",
  "hobbies": "Hobbies",
  "home-goods": "Home Goods",
  "home-improvement": "Home Improvement",
  "home-sales": "Home Sales",
  "musical-instruments": "Musical Instruments",
  "office-supplies": "Office Supplies",
  "pet-supplies": "Pet Supplies",
  "sporting-goods": "Sporting Goods",
  "toys-games": "Toys & Games",
  "groups": "Buy and sell groups",
  "other": "Other"
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const categoryName = categoryNames[slug] || "Category"
  
  return (
    <div className="flex">
      <CategoriesSidebar />
      <div className="flex-1 p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{categoryName}</h2>
        </div>
        
        <ProductGrid category={categoryName} />
      </div>
    </div>
  )
} 