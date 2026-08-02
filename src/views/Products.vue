<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ProductCard from '../components/ProductCard.vue'
import { useI18n } from '../i18n'
import { getProductsByCategory } from '../data/products'
import { updateSeo } from '../composables/useSeo'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()

const activeCategory = ref<string>((route.query.category as string) || 'all')
const sortBy = ref<string>('default')
const searchQuery = ref('')

const categories = [
  { key: 'all', label: 'products.all' },
  { key: 'swimwear', label: 'categories.swimwear' },
  { key: 'equipment', label: 'categories.equipment' },
  { key: 'accessories', label: 'categories.accessories' },
  { key: 'maintenance', label: 'categories.maintenance' },
  { key: 'safety', label: 'categories.safety' },
]

const filteredProducts = computed(() => {
  let result = getProductsByCategory(activeCategory.value)

  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(
      (p) =>
        p.fa.name.toLowerCase().includes(query) ||
        p.en.name.toLowerCase().includes(query) ||
        p.fa.brand.toLowerCase().includes(query) ||
        p.en.brand.toLowerCase().includes(query),
    )
  }

  if (sortBy.value === 'price-low') {
    result = [...result].sort((a, b) => a.price - b.price)
  } else if (sortBy.value === 'price-high') {
    result = [...result].sort((a, b) => b.price - a.price)
  } else if (sortBy.value === 'rating') {
    result = [...result].sort((a, b) => b.rating - a.rating)
  }

  return result
})

function selectCategory(cat: string) {
  activeCategory.value = cat
  router.replace({ query: cat !== 'all' ? { category: cat } : {} })
}

watch(
  () => route.query.category,
  (val) => {
    activeCategory.value = (val as string) || 'all'
  },
)

onMounted(() => {
  updateSeo({
    titleFa: 'محصولات | استخر‌بان - لوازم استخر و شنا',
    titleEn: 'Products | PoolHub - Pool & Swimming Equipment',
    descriptionFa: 'خرید لوازم و تجهیزات استخر و شنا - عینک، مایو، پمپ تصفیه، مواد شیمیایی، تجهیزات ایمنی. انواع محصولات با کیفیت تضمینی.',
    descriptionEn: 'Shop pool and swimming equipment - goggles, swimwear, filtration pumps, chemicals, safety gear. Quality guaranteed.',
  })
})
</script>

<template>
  <div class="products-page">
    <div class="page-hero">
      <div class="container">
        <h1 class="page-title">{{ t('products.title') }}</h1>
        <p class="page-subtitle">{{ t('products.subtitle') }}</p>
      </div>
    </div>

    <div class="container products-layout">
      <aside class="filters-sidebar">
        <div class="filter-block">
          <h3 class="filter-title">{{ t('products.category') }}</h3>
          <div class="category-list">
            <button
              v-for="cat in categories"
              :key="cat.key"
              :class="['category-btn', { active: activeCategory === cat.key }]"
              @click="selectCategory(cat.key)"
            >{{ t(cat.label) }}</button>
          </div>
        </div>
      </aside>

      <div class="products-main">
        <div class="products-toolbar">
          <input
            v-model="searchQuery"
            type="search"
            class="search-input"
            :placeholder="t('home.searchPlaceholder')"
          />
          <select v-model="sortBy" class="sort-select">
            <option value="default">{{ t('products.sortDefault') }}</option>
            <option value="price-low">{{ t('products.sortPriceLow') }}</option>
            <option value="price-high">{{ t('products.sortPriceHigh') }}</option>
            <option value="rating">{{ t('products.sortRating') }}</option>
          </select>
        </div>

        <div class="results-count">
          {{ filteredProducts.length }} {{ t('cart.items') }}
        </div>

        <div v-if="filteredProducts.length > 0" class="products-grid">
          <ProductCard
            v-for="product in filteredProducts"
            :key="product.id"
            :product="product"
          />
        </div>

        <div v-else class="empty-state">
          <p>{{ t('products.noResults') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-hero {
  background: var(--gradient-hero);
  padding: 60px 0 48px;
  color: white;
}

.page-title {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 700;
  margin-bottom: 8px;
}

.page-subtitle {
  font-size: 1.05rem;
  opacity: 0.9;
}

.products-layout {
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 32px;
  padding: 48px 24px;
}

.filters-sidebar {
  position: sticky;
  top: calc(var(--header-height) + 24px);
  align-self: start;
}

.filter-block {
  background: white;
  border-radius: var(--radius-lg);
  padding: 24px;
  box-shadow: var(--shadow-sm);
}

.filter-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 16px;
  color: var(--color-neutral-800);
}

.category-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.category-btn {
  padding: 10px 16px;
  border-radius: var(--radius-sm);
  text-align: start;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--color-neutral-600);
  transition: all 0.2s ease;
}

.category-btn:hover {
  background: var(--color-primary-50);
  color: var(--color-primary-600);
}

.category-btn.active {
  background: var(--color-primary-600);
  color: white;
  font-weight: 600;
}

.products-toolbar {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
}

.search-input {
  flex: 1;
  padding: 12px 16px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-neutral-200);
  background: white;
  font-size: 0.9rem;
  transition: border-color 0.2s ease;
}

.search-input:focus {
  outline: none;
  border-color: var(--color-primary-400);
}

.sort-select {
  padding: 12px 16px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-neutral-200);
  background: white;
  font-size: 0.9rem;
  cursor: pointer;
}

.sort-select:focus {
  outline: none;
  border-color: var(--color-primary-400);
}

.results-count {
  font-size: 0.85rem;
  color: var(--color-neutral-500);
  margin-bottom: 20px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.empty-state {
  padding: 80px 24px;
  text-align: center;
  color: var(--color-neutral-400);
  font-size: 1.1rem;
}

@media (max-width: 900px) {
  .products-layout {
    grid-template-columns: 1fr;
  }
  .filters-sidebar {
    position: static;
  }
  .category-list {
    flex-direction: row;
    flex-wrap: wrap;
  }
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 560px) {
  .products-grid {
    grid-template-columns: 1fr;
  }
  .products-toolbar {
    flex-direction: column;
  }
}
</style>
