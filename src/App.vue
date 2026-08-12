<script setup>
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import WhatsAppButton from '@/components/WhatsAppButton.vue'
import { useAuthStore } from '@/stores/auth'
import { useContentStore } from '@/stores/content'

const authStore = useAuthStore()
const contentStore = useContentStore()
const route = useRoute()

// Atualiza título da página e favicon dinamicamente a partir do admin
watch(() => contentStore.content.site, (site) => {
  if (site.pageTitle) {
    document.title = site.pageTitle
  }
  if (site.favicon) {
    let link = document.querySelector("link[rel='icon']")
    if (!link) {
      link = document.createElement('link')
      link.rel = 'icon'
      document.head.appendChild(link)
    }
    link.href = site.favicon
  }
}, { immediate: true, deep: true })

const isAdminRoute = computed(() =>
  route.path.startsWith('/admin') || route.path === '/login'
)

authStore.checkAuth()
contentStore.init()
</script>

<template>
  <div id="app">
    <Navbar v-if="!isAdminRoute" />
    
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    
    <Footer v-if="!isAdminRoute" />
    <WhatsAppButton v-if="!isAdminRoute" />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  line-height: 1.6;
  color: #5D4E37;
  background: #F8F4F0;
  overflow-x: hidden;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
