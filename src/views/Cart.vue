<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from '../i18n'
import { useCart, removeFromCart, updateQuantity } from '../store/cart'
import { formatPriceDisplay, toPersianDigits } from '../composables/useFormat'
import { updateSeo } from '../composables/useSeo'

const { t, locale } = useI18n()
const cart = useCart()
const router = useRouter()

const items = computed(() => cart.items.value)
const total = computed(() => cart.total.value)

function checkout() {
  router.push('/checkout')
}

onMounted(() => {
  updateSeo({
    titleFa: 'سبد خرید | استخر‌بان',
    titleEn: 'Shopping Cart | PoolHub',
  })
})
</script>

<template>
  <div class="cart-page container">
    <h1 class="page-title">{{ t('cart.title') }}</h1>

    <div v-if="items.length > 0" class="cart-layout">
      <div class="cart-items">
        <div v-for="item in items" :key="item.product.id" class="cart-item">
          <router-link :to="`/products/${item.product.slug}`" class="item-image">
            <img :src="item.product.image" :alt="locale === 'fa' ? item.product.fa.name : item.product.en.name" />
          </router-link>

          <div class="item-info">
            <h3 class="item-name">
              <router-link :to="`/products/${item.product.slug}`">
                {{ locale === 'fa' ? item.product.fa.name : item.product.en.name }}
              </router-link>
            </h3>
            <p class="item-brand">{{ locale === 'fa' ? item.product.fa.brand : item.product.en.brand }}</p>
            <p class="item-price">{{ formatPriceDisplay(item.product.price) }}</p>
          </div>

          <div class="item-qty">
            <button @click="updateQuantity(item.product.id, item.quantity - 1)">−</button>
            <span>{{ toPersianDigits(String(item.quantity)) }}</span>
            <button @click="updateQuantity(item.product.id, item.quantity + 1)">+</button>
          </div>

          <div class="item-total">
            {{ formatPriceDisplay(item.product.price * item.quantity) }}
          </div>

          <button class="item-remove" @click="removeFromCart(item.product.id)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
          </button>
        </div>
      </div>

      <aside class="cart-summary">
        <h2 class="summary-title">{{ t('checkout.orderSummary') }}</h2>
        <div class="summary-row">
          <span>{{ t('cart.items') }}</span>
          <span>{{ toPersianDigits(String(items.length)) }}</span>
        </div>
        <div class="summary-row total">
          <span>{{ t('cart.total') }}</span>
          <span class="total-amount">{{ formatPriceDisplay(total) }}</span>
        </div>
        <button class="btn-checkout" @click="checkout">{{ t('cart.checkout') }}</button>
        <router-link to="/products" class="continue-link">{{ t('cart.continueShopping') }}</router-link>
      </aside>
    </div>

    <div v-else class="cart-empty">
      <div class="empty-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
      </div>
      <h2>{{ t('cart.empty') }}</h2>
      <p>{{ t('cart.emptyDesc') }}</p>
      <router-link to="/products" class="btn-shop">{{ t('cart.continueShopping') }}</router-link>
    </div>
  </div>
</template>

<style scoped>
.cart-page {
  padding: 48px 24px;
}

.page-title {
  font-size: clamp(1.75rem, 4vw, 2.25rem);
  font-weight: 700;
  margin-bottom: 32px;
  color: var(--color-neutral-900);
}

.cart-layout {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 32px;
  align-items: start;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.cart-item {
  display: grid;
  grid-template-columns: 80px 1fr auto auto auto;
  gap: 16px;
  align-items: center;
  background: white;
  border-radius: var(--radius-lg);
  padding: 16px;
  box-shadow: var(--shadow-sm);
}

.item-image {
  width: 80px;
  height: 80px;
  border-radius: var(--radius-md);
  overflow: hidden;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.item-name a {
  font-weight: 600;
  color: var(--color-neutral-800);
  transition: color 0.2s ease;
}

.item-name a:hover {
  color: var(--color-primary-600);
}

.item-brand {
  font-size: 0.8rem;
  color: var(--color-neutral-400);
}

.item-price {
  font-size: 0.85rem;
  color: var(--color-neutral-500);
}

.item-qty {
  display: flex;
  align-items: center;
  border: 1px solid var(--color-neutral-200);
  border-radius: var(--radius-sm);
}

.item-qty button {
  width: 32px;
  height: 32px;
  font-size: 1.1rem;
  color: var(--color-neutral-600);
  background: var(--color-neutral-50);
}

.item-qty button:hover {
  background: var(--color-primary-50);
  color: var(--color-primary-600);
}

.item-qty span {
  min-width: 36px;
  text-align: center;
  font-weight: 600;
}

.item-total {
  font-weight: 700;
  color: var(--color-primary-700);
  font-size: 0.95rem;
  white-space: nowrap;
}

.item-remove {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
  color: var(--color-neutral-400);
  transition: all 0.2s ease;
}

.item-remove:hover {
  color: var(--color-error-500);
  background: rgba(229, 72, 77, 0.08);
}

.item-remove svg {
  width: 20px;
  height: 20px;
}

.cart-summary {
  background: white;
  border-radius: var(--radius-lg);
  padding: 28px;
  box-shadow: var(--shadow-sm);
  position: sticky;
  top: calc(var(--header-height) + 24px);
}

.summary-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 20px;
  color: var(--color-neutral-800);
}

.summary-row {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  font-size: 0.9rem;
  color: var(--color-neutral-600);
}

.summary-row.total {
  border-top: 1px solid var(--color-neutral-200);
  margin-top: 8px;
  padding-top: 16px;
  font-weight: 600;
  font-size: 1rem;
  color: var(--color-neutral-900);
}

.total-amount {
  color: var(--color-primary-700);
  font-weight: 800;
}

.btn-checkout {
  width: 100%;
  margin-top: 20px;
  padding: 14px;
  border-radius: var(--radius-md);
  background: var(--gradient-accent);
  color: white;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.2s ease;
}

.btn-checkout:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.continue-link {
  display: block;
  text-align: center;
  margin-top: 12px;
  font-size: 0.875rem;
  color: var(--color-primary-600);
  font-weight: 500;
}

.continue-link:hover {
  text-decoration: underline;
}

.cart-empty {
  text-align: center;
  padding: 80px 24px;
  background: white;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-sm);
}

.empty-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-neutral-300);
}

.empty-icon svg {
  width: 64px;
  height: 64px;
}

.cart-empty h2 {
  font-size: 1.5rem;
  color: var(--color-neutral-700);
  margin-bottom: 8px;
}

.cart-empty p {
  color: var(--color-neutral-400);
  margin-bottom: 24px;
}

.btn-shop {
  display: inline-block;
  padding: 12px 32px;
  background: var(--color-primary-600);
  color: white;
  border-radius: var(--radius-md);
  font-weight: 600;
  transition: background 0.2s ease;
}

.btn-shop:hover {
  background: var(--color-primary-700);
}

@media (max-width: 900px) {
  .cart-layout {
    grid-template-columns: 1fr;
  }
  .cart-item {
    grid-template-columns: 64px 1fr auto;
    grid-template-rows: auto auto;
  }
  .item-qty {
    grid-column: 2;
  }
  .item-total {
    grid-column: 3;
    grid-row: 2;
  }
  .item-remove {
    grid-column: 3;
    grid-row: 1;
  }
}

@media (max-width: 480px) {
  .cart-item {
    grid-template-columns: 64px 1fr auto;
  }
  .item-qty {
    grid-column: 2;
    grid-row: 2;
  }
}
</style>
