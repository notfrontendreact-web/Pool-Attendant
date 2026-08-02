<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from '../i18n'
import { getProductBySlug, getRelatedProducts } from '../data/products'
import { addToCart } from '../store/cart'
import { formatPriceDisplay, toPersianDigits } from '../composables/useFormat'
import { updateSeo, updateProductSeo } from '../composables/useSeo'
import ProductCard from '../components/ProductCard.vue'

const route = useRoute()
const router = useRouter()
const { t, locale } = useI18n()

const product = computed(() => getProductBySlug(route.params.slug as string))
const relatedProducts = computed(() => (product.value ? getRelatedProducts(product.value) : []))

const activeImage = ref(0)
const quantity = ref(1)
const addedToCart = ref(false)

const info = computed(() => {
  if (!product.value) return null
  return locale.value === 'fa' ? product.value.fa : product.value.en
})

function handleAddToCart() {
  if (!product.value) return
  addToCart(product.value, quantity.value)
  addedToCart.value = true
  setTimeout(() => (addedToCart.value = false), 3000)
}

function buyNow() {
  if (!product.value) return
  addToCart(product.value, quantity.value)
  router.push('/checkout')
}

watch(activeImage, () => {})
watch(
  () => route.params.slug,
  () => {
    activeImage.value = 0
    quantity.value = 1
  },
)

onMounted(() => {
  if (product.value && info.value) {
    updateProductSeo(info.value.name, info.value.description, product.value.image)
    updateSeo({
      titleFa: `${product.value.fa.name} | استخر‌بان`,
      titleEn: `${product.value.en.name} | PoolHub`,
      descriptionFa: product.value.fa.description,
      descriptionEn: product.value.en.description,
      image: product.value.image,
      type: 'product',
    })
  }
})
</script>

<template>
  <div v-if="product && info" class="product-detail">
    <div class="container detail-container">
      <nav class="breadcrumb">
        <router-link to="/">{{ t('nav.home') }}</router-link>
        <span class="sep">/</span>
        <router-link to="/products">{{ t('nav.products') }}</router-link>
        <span class="sep">/</span>
        <span class="current">{{ info.name }}</span>
      </nav>

      <div class="detail-grid">
        <div class="gallery">
          <div class="main-image">
            <img :src="product.gallery[activeImage]" :alt="info.name" />
            <span v-if="product.oldPrice" class="discount-tag">
              -{{ Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) }}%
            </span>
          </div>
          <div class="thumbnails">
            <button
              v-for="(img, index) in product.gallery"
              :key="index"
              :class="['thumb', { active: activeImage === index }]"
              @click="activeImage = index"
            >
              <img :src="img" :alt="`${info.name} ${index + 1}`" />
            </button>
          </div>
        </div>

        <div class="detail-info">
          <span class="detail-category">{{ t(`categories.${product.category}`) }}</span>
          <h1 class="detail-name">{{ info.name }}</h1>
          <p class="detail-brand">{{ info.brand }}</p>

          <div class="detail-rating">
            <div class="stars">
              <svg v-for="i in 5" :key="i" viewBox="0 0 24 24" :class="{ filled: i <= Math.round(product.rating) }">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
            <span class="rating-text">{{ product.rating }} ({{ product.reviewsCount }} {{ t('products.reviews') }})</span>
          </div>

          <div class="detail-price">
            <span class="price-current">{{ formatPriceDisplay(product.price) }}</span>
            <span v-if="product.oldPrice" class="price-old">{{ formatPriceDisplay(product.oldPrice) }}</span>
          </div>

          <p class="detail-stock" :class="{ in: product.inStock, out: !product.inStock }">
            <span class="dot"></span>
            {{ product.inStock ? t('products.inStock') : t('products.outOfStock') }}
          </p>

          <p class="detail-desc">{{ info.description }}</p>

          <div class="detail-quantity">
            <label>{{ t('products.quantity') }}</label>
            <div class="qty-control">
              <button @click="quantity = Math.max(1, quantity - 1)">−</button>
              <span>{{ toPersianDigits(String(quantity)) }}</span>
              <button @click="quantity++">+</button>
            </div>
          </div>

          <div class="detail-actions">
            <button class="btn-cart" :disabled="!product.inStock" @click="handleAddToCart">
              {{ addedToCart ? '✓ ' + t('cart.title') : t('products.addToCart') }}
            </button>
            <button class="btn-buy" :disabled="!product.inStock" @click="buyNow">{{ t('products.buyNow') }}</button>
          </div>

          <div class="detail-features">
            <h3>{{ t('products.features') }}</h3>
            <ul>
              <li v-for="(feature, i) in info.features" :key="i">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>
                {{ feature }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="specs-section">
        <h2 class="specs-title">{{ t('products.specifications') }}</h2>
        <table class="specs-table">
          <tbody>
            <tr v-for="(spec, i) in info.specifications" :key="i">
              <td class="spec-label">{{ spec.label }}</td>
              <td class="spec-value">{{ spec.value }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <section v-if="relatedProducts.length > 0" class="related-section">
        <h2 class="section-title">{{ t('products.relatedProducts') }}</h2>
        <div class="related-grid">
          <ProductCard
            v-for="rp in relatedProducts"
            :key="rp.id"
            :product="rp"
          />
        </div>
      </section>
    </div>
  </div>

  <div v-else class="not-found">
    <div class="container">
      <h1>404</h1>
      <p>{{ t('products.notFound') }}</p>
      <router-link to="/products" class="back-link">{{ t('nav.products') }}</router-link>
    </div>
  </div>
</template>

<style scoped>
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 24px 0;
  font-size: 0.85rem;
  color: var(--color-neutral-500);
}

.breadcrumb a {
  color: var(--color-primary-600);
}

.breadcrumb a:hover {
  text-decoration: underline;
}

.sep {
  color: var(--color-neutral-300);
}

.current {
  color: var(--color-neutral-700);
  font-weight: 500;
}

.detail-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  padding-bottom: 48px;
}

