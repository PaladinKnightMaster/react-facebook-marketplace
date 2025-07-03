import { CategoriesSidebar } from "@/components/marketplace/categories-sidebar"
import { ProductGrid } from "@/components/marketplace/product-grid"

export default function Home() {
  return (
    <div className="flex">
      <CategoriesSidebar />
      <div className="flex-1 p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Today&apos;s picks</h2>
        </div>
        
        <ProductGrid />
      </div>
    </div>
  )
}
