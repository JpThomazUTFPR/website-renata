import { defineStore } from 'pinia'
import { ref } from 'vue'

// Armazenamento local — não depende do Appwrite para funcionar.
// Assim o painel admin funciona mesmo sem o banco de dados configurado.
const STORAGE_KEY = 'dra_renata_site_content_v1'

const defaultContent = {
  // ─── Identidade do site ───
  site: {
    name: 'Dra. Renata',
    tagline: 'Cuidando da sua saúde mental com profissionalismo e empatia.',
    crp: 'XX/XXXXX',
    location: 'São Paulo, SP',
    locationDesc: 'Atendimento presencial em São Paulo e online para todo o Brasil.',
    whatsappNumber: '5511999999999',
  },

  // ─── Navbar ───
  navbar: {
    brand: 'Dra. Renata',
    items: [
      { id: 'sobre', label: 'SOBRE MIM', target: 'sobre' },
      { id: 'diferenciais', label: 'DIFERENCIAIS', target: 'diferenciais' },
      { id: 'agenda', label: 'AGENDA', target: 'agenda' },
      { id: 'depoimentos', label: 'DEPOIMENTOS', target: 'depoimentos' },
    ],
    ctaLabel: 'AGENDAR',
  },

  // ─── Hero (sempre visível) ───
  hero: {
    titleLine1: 'Um atendimento',
    titleLine2: 'psicológico empático',
    titleLine3: 'faz toda a diferença na sua vida.',
    ctaLabel: 'Agendar consulta',
    image: '',
  },

  // ─── Seções da home (editáveis, ativáveis e extensíveis) ───
  sections: [
    {
      id: 'sobre',
      type: 'perspective',
      title: 'ACOLHIMENTO',
      enabled: true,
      content: {
        label: 'Perspectiva & Cuidado',
        heading: 'Você já considerou ou precisou buscar ajuda <span class="accent">psicológica?</span>',
        image: 'https://images.unsplash.com/photo-1590650151155-3b62c5a0c7c1?w=600&h=750&fit=crop',
        bullets: [
          'Você pode apresentar resistência para agendar consulta, principalmente pela primeira vez. <strong>Não desista.</strong>',
          'Falar sobre seus sentimentos pode ser desconfortável no início.',
          'A decisão na busca por ajuda pode precisar de tempo de amadurecimento.',
          'Procurar um profissional especialista e <strong>empático</strong> faz toda a diferença.',
        ],
        conclusion: 'O importante é dar o primeiro passo para autorreflexão e <span class="accent">abertura de possibilidades.</span>',
      },
    },
    {
      id: 'diferenciais',
      type: 'approach',
      title: 'DIFERENCIAIS',
      enabled: true,
      content: {
        label: 'O Diferencial',
        heading: 'Um cuidado focado <span class="accent">na sua trajetória.</span>',
        intro: 'Meu acompanhamento vai muito além da escuta. Alio conhecimento científico atualizado e empatia verdadeira para cuidar da sua saúde emocional por inteiro.',
        pillars: [
          { icon: 'bi bi-clock', title: 'Atenção sem pressa', desc: 'Sessões com tempo adequado para explorar com profundidade suas questões, impactando em um processo terapêutico mais assertivo.' },
          { icon: 'bi bi-person-heart', title: 'Foco no indivíduo', desc: 'Abordagem personalizada que se ajusta às particularidades e necessidades de cada pessoa, respeitando sua história.' },
          { icon: 'bi bi-shield-heart', title: 'Espaço livre de julgamentos', desc: 'Ambiente seguro e acolhedor onde você pode se expressar livremente, sem medo de preconceitos ou rótulos.' },
        ],
      },
    },
    {
      id: 'agenda',
      type: 'schedule',
      title: 'AGENDA',
      enabled: true,
      content: {
        label: 'Agende Sua Consulta',
        heading: 'Escolha o melhor <span class="accent">horário para você.</span>',
        description: 'Veja os horários disponíveis e agende diretamente pelo WhatsApp.',
        calendarUrl: 'https://calendar.google.com/calendar/embed?src=seu-email%40gmail.com&ctz=America%2FSao_Paulo',
      },
    },
    {
      id: 'depoimentos',
      type: 'reviews',
      title: 'DEPOIMENTOS',
      enabled: true,
      content: {
        label: 'Experiência & Cuidado',
        heading: 'Relatos de <span class="accent">quem já passou</span> por aqui.',
        rating: '5.0 / 5.0',
        reviews: [
          { name: 'Ana Paula', text: 'Dra. Renata é uma excelente profissional. Muito atenciosa, competente e humana. Me ajudou muito em um momento difícil. Recomendo de olhos fechados!' },
          { name: 'Mariana Costa', text: 'Profissional maravilhosa! Muito humana, acolhedora e assertiva. Me sinto muito segura com o processo terapêutico.' },
          { name: 'Fernanda Santos', text: 'A melhor psicóloga que já passei. Extremamente competente e atualizada. O atendimento é diferenciado desde o primeiro contato.' },
        ],
      },
    },
    {
      id: 'faq',
      type: 'faq',
      title: 'FAQ',
      enabled: true,
      content: {
        label: 'Dúvidas Frequentes',
        heading: 'Tudo o que você <span class="accent">precisa saber.</span>',
        faqs: [
          { q: 'Como funciona a primeira consulta?', a: 'A primeira consulta é um momento de acolhimento e escuta. Vamos conversar sobre o que te trouxe à terapia, sua história e expectativas. É um espaço seguro e sem julgamentos.' },
          { q: 'Quanto tempo dura cada sessão?', a: 'Cada sessão tem duração de 50 minutos, seguindo o padrão recomendado pelo Conselho Federal de Psicologia.' },
          { q: 'Com que frequência devo fazer terapia?', a: 'Recomendo sessões semanais no início do processo. Com o tempo, podemos ajustar para quinzenal conforme sua evolução e necessidade.' },
          { q: 'A terapia online é eficaz?', a: 'Sim! Estudos científicos comprovam que a terapia online tem a mesma eficácia que a presencial para a maioria dos casos, com a vantagem da comodidade.' },
          { q: 'Como funciona o sigilo profissional?', a: 'Todo conteúdo das sessões é estritamente confidencial, conforme previsto no Código de Ética Profissional do Psicólogo. Seu sigilo é absoluto.' },
          { q: 'Atende convênio médico?', a: 'O atendimento é particular, mas emitimos nota fiscal para você solicitar reembolso junto ao seu convênio médico, se aplicável.' },
        ],
      },
    },
  ],

  // ─── Página Sobre ───
  about: {
    title: 'Sobre Mim',
    text: 'Psicóloga clínica com atendimento humanizado e acolhedor. Especialista em acompanhar adultos em processos de autoconhecimento e bem-estar emocional.',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&h=700&fit=crop',
    approachTitle: 'Minha Abordagem',
    approaches: [
      { icon: 'bi bi-brain', title: 'Terapia Cognitivo-Comportamental', desc: 'Trabalho com TCC, uma abordagem estruturada e baseada em evidências que ajuda a identificar e modificar padrões de pensamento e comportamento que causam sofrimento.' },
      { icon: 'bi bi-people', title: 'Atendimento Personalizado', desc: 'Cada pessoa é única. Por isso, adapto as técnicas terapêuticas às necessidades individuais, criando um plano de tratamento personalizado para cada paciente.' },
    ],
  },

  // ─── Página Serviços ───
  services: {
    title: 'Serviços',
    subtitle: 'Ofereço diferentes modalidades de atendimento para atender às suas necessidades.',
    faqTitle: 'Perguntas Frequentes',
    items: [
      { icon: 'bi bi-person', title: 'Terapia Individual', description: 'Atendimento personalizado focado nas suas necessidades específicas.', price: 'R$ 200/sessão', features: ['Sessões presenciais ou online', 'Acompanhamento contínuo', 'Plano terapêutico individual'] },
      { icon: 'bi bi-people', title: 'Terapia de Casal', description: 'Acompanhamento para fortalecer a comunicação e o vínculo do casal.', price: 'R$ 280/sessão', features: ['Mediação de conflitos', 'Melhora da comunicação', 'Ambiente seguro'] },
      { icon: 'bi bi-camera-video', title: 'Atendimento Online', description: 'Sessões por videochamada com a mesma qualidade do presencial.', price: 'R$ 200/sessão', features: ['Flexibilidade de horários', 'Atendimento nacional', 'Plataforma segura'] },
    ],
    faqs: [
      { question: 'Como agendar uma sessão?', answer: 'Entre em contato pelo WhatsApp ou preencha o formulário. Retornarei o mais breve possível para agendar.' },
      { question: 'Vocês atendem convênios?', answer: 'Atendimento particular com emissão de nota fiscal para reembolso.' },
    ],
  },

  // ─── Página Contato ───
  contact: {
    title: 'Entre em Contato',
    subtitle: 'Estou aqui para ajudar você. Escolha a melhor forma de contato.',
    phone: '(11) 99999-9999',
    email: 'contato@drarenata.com.br',
    address: 'Rua Exemplo, 123 - São Paulo, SP',
    hours: 'Segunda a Sexta: 8h às 20h\nSábado: 9h às 13h',
  },

  // ─── Rodapé ───
  footer: {
    ctaLabel: 'PRÓXIMO PASSO',
    ctaTitle: 'SUA SAÚDE MENTAL É PRIORIDADE.',
    ctaButton: 'Agendar consulta',
    social: [
      { name: 'Instagram', url: 'https://instagram.com/drarenata', icon: 'bi bi-instagram' },
      { name: 'YouTube', url: 'https://youtube.com/@drarenata', icon: 'bi bi-youtube' },
      { name: 'LinkedIn', url: 'https://linkedin.com/in/drarenata', icon: 'bi bi-linkedin' },
    ],
    nav: [
      { label: 'Sobre Mim', target: 'sobre' },
      { label: 'Diferenciais', target: 'diferenciais' },
      { label: 'Agenda', target: 'agenda' },
      { label: 'Depoimentos', target: 'depoimentos' },
    ],
  },
}

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj))
}

function loadInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      // Mescla com defaults para garantir que chaves novas existam
      return {
        site: { ...defaultContent.site, ...(parsed.site || {}) },
        navbar: {
          ...defaultContent.navbar,
          ...(parsed.navbar || {}),
          items: Array.isArray(parsed.navbar?.items) && parsed.navbar.items.length
            ? parsed.navbar.items
            : deepClone(defaultContent.navbar.items),
        },
        hero: { ...defaultContent.hero, ...(parsed.hero || {}) },
        sections: Array.isArray(parsed.sections) && parsed.sections.length
          ? parsed.sections
          : deepClone(defaultContent.sections),
        about: { ...defaultContent.about, ...(parsed.about || {}) },
        services: {
          ...defaultContent.services,
          ...(parsed.services || {}),
          items: Array.isArray(parsed.services?.items) && parsed.services.items.length
            ? parsed.services.items
            : deepClone(defaultContent.services.items),
          faqs: Array.isArray(parsed.services?.faqs) && parsed.services.faqs.length
            ? parsed.services.faqs
            : deepClone(defaultContent.services.faqs),
        },
        contact: { ...defaultContent.contact, ...(parsed.contact || {}) },
        footer: {
          ...defaultContent.footer,
          ...(parsed.footer || {}),
          social: Array.isArray(parsed.footer?.social) && parsed.footer.social.length
            ? parsed.footer.social
            : deepClone(defaultContent.footer.social),
          nav: Array.isArray(parsed.footer?.nav) && parsed.footer.nav.length
            ? parsed.footer.nav
            : deepClone(defaultContent.footer.nav),
        },
      }
    }
  } catch (e) {
    console.warn('Não foi possível ler o conteúdo salvo:', e)
  }
  return deepClone(defaultContent)
}

