import { useGetCategoriesQuery } from "../store/apiSlice"
import { Loader2 } from "lucide-react"

const CategoryFilter = ({ selectedCategory, onCategoryChange }) => {
  const { data: categories, isLoading, error } = useGetCategoriesQuery()

  if (isLoading) {
    return (
      <div className="flex items-center space-x-2">
        <Loader2 className="h-4 w-4 animate-spin text-teal-600" />
        <span className="text-sm text-gray-600">Loading categories...</span>
      </div>
    )
  }

  if (error) {
    return <div className="text-sm text-red-600">Error loading categories</div>
  }

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <button
        onClick={() => onCategoryChange("")}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          selectedCategory === "" ? "bg-teal-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        All Categories
      </button>
      {categories?.map((category) => (
        <button
          key={category.id || category._id}
          onClick={() => onCategoryChange(category.slug || category.name)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            selectedCategory === (category.slug || category.name)
              ? "bg-teal-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  )
}

export default CategoryFilter
