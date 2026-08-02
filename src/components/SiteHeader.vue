<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from '../i18n'
import { useCart } from '../store/cart'

const { t, locale, toggleLocale } = useI18n()
const cart = useCart()
const router = useRouter()

const mobileMenuOpen = ref(false)
const scrolled = ref(false)

const navItems = computed(() => [
  { key: 'nav.home', to: '/' },
  { key: 'nav.products', to: '/products' },
  { key: 'nav.reservation', to: '/reservation' },
  { key: 'nav.about', to: '/about' },
  { key: 'nav.contact', to: '/contact' },
])

function handleScroll() {
  scrolled.value = window.scrollY > 20
}

function closeMenu() {
  mobileMenuOpen.value = false
}

function navigate(to: string) {
  router.push(to)
  closeMenu()
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<template>
  <header :class="['site-header', { scrolled }]">
    <div class="container header-inner">
      <router-link to="/" class="logo" @click="closeMenu">
        <span class="logo-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M2 12h20M6 8s2-3 6-3 6 3 6 3M6 16s2 3 6 3 6-3 6-3" />
          </svg>
        </span>
        <span class="logo-text">{{ t('siteName') }}</span>
      </router-link>

      <nav class="desktop-nav">
        <router-link
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="nav-link"
        >{{ t(item.key) }}</router-link>
      </nav>

      <div class="header-actions">
        <button class="lang-toggle" @click="toggleLocale" :title="locale === 'fa' ? 'English' : 'فارسی'">
          <span v-if="locale === 'fa'">EN</span>
          <span v-else>فا</span>
        </button>

        <button class="cart-button" @click="navigate('/cart')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          <span v-if="cart.count.value > 0" class="cart-badge">{{ cart.count.value }}</span>
        </button>

        <button class="menu-toggle" @click="mobileMenuOpen = !mobileMenuOpen">
          <span :class="{ open: mobileMenuOpen }"></span>
        </button>
      </div>
    </div>

    <Transition name="mobile-menu">
      <div v-if="mobileMenuOpen" class="mobile-menu">
        <router-link
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="mobile-nav-link"
          @click="closeMenu"
        >{{ t(item.key) }}</router-link>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: var(--header-height);
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid transparent;
  transition: all 0.3s ease;
}

.site-header.scrolled {
  background: rgba(255, 255, 255, 0.95);
  border-bottom-color: var(--color-neutral-200);
  box-shadow: var(--shadow-sm);
}

.header-inner {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  font-size: 1.25rem;
  color: var(--color-primary-700);
  white-space: nowrap;
}

.logo-icon {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--gradient-accent);
  border-radius: var(--radius-sm);
  color: white;
}

.logo-icon svg {
  width: 22px;
  height: 22px;
}

.desktop-nav {
  display: flex;
  gap: 4px;
  margin-inline-end: auto;
  margin-inline-start: 8px;
}

.nav-link {
  padding: 8px 16px;
  border-radius: var(--radius-sm);
  font-weight: 500;
  color: var(--color-neutral-600);
  transition: all 0.2s ease;
  position: relative;
}

.nav-link:hover {
  color: var(--color-primary-600);
  background: var(--color-primary-50);
}

.nav-link.router-link-exact-active {
  color: var(--color-primary-700);
  font-weight: 600;
}

.nav-link.router-link-exact-active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 16px;
  right: 16px;
  height: 2px;
  background: var(--color-primary-500);
  border-radius: 2px;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.lang-toggle {
  padding: 8px 14px;
  border-radius: var(--radius-sm);
  font-weight: 600;
  font-size: 0.875rem;
  color: var(--color-neutral-600);
  border: 1px solid var(--color-neutral-200);
  transition: all 0.2s ease;
}

.lang-toggle:hover {
  color: var(--color-primary-600);
  border-color: var(--color-primary-300);
  background: var(--color-primary-50);
}

.cart-button {
  position: relative;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
  color: var(--color-neutral-600);
  transition: all 0.2s ease;
}

.cart-button:hover {
  color: var(--color-primary-600);
  background: var(--color-primary-50);
}

.cart-button svg {
  width: 22px;
  height: 22px;
}

.cart-badge {
  position: absolute;
  top: 2px;
  inset-inline-end: 2px;
  min-width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-error-500);
  color: white;
  font-size: 0.7rem;
  font-weight: 700;
  border-radius: 9px;
  padding: 0 4px;
}

.menu-toggle {
  display: none;
  width: 40px;
  height: 40px;
  position: relative;
}

.menu-toggle span,
.menu-toggle span::before,
.menu-toggle span::after {
  content: '';
  position: absolute;
  width: 22px;
  height: 2px;
  background: var(--color-neutral-700);
  border-radius: 2px;
  transition: all 0.3s ease;
}

.menu-toggle span {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.menu-toggle span::before {
  top: -7px;
}

.menu-toggle span::after {
  top: 7px;
}

.menu-toggle span.open {
  background: transparent;
}

.menu-toggle span.open::before {
  top: 0;
  transform: rotate(45deg);
}

.menu-toggle span.open::after {
  top: 0;
  transform: rotate(-45deg);
}

.mobile-menu {
  position: absolute;
  top: var(--header-height);
  left: 0;
  right: 0;
  background: white;
  border-bottom: 1px solid var(--color-neutral-200);
  box-shadow: var(--shadow-md);
  display: flex;
  flex-direction: column;
  padding: 16px;
}

.mobile-nav-link {
  padding: 14px 16px;
  border-radius: var(--radius-sm);
  font-weight: 500;
  color: var(--color-neutral-700);
  transition: all 0.2s ease;
}

.mobile-nav-link:hover {
  background: var(--color-primary-50);
  color: var(--color-primary-700);
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.3s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

@media (max-width: 900px) {
  .desktop-nav {
    display: none;
  }

  .menu-toggle {
    display: block;
  }
}

@media (max-width: 480px) {
  .logo-text {
    font-size: 1.1rem;
  }
}
</style>
