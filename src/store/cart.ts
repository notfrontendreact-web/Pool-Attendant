import { reactive, computed } from 'vue'
import type { Product } from '../data/products'

export interface CartItem {
  product: Product
  quantity: number
}

interface CartState {
  items: CartItem[]
}

const state = reactive<CartState>({
  items: [],
})

function loadCart() {
  try {
    const saved = localStorage.getItem('poolhub-cart')
    if (saved) {
      const parsed = JSON.parse(saved) as CartItem[]
      state.items = parsed
    }
  } catch {
    // ignore
  }
}

function saveCart() {
  localStorage.setItem('poolhub-cart', JSON.stringify(state.items))
}

loadCart()

export function addToCart(product: Product, quantity = 1) {
  const existing = state.items.find((i) => i.product.id === product.id)
  if (existing) {
    existing.quantity += quantity
  } else {
    state.items.push({ product, quantity })
  }
  saveCart()
}

export function removeFromCart(productId: string) {
  state.items = state.items.filter((i) => i.product.id !== productId)
  saveCart()
}

export function updateQuantity(productId: string, quantity: number) {
  const item = state.items.find((i) => i.product.id === productId)
  if (item) {
    item.quantity = Math.max(1, quantity)
    saveCart()
  }
}

export function clearCart() {
  state.items = []
  saveCart()
}

export function useCart() {
  return {
    items: computed(() => state.items),
    count: computed(() => state.items.reduce((sum, i) => sum + i.quantity, 0)),
    total: computed(() => state.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0)),
  }
}

export { state as cartState }
