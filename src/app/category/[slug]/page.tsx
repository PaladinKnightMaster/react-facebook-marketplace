import { CategoriesSidebar } from "@/components/marketplace/categories-sidebar"

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
  "groups": "Buy and sell groups"
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
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {/* Mock items for category */}
          {Array.from({ length: 15 }, (_, i) => (
            <div key={i} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200 cursor-pointer">
              <div className="aspect-square bg-facebook-blue-light relative overflow-hidden">
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
              </div>
              
              <div className="p-3">
                <div className="font-semibold text-lg text-gray-900 mb-1">
                  $2,300
                </div>
                <div className="text-sm text-gray-600 mb-2 line-clamp-2">
                  Lorem ipsum dolor sit
                </div>
                <div className="text-xs text-gray-500">
                  Palo Alto, CA
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 