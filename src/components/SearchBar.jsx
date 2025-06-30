
import { useState, useEffect } from "react"
import { useSearchProductsQuery } from "../redux/apiSlice"
import { Search, Loader2 } from "lucide-react"
import { Link } from "react-router-dom"

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("")
  const [showResults, setShowResults] = useState(false)

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchTerm])

  const {
    data: searchResults,
    isLoading,
    error,
  } = useSearchProductsQuery(debouncedSearchTerm, {
    skip: debouncedSearchTerm.length < 2,
  })

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value)
    setShowResults(true)
  }

  const handleResultClick = () => {
    setShowResults(false)
    setSearchTerm("")
  }

  return (
    <div className="relative flex-1 max-w-md mx-8">
      <div className="relative">
        <input
          type="text"
          placeholder="Search for anything..."
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => setShowResults(true)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>

      {/* Search Results Dropdown */}
      {showResults && debouncedSearchTerm.length >= 2 && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-50 max-h-96 overflow-y-auto">
          {isLoading && (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="h-4 w-4 animate-spin text-teal-600" />
              <span className="ml-2 text-sm text-gray-600">Searching...</span>
            </div>
          )}

          {error && (
            <div className="p-4 text-center text-red-600 text-sm">Error searching products. Please try again.</div>
          )}

          {searchResults && searchResults.length === 0 && !isLoading && (
            <div className="p-4 text-center text-gray-600 text-sm">No products found for "{debouncedSearchTerm}"</div>
          )}

          {searchResults && searchResults.length > 0 && (
            <div className="py-2">
              {searchResults.slice(0, 5).map((product) => (
                <Link
                  key={product.id || product._id}
                  to={`/product/${product.slug || product.id}`}
                  onClick={handleResultClick}
                  className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-50"
                >
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-10 h-10 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                    <p className="text-sm text-gray-500">${product.price}</p>
                  </div>
                </Link>
              ))}
              {searchResults.length > 5 && (
                <div className="px-4 py-2 text-sm text-gray-500 border-t">+{searchResults.length - 5} more results</div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Overlay to close search results */}
      {showResults && <div className="fixed inset-0 z-40" onClick={() => setShowResults(false)} />}
    </div>
  )
}

export default SearchBar
