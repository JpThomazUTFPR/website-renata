<template>
  <div class="schedule-widget">
    <div class="schedule-header">
      <span class="section-label">{{ label }}</span>
      <h2 class="schedule-title" v-html="heading"></h2>
      <p class="schedule-description">{{ description }}</p>
    </div>

    <!-- Navegação de Semanas -->
    <div class="week-navigation">
      <button class="nav-btn" @click="previousWeek" :disabled="currentWeekIndex <= minWeekOffset">
        <i class="bi bi-chevron-left"></i> Semana Anterior
      </button>
      <div class="week-info">
        <span class="week-dates">{{ formatDateRange(currentWeekStart) }}</span>
      </div>
      <button class="nav-btn" @click="nextWeek" :disabled="currentWeekIndex >= maxWeekOffset">
        Próxima Semana <i class="bi bi-chevron-right"></i>
      </button>
    </div>

    <!-- Grid da Agenda -->
    <div class="schedule-grid">
      <div class="schedule-days-header">
        <div class="time-column"></div>
        <div v-for="(day, index) in weekDays" :key="day.key" class="day-column">
          <span class="day-name">{{ day.name }}</span>
          <span class="day-date">{{ getDayDate(index) }}</span>
        </div>
      </div>

      <div v-for="hour in availableHours" :key="hour" class="schedule-row">
        <div class="time-label">{{ formatHour(hour) }}</div>
        <div 
          v-for="(day, index) in weekDays" 
          :key="day.key"
          class="slot-cell"
          :class="{ 'available': isSlotAvailable(day.key, hour), 'loading': loadingBusySlots }"
          @click="isSlotAvailable(day.key, hour) ? bookSlot(day.name, hour, index) : null"
        >
          <div v-if="isSlotAvailable(day.key, hour)" class="slot-available">
            <i class="bi bi-check-circle"></i>
            <span class="slot-text">Agendar</span>
          </div>
          <div v-else class="slot-unavailable">
            <i class="bi bi-x-circle"></i>
            <span class="slot-text">Indisponível</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Legenda -->
    <div class="schedule-legend">
      <div class="legend-item">
        <div class="legend-dot available"></div>
        <span>Disponível</span>
      </div>
      <div class="legend-item">
        <div class="legend-dot unavailable"></div>
        <span>Indisponível</span>
      </div>
    </div>

    <!-- Status da sincronização com Google Calendar -->
    <div v-if="googleCalendarUrl" class="sync-status" :class="syncStatus">
      <template v-if="syncStatus === 'synced'">
        <i class="bi bi-cloud-check"></i> Sincronizado com Google Calendar
      </template>
      <template v-else-if="syncStatus === 'empty'">
        <i class="bi bi-cloud"></i> Google Calendar conectado (sem eventos esta semana)
      </template>
      <template v-else-if="syncStatus === 'loading'">
        <i class="bi bi-arrow-repeat spin"></i> Sincronizando...
      </template>
      <template v-else>
        <i class="bi bi-cloud-slash"></i> Google Calendar: verifique se o calendário está público
      </template>
    </div>

    <!-- CTA WhatsApp -->
    <div class="schedule-cta">
      <a :href="whatsappLink" target="_blank" class="hero-cta">
        <span><i class="bi bi-whatsapp me-2"></i>Agendar pelo WhatsApp</span>
        <div class="cta-icon"><svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg></div>
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useContentStore } from '@/stores/content'

const props = defineProps({
  section: { type: Object, required: true }
})

const contentStore = useContentStore()
const content = contentStore.content

const label = computed(() => props.section.content.label || 'Agende Sua Consulta')
const heading = computed(() => props.section.content.heading || 'Escolha o melhor <span class="accent">horário para você.</span>')
const description = computed(() => props.section.content.description || 'Veja os horários disponíveis e agende diretamente pelo WhatsApp.')

const scheduleConfig = computed(() => props.section.content.schedule || {
  hours: { start: 9, end: 22, interval: 1 },
  availability: {}
})

const googleCalendarUrl = computed(() => props.section.content.googleCalendarUrl || '')

const weekDays = [
  { key: 'seg', name: 'Segunda' },
  { key: 'ter', name: 'Terça' },
  { key: 'qua', name: 'Quarta' },
  { key: 'qui', name: 'Quinta' },
  { key: 'sex', name: 'Sexta' }
]

const availableHours = computed(() => {
  const { start, end, interval } = scheduleConfig.value.hours
  const hours = []
  for (let h = start; h <= end; h += interval) hours.push(h)
  return hours
})