export const useContentStore = defineStore('content', () => {
  const content = ref(loadInitial())
  const loading = ref(false)
  const error = ref(null)

  function persist() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(content.value))
      return true
    } catch (e) {
      error.value = 'Falha ao salvar (o armazenamento pode estar cheio).'
      console.error(e)
      return false
    }
  }

  async function fetchContent() {
    loading.value = true
    error.value = null
    loading.value = false
    return content.value
  }

  // Salva um objeto inteiro (site, navbar, hero, about, services, contact, footer)
  async function updateContent(key, data) {
    try {
      if (content.value[key] !== undefined) {
        content.value[key] = deepClone(data)
      } else {
        content.value[key] = deepClone(data)
      }
      const ok = persist()
      return ok ? { success: true } : { success: false, error: error.value }
    } catch (err) {
      return { success: false, error: err.message }
    }
  }

  // Seções
  function getSection(id) {
    return content.value.sections.find((s) => s.id === id)
  }
  function updateSection(id, data) {
    const idx = content.value.sections.findIndex((s) => s.id === id)
    if (idx !== -1) {
      content.value.sections[idx] = { ...content.value.sections[idx], ...data }
      persist()
      return { success: true }
    }
    return { success: false, error: 'Seção não encontrada' }
  }
  function toggleSection(id, enabled) {
    const s = getSection(id)
    if (s) {
      s.enabled = enabled
      persist()
      return { success: true }
    }
    return { success: false, error: 'Seção não encontrada' }
  }
  function addSection(section) {
    content.value.sections.push(section)
    persist()
    return { success: true }
  }
  function removeSection(id) {
    const idx = content.value.sections.findIndex((s) => s.id === id)
    if (idx !== -1) {
      content.value.sections.splice(idx, 1)
      persist()
      return { success: true }
    }
    return { success: false, error: 'Seção não encontrada' }
  }
  function moveSection(id, dir) {
    const idx = content.value.sections.findIndex((s) => s.id === id)
    const swap = idx + dir
    if (idx !== -1 && swap >= 0 && swap < content.value.sections.length) {
      const arr = content.value.sections
      ;[arr[idx], arr[swap]] = [arr[swap], arr[idx]]
      persist()
      return { success: true }
    }
    return { success: false }
  }

  async function uploadImage(file) {
    return new Promise((resolve) => {
      if (!file) return resolve({ success: false, error: 'Nenhum arquivo selecionado.' })
      if (!file.type.startsWith('image/'))
        return resolve({ success: false, error: 'O arquivo precisa ser uma imagem.' })
      if (file.size > 2 * 1024 * 1024)
        return resolve({ success: false, error: 'Imagem muito grande (máx. 2MB).' })
      const reader = new FileReader()
      reader.onload = () => resolve({ success: true, url: reader.result })
      reader.onerror = () => resolve({ success: false, error: 'Falha ao ler o arquivo.' })
      reader.readAsDataURL(file)
    })
  }

  async function deleteImage() {
    return { success: true }
  }

  return {
    content,
    loading,
    error,
    fetchContent,
    updateContent,
    getSection,
    updateSection,
    toggleSection,
    addSection,
    removeSection,
    moveSection,
    uploadImage,
    deleteImage,
  }
})
