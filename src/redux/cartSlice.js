import { createSlice } from "@reduxjs/toolkit"

// Load cart from localStorage
const loadCartFromStorage = () => {
  try {
    const serializedCart = localStorage.getItem("falcon_cart")
    if (serializedCart === null) {
      return { items: [], totalQuantity: 0, totalAmount: 0 }
    }
    return JSON.parse(serializedCart)
  } catch (err) {
    return { items: [], totalQuantity: 0, totalAmount: 0 }
  }
}

// Save cart to localStorage
const saveCartToStorage = (cart) => {
  try {
    const serializedCart = JSON.stringify(cart)
    localStorage.setItem("falcon_cart", serializedCart)
  } catch (err) {
    console.error("Could not save cart to localStorage:", err)
  }
}

const initialState = loadCartFromStorage()

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, name, price, image, color, size, quantity = 1 } = action.payload
      const cartItemId = `${id}-${color}-${size}`

      const existingItem = state.items.find((item) => item.cartItemId === cartItemId)

      if (existingItem) {
        existingItem.quantity += quantity
        existingItem.totalPrice = existingItem.price * existingItem.quantity
      } else {
        state.items.push({
          cartItemId,
          id,
          name,
          price,
          image,
          color,
          size,
          quantity,
          totalPrice: price * quantity,
        })
      }

      // Recalculate totals
      state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0)
      state.totalAmount = state.items.reduce((total, item) => total + item.totalPrice, 0)

      saveCartToStorage(state)
    },

    updateQuantity: (state, action) => {
      const { cartItemId, quantity } = action.payload
      const item = state.items.find((item) => item.cartItemId === cartItemId)

      if (item && quantity > 0) {
        item.quantity = quantity
        item.totalPrice = item.price * quantity

        // Recalculate totals
        state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0)
        state.totalAmount = state.items.reduce((total, item) => total + item.totalPrice, 0)

        saveCartToStorage(state)
      }
    },

    removeFromCart: (state, action) => {
      const { cartItemId } = action.payload
      state.items = state.items.filter((item) => item.cartItemId !== cartItemId)

      // Recalculate totals
      state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0)
      state.totalAmount = state.items.reduce((total, item) => total + item.totalPrice, 0)

      saveCartToStorage(state)
    },

    clearCart: (state) => {
      state.items = []
      state.totalQuantity = 0
      state.totalAmount = 0
      saveCartToStorage(state)
    },
  },
})

export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions
export default cartSlice.reducer
