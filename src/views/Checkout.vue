<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from '../i18n'
import { useCart, clearCart } from '../store/cart'
import { formatPriceDisplay, toPersianDigits } from '../composables/useFormat'
import { updateSeo } from '../composables/useSeo'

const { t, locale } = useI18n()
const cart = useCart()
const router = useRouter()

const items = computed(() => cart.items.value)
const total = computed(() => cart.total.value)

const form = ref({
  name: '',
  phone: '',
  email: '',
  address: '',
  city: '',
  postalCode: '',
})

const processing = ref(false)
const orderConfirmed = ref(false)
const orderId = ref('')

async function processPayment() {
  processing.value = true

  await new Promise((resolve) => setTimeout(resolve, 2000))

  orderId.value = 'PH-' + Date.now().toString().slice(-8)
  orderConfirmed.value = true
  clearCart()
  processing.value = false
}

onMounted(() => {
  if (items.value.length === 0 && !orderConfirmed.value) {
    router.push('/cart')
    return
  }
  updateSeo({
    titleFa: 'تسویه حساب | استخر‌بان',
    titleEn: 'Checkout | PoolHub',
  })
})
</script>

<template>
  <div class="checkout-page container">
    <Transition name="fade" mode="out-in">
      <div v-if="orderConfirmed" class="confirmed-card">
        <div class="confirmed-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>
        </div>
        <h1>{{ t('checkout.orderConfirmed') }}</h1>
        <p class="order-id">{{ t('checkout.orderId') }}: {{ orderId }}</p>
        <p class="confirmed-desc">{{ t('checkout.bankGateway') }} → {{ t('checkout.processing') }}</p>
        <router-link to="/products" class="btn-primary">{{ t('cart.continueShopping') }}</router-link>
      </div>

      <div v-else class="checkout-layout">
        <div class="checkout-form-section">
          <h1 class="page-title">{{ t('checkout.title') }}</h1>

          <div class="form-card">
            <h2 class="section-title">{{ t('checkout.customerInfo') }}</h2>
            <div class="form-grid">
              <div class="form-field">
                <label>{{ t('checkout.name') }} *</label>
                <input v-model="form.name" type="text" required />
              </div>
              <div class="form-field">
                <label>{{ t('checkout.phone') }} *</label>
                <input v-model="form.phone" type="tel" required />
              </div>
              <div class="form-field">
                <label>{{ t('checkout.email') }}</label>
                <input v-model="form.email" type="email" />
              </div>
              <div class="form-field">
                <label>{{ t('checkout.city') }} *</label>
                <input v-model="form.city" type="text" required />
              </div>
              <div class="form-field full">
                <label>{{ t('checkout.address') }} *</label>
                <input v-model="form.address" type="text" required />
              </div>
              <div class="form-field">
                <label>{{ t('checkout.postalCode') }}</label>
                <input v-model="form.postalCode" type="text" />
              </div>
            </div>
          </div>

          <div class="form-card">
            <h2 class="section-title">{{ t('checkout.paymentMethod') }}</h2>
            <div class="payment-method active">
              <div class="payment-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
              </div>
              <div>
                <p class="payment-name">{{ t('checkout.bankGateway') }}</p>
                <p class="payment-desc">{{ t('checkout.processing') }}</p>
              </div>
              <span class="check-mark">✓</span>
            </div>
          </div>
        </div>

        <aside class="order-summary">
          <h2 class="summary-title">{{ t('checkout.orderSummary') }}</h2>
          <div class="summary-items">
            <div v-for="item in items" :key="item.product.id" class="summary-item">
              <span class="item-qty-badge">{{ toPersianDigits(String(item.quantity)) }}</span>
              <span class="item-name">
                {{ locale === 'fa' ? item.product.fa.name : item.product.en.name }}
              </span>
              <span class="item-price">{{ formatPriceDisplay(item.product.price * item.quantity) }}</span>
            </div>
          </div>
          <div class="summary-total">
            <span>{{ t('cart.total') }}</span>
            <span class="total-amount">{{ formatPriceDisplay(total) }}</span>
          </div>
          <button class="btn-pay" :disabled="processing" @click="processPayment">
            {{ processing ? t('checkout.processing') : t('checkout.payNow') }}
          </button>
        </aside>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.checkout-page {
  padding: 48px 24px;
}

