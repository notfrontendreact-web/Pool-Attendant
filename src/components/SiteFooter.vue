<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from '../i18n'

const { t } = useI18n()
const email = ref('')
const subscribed = ref(false)

function subscribe() {
  if (email.value.trim()) {
    subscribed.value = true
    email.value = ''
    setTimeout(() => (subscribed.value = false), 4000)
  }
}

const year = new Date().getFullYear()
</script>

<template>
  <footer class="site-footer">
    <div class="footer-wave">
      <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path d="M0,60 C240,100 480,20 720,50 C960,80 1200,30 1440,60 L1440,100 L0,100 Z" fill="currentColor" />
      </svg>
    </div>

    <div class="footer-content">
      <div class="container footer-grid">
        <div class="footer-col footer-brand">
          <h3 class="footer-title">{{ t('siteName') }}</h3>
          <p class="footer-desc">{{ t('footer.about') }}</p>
          <div class="social-links">
            <a href="#" class="social-link" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>
            </a>
            <a href="#" class="social-link" aria-label="Telegram">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M21.6 4.3L2.8 11.6c-1 .4-1 1.8.1 2.1l4.7 1.4 1.8 5.7c.3.8 1.3 1 1.9.3l2.5-2.5 4.8 3.5c.7.5 1.7.1 1.9-.7L23.5 5.4c.2-1-.7-1.8-1.9-1.1z"/></svg>
            </a>
            <a href="#" class="social-link" aria-label="WhatsApp">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.2-1.4c1.4.8 3.1 1.2 4.8 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18c-1.5 0-3-.4-4.3-1.2l-.3-.2-3.1.8.8-3-.2-.3C4.4 15 4 13.5 4 12c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8z"/></svg>
            </a>
          </div>
        </div>

        <div class="footer-col">
          <h4 class="footer-heading">{{ t('footer.quickLinks') }}</h4>
          <ul class="footer-links">
            <li><router-link to="/">{{ t('nav.home') }}</router-link></li>
            <li><router-link to="/products">{{ t('nav.products') }}</router-link></li>
            <li><router-link to="/reservation">{{ t('nav.reservation') }}</router-link></li>
            <li><router-link to="/about">{{ t('nav.about') }}</router-link></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4 class="footer-heading">{{ t('footer.contactUs') }}</h4>
          <ul class="footer-links">
            <li>{{ t('contact.phone') }}: ۰۲۱-۸۸۷۷۶۶۵۵</li>
            <li>{{ t('contact.email') }}: info@poolhub.ir</li>
            <li>{{ t('contact.address') }}: تهران، خیابان ولیعصر</li>
            <li>{{ t('contact.workingHoursValue') }}</li>
          </ul>
        </div>

        <div class="footer-col">
          <h4 class="footer-heading">{{ t('footer.newsletter') }}</h4>
          <p class="footer-desc small">{{ t('footer.newsletterDesc') }}</p>
          <form class="newsletter-form" @submit.prevent="subscribe">
            <input
              v-model="email"
              type="email"
              :placeholder="t('footer.newsletterPlaceholder')"
              required
            />
            <button type="submit">{{ t('footer.subscribe') }}</button>
          </form>
          <Transition name="fade">
            <p v-if="subscribed" class="subscribe-success">{{ t('checkout.orderConfirmed') }}</p>
          </Transition>
        </div>
      </div>

      <div class="container footer-bottom">
        <p>© {{ year }} {{ t('siteName') }} — {{ t('footer.rights') }}</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  position: relative;
  background: var(--color-neutral-900);
  color: var(--color-neutral-300);
  margin-top: 80px;
}

.footer-wave {
  color: var(--color-neutral-900);
  margin-bottom: -2px;
}

.footer-wave svg {
  width: 100%;
  height: 60px;
  display: block;
}

.footer-content {
  padding: 60px 0 32px;
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1.5fr 1.5fr;
  gap: 48px;
}

.footer-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 16px;
}

.footer-heading {
  color: white;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 20px;
}

.footer-desc {
  font-size: 0.875rem;
  line-height: 1.7;
  color: var(--color-neutral-400);
  margin-bottom: 20px;
}

.footer-desc.small {
  font-size: 0.8rem;
}

.footer-links {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.footer-links a,
.footer-links li {
  font-size: 0.875rem;
  color: var(--color-neutral-400);
  transition: color 0.2s ease;
}

.footer-links a:hover {
  color: var(--color-primary-300);
}

.social-links {
  display: flex;
  gap: 12px;
}

.social-link {
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
  background: var(--color-neutral-800);
  color: var(--color-neutral-300);
  transition: all 0.2s ease;
}

.social-link svg {
  width: 20px;
  height: 20px;
}

.social-link:hover {
  background: var(--color-primary-600);
  color: white;
  transform: translateY(-3px);
}

.newsletter-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.newsletter-form input {
  padding: 12px 16px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-neutral-700);
  background: var(--color-neutral-800);
  color: white;
  font-size: 0.875rem;
}

.newsletter-form input::placeholder {
  color: var(--color-neutral-500);
}

.newsletter-form input:focus {
  outline: none;
  border-color: var(--color-primary-400);
}

.newsletter-form button {
  padding: 12px 16px;
  border-radius: var(--radius-sm);
  background: var(--gradient-accent);
  color: white;
  font-weight: 600;
  font-size: 0.875rem;
  transition: all 0.2s ease;
}

.newsletter-form button:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

.subscribe-success {
  color: var(--color-accent-400);
  font-size: 0.8rem;
  margin-top: 8px;
}

.footer-bottom {
  border-top: 1px solid var(--color-neutral-800);
  padding-top: 24px;
  text-align: center;
  font-size: 0.8rem;
  color: var(--color-neutral-500);
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
  .footer-grid {
    grid-template-columns: 1fr 1fr;
    gap: 32px;
  }
}

@media (max-width: 560px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 28px;
  }
}
</style>
