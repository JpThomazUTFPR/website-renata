<template>
  <div class="home-page">
    <!-- ═══ HERO SECTION ═══ -->
    <section class="hero-section" id="home">
      <div class="hero-texture" aria-hidden="true">
        <i class="bi bi-brain"></i>
        <i class="bi bi-heart-pulse"></i>
        <i class="bi bi-flower2"></i>
        <i class="bi bi-chat-heart"></i>
        <i class="bi bi-people"></i>
        <i class="bi bi-lightbulb"></i>
        <i class="bi bi-emoji-smile"></i>
        <i class="bi bi-hand-thumbs-up"></i>
        <i class="bi bi-patch-question"></i>
        <i class="bi bi-balloon-heart"></i>
      </div>
      <div class="hero-container">
        <div class="hero-text-block">
          <h1 class="hero-title">
            <span class="hero-line" data-reveal>{{ hero.titleLine1 }}</span>
            <span class="hero-line italic" data-reveal>{{ hero.titleLine2 }}</span>
            <span class="hero-line sub" data-reveal>{{ hero.titleLine3 }}</span>
          </h1>
          <div class="hero-actions" data-reveal>
            <a :href="whatsappLink" target="_blank" class="hero-cta">
              <span>{{ hero.ctaLabel }}</span>
              <div class="cta-icon"><svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg></div>
            </a>
          </div>
        </div>
        <div class="hero-visual" data-reveal>
          <div class="hero-portrait-frame">
            <div class="hero-portrait-border"></div>
            <img :src="hero.image || 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=800&fit=crop'" alt="Dra. Renata" class="hero-portrait" />
          </div>
          <div class="scroll-indicator">
            <span>Role para baixo</span>
            <div class="scroll-line"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ SEÇÕES DINÂMICAS ═══ -->
    <template v-for="section in enabledSections" :key="section.id">
      <!-- PERSPECTIVA -->
      <section v-if="section.type === 'perspective'" class="perspective-section" :id="section.id">
        <div class="section-bg-text">{{ section.title }}</div>
        <div class="container">
          <div class="persp-row">
            <div class="persp-visual" data-reveal>
              <div class="persp-portrait-wrap">
                <img :src="section.content.image || 'https://images.unsplash.com/photo-1590650151155-3b62c5a0c7c1?w=600&h=750&fit=crop'" alt="Dra. Renata" class="persp-portrait" />
                <div class="persp-border-tl"></div>
              </div>
            </div>
            <div class="persp-content">
              <span class="section-label" data-reveal>{{ section.content.label }}</span>
              <h2 class="persp-title" data-reveal v-html="section.content.heading"></h2>
              <div class="persp-bullets">
                <div class="persp-bullet" v-for="(b, i) in section.content.bullets" :key="i" :data-reveal="true">
                  <span class="bullet-num">{{ String(i+1).padStart(2,'0') }}</span>
                  <p v-html="b"></p>
                </div>
                <div class="persp-conclusion" data-reveal>
                  <p v-html="section.content.conclusion"></p>
                </div>
              </div>
              <div data-reveal>
                <a :href="whatsappLink" target="_blank" class="hero-cta">
                  <span>{{ hero.ctaLabel }}</span>
                  <div class="cta-icon"><svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg></div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- DIFERENCIAIS -->
      <section v-else-if="section.type === 'approach'" class="approach-section" :id="section.id">
        <div class="section-overflow-text">{{ section.title }}</div>
        <div class="container">
          <div class="approach-grid">
            <div class="approach-intro">
              <span class="section-label" data-reveal>{{ section.content.label }}</span>
              <h2 class="approach-title" data-reveal v-html="section.content.heading"></h2>
              <p data-reveal>{{ section.content.intro }}</p>
              <div data-reveal>
                <a :href="whatsappLink" target="_blank" class="hero-cta">
                  <span>{{ hero.ctaLabel }}</span>
                  <div class="cta-icon"><svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg></div>
                </a>
              </div>
            </div>
            <div class="pillars">
              <div class="pillar-card" v-for="(p, i) in section.content.pillars" :key="i" :class="{ active: i === 1 }" :data-reveal="true">
                <div class="pillar-bar"></div>
                <div class="pillar-header">
                  <span class="pillar-num">{{ String(i+1).padStart(2,'0') }}</span>
                  <div class="pillar-icon"><i :class="p.icon"></i></div>
                </div>
                <div class="pillar-body">
                  <h3>{{ p.title }}</h3>
                  <p>{{ p.desc }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- AGENDA -->
      <section v-else-if="section.type === 'schedule'" class="schedule-section" :id="section.id">
        <div class="container">
          <span class="section-label" data-reveal>{{ section.content.label }}</span>
          <h2 class="schedule-title" data-reveal v-html="section.content.heading"></h2>
          <p class="schedule-desc" data-reveal>{{ section.content.description }}</p>
          <div class="schedule-calendar" data-reveal>
            <iframe :src="section.content.calendarUrl" style="border:0" width="100%" height="600" frameborder="0" scrolling="no"></iframe>
          </div>
          <div class="schedule-cta" data-reveal>
            <a :href="whatsappLink" target="_blank" class="hero-cta">
              <span><i class="bi bi-whatsapp me-2"></i>Agendar pelo WhatsApp</span>
              <div class="cta-icon"><svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg></div>
            </a>
          </div>
        </div>
      </section>

      <!-- DEPOIMENTOS -->
      <section v-else-if="section.type === 'reviews'" class="reviews-section" :id="section.id">
        <div class="container">
          <div class="reviews-header">
            <div>
              <span class="section-label" data-reveal>{{ section.content.label }}</span>
              <h2 class="reviews-title" data-reveal v-html="section.content.heading"></h2>
            </div>
            <div class="reviews-rating" data-reveal>
              <div class="stars">★★★★★</div>
              <span class="rating-score">{{ section.content.rating }}</span>
            </div>
          </div>
          <div class="reviews-grid">
            <div class="review-card" v-for="(r, i) in section.content.reviews" :key="i" :data-reveal="true">
              <svg class="review-quote" width="32" height="32" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-3c0-1.105.895-2 2-2h3v-4h-4c-1.105 0-2-1.105-2-2V5h7v7l-7 9zm-10 0v-3c0-1.105.895-2 2-2h3v-4H5c-1.105 0-2-1.105-2-2V5h7v7l-7 9z"/></svg>
              <p>"{{ r.text }}"</p>
              <div class="review-author">
                <span class="review-name">{{ r.name }}</span>
                <span class="review-source">via Google</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- FAQ -->
      <section v-else-if="section.type === 'faq'" class="faq-section" :id="section.id">
        <div class="section-bg-text">{{ section.title }}</div>
        <div class="container">
          <div class="faq-header">
            <div>
              <span class="section-label" data-reveal>{{ section.content.label }}</span>
              <h2 class="faq-title" data-reveal v-html="section.content.heading"></h2>
            </div>
            <a :href="whatsappLink" target="_blank" class="faq-contact-link" data-reveal>
              <i class="bi bi-whatsapp"></i> Fale pelo WhatsApp
            </a>
          </div>
          <div class="faq-grid">
            <div class="faq-item" v-for="(faq, i) in section.content.faqs" :key="i" :class="{ open: faq.open }" @click="faq.open = !faq.open" :data-reveal="true">
              <button class="faq-question">
                <span>{{ faq.q }}</span>
                <span class="faq-icon">{{ faq.open ? '−' : '+' }}</span>
              </button>
              <div class="faq-answer" v-show="faq.open">
                <p>{{ faq.a }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- SEÇÃO PERSONALIZADA -->
      <section v-else class="custom-section" :id="section.id" :style="{ background: section.content.background || 'var(--white)' }">
        <div class="container">
          <div class="text-center mb-4">
            <span class="section-label" data-reveal v-if="section.content.label">{{ section.content.label }}</span>
            <h2 class="custom-title" data-reveal v-html="section.content.heading"></h2>
          </div>
          <div class="row g-4" v-if="section.content.cards && section.content.cards.length">
            <div class="col-md-6 col-lg-4" v-for="(card, i) in section.content.cards" :key="i" data-reveal>
              <div class="custom-card h-100">
                <div class="custom-card__icon" v-if="card.icon"><i :class="card.icon"></i></div>
                <h3 class="custom-card__title">{{ card.title }}</h3>
                <p class="custom-card__text">{{ card.text }}</p>
              </div>
            </div>
          </div>
          <div class="custom-rich" data-reveal v-if="section.content.body" v-html="section.content.body"></div>
          <div class="text-center mt-4" data-reveal v-if="section.content.ctaLabel">
            <a :href="whatsappLink" target="_blank" class="hero-cta">
              <span>{{ section.content.ctaLabel }}</span>
              <div class="cta-icon"><svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg></div>
            </a>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted } from 'vue'
import { useContentStore } from '@/stores/content'

const contentStore = useContentStore()
const content = contentStore.content

const whatsappLink = computed(() => {
  const msg = encodeURIComponent('Olá Dra. Renata! Gostaria de agendar uma consulta.')
  return `https://wa.me/${content.site.whatsappNumber}?text=${msg}`
})

const hero = computed(() => content.hero)
const enabledSections = computed(() => content.sections.filter((s) => s.enabled))

// ═══ SCROLL REVEAL ANIMATION ═══
let observer = null
onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed')
      }
    })
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' })

  document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el))
})
onUnmounted(() => {
  if (observer) observer.disconnect()
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Inter:wght@300;400;500;600;700&display=swap');
@import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css');

.home-page {
  --wine: #6B3A2E;
  --wine-light: #8B5A4B;
  --bg: #F8F4F0;
  --bg-alt: #EDE8E1;
  --accent: #C9A882;
  --accent-dark: #B8956A;
  --text: #5D4E37;
  --text-light: #8B7A66;
  --white: #FFF;
  font-family: 'Inter', sans-serif;
  color: var(--text);
  background: var(--bg);
  overflow-x: hidden;
}

.container { max-width: 1300px; margin: 0 auto; padding: 0 24px; }

.section-label {
  display: block; font-size: 0.7rem; font-weight: 700;
  letter-spacing: 0.35em; text-transform: uppercase; color: var(--accent-dark);
  margin-bottom: 1rem;
}
.section-bg-text {
  position: absolute; top: 10%; left: 50%; transform: translateX(-50%);
  font-family: 'Playfair Display', serif; font-size: 18vw; font-weight: 900;
  color: var(--text); opacity: 0.02; pointer-events: none; white-space: nowrap;
  text-transform: uppercase;
}
.section-overflow-text {
  position: absolute; top: 50%; right: -10%; transform: translateY(-50%) rotate(90deg);
  font-family: 'Playfair Display', serif; font-size: 12rem; font-weight: 900;
  color: var(--text); opacity: 0.03; pointer-events: none; white-space: nowrap;
}
.accent { color: var(--accent-dark); font-style: italic; font-weight: 300; }

/* ═══ SCROLL REVEAL ═══ */
[data-reveal] {
  opacity: 0; transform: translateY(40px);
  transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1),
              transform 0.8s cubic-bezier(0.16,1,0.3,1);
}
[data-reveal].revealed {
  opacity: 1; transform: translateY(0);
}
/* staggered delay for children */
.persp-bullet[data-reveal]:nth-child(1) { transition-delay: 0.05s; }
.persp-bullet[data-reveal]:nth-child(2) { transition-delay: 0.15s; }
.persp-bullet[data-reveal]:nth-child(3) { transition-delay: 0.25s; }
.persp-bullet[data-reveal]:nth-child(4) { transition-delay: 0.35s; }
.pillar-card[data-reveal]:nth-child(1) { transition-delay: 0.05s; }
.pillar-card[data-reveal]:nth-child(2) { transition-delay: 0.2s; }
.pillar-card[data-reveal]:nth-child(3) { transition-delay: 0.35s; }
.review-card[data-reveal]:nth-child(1) { transition-delay: 0.05s; }
.review-card[data-reveal]:nth-child(2) { transition-delay: 0.2s; }
.review-card[data-reveal]:nth-child(3) { transition-delay: 0.35s; }
.faq-item[data-reveal]:nth-child(1) { transition-delay: 0.04s; }
.faq-item[data-reveal]:nth-child(2) { transition-delay: 0.08s; }
.faq-item[data-reveal]:nth-child(3) { transition-delay: 0.12s; }
.faq-item[data-reveal]:nth-child(4) { transition-delay: 0.16s; }
.faq-item[data-reveal]:nth-child(5) { transition-delay: 0.20s; }
.faq-item[data-reveal]:nth-child(6) { transition-delay: 0.24s; }

/* ═══ HERO SECTION ═══ */
.hero-section {
  background: linear-gradient(135deg, #F8F4F0 0%, #EDE8E1 50%, #E0D5C5 100%);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding: 50px 0 0;
}
.hero-texture {
  position: absolute; inset: 0; z-index: 0; pointer-events: none; overflow: hidden;
}
.hero-texture i {
  position: absolute;
  color: var(--wine);
  opacity: 0.05;
  font-size: 7rem;
}
.hero-texture i:nth-child(1) { top: 8%; left: 6%; font-size: 9rem; transform: rotate(-12deg); }
.hero-texture i:nth-child(2) { top: 18%; right: 8%; font-size: 6rem; transform: rotate(10deg); opacity: 0.04; }
.hero-texture i:nth-child(3) { bottom: 22%; left: 12%; font-size: 8rem; transform: rotate(8deg); opacity: 0.045; }
.hero-texture i:nth-child(4) { bottom: 12%; right: 14%; font-size: 7rem; transform: rotate(-8deg); }
.hero-texture i:nth-child(5) { top: 45%; left: 2%; font-size: 5rem; opacity: 0.035; }
.hero-texture i:nth-child(6) { top: 60%; right: 4%; font-size: 6rem; transform: rotate(15deg); opacity: 0.04; }
.hero-texture i:nth-child(7) { top: 5%; left: 45%; font-size: 4.5rem; opacity: 0.03; }
.hero-texture i:nth-child(8) { bottom: 40%; left: 40%; font-size: 5.5rem; transform: rotate(-15deg); opacity: 0.035; }
.hero-texture i:nth-child(9) { top: 30%; left: 30%; font-size: 4rem; opacity: 0.03; }
.hero-texture i:nth-child(10) { bottom: 5%; left: 50%; font-size: 5rem; transform: rotate(12deg); opacity: 0.04; }
.hero-container {
  position: relative; z-index: 10; width: 100%; max-width: 1300px; margin: 0 auto;
  padding: 0 24px; display: flex; align-items: flex-end;
  justify-content: space-between;
  height: 100%; min-height: calc(100vh - 6rem);
}
.hero-text-block {
  width: 55%; padding-bottom: 80px; position: relative; z-index: 2;
}
.hero-title {
  font-family: 'Playfair Display', serif; line-height: 1.06;
  font-size: clamp(2rem, 5vw, 4.2rem); margin-bottom: 2.5rem;
  display: flex; flex-direction: column;
}
.hero-line { display: block; color: var(--wine); font-weight: 700; }
.hero-line.italic {
  font-style: italic; font-weight: 300;
  font-size: clamp(2.2rem, 5.5vw, 4.4rem);
  color: var(--wine-light); margin: 0.1rem 0;
}
.hero-line.sub {
  font-size: clamp(0.72rem, 1.3vw, 0.9rem); font-weight: 500;
  font-family: 'Inter', sans-serif; letter-spacing: 0.07em;
  color: var(--text-light); margin-top: 1.5rem;
  text-transform: uppercase;
}
.hero-cta {
  display: inline-flex; align-items: center; gap: 0.8rem;
  background: var(--wine); color: #F8F4F0;
  padding: 0.5rem 0.5rem 0.5rem 2rem; border-radius: 50px;
  text-decoration: none; font-size: 0.7rem; font-weight: 700;
  letter-spacing: 0.15em; text-transform: uppercase;
  transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
  box-shadow: 0 10px 40px rgba(107,58,46,0.25);
}
.hero-cta:hover {
  transform: scale(1.04);
  box-shadow: 0 15px 50px rgba(107,58,46,0.4);
  background: var(--wine-light); color: #F8F4F0;
}
.cta-icon {
  width: 46px; height: 46px; border-radius: 50%;
  background: rgba(248,244,240,0.15);
  display: flex; align-items: center; justify-content: center;
}

/* Hero Visual + Photo */
.hero-visual {
  width: 45%; display: flex; flex-direction: column;
  align-items: flex-end; justify-content: flex-end;
  position: relative; z-index: 2;
}
.hero-portrait-frame { position: relative; }
.hero-portrait-border {
  position: absolute; top: -16px; left: -16px; right: 16px; bottom: 16px;
  border: 2px solid rgba(201,168,130,0.25); border-radius: 30px; z-index: 0;
}
.hero-portrait {
  position: relative; z-index: 1;
  width: 100%; max-width: 420px; height: 520px;
  object-fit: cover; object-position: center 20%;
  border-radius: 30px;
  box-shadow: 0 30px 80px rgba(0,0,0,0.25);
}

/* Scroll Indicator */
.scroll-indicator {
  display: flex; flex-direction: column; align-items: center; gap: 10px;
  margin-top: 2rem; font-size: 0.6rem; font-weight: 600;
  letter-spacing: 0.2em; text-transform: uppercase;
  color: var(--text-light);
}
.scroll-line {
  width: 1px; height: 40px;
  background: linear-gradient(to top, rgba(107,58,46,0.4), transparent);
}

/* ═══ PERSPECTIVE SECTION ═══ */
.perspective-section {
  position: relative; padding: 120px 0; background: var(--white); overflow: hidden;
}
.persp-row { display: flex; align-items: flex-start; gap: 80px; position: relative; z-index: 1; }
.persp-visual { width: 40%; flex-shrink: 0; }
.persp-portrait-wrap {
  position: relative; max-width: 500px; margin: 0 auto;
}
.persp-portrait {
  width: 100%; aspect-ratio: 4/5; object-fit: cover; border-radius: 2rem;
  box-shadow: 0 40px 80px rgba(107,58,46,0.1);
}
.persp-border-tl {
  position: absolute; top: -24px; left: -24px; width: 100px; height: 100px;
  border-top: 2px solid var(--accent); border-left: 2px solid var(--accent);
  border-radius: 2rem 0 0 0; z-index: -1;
}
.persp-content { width: 60%; padding-top: 2rem; }
.persp-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(1.8rem, 4vw, 3.5rem);
  line-height: 1.1; margin-bottom: 3rem; max-width: 550px;
}
.persp-bullets { display: flex; flex-direction: column; gap: 2rem; margin-bottom: 2rem; }
.persp-bullet {
  display: flex; gap: 1.5rem; border-left: 1px solid rgba(201,168,130,0.25);
  padding-left: 2rem;
}
.bullet-num {
  font-family: 'Playfair Display', serif; font-size: 2.5rem; font-style: italic;
  color: var(--accent); opacity: 0.25; flex-shrink: 0; line-height: 1;
}
.persp-bullet p { font-size: 1.05rem; font-weight: 300; color: var(--text-light); margin: 0; }
.persp-bullet strong { font-weight: 600; color: var(--wine); }
.persp-conclusion {
  margin-top: 3rem; padding-top: 3rem; border-top: 1px solid rgba(201,168,130,0.12);
  font-family: 'Playfair Display', serif; font-style: italic;
  font-size: clamp(1.1rem, 2vw, 1.8rem); font-weight: 300; line-height: 1.4;
}

/* ═══ APPROACH SECTION ═══ */
.approach-section {
  position: relative; padding: 120px 0; background: var(--bg-alt); overflow: hidden;
}
.approach-grid {
  display: grid; grid-template-columns: 0.8fr 1.2fr; gap: 80px; align-items: center;
  position: relative; z-index: 1;
}
.approach-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(1.8rem, 4vw, 3.5rem); line-height: 1.1; margin-bottom: 1.5rem;
}
.approach-intro p { color: var(--text-light); line-height: 1.7; margin-bottom: 2rem; max-width: 450px; }
.pillars { display: flex; flex-direction: column; gap: 1.2rem; }
.pillar-card {
  background: rgba(255,255,255,0.5); border: 1px solid rgba(93,78,55,0.05);
  padding: 2rem; position: relative; overflow: hidden;
  display: grid; grid-template-columns: auto 1fr; gap: 1.5rem; align-items: center;
  transition: all 0.5s cubic-bezier(0.16,1,0.3,1); cursor: default;
}
.pillar-card:hover, .pillar-card.active {
  background: #FFF; box-shadow: 0 8px 30px rgba(107,58,46,0.06);
  transform: translateX(8px);
}
.pillar-bar {
  position: absolute; left: 0; top: 0; height: 100%; width: 2px;
  background: var(--accent); transform-origin: top;
  transform: scaleY(0); transition: transform 0.5s cubic-bezier(0.16,1,0.3,1);
}
.pillar-card:hover .pillar-bar, .pillar-card.active .pillar-bar { transform: scaleY(1); }
.pillar-header { display: flex; flex-direction: column; align-items: center; gap: 0.8rem; }
.pillar-num { font-size: 0.75rem; font-weight: 700; letter-spacing: 0.15em; color: var(--accent-dark); }
.pillar-icon {
  width: 48px; height: 48px; border-radius: 50%; background: #F0E8DC;
  display: flex; align-items: center; justify-content: center;
  font-size: 1.2rem; color: var(--wine);
}
.pillar-card.active .pillar-icon { background: var(--wine); color: var(--bg); }
.pillar-body h3 { font-family: 'Playfair Display', serif; font-size: 1.3rem; margin: 0 0 0.5rem; }
.pillar-body p { color: var(--text-light); margin: 0; line-height: 1.5; font-size: 0.95rem; }

