import { useState } from "react"
import { useGetProductsQuery, useGetCategoriesQuery } from "../redux/apiSlice"
import { Star, Loader2 } from "lucide-react"
import { Link } from "react-router-dom"

const ProductList = () => {
  const [page, setPage] = useState(1)
  const [category, setCategory] = useState("")

  const { data: products = [], isLoading, error, isFetching } = useGetProductsQuery({ page, limit: 8, category })

  const { data: categories = [], isLoading: categoriesLoading } = useGetCategoriesQuery()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-teal-600" />
        <span className="ml-2 text-gray-600">Loading products...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <p className="text-red-600 mb-4">Error loading products. Please try again.</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Featured Products</h2>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          disabled={categoriesLoading}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id || cat._id || cat.name} value={cat.slug || cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No products found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => {
            const productId = product.id || product._id || Math.random()
            const productSlug = product.slug || product.id || productId

            return (
              <Link
                key={productId}
                to={`/product/${productSlug}`}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                <div className="aspect-square bg-gray-100">
                  <img
                    src={product.images?.[0] || "/placeholder.svg?height=300&width=300"}
                    alt={product.name || "Product"}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "/placeholder.svg?height=300&width=300"
                    }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">{product.name || "Product Name"}</h3>
                  <div className="flex items-center mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < Math.floor(product.rating || 4) ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 ml-1">({product.reviews || 0})</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-gray-900">${product.price || 0}</span>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <>
                        <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                        <span className="text-xs bg-orange-100 text-orange-800 px-1 py-0.5 rounded">
                          {product.discount || 10}% OFF
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-center space-x-4 mt-8">
        <button
          onClick={() => setPage((prev) => Math.max(1, prev - 1))}
          disabled={page === 1 || isFetching}
          className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
        >
          Previous
        </button>
        <span className="px-4 py-2">Page {page}</span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={isFetching}
          className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default ProductList
