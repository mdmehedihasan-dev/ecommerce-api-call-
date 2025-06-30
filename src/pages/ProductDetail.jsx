import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useGetProductBySlugQuery, useGetCategoriesQuery } from "../redux/apiSlice";
import { addToCart } from "../redux/cartSlice";
import { Star, Heart, Share2, Minus, Plus, Loader2, ChevronDown, ChevronUp } from "lucide-react";

const BASE_URL = "http://157.230.240.97:9999/api/v1"; // Update this to your actual API base URL

const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showFullSpecifications, setShowFullSpecifications] = useState(false);

  const { data: product, isLoading, error } = useGetProductBySlugQuery(slug);
  const { data: categories = [] } = useGetCategoriesQuery();

  // Log the product and categories data for debugging
  useEffect(() => {
    if (product) {
      console.log("Fetched product data:", product);
    }
    if (categories) {
      console.log("Fetched categories data:", categories);
    }
  }, [product, categories]);

  // Set default selections when product loads
  useEffect(() => {
    if (product) {
      if (product.variations?.colors?.length > 0 && !selectedColor) {
        setSelectedColor(product.variations.colors[0]);
      }
      if (product.variations?.sizes?.length > 0 && !selectedSize) {
        setSelectedSize(product.variations.sizes[0]);
      }
    }
  }, [product, selectedColor, selectedSize]);

  const handleAddToCart = () => {
    if (!product) return;

    const cartItem = {
      id: product.id || product._id,
      name: product.name || product.title,
      price: product.price,
      image: product.images[0],  // Ensure this is valid
      color: selectedColor || "Default",
      size: selectedSize || "Default",
      quantity,
    };

    dispatch(addToCart(cartItem));

    // Show success feedback
    alert("Product added to cart!");
  };

  const handleQuantityChange = (type) => {
    if (type === "increment") {
      setQuantity((prev) => prev + 1);
    } else if (type === "decrement" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  // Check for loading and error states
  if (isLoading) {
    console.log("Loading product...");
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-600">Loading product...</span>
      </div>
    );
  }

  if (error || !product) {
    console.log("Error or no product found");
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">Product not found</p>
        <button onClick={() => navigate("/")} className="bg-blue-600 text-white px-6 py-2 rounded-lg">
          Back to Home
        </button>
      </div>
    );
  }

  // Ensure that product.images is an array before accessing
  if (!Array.isArray(product.images) || product.images.length === 0) {
    console.log('No images available for this product');
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">No images available for this product.</p>
        <button onClick={() => navigate("/")} className="bg-blue-600 text-white px-6 py-2 rounded-lg">
          Back to Home
        </button>
      </div>
    );
  }

  const productCategory = categories.find((cat) => cat.id === product.categoryId || cat.name === product.category?.name);
  console.log("Selected Category:", productCategory); // Verify selected category

  // Helper function to get the full image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) {
      console.log('No image URL provided');
      return "/placeholder.svg?height=600&width=600";  // Fallback URL
    }

    if (typeof imagePath === "string") {
      // Check if the imagePath is a valid URL (e.g., contains 'http')
      if (imagePath.startsWith("http") || imagePath.startsWith("https")) {
        return imagePath;  // Return the full URL
      } else {
        // Append the base URL if the imagePath is relative
        return BASE_URL + imagePath; // BASE_URL should be defined at the top of your file
      }
    }

    // If it's not a valid string, return the fallback image
    return "/placeholder.svg?height=600&width=600";
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
        <button onClick={() => navigate("/")} className="hover:text-blue-600">Home</button>
        <span>/</span>
        {productCategory && (
          <>
            <span className="hover:text-blue-600">{productCategory.name}</span>
            <span>/</span>
          </>
        )}
        <span className="text-gray-900">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={getImageUrl(product.images[selectedImage])}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                console.log('Image failed to load, using fallback');
                e.target.src = "/placeholder.svg?height=600&width=600";
              }}
            />
          </div>

          {/* Thumbnail Images */}
          {product.images.length > 1 && (
            <div className="flex space-x-2 overflow-x-auto">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${selectedImage === index ? "border-blue-500" : "border-gray-200"}`}
                >
                  <img
                    src={getImageUrl(image)}
                    alt=""
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      console.log('Thumbnail image failed to load, using fallback');
                      e.target.src = "/placeholder.svg?height=80&width=80";
                    }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Category Badge */}
          {productCategory && (
            <div className="inline-block">
              <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                {productCategory.name}
              </span>
            </div>
          )}

          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < Math.floor(product.rating || 4) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                  />
                ))}
                <span className="ml-2 text-gray-600">({product.reviewCount || 0} reviews)</span>
              </div>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-4">
            <span className="text-3xl font-bold text-gray-900">${product.price}</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <>
                <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
                <span className="bg-red-100 text-red-800 text-sm font-medium px-2 py-1 rounded">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </span>
              </>
            )}
          </div>

          {/* Stock Status */}
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${product.inStock ? "bg-green-500" : "bg-red-500"}`}></div>
            <span className={`font-medium ${product.inStock ? "text-green-600" : "text-red-600"}`}>
              {product.inStock ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          {/* Color Selection */}
          {product.variations?.colors?.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Color: {selectedColor}</h3>
              <div className="flex space-x-3">
                {product.variations.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-12 h-12 rounded-lg border-2 ${selectedColor === color ? "border-blue-500" : "border-gray-300"}`}
                    style={{ backgroundColor: color.toLowerCase() }}
                    title={color}
                  >
                    <span className="sr-only">{color}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selection */}
          {product.variations?.sizes?.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Size: {selectedSize}</h3>
              <div className="flex space-x-3">
                {product.variations.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border-2 rounded-lg font-medium ${selectedSize === size ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-300 hover:border-gray-400"}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Quantity</h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => handleQuantityChange("decrement")}
                  className="p-3 hover:bg-gray-50"
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-4 py-3 font-medium">{quantity}</span>
                <button onClick={() => handleQuantityChange("increment")} className="p-3 hover:bg-gray-50">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {product.inStock ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </div>

      {/* Description Section */}
      <div className="mt-16 border-t pt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Description</h2>
          <button
            onClick={() => setShowFullDescription(!showFullDescription)}
            className="flex items-center text-blue-600 hover:text-blue-700"
          >
            {showFullDescription ? "Show Less" : "Show More"}
            {showFullDescription ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />}
          </button>
        </div>
        <div className={`prose max-w-none ${showFullDescription ? "" : "line-clamp-3"}`}>
          <p className="text-gray-600 leading-relaxed">
            {product.description || "No description available for this product."}
          </p>
        </div>
      </div>

      {/* Specifications Section */}
      {product.specifications && Object.keys(product.specifications).length > 0 && (
        <div className="mt-12 border-t pt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Specifications</h2>
            <button
              onClick={() => setShowFullSpecifications(!showFullSpecifications)}
              className="flex items-center text-blue-600 hover:text-blue-700"
            >
              {showFullSpecifications ? "Show Less" : "Show More"}
              {showFullSpecifications ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />}
            </button>
          </div>
          <div className={`${showFullSpecifications ? "" : "max-h-48 overflow-hidden"}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between py-2 border-b border-gray-200">
                  <span className="font-medium text-gray-900">{key}:</span>
                  <span className="text-gray-600">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
