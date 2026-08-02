<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from '../i18n'
import { supabase } from '../lib/supabase'
import { updateSeo } from '../composables/useSeo'
import { toPersianDigits } from '../composables/useFormat'

const { t, locale } = useI18n()

const form = ref({
  name: '',
  phone: '',
  email: '',
  serviceType: 'cleaning',
  date: '',
  time: '',
  address: '',
  notes: '',
})

const submitting = ref(false)
const submitted = ref(false)
const error = ref('')

const serviceTypes = [
  { key: 'cleaning', icon: '🧹' },
  { key: 'repair', icon: '🔧' },
  { key: 'maintenance', icon: '⚙️' },
  { key: 'installation', icon: '📦' },
  { key: 'consultation', icon: '💬' },
]

const timeSlots = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00']

async function submitReservation() {
  error.value = ''
  submitting.value = true

  try {
    const { error: dbError } = await supabase.from('reservations').insert({
      name: form.value.name,
      phone: form.value.phone,
      email: form.value.email,
      service_type: form.value.serviceType,
      preferred_date: form.value.date,
      preferred_time: form.value.time,
      address: form.value.address,
      notes: form.value.notes,
      locale: locale.value,
    })

    if (dbError) throw dbError

    submitted.value = true
    form.value = {
      name: '',
      phone: '',
      email: '',
      serviceType: 'cleaning',
      date: '',
      time: '',
      address: '',
      notes: '',
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'An error occurred'
  } finally {
    submitting.value = false
  }
}

onMounted(() => {
  updateSeo({
    titleFa: 'رزرو نوبت خدمات استخر | استخر‌بان',
    titleEn: 'Book Pool Service | PoolHub',
    descriptionFa: 'رزرو آنلاین نوبت برای خدمات نظافت، تعمیر و نگهداری استخر. سریع و آسان.',
    descriptionEn: 'Book online appointments for pool cleaning, repair, and maintenance services. Fast and easy.',
  })
})
</script>

<template>
  <div class="reservation-page">
    <div class="page-hero">
      <div class="container">
        <h1 class="page-title">{{ t('reservation.title') }}</h1>
        <p class="page-subtitle">{{ t('reservation.subtitle') }}</p>
      </div>
    </div>

    <div class="container form-container">
      <Transition name="fade" mode="out-in">
        <div v-if="submitted" class="success-card">
          <div class="success-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>
          </div>
          <h2>{{ t('reservation.success') }}</h2>
          <button class="btn-primary" @click="submitted = false">{{ t('reservation.title') }}</button>
        </div>

        <form v-else class="reservation-form" @submit.prevent="submitReservation">
          <div class="service-types">
            <label class="service-label">{{ t('reservation.serviceType') }}</label>
            <div class="service-grid">
              <button
                v-for="svc in serviceTypes"
                :key="svc.key"
                type="button"
                :class="['service-card', { active: form.serviceType === svc.key }]"
                @click="form.serviceType = svc.key"
              >
                <span class="service-icon">{{ svc.icon }}</span>
                <span>{{ t(`reservation.services.${svc.key}`) }}</span>
              </button>
            </div>
          </div>

          <div class="form-grid">
            <div class="form-field">
              <label>{{ t('reservation.name') }} *</label>
              <input v-model="form.name" type="text" required />
            </div>

            <div class="form-field">
              <label>{{ t('reservation.phone') }} *</label>
              <input v-model="form.phone" type="tel" required />
            </div>

            <div class="form-field">
              <label>{{ t('reservation.email') }}</label>
              <input v-model="form.email" type="email" />
            </div>

            <div class="form-field">
              <label>{{ t('reservation.date') }} *</label>
              <input v-model="form.date" type="date" required />
            </div>

            <div class="form-field">
              <label>{{ t('reservation.time') }} *</label>
              <select v-model="form.time" required>
                <option value="" disabled>—</option>
                <option v-for="slot in timeSlots" :key="slot" :value="slot">
                  {{ locale === 'fa' ? toPersianDigits(slot) : slot }}
                </option>
              </select>
            </div>

            <div class="form-field full">
              <label>{{ t('reservation.address') }} *</label>
              <input v-model="form.address" type="text" required />
            </div>

            <div class="form-field full">
              <label>{{ t('reservation.notes') }}</label>
              <textarea v-model="form.notes" rows="4"></textarea>
            </div>
          </div>

          <p v-if="error" class="form-error">{{ error }}</p>

          <button type="submit" class="btn-submit" :disabled="submitting">
            {{ submitting ? '...' : t('reservation.submit') }}
          </button>
        </form>
      </Transition>
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

.form-container {
  padding: 48px 24px;
  max-width: 860px;
}

.reservation-form {
  background: white;
  border-radius: var(--radius-xl);
  padding: 40px;
  box-shadow: var(--shadow-md);
}

.service-types {
  margin-bottom: 32px;
}

.service-label {
  display: block;
  font-weight: 600;
  margin-bottom: 16px;
  color: var(--color-neutral-800);
}

.service-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
}

.service-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px 8px;
  border: 2px solid var(--color-neutral-200);
  border-radius: var(--radius-md);
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--color-neutral-600);
  transition: all 0.2s ease;
  text-align: center;
}

.service-card:hover {
  border-color: var(--color-primary-300);
  background: var(--color-primary-50);
}

.service-card.active {
  border-color: var(--color-primary-500);
  background: var(--color-primary-50);
  color: var(--color-primary-700);
}

.service-icon {
  font-size: 1.75rem;
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

.form-field input,
.form-field select,
.form-field textarea {
  padding: 12px 16px;
  border: 1px solid var(--color-neutral-200);
  border-radius: var(--radius-sm);
  font-size: 0.9rem;
  background: white;
  transition: border-color 0.2s ease;
}

.form-field input:focus,
.form-field select:focus,
.form-field textarea:focus {
  outline: none;
  border-color: var(--color-primary-400);
}

.form-field textarea {
  resize: vertical;
}

.form-error {
  color: var(--color-error-500);
  font-size: 0.875rem;
  margin-top: 16px;
}

.btn-submit {
  margin-top: 28px;
  width: 100%;
  padding: 16px;
  border-radius: var(--radius-md);
  background: var(--gradient-accent);
  color: white;
  font-weight: 600;
  font-size: 1.05rem;
  transition: all 0.2s ease;
}

.btn-submit:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.btn-submit:disabled {
  opacity: 0.6;
}

.success-card {
  background: white;
  border-radius: var(--radius-xl);
  padding: 60px 40px;
  text-align: center;
  box-shadow: var(--shadow-md);
}

.success-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--color-success-500);
  color: white;
  animation: fadeInUp 0.5s ease;
}

.success-icon svg {
  width: 40px;
  height: 40px;
}

.success-card h2 {
  font-size: 1.25rem;
  color: var(--color-neutral-800);
  margin-bottom: 24px;
  line-height: 1.6;
}

.btn-primary {
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

@media (max-width: 768px) {
  .service-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .form-grid {
    grid-template-columns: 1fr;
  }
  .reservation-form {
    padding: 24px;
  }
}
</style>
