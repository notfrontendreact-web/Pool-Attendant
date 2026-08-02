<script setup lang="ts">
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
import { useI18n } from './i18n'
import { updateSeo } from './composables/useSeo'

const { locale } = useI18n()
const route = useRoute()

watch(
  () => route.meta,
  (meta) => {
    updateSeo({
      titleFa: meta.titleFa as string | undefined,
      titleEn: meta.titleEn as string | undefined,
    })
  },
  { immediate: true },
)

watch(locale, () => {
  updateSeo({
    titleFa: route.meta.titleFa as string | undefined,
    titleEn: route.meta.titleEn as string | undefined,
  })
})
</script>

<template>
  <div class="app-wrapper">
    <SiteHeader />
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <component :is="Component" />
        </Transition>
      </router-view>
    </main>
    <SiteFooter />
  </div>
</template>

<style scoped>
.app-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding-top: var(--header-height);
}

.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(12px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}
</style>
