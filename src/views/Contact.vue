<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from '../i18n'
import { updateSeo } from '../composables/useSeo'

const { t } = useI18n()

const form = ref({
  name: '',
  email: '',
  message: '',
})

const sent = ref(false)

function sendMessage() {
  sent.value = true
  form.value = { name: '', email: '', message: '' }
  setTimeout(() => (sent.value = false), 4000)
}

onMounted(() => {
  updateSeo({
    titleFa: 'تماس با استخر‌بان | لوازم استخر و شنا',
    titleEn: 'Contact PoolHub | Pool & Swimming Equipment',
    descriptionFa: 'برای مشاوره و سفارش لوازم استخر و شنا با ما در تماس باشید. تلفن، ایمیل و آدرس.',
    descriptionEn: 'Get in touch for pool equipment consultation and orders. Phone, email, and address.',
  })
})
</script>

<template>
  <div class="contact-page">
    <div class="page-hero">
      <div class="container">
        <h1 class="page-title">{{ t('contact.title') }}</h1>
        <p class="page-subtitle">{{ t('contact.subtitle') }}</p>
      </div>
    </div>

    <div class="container contact-layout">
      <div class="contact-info">
        <div class="info-card">
          <div class="info-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          </div>
          <div>
            <h3>{{ t('contact.phone') }}</h3>
            <p>۰۲۱-۸۸۷۷۶۶۵۵</p>
          </div>
        </div>

        <div class="info-card">
          <div class="info-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          </div>
          <div>
            <h3>{{ t('contact.email') }}</h3>
            <p>info@poolhub.ir</p>
          </div>
        </div>

        <div class="info-card">
          <div class="info-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          </div>
          <div>
            <h3>{{ t('contact.address') }}</h3>
            <p>تهران، خیابان ولیعصر، پلاک ۱۲۳</p>
          </div>
        </div>

        <div class="info-card">
          <div class="info-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>
          </div>
          <div>
            <h3>{{ t('contact.workingHours') }}</h3>
            <p>{{ t('contact.workingHoursValue') }}</p>
          </div>
        </div>
      </div>

      <div class="contact-form-wrapper">
        <h2 class="form-title">{{ t('contact.title') }}</h2>
        <Transition name="fade" mode="out-in">
          <div v-if="sent" class="form-success">
            <div class="success-check">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>
            </div>
            <p>{{ t('contact.formSuccess') }}</p>
          </div>
          <form v-else class="contact-form" @submit.prevent="sendMessage">
            <div class="form-field">
              <label>{{ t('contact.formName') }} *</label>
              <input v-model="form.name" type="text" required />
            </div>
            <div class="form-field">
              <label>{{ t('contact.formEmail') }} *</label>
              <input v-model="form.email" type="email" required />
            </div>
            <div class="form-field">
              <label>{{ t('contact.formMessage') }} *</label>
              <textarea v-model="form.message" rows="5" required></textarea>
            </div>
            <button type="submit" class="btn-submit">{{ t('contact.formSubmit') }}</button>
          </form>
        </Transition>
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

.contact-layout {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 48px;
  padding: 64px 24px;
  align-items: start;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.info-card {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 24px;
  background: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  transition: all 0.2s ease;
}

.info-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateX(4px);
}

html[dir='rtl'] .info-card:hover {
  transform: translateX(-4px);
}

.info-icon {
  width: 52px;
  height: 52px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  background: var(--color-primary-50);
  color: var(--color-primary-600);
}

.info-icon svg {
  width: 26px;
  height: 26px;
}

.info-card h3 {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-neutral-800);
  margin-bottom: 4px;
}

.info-card p {
  font-size: 0.9rem;
  color: var(--color-neutral-500);
}

.contact-form-wrapper {
  background: white;
  border-radius: var(--radius-xl);
  padding: 40px;
  box-shadow: var(--shadow-md);
}

.form-title {
  font-size: 1.35rem;
  font-weight: 700;
  margin-bottom: 28px;
  color: var(--color-neutral-900);
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-field label {
  font-weight: 500;
  font-size: 0.9rem;
  color: var(--color-neutral-700);
}

.form-field input,
.form-field textarea {
  padding: 12px 16px;
  border: 1px solid var(--color-neutral-200);
  border-radius: var(--radius-sm);
  font-size: 0.9rem;
  transition: border-color 0.2s ease;
}

.form-field input:focus,
.form-field textarea:focus {
  outline: none;
  border-color: var(--color-primary-400);
}

.form-field textarea {
  resize: vertical;
}

.btn-submit {
  padding: 14px;
  border-radius: var(--radius-md);
  background: var(--gradient-accent);
  color: white;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.2s ease;
}

.btn-submit:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.form-success {
  text-align: center;
  padding: 40px;
}

.success-check {
  width: 64px;
  height: 64px;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--color-success-500);
  color: white;
}

.success-check svg {
  width: 32px;
  height: 32px;
}

.form-success p {
  color: var(--color-neutral-700);
  font-size: 1rem;
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
  .contact-layout {
    grid-template-columns: 1fr;
  }
}
</style>