const currentWeekIndex = ref(0)
const minWeekOffset = -2 // Permite voltar 2 semanas
const maxWeekOffset = 4  // Permite avançar 4 semanas
const googleBusySlots = ref([]) // Array de { start: Date, end: Date }
const loadingBusySlots = ref(false)
const syncStatus = ref('idle') // 'idle' | 'loading' | 'synced' | 'empty' | 'error'

const currentWeekStart = computed(() => {
  const today = new Date()
  const dayOfWeek = today.getDay()
  // Dias desde a última segunda (0=Dom→6, 1=Seg→0, 2=Ter→1, ...)
  const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1
  const monday = new Date(today)
  monday.setDate(today.getDate() - daysSinceMonday + (currentWeekIndex.value * 7))
  monday.setHours(0, 0, 0, 0)
  return monday
})

const currentWeekEnd = computed(() => {
  const end = new Date(currentWeekStart.value)
  end.setDate(end.getDate() + 7)
  return end
})

function getDayDate(dayIndex) {
  const date = new Date(currentWeekStart.value)
  date.setDate(date.getDate() + dayIndex)
  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
}

function formatDateRange(startDate) {
  const endDate = new Date(startDate)
  endDate.setDate(endDate.getDate() + 4)
  const startStr = startDate.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
  const endStr = endDate.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
  return `${startStr} - ${endStr}`
}

function previousWeek() {
  if (currentWeekIndex.value > minWeekOffset) currentWeekIndex.value--
}

function nextWeek() {
  if (currentWeekIndex.value < maxWeekOffset) currentWeekIndex.value++
}

// Verifica se o slot está disponível
// Com Google Calendar conectado: todos os horários livres, só bloqueia com evento
// Sem Google Calendar: usa checkboxes manuais do admin
function isSlotAvailable(dayKey, hour) {
  const isGoogleSynced = googleCalendarUrl.value && (syncStatus.value === 'synced' || syncStatus.value === 'empty')
  
  if (isGoogleSynced) {
    // Google Calendar manda: só fica indisponível se houver evento real
    return !isBlockedByGoogleEvent(dayKey, hour)
  }
  
  // Sem Google Calendar: disponível apenas se admin marcou nos checkboxes
  const availability = scheduleConfig.value.availability || {}
  const daySlots = availability[dayKey] || []
  return Array.isArray(daySlots) && daySlots.includes(hour)
}

// Extrai o email/ID do calendário de URLs do Google Calendar
// Suporta tanto embed URL quanto ICS URL direta
function extractCalendarId(url) {
  if (!url) return null
  
  // Se já for um ICS URL, extrai o path
  // Formato: https://calendar.google.com/calendar/ical/EMAIL/public/basic.ics
  const icsMatch = url.match(/\/ical\/(.+?)\/public\//)
  if (icsMatch) return decodeURIComponent(icsMatch[1])
  
  // Formato embed: https://calendar.google.com/calendar/embed?src=EMAIL&ctz=...
  const embedMatch = url.match(/src=([^&]+)/)
  if (embedMatch) return decodeURIComponent(embedMatch[1])
  
  // Se o input for email direto
  if (url.includes('@')) return url
  
  return null
}

// Busca eventos do Google Calendar via feed ICS público (proxy Vite)
async function fetchGoogleCalendarEvents() {
  const calendarUrl = googleCalendarUrl.value
  if (!calendarUrl) {
    googleBusySlots.value = []
    syncStatus.value = 'idle'
    return
  }

  const calendarId = extractCalendarId(calendarUrl)
  if (!calendarId) {
    googleBusySlots.value = []
    syncStatus.value = 'error'
    return
  }

  loadingBusySlots.value = true
  syncStatus.value = 'loading'
  
  try {
    // Usa o proxy do Vite para evitar CORS: /api/calendar-ics → calendar.google.com
    // Adiciona cache-buster para evitar cache do navegador/proxy
    const icsUrl = `/api/calendar-ics/calendar/ical/${calendarId}/public/basic.ics?_t=${Date.now()}`
    const response = await fetch(icsUrl, { cache: 'no-store' })
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }

    const icsText = await response.text()
    
    if (!icsText.includes('BEGIN:VCALENDAR')) {
      throw new Error('Resposta ICS inválida')
    }

    googleBusySlots.value = parseIcsEvents(icsText)
    
    if (googleBusySlots.value.length > 0) {
      syncStatus.value = 'synced'
      console.log(`ScheduleWidget: ${googleBusySlots.value.length} evento(s) do Google Calendar sincronizados`)
    } else {
      syncStatus.value = 'empty'
      console.log('ScheduleWidget: Google Calendar conectado, mas sem eventos no período visível')
    }
  } catch (err) {
    console.warn('ScheduleWidget: Falha ao sincronizar com Google Calendar:', err.message)
    googleBusySlots.value = []
    syncStatus.value = 'error'
  } finally {
    loadingBusySlots.value = false
  }
}