.page-title {
  font-size: clamp(1.75rem, 4vw, 2.25rem);
  font-weight: 700;
  margin-bottom: 32px;
  color: var(--color-neutral-900);
}

.checkout-layout {
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 32px;
  align-items: start;
}

.form-card {
  background: white;
  border-radius: var(--radius-lg);
  padding: 32px;
  box-shadow: var(--shadow-sm);
  margin-bottom: 24px;
}

.section-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 24px;
  color: var(--color-neutral-800);
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-field.full {
  grid-column: 1 / -1;
}

.form-field label {
  font-weight: 500;
  font-size: 0.9rem;
  color: var(--color-neutral-700);
}

.form-field input {
  padding: 12px 16px;
  border: 1px solid var(--color-neutral-200);
  border-radius: var(--radius-sm);
  font-size: 0.9rem;
  transition: border-color 0.2s ease;
}

.form-field input:focus {
  outline: none;
  border-color: var(--color-primary-400);
}

.payment-method {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  border: 2px solid var(--color-primary-500);
  border-radius: var(--radius-md);
  background: var(--color-primary-50);
}

.payment-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
  background: white;
  color: var(--color-primary-600);
}

.payment-icon svg {
  width: 26px;
  height: 26px;
}

.payment-name {
  font-weight: 600;
  color: var(--color-neutral-800);
}

.payment-desc {
  font-size: 0.8rem;
  color: var(--color-neutral-500);
}

.check-mark {
  margin-inline-start: auto;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--color-primary-500);
  color: white;
  font-weight: 700;
}

.order-summary {
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

.summary-items {
  display: flex;
  flex-direction: column;
  gap: 14px;
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 20px;
}

.summary-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.85rem;
}

.item-qty-badge {
  min-width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-primary-100);
  color: var(--color-primary-700);
  border-radius: 12px;
  font-weight: 700;
  font-size: 0.75rem;
  padding: 0 6px;
  flex-shrink: 0;
}

.item-name {
  flex: 1;
  color: var(--color-neutral-700);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.item-price {
  font-weight: 600;
  color: var(--color-neutral-800);
  white-space: nowrap;
}

.summary-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  border-top: 1px solid var(--color-neutral-200);
  font-weight: 600;
  font-size: 1.05rem;
  color: var(--color-neutral-900);
}

.total-amount {
  color: var(--color-primary-700);
  font-weight: 800;
}

.btn-pay {
  width: 100%;
  margin-top: 20px;
  padding: 16px;
  border-radius: var(--radius-md);
  background: var(--gradient-accent);
  color: white;
  font-weight: 600;
  font-size: 1.05rem;
  transition: all 0.2s ease;
}

.btn-pay:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.btn-pay:disabled {
  opacity: 0.6;
}

.confirmed-card {
  max-width: 500px;
  margin: 60px auto;
  text-align: center;
  background: white;
  border-radius: var(--radius-xl);
  padding: 60px 40px;
  box-shadow: var(--shadow-md);
}

.confirmed-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--color-success-500);
  color: white;
  animation: float 2s ease-in-out infinite;
}

.confirmed-icon svg {
  width: 40px;
  height: 40px;
}

.confirmed-card h1 {
  font-size: 1.5rem;
  color: var(--color-neutral-800);
  margin-bottom: 12px;
}

.order-id {
  font-weight: 600;
  color: var(--color-primary-600);
  margin-bottom: 8px;
}

.confirmed-desc {
  color: var(--color-neutral-400);
  font-size: 0.875rem;
  margin-bottom: 28px;
}

.btn-primary {
  display: inline-block;
  padding: 12px 32px;
  background: var(--color-primary-600);
  color: white;
  border-radius: var(--radius-md);
  font-weight: 600;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 900px) {
  .checkout-layout {
    grid-template-columns: 1fr;
  }
  .order-summary {
    position: static;
    order: -1;
  }
}

@media (max-width: 480px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
}
</style>
