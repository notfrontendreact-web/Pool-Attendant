<script setup lang="ts">
import { onMounted } from 'vue'
import { useI18n } from '../i18n'
import { updateSeo } from '../composables/useSeo'

const { t } = useI18n()

const stats = [
  { key: 'experience', value: '۱۵+' },
  { key: 'products', value: '۵۰۰+' },
  { key: 'customers', value: '۱۰هزار+' },
  { key: 'services', value: '۸هزار+' },
]

onMounted(() => {
  updateSeo({
    titleFa: 'درباره استخر‌بان | مرجع لوازم استخر و شنا',
    titleEn: 'About PoolHub | Pool & Swimming Equipment',
    descriptionFa: 'استخر‌بان با ۱۵ سال تجربه در تامین لوازم و تجهیزات استخر و شنا، معتبرترین مرجع این حوزه.',
    descriptionEn: 'PoolHub with 15 years of experience supplying pool and swimming equipment is the most trusted source.',
  })
})
</script>

<template>
  <div class="about-page">
    <div class="page-hero">
      <div class="container">
        <h1 class="page-title">{{ t('about.title') }}</h1>
      </div>
    </div>

    <div class="container about-content">
      <div class="about-text">
        <p>{{ t('about.p1') }}</p>
        <p>{{ t('about.p2') }}</p>
        <p>{{ t('about.p3') }}</p>
      </div>

      <div class="stats-grid">
        <div v-for="stat in stats" :key="stat.key" class="stat-card">
          <span class="stat-value">{{ stat.value }}</span>
          <span class="stat-label">{{ t(`about.stats.${stat.key}`) }}</span>
        </div>
      </div>

      <div class="values-section">
        <h2 class="values-title">{{ t('about.valuesTitle') }}</h2>
        <div class="values-grid">
          <div class="value-card">
            <div class="value-icon">✓</div>
            <h3>{{ t('about.value1Title') }}</h3>
            <p>{{ t('about.value1Desc') }}</p>
          </div>
          <div class="value-card">
            <div class="value-icon">★</div>
            <h3>{{ t('about.value2Title') }}</h3>
            <p>{{ t('about.value2Desc') }}</p>
          </div>
          <div class="value-card">
            <div class="value-icon">♥</div>
            <h3>{{ t('about.value3Title') }}</h3>
            <p>{{ t('about.value3Desc') }}</p>
          </div>
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
  text-align: center;
}

.page-title {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 700;
}

.about-content {
  padding: 64px 24px;
}

.about-text {
  max-width: 800px;
  margin: 0 auto 48px;
}

.about-text p {
  font-size: 1.05rem;
  line-height: 1.8;
  color: var(--color-neutral-600);
  margin-bottom: 20px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-bottom: 64px;
}

.stat-card {
  text-align: center;
  padding: 32px 16px;
  background: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
}

.stat-value {
  display: block;
  font-size: 2.25rem;
  font-weight: 800;
  background: var(--gradient-accent);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 0.875rem;
  color: var(--color-neutral-500);
}

.values-section {
  max-width: 1000px;
  margin: 0 auto;
}

.values-title {
  font-size: 1.75rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 40px;
  color: var(--color-neutral-900);
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.value-card {
  text-align: center;
  padding: 40px 24px;
  background: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  transition: all 0.3s ease;
}

.value-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-4px);
}

.value-icon {
  width: 56px;
  height: 56px;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--color-primary-50);
  color: var(--color-primary-600);
  font-size: 1.5rem;
  font-weight: 700;
}

.value-card h3 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 10px;
  color: var(--color-neutral-800);
}

.value-card p {
  font-size: 0.9rem;
  line-height: 1.7;
  color: var(--color-neutral-500);
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .values-grid {
    grid-template-columns: 1fr;
  }
}
</style>