.gallery {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.main-image {
  position: relative;
  aspect-ratio: 1;
  border-radius: var(--radius-xl);
  overflow: hidden;
  background: var(--color-neutral-100);
  box-shadow: var(--shadow-md);
}

.main-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.discount-tag {
  position: absolute;
  top: 16px;
  inset-inline-start: 16px;
  background: var(--color-error-500);
  color: white;
  font-weight: 700;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.85rem;
}

.thumbnails {
  display: flex;
  gap: 12px;
}

.thumb {
  width: 80px;
  height: 80px;
  border-radius: var(--radius-md);
  overflow: hidden;
  border: 2px solid transparent;
  transition: border-color 0.2s ease;
}

.thumb.active {
  border-color: var(--color-primary-500);
}

.thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.detail-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.detail-category {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--color-primary-500);
}

.detail-name {
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 700;
  color: var(--color-neutral-900);
  line-height: 1.3;
}

.detail-brand {
  font-size: 1rem;
  color: var(--color-neutral-500);
}

.detail-rating {
  display: flex;
  align-items: center;
  gap: 8px;
}

.stars {
  display: flex;
  gap: 2px;
}

.stars svg {
  width: 18px;
  height: 18px;
  fill: var(--color-neutral-300);
}

.stars svg.filled {
  fill: var(--color-warning-500);
}

.rating-text {
  font-size: 0.85rem;
  color: var(--color-neutral-500);
}

.detail-price {
  display: flex;
  align-items: baseline;
  gap: 12px;
  padding: 16px 0;
}

.price-current {
  font-size: 1.75rem;
  font-weight: 800;
  color: var(--color-primary-700);
}

.price-old {
  font-size: 1.1rem;
  color: var(--color-neutral-400);
  text-decoration: line-through;
}

.detail-stock {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  font-weight: 500;
}

.detail-stock .dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.detail-stock.in {
  color: var(--color-success-500);
}

.detail-stock.in .dot {
  background: var(--color-success-500);
}

.detail-stock.out {
  color: var(--color-error-500);
}

.detail-stock.out .dot {
  background: var(--color-error-500);
}

.detail-desc {
  font-size: 0.95rem;
  line-height: 1.7;
  color: var(--color-neutral-600);
  padding: 12px 0;
}

.detail-quantity {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 0;
}

.detail-quantity label {
  font-weight: 500;
  color: var(--color-neutral-700);
}

.qty-control {
  display: flex;
  align-items: center;
  border: 1px solid var(--color-neutral-200);
  border-radius: var(--radius-sm);
  overflow: hidden;
}

.qty-control button {
  width: 40px;
  height: 40px;
  font-size: 1.25rem;
  color: var(--color-neutral-600);
  background: var(--color-neutral-50);
  transition: background 0.2s ease;
}

.qty-control button:hover {
  background: var(--color-primary-50);
  color: var(--color-primary-600);
}

.qty-control span {
  min-width: 48px;
  text-align: center;
  font-weight: 600;
}

.detail-actions {
  display: flex;
  gap: 12px;
  padding: 12px 0 24px;
}

.btn-cart {
  flex: 1;
  padding: 14px 24px;
  border-radius: var(--radius-md);
  background: var(--color-primary-600);
  color: white;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.2s ease;
}

.btn-cart:hover:not(:disabled) {
  background: var(--color-primary-700);
  transform: translateY(-2px);
}

.btn-cart:disabled,
.btn-buy:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-buy {
  flex: 1;
  padding: 14px 24px;
  border-radius: var(--radius-md);
  background: var(--color-accent-500);
  color: white;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.2s ease;
}

.btn-buy:hover:not(:disabled) {
  background: var(--color-accent-600);
  transform: translateY(-2px);
}

.detail-features h3 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 12px;
  color: var(--color-neutral-800);
}

.detail-features ul {
  list-style: none;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.detail-features li {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.875rem;
  color: var(--color-neutral-600);
}

.detail-features svg {
  width: 18px;
  height: 18px;
  color: var(--color-success-500);
  flex-shrink: 0;
}

.specs-section {
  padding: 48px 0;
  border-top: 1px solid var(--color-neutral-200);
}

.specs-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 24px;
  color: var(--color-neutral-900);
}

.specs-table {
  width: 100%;
  border-collapse: collapse;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

.specs-table tr {
  border-bottom: 1px solid var(--color-neutral-100);
}

.specs-table tr:last-child {
  border-bottom: none;
}

.spec-label {
  padding: 14px 24px;
  background: var(--color-neutral-50);
  font-weight: 600;
  color: var(--color-neutral-700);
  width: 40%;
}

.spec-value {
  padding: 14px 24px;
  color: var(--color-neutral-600);
}

.related-section {
  padding: 48px 0;
  border-top: 1px solid var(--color-neutral-200);
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 32px;
  color: var(--color-neutral-900);
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.not-found {
  padding: 120px 0;
  text-align: center;
}

.not-found h1 {
  font-size: 4rem;
  color: var(--color-neutral-300);
}

.not-found p {
  font-size: 1.2rem;
  color: var(--color-neutral-500);
  margin: 16px 0 24px;
}

.back-link {
  display: inline-block;
  padding: 12px 28px;
  background: var(--color-primary-600);
  color: white;
  border-radius: var(--radius-md);
  font-weight: 600;
}

@media (max-width: 900px) {
  .detail-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }
  .related-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .detail-features ul {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .related-grid {
    grid-template-columns: 1fr;
  }
  .detail-actions {
    flex-direction: column;
  }
}
</style>
