<template>
  <header class="glass-nav" :class="{ 'scrolled-deep': isScrolled }">
    <div class="nav-container" :class="{ 'rounded-pill': isScrolled }">
      <div class="nav-inner">
        <!-- Logo -->
        <div class="site-branding">
          <a href="#" class="logo-link" @click.prevent="scrollTo('home')">
            <span class="logo-text">{{ navbar.brand }}</span>
          </a>
        </div>

        <!-- Menu + CTA -->
        <nav class="main-menu">
          <div class="menu-links">
            <a
              v-for="item in navbar.items"
              :key="item.id"
              class="menu-item underline-anim"
              :class="{ active: activeSection === item.target }"
              @click.prevent="scrollTo(item.target)"
            >{{ item.label }}</a>
          </div>
          <a :href="whatsappLink" target="_blank" rel="noopener noreferrer" class="nav-cta">{{ navbar.ctaLabel }}</a>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useContentStore } from '@/stores/content'

const contentStore = useContentStore()
const navbar = computed(() => contentStore.content.navbar)
const whatsappNumber = computed(() => contentStore.content.site.whatsappNumber)

const whatsappLink = computed(() => {
  const msg = encodeURIComponent('Olá Dra. Renata! Gostaria de agendar uma consulta.')
  return `https://wa.me/${whatsappNumber.value}?text=${msg}`
})

const isScrolled = ref(false)
const activeSection = ref('home')

let lastScroll = 0

const handleScroll = () => {
  const y = window.scrollY
  isScrolled.value = y > 60
  lastScroll = y

  // Detect active section
  const sections = ['home', ...navbar.value.items.map((i) => i.target)]
  for (const id of sections) {
    const el = document.getElementById(id)
    if (el) {
      const rect = el.getBoundingClientRect()
      if (rect.top <= 250 && rect.bottom >= 250) {
        activeSection.value = id
        break
      }
    }
  }
}

const scrollTo = (id) => {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

onMounted(() => window.addEventListener('scroll', handleScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<style scoped>
/* ═══ NAVBAR HEADER ═══ */
.glass-nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 1000;
  padding: 1.2rem 0;
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  background: transparent;
}
/* ═══ NAV CONTAINER (rounded pill when scrolled) ═══ */
.nav-container {
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 28px;
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.nav-container.rounded-pill {
  background: rgba(248, 244, 240, 0.92);
  backdrop-filter: blur(28px);
  -webkit-backdrop-filter: blur(28px);
  border-radius: 18px;
  padding: 0.5rem 28px;
  box-shadow: 0 4px 30px rgba(93, 78, 55, 0.08),
              0 1px 3px rgba(93, 78, 55, 0.04);
  border: 1px solid rgba(201, 168, 130, 0.12);
}

/* ═══ NAV INNER ═══ */
.nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* ═══ LOGO ═══ */
.site-branding { z-index: 1001; }
.logo-link { text-decoration: none; display: block; }
.logo-text {
  font-family: 'Playfair Display', 'Georgia', serif;
  font-size: 1.75rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: #F8F4F0;
  transition: color 0.4s ease;
  line-height: 1;
}
.nav-container.rounded-pill .logo-text { color: #6B3A2E; }

/* ═══ MAIN MENU ═══ */
.main-menu {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}
.menu-links {
  display: flex;
  align-items: center;
  gap: 2.2rem;
}

/* ═══ MENU ITEMS ═══ */
.menu-item {
  font-family: 'Inter', -apple-system, sans-serif;
  font-size: 0.69rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  color: rgba(248,244,240,0.8);
  text-decoration: none;
  cursor: pointer;
  position: relative;
  padding: 0.4rem 0;
  transition: color 0.3s ease;
  text-transform: uppercase;
}
.nav-container.rounded-pill .menu-item { color: #6B3A2E; }
.menu-item.underline-anim::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1.5px;
  background: #C9A882;
  transition: width 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}
.menu-item.underline-anim:hover::after,
.menu-item.underline-anim.active::after {
  width: 100%;
}
.menu-item:hover,
.menu-item.active {
  color: #C9A882;
}

/* ═══ CTA BUTTON ═══ */
.nav-cta {
  font-family: 'Inter', -apple-system, sans-serif;
  font-size: 0.69rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: #F8F4F0;
  background: #6B3A2E;
  padding: 0.7rem 2rem;
  border-radius: 50px;
  text-decoration: none;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 4px 20px rgba(107, 58, 46, 0.2);
  text-transform: uppercase;
  white-space: nowrap;
}
.nav-cta:hover {
  transform: scale(1.04);
  box-shadow: 0 8px 30px rgba(107, 58, 46, 0.35);
  color: #F8F4F0;
}

/* ═══ RESPONSIVE ═══ */
@media (max-width: 1024px) {
  .menu-links { display: none; }
  .main-menu { gap: 1rem; }
}
@media (max-width: 640px) {
  .glass-nav { padding: 0.8rem 0; }
  .nav-container { padding: 0 16px; }
  .nav-container.rounded-pill {
    border-radius: 14px;
    padding: 0.4rem 16px;
  }
  .logo-text { font-size: 1.4rem; }
  .nav-cta {
    font-size: 0.6rem;
    padding: 0.5rem 1rem;
  }
}
</style>