/* ═══ SCHEDULE ═══ */
.schedule-section { padding: 120px 0; background: var(--bg); text-align: center; }
.schedule-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(1.8rem, 4vw, 3.5rem); margin-bottom: 1rem;
}
.schedule-desc { color: var(--text-light); margin-bottom: 3rem; }
.schedule-calendar {
  background: #FFF; border-radius: 16px; overflow: hidden;
  box-shadow: 0 20px 60px rgba(107,58,46,0.06); margin-bottom: 2rem;
}
.schedule-cta { display: flex; justify-content: center; }

/* ═══ REVIEWS ═══ */
.reviews-section { padding: 120px 0; background: var(--bg); }
.reviews-header {
  display: flex; justify-content: space-between; align-items: flex-end;
  margin-bottom: 3rem; flex-wrap: wrap; gap: 1rem;
}
.reviews-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(1.8rem, 4vw, 3rem); line-height: 1.1;
}
.reviews-rating { text-align: right; }
.stars { color: var(--accent-dark); font-size: 1.2rem; letter-spacing: 3px; }
.rating-score { font-weight: 700; font-size: 1.2rem; display: block; }
.reviews-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; }
.review-card {
  background: #FFF; padding: 2.5rem; border: 1px solid rgba(107,58,46,0.05);
  box-shadow: 0 10px 30px rgba(107,58,46,0.03); transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
}
.review-card:hover { transform: translateY(-6px); box-shadow: 0 20px 50px rgba(107,58,46,0.08); }
.review-quote { color: var(--accent); opacity: 0.2; margin-bottom: 1.5rem; }
.review-card p {
  font-family: 'Playfair Display', serif; font-style: italic;
  font-size: 1.1rem; line-height: 1.6; color: var(--text); margin-bottom: 1.5rem;
}
.review-author { border-top: 1px solid rgba(107,58,46,0.05); padding-top: 1rem; }
.review-name { display: block; font-weight: 700; font-size: 0.7rem; letter-spacing: 0.08em; text-transform: uppercase; color: var(--wine); }
.review-source { font-size: 0.65rem; color: var(--accent-dark); }

