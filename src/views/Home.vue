<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import HeroSlider from '../components/HeroSlider.vue'
import ProductCard from '../components/ProductCard.vue'
import { useI18n } from '../i18n'
import { products } from '../data/products'
import { updateSeo } from '../composables/useSeo'
import { onMounted } from 'vue'

const { t } = useI18n()
const router = useRouter()

onMounted(() => {
  updateSeo({
    titleFa: 'استخر‌بان | مرجع تخصصی لوازم استخر و شنا',
    titleEn: 'PoolHub | Premium Pool & Swimming Equipment Store',
    descriptionFa: 'خرید آنلاین لوازم و تجهیزات استخر و شنا - عینک شنا، مایو، پمپ تصفیه، مواد شیمیایی، تجهیزات ایمنی و نجات. ارسال سریع، کیفیت تضمینی.',
    descriptionEn: 'Buy pool and swimming equipment online - goggles, swimwear, filtration pumps, chemicals, safety gear. Fast delivery, guaranteed quality.',
  })
})

const featuredProducts = computed(() => products.slice(0, 8))

const categories = [
  { key: 'swimwear', icon: '🩱', count: products.filter((p) => p.category === 'swimwear').length },
  { key: 'equipment', icon: '⚙️', count: products.filter((p) => p.category === 'equipment').length },
  { key: 'accessories', icon: '🥽', count: products.filter((p) => p.category === 'accessories').length },
  { key: 'maintenance', icon: '🧹', count: products.filter((p) => p.category === 'maintenance').length },
  { key: 'safety', icon: '🦺', count: products.filter((p) => p.category === 'safety').length },
]

const features = [
  { icon: 'truck', titleKey: 'features.delivery', descKey: 'features.deliveryDesc' },
  { icon: 'shield', titleKey: 'features.warranty', descKey: 'features.warrantyDesc' },
  { icon: 'support', titleKey: 'features.support', descKey: 'features.supportDesc' },
  { icon: 'tag', titleKey: 'features.pricing', descKey: 'features.pricingDesc' },
]

function goToCategory(cat: string) {
  router.push({ path: '/products', query: { category: cat } })
}

function goToProducts() {
  router.push('/products')
}
</script>

<template>
  <div class="home">
    <HeroSlider />

    <section class="features-bar section-padding">
      <div class="container features-grid">
        <div v-for="feature in features" :key="feature.icon" class="feature-item">
          <div class="feature-icon">
            <svg v-if="feature.icon === 'truck'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
            <svg v-else-if="feature.icon === 'shield'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            <svg v-else-if="feature.icon === 'support'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><circle cx="7" cy="7" r="1" fill="currentColor"/></svg>
          </div>
          <div>
            <h3 class="feature-title">{{ t(feature.titleKey) }}</h3>
            <p class="feature-desc">{{ t(feature.descKey) }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="categories-section section-padding">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">{{ t('home.categoriesTitle') }}</h2>
          <p class="section-subtitle">{{ t('home.categoriesSubtitle') }}</p>
        </div>
        <div class="categories-grid">
          <button
            v-for="cat in categories"
            :key="cat.key"
            class="category-card"
            @click="goToCategory(cat.key)"
          >
            <span class="category-icon">{{ cat.icon }}</span>
            <span class="category-name">{{ t(`categories.${cat.key}`) }}</span>
            <span class="category-count">{{ cat.count }} {{ t('cart.items') }}</span>
          </button>
        </div>
      </div>
    </section>

    <section class="featured-section section-padding">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">{{ t('home.featuredTitle') }}</h2>
          <p class="section-subtitle">{{ t('products.subtitle') }}</p>
        </div>
        <div class="products-grid">
          <ProductCard
            v-for="product in featuredProducts"
            :key="product.id"
            :product="product"
          />
        </div>
        <div class="view-all-center">
          <button class="btn-outline" @click="goToProducts">{{ t('home.viewAll') }}</button>
        </div>
      </div>
    </section>

    <section class="cta-section">
      <div class="container cta-inner">
        <div class="cta-content">
          <h2 class="cta-title">{{ t('home.ctaTitle') }}</h2>
          <p class="cta-desc">{{ t('home.ctaDesc') }}</p>
          <button class="btn-primary-light" @click="router.push('/reservation')">{{ t('hero.reserveNow') }}</button>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.features-bar {
  padding: 48px 0;
  background: white;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 16px;
}

.feature-icon {
  width: 56px;
  height: 56px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  background: var(--color-primary-50);
  color: var(--color-primary-600);
}

.feature-icon svg {
  width: 28px;
  height: 28px;
}

.feature-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-neutral-800);
  margin-bottom: 4px;
}

.feature-desc {
  font-size: 0.8rem;
  color: var(--color-neutral-500);
}

.section-header {
  text-align: center;
  margin-bottom: 48px;
}

.section-title {
  font-size: clamp(1.5rem, 3vw, 2.25rem);
  font-weight: 700;
  color: var(--color-neutral-900);
  margin-bottom: 12px;
}

.section-subtitle {
  font-size: 1rem;
  color: var(--color-neutral-500);
}

.categories-section {
  background: var(--color-neutral-50);
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
}

.category-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 32px 16px;
  background: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  transition: all 0.3s ease;
  text-align: center;
}

.category-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-4px);
  background: var(--color-primary-50);
}

.category-icon {
  font-size: 2.5rem;
  line-height: 1;
}

.category-name {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-neutral-800);
}

.category-count {
  font-size: 0.75rem;
  color: var(--color-neutral-400);
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.view-all-center {
  text-align: center;
  margin-top: 40px;
}

.btn-outline {
  padding: 12px 32px;
  border: 2px solid var(--color-primary-500);
  border-radius: var(--radius-md);
  color: var(--color-primary-600);
  font-weight: 600;
  transition: all 0.2s ease;
}

.btn-outline:hover {
  background: var(--color-primary-500);
  color: white;
}

.cta-section {
  background: var(--gradient-hero);
  padding: 80px 0;
  position: relative;
  overflow: hidden;
}

.cta-inner {
  position: relative;
  z-index: 2;
}

.cta-content {
  max-width: 600px;
}

.cta-title {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 700;
  color: white;
  margin-bottom: 16px;
}

.cta-desc {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 28px;
}

.btn-primary-light {
  padding: 14px 36px;
  background: white;
  color: var(--color-primary-700);
  border-radius: var(--radius-md);
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.btn-primary-light:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-lg);
}

@media (max-width: 1024px) {
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .categories-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  .products-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .features-grid {
    grid-template-columns: 1fr;
  }
  .categories-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
