<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from '../i18n'

const { t } = useI18n()
const router = useRouter()

const slides = [
  {
    image: 'https://images.pexels.com/photos/10739637/pexels-photo-10739637.png?auto=compress&cs=tinysrgb&w=1920',
    titleKey: 'hero.slide1Title',
    subKey: 'hero.slide1Sub',
  },
  {
    image: 'https://images.pexels.com/photos/261101/pexels-photo-261101.jpeg?auto=compress&cs=tinysrgb&w=1920',
    titleKey: 'hero.slide2Title',
    subKey: 'hero.slide2Sub',
  },
  {
    image: 'https://images.pexels.com/photos/38127493/pexels-photo-38127493.jpeg?auto=compress&cs=tinysrgb&w=1920',
    titleKey: 'hero.slide3Title',
    subKey: 'hero.slide3Sub',
  },
]

const current = ref(0)
let timer: ReturnType<typeof setInterval> | null = null

function next() {
  current.value = (current.value + 1) % slides.length
}

function prev() {
  current.value = (current.value - 1 + slides.length) % slides.length
}

function goTo(index: number) {
  current.value = index
}

function startAutoplay() {
  stopAutoplay()
  timer = setInterval(next, 6000)
}

function stopAutoplay() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

function shopNow() {
  router.push('/products')
}

function reserveNow() {
  router.push('/reservation')
}

onMounted(startAutoplay)
onUnmounted(stopAutoplay)
</script>

<template>
  <section class="hero" @mouseenter="stopAutoplay" @mouseleave="startAutoplay">
    <div class="hero-slides">
      <TransitionGroup name="slide">
        <div
          v-for="(slide, index) in slides"
          :key="index"
          v-show="current === index"
          class="hero-slide"
          :style="{ backgroundImage: `url(${slide.image})` }"
        >
          <div class="hero-overlay"></div>
          <div class="hero-content container">
            <h1 class="hero-title animate-fade-up">{{ t(slide.titleKey) }}</h1>
            <p class="hero-subtitle animate-fade-up" style="animation-delay: 0.15s">{{ t(slide.subKey) }}</p>
            <div class="hero-actions animate-fade-up" style="animation-delay: 0.3s">
              <button class="btn-primary" @click="shopNow">
                {{ t('hero.shopNow') }}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
              <button class="btn-secondary" @click="reserveNow">{{ t('hero.reserveNow') }}</button>
            </div>
          </div>
        </div>
      </TransitionGroup>
    </div>

    <button class="hero-arrow hero-prev" @click="prev" aria-label="Previous">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
    </button>
    <button class="hero-arrow hero-next" @click="next" aria-label="Next">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
    </button>

    <div class="hero-dots">
      <button
        v-for="(_slide, index) in slides"
        :key="index"
        :class="['hero-dot', { active: current === index }]"
        @click="goTo(index)"
        :aria-label="`Slide ${index + 1}`"
      ></button>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  height: calc(100vh - var(--header-height));
  min-height: 560px;
  max-height: 800px;
  overflow: hidden;
}

.hero-slides {
  position: absolute;
  inset: 0;
}

.hero-slide {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(1, 87, 155, 0.5) 0%, rgba(2, 6, 23, 0.75) 100%);
}

.hero-content {
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  color: white;
  max-width: var(--container-max);
}

.hero-title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 16px;
  max-width: 700px;
  text-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
}

.hero-subtitle {
  font-size: clamp(1rem, 2vw, 1.35rem);
  font-weight: 400;
  margin-bottom: 32px;
  max-width: 560px;
  opacity: 0.95;
}

.hero-actions {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 32px;
  background: var(--gradient-accent);
  color: white;
  border-radius: var(--radius-md);
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 8px 24px rgba(0, 172, 193, 0.4);
}

.btn-primary svg {
  width: 20px;
  height: 20px;
}

html[dir='rtl'] .btn-primary svg {
  transform: scaleX(-1);
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 32px rgba(0, 172, 193, 0.5);
}

.btn-secondary {
  padding: 14px 32px;
  background: rgba(255, 255, 255, 0.15);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: var(--radius-md);
  font-weight: 600;
  font-size: 1rem;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.25);
  border-color: white;
  transform: translateY(-3px);
}

.hero-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 3;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.2s ease;
}

.hero-arrow:hover {
  background: rgba(255, 255, 255, 0.3);
}

.hero-arrow svg {
  width: 24px;
  height: 24px;
}

.hero-prev {
  inset-inline-start: 24px;
}

.hero-next {
  inset-inline-end: 24px;
}

.hero-dots {
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  display: flex;
  gap: 10px;
}

.hero-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.4);
  transition: all 0.3s ease;
}

.hero-dot.active {
  width: 36px;
  border-radius: 6px;
  background: white;
}

.slide-enter-active,
.slide-leave-active {
  transition: opacity 1s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
}

@media (max-width: 640px) {
  .hero {
    min-height: 480px;
  }

  .hero-arrow {
    display: none;
  }

  .hero-actions {
    flex-direction: column;
    width: 100%;
  }

  .btn-primary,
  .btn-secondary {
    width: 100%;
    text-align: center;
    justify-content: center;
  }
}
</style>
