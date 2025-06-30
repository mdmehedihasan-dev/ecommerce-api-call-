// Helper functions for API data transformation and error handling

export const transformProduct = (apiProduct) => {
  return {
    id: apiProduct.id || apiProduct._id,
    name: apiProduct.name || apiProduct.title,
    price: apiProduct.price || 0,
    originalPrice: apiProduct.originalPrice || apiProduct.price * 1.2,
    rating: apiProduct.rating || 4.5,
    reviews: apiProduct.reviewCount || apiProduct.reviews || 0,
    images: apiProduct.images || ["/placeholder.svg?height=400&width=400"],
    sizes: apiProduct.sizes || ["XS", "S", "M", "L", "XL"],
    colors: apiProduct.colors || ["Blue", "Black", "White", "Gray"],
    inStock: apiProduct.inStock !== undefined ? apiProduct.inStock : true,
    discount: apiProduct.discount || Math.floor(Math.random() * 30) + 5,
    description: apiProduct.description || "",
    category: apiProduct.category || "general",
    slug: apiProduct.slug || apiProduct.id,
    specifications: apiProduct.specifications || {},
  }
}

export const handleApiError = (error) => {
  if (error.status === 404) {
    return "Resource not found"
  } else if (error.status === 500) {
    return "Server error. Please try again later."
  } else if (error.status === "FETCH_ERROR") {
    return "Network error. Please check your connection."
  } else {
    return error.data?.message || "An unexpected error occurred"
  }
}

export const formatPrice = (price) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price)
}
