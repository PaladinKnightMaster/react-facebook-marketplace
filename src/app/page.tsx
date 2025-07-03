import { CategoriesSidebar } from "@/components/marketplace/categories-sidebar"
import { ProductGrid } from "@/components/marketplace/product-grid"

export default function HomePage() {
  return (
    <div className="flex">
      <CategoriesSidebar />
      <ProductGrid />
    </div>
  )
}