// Parser simples de ICS (iCalendar)
function parseIcsEvents(icsText) {
  const events = []
  const lines = icsText.split(/\r?\n/)
  
  let currentEvent = null
  let inEvent = false
  
  for (const line of lines) {
    if (line.startsWith('BEGIN:VEVENT')) {
      currentEvent = {}
      inEvent = true
    } else if (line.startsWith('END:VEVENT')) {
      if (currentEvent && currentEvent.start && currentEvent.end) {
        events.push({
          start: currentEvent.start,
          end: currentEvent.end
        })
      }
      currentEvent = null
      inEvent = false
    } else if (inEvent && currentEvent) {
      if (line.startsWith('DTSTART')) {
        currentEvent.start = parseIcsDate(line)
      } else if (line.startsWith('DTEND')) {
        currentEvent.end = parseIcsDate(line)
      }
    }
  }
  
  return events
}

// Converte data ICS para objeto Date
function parseIcsDate(line) {
  // Formato: DTSTART:20260817T140000Z ou DTSTART;TZID=America/Sao_Paulo:20260817T140000
  const valuePart = line.split(':').pop()
  if (!valuePart) return null
  
  const year = parseInt(valuePart.substring(0, 4))
  const month = parseInt(valuePart.substring(4, 6)) - 1
  const day = parseInt(valuePart.substring(6, 8))
  
  // Pode ter T ou não após a data
  const timePart = valuePart.length > 8 ? valuePart.substring(9) : '000000'
  const hour = parseInt(timePart.substring(0, 2))
  const minute = parseInt(timePart.substring(2, 4))
  const second = parseInt(timePart.substring(4, 6)) || 0
  
  const isUTC = line.endsWith('Z')
  
  if (isUTC) {
    return new Date(Date.UTC(year, month, day, hour, minute, second))
  } else {
    // Assume horário local (America/Sao_Paulo)
    return new Date(year, month, day, hour, minute, second)
  }
}

// Verifica se um slot específico está bloqueado por evento do Google
function isBlockedByGoogleEvent(dayKey, hour) {
  const dayIndex = weekDays.findIndex(d => d.key === dayKey)
  if (dayIndex === -1) return false
  
  const slotStart = new Date(currentWeekStart.value)
  slotStart.setDate(slotStart.getDate() + dayIndex)
  slotStart.setHours(hour, 0, 0, 0)
  
  const slotEnd = new Date(slotStart)
  slotEnd.setHours(hour + 1, 0, 0, 0)
  
  return googleBusySlots.value.some(event => {
    return slotStart < event.end && slotEnd > event.start
  })
}

// Recarrega eventos quando mudar de semana ou URL do calendário
watch([currentWeekIndex, googleCalendarUrl], () => {
  fetchGoogleCalendarEvents()
})

onMounted(() => {
  fetchGoogleCalendarEvents()
})

function formatHour(hour) {
  return `${String(hour).padStart(2, '0')}:00`
}

function bookSlot(dayName, hour, dayIndex) {
  const date = new Date(currentWeekStart.value)
  date.setDate(date.getDate() + dayIndex)
  const dateStr = date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
  const timeStr = formatHour(hour)
  const message = `Olá Dra. Renata! Gostaria de agendar uma consulta para ${dayName}, dia ${dateStr} às ${timeStr}.`
  const encodedMessage = encodeURIComponent(message)
  const whatsappNumber = content.site.whatsappNumber || '5511999999999'
  window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank')
}

const whatsappLink = computed(() => {
  const msg = encodeURIComponent('Olá Dra. Renata! Gostaria de agendar uma consulta.')
  const whatsappNumber = content.site.whatsappNumber || '5511999999999'
  return `https://wa.me/${whatsappNumber}?text=${msg}`
})
</script>

