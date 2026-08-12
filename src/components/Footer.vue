<template>
  <footer class="site-footer">
    <div class="footer-inner">
      <!-- CTA Block -->
      <div class="footer-cta">
        <span class="cta-label">{{ footer.ctaLabel }}</span>
        <h2 class="cta-title" v-html="footer.ctaTitle"></h2>
        <a :href="whatsappLink" target="_blank" class="cta-btn">
          <span>{{ footer.ctaButton }}</span>
          <div class="cta-arrow"><svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg></div>
        </a>
      </div>

      <div class="footer-divider"></div>

      <!-- Footer Grid -->
      <div class="footer-grid">
        <div class="footer-brand">
          <h3 class="brand-name">{{ site.name }}</h3>
          <p class="brand-desc">{{ site.tagline }}</p>
          <div class="social-links">
            <a v-for="s in footer.social" :key="s.name" :href="s.url" target="_blank" class="social-icon" :title="s.name">
              <i :class="s.icon"></i>
            </a>
          </div>
        </div>
        <div class="footer-nav">
          <span class="footer-label">NAVEGAÇÃO</span>
          <a v-for="item in footer.nav" :key="item.target" :href="'#' + item.target">{{ item.label }}</a>
        </div>
        <div class="footer-contact">
          <span class="footer-label">CONTATO</span>
          <p class="contact-loc">{{ site.location }}</p>
          <a :href="'https://wa.me/' + site.whatsappNumber" target="_blank" class="contact-phone">{{ contact.phone }}</a>
          <p class="contact-email">{{ contact.email }}</p>
        </div>
        <div class="footer-location">
          <span class="footer-label">ATENDIMENTO</span>
          <p>{{ site.locationDesc }}</p>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; {{ currentYear }} {{ site.name }}. Todos os direitos reservados.</p>
        <p class="crp">CRP: {{ site.crp }}</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import { useContentStore } from '@/stores/content'

const contentStore = useContentStore()
const content = contentStore.content
const site = computed(() => content.site)
const footer = computed(() => content.footer)
const contact = computed(() => content.contact)
const currentYear = new Date().getFullYear()

const whatsappLink = computed(() => {
  const msg = encodeURIComponent('Olá Dra. Renata! Gostaria de agendar uma consulta.')
  return `https://wa.me/${site.value.whatsappNumber}?text=${msg}`
})
</script>

<style scoped>
.site-footer {
  background: linear-gradient(180deg, #6B5B4F 0%, #4A3D34 100%);
  color: #F8F4F0; position: relative; overflow: hidden;
}
.footer-inner { max-width: 1300px; margin: 0 auto; padding: 0 24px; }
.footer-cta {
  text-align: center; padding: 80px 0;
}
.cta-label {
  font-size: 0.7rem; font-weight: 700; letter-spacing: 0.25em;
  color: #C9A882; display: block; margin-bottom: 1rem; text-transform: uppercase;
}
.cta-title {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(2.5rem, 6vw, 5rem); font-weight: 700;
  line-height: 1.1; margin-bottom: 2rem;
}
.cta-accent { color: #E8D5C0; font-style: italic; font-weight: 300; }
.cta-btn {
  display: inline-flex; align-items: center; gap: 0.8rem;
  background: #C9A882; color: #FFF; padding: 0.6rem 0.6rem 0.6rem 2rem;
  border-radius: 50px; text-decoration: none;
  font-size: 0.75rem; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(201,168,130,0.3);
}
.cta-btn:hover { transform: scale(1.05); box-shadow: 0 15px 40px rgba(201,168,130,0.5); }
.cta-arrow {
  width: 48px; height: 48px; border-radius: 50%; background: rgba(255,255,255,0.15);
  display: flex; align-items: center; justify-content: center;
}
.footer-divider {
  height: 1px; background: linear-gradient(90deg, transparent, rgba(248,244,240,0.1), transparent);
  margin-bottom: 60px;
}
.footer-grid {
  display: grid; grid-template-columns: 2fr 1fr 1.5fr 1fr; gap: 40px; margin-bottom: 40px;
}
.footer-label { font-size: 0.65rem; font-weight: 700; letter-spacing: 0.2em; color: #C9A882; display: block; margin-bottom: 1.5rem; text-transform: uppercase; }
.brand-name { font-family: 'Playfair Display', Georgia, serif; font-size: 1.8rem; margin-bottom: 1rem; }
.brand-desc { color: rgba(248,244,240,0.7); line-height: 1.6; margin-bottom: 1.5rem; max-width: 300px; }
.social-links { display: flex; gap: 12px; }
.social-icon {
  width: 40px; height: 40px; border-radius: 50%; background: rgba(248,244,240,0.1);
  display: flex; align-items: center; justify-content: center;
  color: #F8F4F0; font-size: 1.1rem; transition: all 0.3s ease;
}
.social-icon:hover { background: #C9A882; transform: translateY(-3px); }
.footer-nav { display: flex; flex-direction: column; gap: 12px; }
.footer-nav a { color: rgba(248,244,240,0.7); text-decoration: none; transition: all 0.3s ease; }
.footer-nav a:hover { color: #C9A882; transform: translateX(5px); }
.contact-loc { color: rgba(248,244,240,0.7); margin-bottom: 1rem; }
.contact-phone {
  font-family: 'Playfair Display', Georgia, serif; font-size: 1.5rem;
  color: #FFF; text-decoration: none; display: block; margin-bottom: 0.5rem;
  transition: color 0.3s ease;
}
.contact-phone:hover { color: #C9A882; }
.contact-email { color: rgba(248,244,240,0.5); font-size: 0.9rem; }
.footer-location p { color: rgba(248,244,240,0.7); line-height: 1.6; }
.footer-bottom {
  border-top: 1px solid rgba(248,244,240,0.1); padding: 25px 0;
  display: flex; justify-content: space-between; align-items: center;
  font-size: 0.85rem; color: rgba(248,244,240,0.5);
}
.footer-bottom p { margin: 0; }

@media (max-width: 991px) {
  .footer-grid { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 576px) {
  .footer-grid { grid-template-columns: 1fr; text-align: center; }
  .footer-nav { align-items: center; }
  .social-links { justify-content: center; }
  .footer-bottom { flex-direction: column; gap: 10px; }
}
</style>
