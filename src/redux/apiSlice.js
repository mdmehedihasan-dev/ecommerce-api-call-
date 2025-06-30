import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

// Your actual API base URL
const API_BASE_URL = "http://157.230.240.97:9999/api/v1"

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("content-type", "application/json")
      return headers
    },
  }),
  tagTypes: ["Product", "Category"],
  endpoints: (builder) => ({
    // Categories endpoints
    getCategories: builder.query({
      query: () => "/categories",
      providesTags: ["Category"],
      transformResponse: (response) => {
        return response?.data || response || []
      },
    }),

    // All Products endpoints
    getProducts: builder.query({
      query: ({ page = 1, limit = 12, category = "" } = {}) => {
        const params = new URLSearchParams()
        params.append("page", page.toString())
        params.append("limit", limit.toString())
        if (category) params.append("category", category)
        return `/shop/products?${params.toString()}`
      },
      providesTags: ["Product"],
      transformResponse: (response) => {
        console.log(response)
        return response?.data || response || []
      },
    }),

    getProductBySlug: builder.query({
      query: (slug) => `/product/${slug}`,
      providesTags: (result, error, slug) => [{ type: "Product", id: slug }],
      transformResponse: (response) => {
        const product = response?.data || response
        if (!product) return null

        return {
          ...product,
          images: Array.isArray(product.images) ? product.images : [product.image || "/placeholder.svg"],
          variations: product.variations || [],
          specifications: product.specifications || {},
          description: product.description || "",
          category: product.category || {},
        }
      },
    }),
  }),
})

// Export hooks for usage in functional components
export const { useGetCategoriesQuery, useGetProductsQuery, useGetProductBySlugQuery } = apiSlice