/* ═══ FAQ ═══ */
.faq-section { position: relative; padding: 120px 0; background: var(--bg-alt); overflow: hidden; }
.faq-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 3rem; flex-wrap: wrap; gap: 1rem; position: relative; z-index: 1; }
.faq-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(1.8rem, 4vw, 3.5rem); line-height: 1.1;
}
.faq-contact-link {
  display: inline-flex; align-items: center; gap: 0.5rem;
  border: 1px solid rgba(107,58,46,0.2); padding: 1rem 1.5rem;
  font-size: 0.68rem; font-weight: 700; letter-spacing: 0.15em;
  text-transform: uppercase; color: var(--wine); text-decoration: none;
  transition: all 0.3s ease;
}
.faq-contact-link:hover { border-color: var(--accent); color: var(--accent-dark); }
.faq-grid { position: relative; z-index: 1; max-width: 900px; }
.faq-item { border-bottom: 1px solid rgba(107,58,46,0.06); }
.faq-question {
  width: 100%; display: flex; justify-content: space-between; align-items: flex-start;
  gap: 1.5rem; padding: 1.5rem 0; background: none; border: none; cursor: pointer;
  text-align: left; font-size: 1rem; font-weight: 500; color: var(--text);
  transition: color 0.3s ease; font-family: 'Inter', sans-serif;
}
.faq-question:hover { color: var(--wine); }
.faq-icon { font-size: 1.2rem; opacity: 0.35; transition: opacity 0.3s ease; }
.faq-item.open .faq-icon { opacity: 1; }
.faq-answer { padding-bottom: 1.5rem; }
.faq-answer p { color: var(--text-light); line-height: 1.7; margin: 0; font-weight: 300; }

