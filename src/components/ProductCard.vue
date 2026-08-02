<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from '../i18n'
import { addToCart } from '../store/cart'
import { formatPriceDisplay } from '../composables/useFormat'
import type { Product } from '../data/products'

const props = defineProps<{ product: Product }>()

const { t, locale } = useI18n()

const info = computed(() => (locale.value === 'fa' ? props.product.fa : props.product.en))

const discountPercent = computed(() => {
  if (!props.product.oldPrice) return 0
  return Math.round(((props.product.oldPrice - props.product.price) / props.product.oldPrice) * 100)
})

function handleAddToCart() {
  addToCart(props.product)
}
</script>

<template>
  <div class="product-card">
    <router-link :to="`/products/${product.slug}`" class="product-link">
      <div class="product-image-wrapper">
        <img :src="product.image" :alt="info.name" loading="lazy" />
        <span v-if="discountPercent > 0" class="discount-badge">-{{ discountPercent }}%</span>
        <span v-if="!product.inStock" class="out-stock-badge">{{ t('products.outOfStock') }}</span>
        <div class="image-overlay">
          <span class="view-btn">{{ t('products.viewDetails') }}</span>
        </div>
      </div>
    </router-link>

    <div class="product-info">
      <span class="product-category">{{ t(`categories.${product.category}`) }}</span>
      <h3 class="product-name">
        <router-link :to="`/products/${product.slug}`">{{ info.name }}</router-link>
      </h3>
      <p class="product-brand">{{ info.brand }}</p>

      <div class="product-rating">
        <div class="stars">
          <svg v-for="i in 5" :key="i" viewBox="0 0 24 24" :class="{ filled: i <= Math.round(product.rating) }">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>
        <span class="rating-count">({{ product.reviewsCount }})</span>
      </div>

      <div class="product-price-row">
        <div class="price-block">
          <span class="price">{{ formatPriceDisplay(product.price) }}</span>
          <span v-if="product.oldPrice" class="old-price">{{ formatPriceDisplay(product.oldPrice) }}</span>
        </div>
        <button
          class="add-cart-btn"
          :disabled="!product.inStock"
          @click="handleAddToCart"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  background: white;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.product-card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-6px);
}

.product-link {
  display: block;
}

.product-image-wrapper {
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  background: var(--color-neutral-100);
}

.product-image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.product-card:hover .product-image-wrapper img {
  transform: scale(1.08);
}

.discount-badge {
  position: absolute;
  top: 12px;
  inset-inline-start: 12px;
  background: var(--color-error-500);
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 20px;
}

.out-stock-badge {
  position: absolute;
  top: 12px;
  inset-inline-start: 12px;
  background: var(--color-neutral-700);
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 20px;
}

.image-overlay {
  position: absolute;
  inset: 0;
  background: rgba(2, 87, 155, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.product-card:hover .image-overlay {
  opacity: 1;
}

.view-btn {
  padding: 10px 24px;
  background: white;
  color: var(--color-primary-700);
  border-radius: 24px;
  font-weight: 600;
  font-size: 0.875rem;
  transform: translateY(10px);
  transition: transform 0.3s ease;
}

.product-card:hover .view-btn {
  transform: translateY(0);
}

.product-info {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
}

.product-category {
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--color-primary-500);
}

.product-name {
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.4;
}

.product-name a {
  color: var(--color-neutral-800);
  transition: color 0.2s ease;
}

.product-name a:hover {
  color: var(--color-primary-600);
}

.product-brand {
  font-size: 0.8rem;
  color: var(--color-neutral-500);
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 6px;
}

.stars {
  display: flex;
  gap: 2px;
}

.stars svg {
  width: 14px;
  height: 14px;
  fill: var(--color-neutral-300);
}

.stars svg.filled {
  fill: var(--color-warning-500);
}

.rating-count {
  font-size: 0.75rem;
  color: var(--color-neutral-400);
}

.product-price-row {
  margin-top: auto;
  padding-top: 12px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px;
}

.price-block {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.price {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--color-primary-700);
}

.old-price {
  font-size: 0.8rem;
  color: var(--color-neutral-400);
  text-decoration: line-through;
}

.add-cart-btn {
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
  background: var(--color-primary-50);
  color: var(--color-primary-600);
  transition: all 0.2s ease;
}

.add-cart-btn:hover:not(:disabled) {
  background: var(--color-primary-600);
  color: white;
}

.add-cart-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.add-cart-btn svg {
  width: 20px;
  height: 20px;
}
</style>
