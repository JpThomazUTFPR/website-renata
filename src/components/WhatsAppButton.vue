<template>
  <div class="wa-wrapper wa-show">
    <div class="wa-tooltip">Agende sua consulta agora</div>
    <a :href="whatsappLink" target="_blank" rel="noopener noreferrer" class="wa-btn" aria-label="WhatsApp">
      <span class="wa-ring"></span>
      <span class="wa-ring"></span>
      <span class="wa-ring"></span>
      <span class="wa-dot"></span>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </a>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useContentStore } from '@/stores/content'

const contentStore = useContentStore()

const phoneNumber = computed(() => {
  return contentStore.content.site.whatsappNumber || '5511999999999'
})

const whatsappLink = computed(() => {
  const msg = encodeURIComponent('Olá Dra. Renata! Gostaria de agendar uma consulta.')
  return `https://wa.me/${phoneNumber.value}?text=${msg}`
})
</script>

<style scoped>
.wa-wrapper {
  position: fixed; bottom: 28px; right: 28px; z-index: 9999;
  display: flex; align-items: center; gap: 12px;
  opacity: 1; transform: translateY(0) scale(1); pointer-events: auto;
}
.wa-tooltip {
  background: #111; color: #fff; font-family: 'Inter', sans-serif;
  font-size: 13px; font-weight: 500; padding: 9px 14px; border-radius: 10px;
  white-space: nowrap; box-shadow: 0 4px 24px rgba(0,0,0,0.22);
  opacity: 0; transform: translateX(8px) scale(0.95);
  transition: opacity 0.22s ease, transform 0.22s ease; pointer-events: none;
}
.wa-tooltip::after {
  content: ""; position: absolute; left: 100%; top: 50%;
  transform: translateY(-50%); border: 6px solid transparent; border-left-color: #111;
}
.wa-wrapper:hover .wa-tooltip { opacity: 1; transform: translateX(0) scale(1); }
.wa-btn {
  position: relative; width: 60px; height: 60px; border-radius: 50%; border: none;
  cursor: pointer; background: linear-gradient(135deg, #25d366 0%, #128c7e 100%);
  color: #fff; display: flex; align-items: center; justify-content: center;
  box-shadow: 0 4px 15px rgba(37,211,102,0.45), 0 2px 6px rgba(0,0,0,0.18);
  transition: transform 0.25s cubic-bezier(.34,1.56,.64,1), box-shadow 0.25s ease;
  outline: none; text-decoration: none; flex-shrink: 0;
}
.wa-btn:hover { transform: scale(1.1) rotate(-4deg); box-shadow: 0 8px 28px rgba(37,211,102,0.55); }
.wa-ring {
  position: absolute; inset: 0; border-radius: 50%;
  background: rgba(37,211,102,0.35); animation: wa-pulse 2.4s ease-out infinite;
}
.wa-ring:nth-child(2) { animation-delay: 0.8s; }
.wa-ring:nth-child(3) { animation-delay: 1.6s; }
@keyframes wa-pulse {
  0% { transform: scale(1); opacity: 0.7; }
  100% { transform: scale(2.1); opacity: 0; }
}
.wa-dot {
  position: absolute; top: -2px; right: -2px; width: 14px; height: 14px;
  background: #ff3b30; border: 2px solid #fff; border-radius: 50%;
  animation: wa-dot-bounce 2.4s ease infinite;
}
@keyframes wa-dot-bounce {
  0%,100% { transform: scale(1); }
  40% { transform: scale(1.3); }
  60% { transform: scale(0.95); }
}
@media (max-width: 1023px) { .wa-wrapper { display: none !important; } }
</style>