<style scoped>
.schedule-widget { position: relative; padding: 2rem 0; }
.schedule-header { text-align: center; margin-bottom: 2rem; }
.schedule-title { font-family: 'Playfair Display', serif; font-size: clamp(1.8rem, 4vw, 2.5rem); line-height: 1.2; margin: 1rem 0; color: var(--wine); }
.schedule-description { font-size: 1rem; color: var(--text-light); max-width: 600px; margin: 0 auto; }

.week-navigation { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; padding: 1rem; background: white; border-radius: 12px; box-shadow: 0 4px 15px rgba(93, 78, 55, 0.08); }
.nav-btn { padding: 0.6rem 1.2rem; border: 2px solid var(--wine); background: transparent; color: var(--wine); border-radius: 8px; cursor: pointer; font-weight: 600; transition: all 0.3s ease; }
.nav-btn:hover:not(:disabled) { background: var(--wine); color: white; }
.nav-btn:disabled { opacity: 0.4; cursor: not-allowed; }
.week-info { text-align: center; }
.week-dates { font-weight: 700; font-size: 1.1rem; color: var(--wine); }

.schedule-grid { background: white; border-radius: 18px; padding: 1.5rem; box-shadow: 0 8px 30px rgba(93, 78, 55, 0.08); overflow-x: auto; margin-bottom: 2rem; }
.schedule-days-header { display: grid; grid-template-columns: 80px repeat(5, 1fr); gap: 8px; margin-bottom: 12px; padding-bottom: 12px; border-bottom: 2px solid var(--bg); }
.time-column { display: flex; align-items: center; justify-content: center; font-weight: 600; color: var(--text-light); }
.day-column { text-align: center; padding: 0.5rem; background: var(--bg); border-radius: 8px; }
.day-name { display: block; font-weight: 700; font-size: 0.9rem; color: var(--wine); margin-bottom: 0.2rem; }
.day-date { display: block; font-size: 0.8rem; color: var(--text-light); }

.schedule-row { display: grid; grid-template-columns: 80px repeat(5, 1fr); gap: 8px; margin-bottom: 8px; }
.time-label { display: flex; align-items: center; justify-content: center; font-weight: 600; color: var(--text-light); font-size: 0.9rem; }

.slot-cell { position: relative; min-height: 60px; border-radius: 8px; cursor: pointer; transition: all 0.3s ease; display: flex; align-items: center; justify-content: center; }
.slot-cell.available { background: #E8F5E9; border: 2px solid #4CAF50; }
.slot-cell.available:hover { background: #C8E6C9; transform: scale(1.05); }
.slot-cell:not(.available) { background: #F5F5F5; border: 2px solid #E0E0E0; cursor: not-allowed; opacity: 0.6; }
.slot-cell.loading { opacity: 0.5; pointer-events: none; }

.slot-available, .slot-unavailable { display: flex; flex-direction: column; align-items: center; gap: 0.3rem; font-size: 0.75rem; }
.slot-available i, .slot-unavailable i { font-size: 1.2rem; }
.slot-available { color: #2E7D32; }
.slot-unavailable { color: #9E9E9E; }
.slot-text { font-weight: 600; }

.schedule-legend { display: flex; justify-content: center; gap: 2rem; margin-bottom: 2rem; flex-wrap: wrap; }
.legend-item { display: flex; align-items: center; gap: 0.5rem; font-size: 0.9rem; color: var(--text-light); }
.legend-dot { width: 16px; height: 16px; border-radius: 50%; }
.legend-dot.available { background: #4CAF50; }
.legend-dot.unavailable { background: #E0E0E0; }

.schedule-cta { display: flex; justify-content: center; margin-top: 2rem; }
.hero-cta { display: inline-flex; align-items: center; gap: 0.8rem; padding: 1rem 2rem; background: var(--wine); color: white; text-decoration: none; border-radius: 50px; font-weight: 600; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(107, 58, 46, 0.3); }
.hero-cta:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(107, 58, 46, 0.4); color: white; }
.cta-icon { display: flex; align-items: center; }

/* Sync status badge */
.sync-status {
  display: flex; align-items: center; justify-content: center; gap: 0.5rem;
  margin-top: 1.5rem; padding: 0.5rem 1.2rem; border-radius: 8px;
  font-size: 0.85rem; font-weight: 500;
}
.sync-status.synced { background: #E8F5E9; color: #2E7D32; }
.sync-status.empty { background: #FFF8E1; color: #F57F17; }
.sync-status.loading { background: #E3F2FD; color: #1565C0; }
.sync-status.error { background: #FFEBEE; color: #C62828; }
.sync-status.idle { display: none; }

.spin { animation: spin 1s linear infinite; }
@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
</style>