/* ═══ CUSTOM SECTION (seções adicionadas pelo admin) ═══ */
.custom-section { position: relative; padding: 120px 0; overflow: hidden; }
.custom-title {
  font-family: 'Playfair Display', serif; font-size: clamp(1.8rem, 4vw, 3rem);
  line-height: 1.1; margin-bottom: 3rem; color: var(--wine);
}
.custom-card {
  background: var(--bg-alt); border-radius: 18px; padding: 2rem;
  border: 1px solid rgba(201,168,130,0.15); transition: all 0.3s ease;
}
.custom-card:hover { transform: translateY(-4px); box-shadow: 0 12px 30px rgba(93,78,55,0.1); }
.custom-card__icon {
  width: 52px; height: 52px; border-radius: 14px; margin-bottom: 1.2rem;
  background: var(--wine); color: #F8F4F0; display: flex; align-items: center; justify-content: center;
  font-size: 1.4rem;
}
.custom-card__title { font-family: 'Playfair Display', serif; font-size: 1.3rem; color: var(--wine); margin-bottom: 0.6rem; }
.custom-card__text { color: var(--text-light); line-height: 1.6; }
.custom-rich { max-width: 760px; margin: 0 auto; color: var(--text); line-height: 1.8; }
.custom-rich :deep(p) { margin-bottom: 1rem; }

/* ═══ RESPONSIVE ═══ */
@media (max-width: 991px) {
  .hero-container { flex-direction: column; align-items: center; text-align: center; }
  .hero-text-block { width: 100%; padding-bottom: 2rem; }
  .hero-visual { width: 100%; align-items: center; margin-top: 2rem; }
  .hero-portrait { max-width: 280px; height: 380px; }
  .hero-portrait-border { display: none; }
  .scroll-indicator { display: none; }
  .persp-row { flex-direction: column; }
  .persp-visual, .persp-content { width: 100%; }
  .persp-content { text-align: center; }
  .persp-bullet { text-align: left; }
  .approach-grid { grid-template-columns: 1fr; gap: 3rem; }
  .approach-intro { text-align: center; }
  .section-overflow-text { font-size: 6rem; right: -25%; }
}
@media (max-width: 576px) {
  .pillar-card { grid-template-columns: 1fr; text-align: center; }
  .pillar-header { flex-direction: row; justify-content: center; }
  .reviews-grid { grid-template-columns: 1fr; }
  .faq-header { flex-direction: column; align-items: flex-start; }
}
</style>
