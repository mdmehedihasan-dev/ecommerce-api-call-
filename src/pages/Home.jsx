import { useGetProductsQuery, useGetCategoriesQuery } from "../redux/apiSlice";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Star, Loader2 } from "lucide-react";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [page, setPage] = useState(1);

  // Fetch products with category filter and pagination
  const { data: products = [], isLoading: productsLoading, error: productsError } = useGetProductsQuery({
    limit: 12,
    category: selectedCategory,
    page: page,
  });

  // Fetch categories
  const { data: categories = [], isLoading: categoriesLoading } = useGetCategoriesQuery();

  // Log products and categories to check the response
  useEffect(() => {
    console.log("Products:", products);
    console.log("Categories:", categories);
  }, [products, categories]);

  // Handlers for pagination
  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white p-12 mb-12">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover Amazing Products</h1>
          <p className="text-xl mb-8 opacity-90">Shop the latest trends and find everything you need in one place</p>
          <Link
            to="/products"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </div>

      {/* Categories */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Shop by Category</h2>
        {categoriesLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
          </div>
        ) : (
          <div className="flex flex-wrap gap-4 mb-8">
            <button
              onClick={() => setSelectedCategory("")}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                selectedCategory === "" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All Products
            </button>
            {categories.map((category) => (
              <button
                key={category.id || category._id}
                onClick={() => setSelectedCategory(category.slug || category.name)}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  selectedCategory === (category.slug || category.name)
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Featured Products */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Products</h2>

        {productsError ? (
          <div className="text-red-600">Error fetching products: {productsError.message}</div>
        ) : productsLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <span className="ml-2 text-gray-600">Loading products...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => {
              console.log("Rendering product:", product); // Log each product to see if the data is correct
              return (
                <Link
                  key={product.id || product._id}
                  to={`/product/${product.slug || product.id}`}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden border"
                >
                  <div className="aspect-square bg-gray-100">
                    <img
                      src={product.thumbnail || "/placeholder.svg?height=300&width=300"}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "/placeholder.svg?height=300&width=300";
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                    <div className="flex items-center mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(product.rating_avg || 4) ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 ml-1">({product.rating_count || 0})</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-gray-900">${product.discount_price}</span>
                      {product.regular_price && product.regular_price > product.discount_price && (
                        <span className="text-sm text-gray-500 line-through">${product.regular_price}</span>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-between mt-4">
          <button
            onClick={handlePrevPage}
            disabled={page === 1}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={products.length < 12}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
