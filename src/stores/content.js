import { defineStore } from 'pinia'
import { ref } from 'vue'
import { databases, storage, DATABASE_ID, COLLECTION_ID, BUCKET_ID, ID } from '@/lib/appwrite'

// Armazenamento local como fallback com cache inteligente
const STORAGE_KEY = 'dra_renata_site_content_v3'
const CACHE_TIMESTAMP_KEY = 'dra_renata_cache_timestamp'
const CONTENT_DOC_ID = 'main_content' // ID fixo para o documento principal
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutos em milissegundos

const defaultContent = {
  // ─── Identidade do site ───
  site: {
    name: 'Dra. Renata',
    pageTitle: 'Dra. Renata - Psicóloga',
    favicon: '',
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
      { id: 'beneficios', label: 'BENEFÍCIOS', target: 'beneficios' },
      { id: 'servicos', label: 'SERVIÇOS', target: 'servicos' },
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
      id: 'beneficios',
      type: 'benefits',
      title: 'BENEFÍCIOS',
      enabled: true,
      content: {
        label: 'Por que fazer terapia?',
        heading: 'O que a terapia pode <span class="accent">fazer por você.</span>',
        intro: 'Cuidar da sua saúde mental é um ato de coragem e amor-próprio. Descubra como a psicoterapia pode transformar sua vida.',
        items: [
          { icon: 'bi bi-heart-pulse', title: 'Autoconhecimento', desc: 'Entenda seus pensamentos, emoções e comportamentos com mais clareza.' },
          { icon: 'bi bi-shield-check', title: 'Ferramentas para a vida', desc: 'Desenvolva estratégias práticas para lidar com desafios e situações de crise.' },
          { icon: 'bi bi-people', title: 'Relacionamentos saudáveis', desc: 'Melhore sua comunicação e fortaleça vínculos com quem você ama.' },
          { icon: 'bi bi-sun', title: 'Bem-estar duradouro', desc: 'Reduza ansiedade e estresse, conquistando mais equilíbrio e qualidade de vida.' },
          { icon: 'bi bi-compass', title: 'Tomada de decisões', desc: 'Aprenda a fazer escolhas alinhadas com seus valores e objetivos de vida.' },
          { icon: 'bi bi-emoji-smile', title: 'Autoestima fortalecida', desc: 'Construa uma relação mais positiva e compassiva consigo mesmo.' },
        ],
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
      id: 'servicos',
      type: 'services',
      title: 'SERVIÇOS',
      enabled: true,
      content: {
        label: 'Modalidades',
        heading: 'Ofereço diferentes <span class="accent">modalidades de atendimento.</span>',
        subtitle: 'Escolha a que melhor se adapta às suas necessidades.',
        items: [
          { icon: 'bi bi-person', title: 'Terapia Individual', description: 'Atendimento personalizado focado nas suas necessidades específicas.', price: 'R$ 200/sessão' },
          { icon: 'bi bi-people', title: 'Terapia de Casal', description: 'Acompanhamento para fortalecer a comunicação e o vínculo do casal.', price: 'R$ 280/sessão' },
          { icon: 'bi bi-camera-video', title: 'Atendimento Online', description: 'Sessões por videochamada com a mesma qualidade do presencial.', price: 'R$ 200/sessão' },
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
      id: 'sobre-mim',
      type: 'about-section',
      title: 'SOBRE MIM',
      enabled: true,
      content: {
        label: 'Conheça a Psicóloga',
        heading: 'Dra. Renata',
        text: 'Psicóloga clínica com atendimento humanizado e acolhedor. Especialista em acompanhar adultos em processos de autoconhecimento e bem-estar emocional. Minha missão é proporcionar um espaço seguro onde você possa se expressar livremente e encontrar o caminho para uma vida mais equilibrada.',
        image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&h=700&fit=crop',
        approachTitle: 'Minha Abordagem',
        approaches: [
          { icon: 'bi bi-brain', title: 'Terapia Cognitivo-Comportamental', desc: 'Trabalho com TCC, uma abordagem estruturada e baseada em evidências que ajuda a identificar e modificar padrões de pensamento e comportamento que causam sofrimento.' },
          { icon: 'bi bi-people', title: 'Atendimento Personalizado', desc: 'Cada pessoa é única. Por isso, adapto as técnicas terapêuticas às necessidades individuais, criando um plano de tratamento personalizado para cada paciente.' },
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
    ctaTitle: 'SUA SAÚDE MENTAL <span class="cta-accent">É PRIORIDADE</span>.',
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

// Carrega conteúdo do AppWrite ou localStorage como fallback
async function loadFromAppWrite() {
  try {
    const doc = await databases.getDocument(DATABASE_ID, COLLECTION_ID, CONTENT_DOC_ID)
    // O campo 'data' contém o JSON stringificado
    const parsed = typeof doc.data === 'string' ? JSON.parse(doc.data) : doc.data
    return parsed
  } catch (error) {
    console.warn('Não foi possível carregar do AppWrite, usando localStorage:', error.message)
    return null
  }
}

// Salva conteúdo no AppWrite
async function saveToAppWrite(data) {
  try {
    // Tenta atualizar documento existente
    try {
      const doc = await databases.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        CONTENT_DOC_ID,
        { data: JSON.stringify(data) }
      )
      console.log('Conteúdo salvo no AppWrite:', doc.$id)
      return { success: true }
    } catch (updateError) {
      // Se não existe (404), cria novo
      if (updateError.code === 404 || updateError.type === 'document_not_found') {
        const doc = await databases.createDocument(
          DATABASE_ID,
          COLLECTION_ID,
          CONTENT_DOC_ID,
          { data: JSON.stringify(data) }
        )
        console.log('Novo documento criado no AppWrite:', doc.$id)
        return { success: true }
      }
      throw updateError
    }
  } catch (error) {
    console.error('Erro ao salvar no AppWrite:', error)
    return { success: false, error: error.message }
  }
}

// Sistema de cache inteligente
function isCacheValid() {
  try {
    const timestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY)
    if (!timestamp) return false
    
    const cacheAge = Date.now() - parseInt(timestamp)
    return cacheAge < CACHE_DURATION
  } catch (e) {
    return false
  }
}

function updateCacheTimestamp() {
  try {
    localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString())
  } catch (e) {
    console.warn('Não foi possível atualizar timestamp do cache:', e)
  }
}

function clearCache() {
  try {
    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem(CACHE_TIMESTAMP_KEY)
  } catch (e) {
    console.warn('Não foi possível limpar cache:', e)
  }
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

  // Inicializa carregando do AppWrite se disponível (com cache inteligente)
  async function init(forceRefresh = false) {
    loading.value = true
    try {
      // Se não for refresh forçado e o cache estiver válido, usa cache
      if (!forceRefresh && isCacheValid()) {
        console.log('Usando cache local (válido)')
        const cachedData = loadInitial()
        content.value = deepClone(cachedData)
        loading.value = false
        return
      }

      // Cache inválido ou refresh forçado - busca do AppWrite
      console.log('Buscando dados atualizados do AppWrite...')
      const appwriteData = await loadFromAppWrite()
      
      if (appwriteData) {
        content.value = deepClone(appwriteData)
        persist() // Atualiza cache local
        updateCacheTimestamp() // Atualiza timestamp
      } else {
        console.log('Usando dados do localStorage como fallback')
      }
    } catch (err) {
      console.error('Erro ao inicializar:', err)
      error.value = 'Erro ao carregar dados'
    } finally {
      loading.value = false
    }
  }

  function persist() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(content.value))
      return true
    } catch (e) {
      error.value = 'Falha ao salvar localmente (o armazenamento pode estar cheio).'
      console.error(e)
      return false
    }
  }

  async function fetchContent() {
    loading.value = true
    error.value = null
    try {
      await init()
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
    return content.value
  }

  // Salva um objeto inteiro (site, navbar, hero, about, services, contact, footer) no AppWrite
  async function updateContent(key, data) {
    try {
      if (content.value[key] !== undefined) {
        content.value[key] = deepClone(data)
      } else {
        content.value[key] = deepClone(data)
      }
      
      // Salva localmente primeiro (fallback)
      persist()
      updateCacheTimestamp() // Atualiza timestamp do cache
      
      // Tenta salvar no AppWrite
      const result = await saveToAppWrite(content.value)
      
      if (!result.success) {
        error.value = result.error || 'Falha ao salvar no AppWrite'
        console.warn('Salvo apenas localmente:', result.error)
      } else {
        console.log('Conteúdo salvo no AppWrite e cache atualizado')
      }
      
      return result
    } catch (err) {
      error.value = err.message
      return { success: false, error: err.message }
    }
  }

  // Seções
  function getSection(id) {
    return content.value.sections.find((s) => s.id === id)
  }
  
  async function updateSection(id, data) {
    const idx = content.value.sections.findIndex((s) => s.id === id)
    if (idx !== -1) {
      content.value.sections[idx] = { ...content.value.sections[idx], ...data }
      persist()
      
      // Salva no AppWrite
      const result = await saveToAppWrite(content.value)
      if (!result.success) {
        console.warn('Seção atualizada localmente, mas falha ao salvar no AppWrite:', result.error)
      }
      
      return { success: true }
    }
    return { success: false, error: 'Seção não encontrada' }
  }
  
  async function toggleSection(id, enabled) {
    const s = getSection(id)
    if (s) {
      s.enabled = enabled
      persist()
      
      // Salva no AppWrite
      const result = await saveToAppWrite(content.value)
      if (!result.success) {
        console.warn('Seção alternada localmente, mas falha ao salvar no AppWrite:', result.error)
      }
      
      return { success: true }
    }
    return { success: false, error: 'Seção não encontrada' }
  }
  
  async function addSection(section) {
    content.value.sections.push(section)
    persist()
    
    // Salva no AppWrite
    const result = await saveToAppWrite(content.value)
    if (!result.success) {
      console.warn('Seção adicionada localmente, mas falha ao salvar no AppWrite:', result.error)
    }
    
    return { success: true }
  }
  
  async function removeSection(id) {
    const idx = content.value.sections.findIndex((s) => s.id === id)
    if (idx !== -1) {
      content.value.sections.splice(idx, 1)
      persist()
      
      // Salva no AppWrite
      const result = await saveToAppWrite(content.value)
      if (!result.success) {
        console.warn('Seção removida localmente, mas falha ao salvar no AppWrite:', result.error)
      }
      
      return { success: true }
    }
    return { success: false, error: 'Seção não encontrada' }
  }
  
  async function moveSection(id, dir) {
    const idx = content.value.sections.findIndex((s) => s.id === id)
    const swap = idx + dir
    if (idx !== -1 && swap >= 0 && swap < content.value.sections.length) {
      const arr = content.value.sections
      ;[arr[idx], arr[swap]] = [arr[swap], arr[idx]]
      persist()
      
      // Salva no AppWrite
      const result = await saveToAppWrite(content.value)
      if (!result.success) {
        console.warn('Seção movida localmente, mas falha ao salvar no AppWrite:', result.error)
      }
      
      return { success: true }
    }
    return { success: false }
  }

  async function uploadImage(file) {
    try {
      if (!file) return { success: false, error: 'Nenhum arquivo selecionado.' }
      if (!file.type.startsWith('image/'))
        return { success: false, error: 'O arquivo precisa ser uma imagem.' }
      if (file.size > 5 * 1024 * 1024)
        return { success: false, error: 'Imagem muito grande (máx. 5MB).' }

      // Tenta fazer upload para o AppWrite Storage
      try {
        const uploadedFile = await storage.createFile(
          BUCKET_ID,
          ID.unique(),
          file
        )
        
        // Obtém URL da imagem
        const imageUrl = storage.getFileView(BUCKET_ID, uploadedFile.$id)
        
        console.log('Imagem enviada para AppWrite:', uploadedFile.$id)
        return { success: true, url: imageUrl, fileId: uploadedFile.$id }
      } catch (storageError) {
        console.warn('Falha ao enviar para AppWrite Storage, usando base64:', storageError.message)
        
        // Fallback: converte para base64
        return new Promise((resolve) => {
          const reader = new FileReader()
          reader.onload = () => resolve({ success: true, url: reader.result })
          reader.onerror = () => resolve({ success: false, error: 'Falha ao ler o arquivo.' })
          reader.readAsDataURL(file)
        })
      }
    } catch (err) {
      return { success: false, error: err.message }
    }
  }

  async function deleteImage(fileId) {
    try {
      if (fileId) {
        await storage.deleteFile(BUCKET_ID, fileId)
        console.log('Imagem deletada do AppWrite:', fileId)
      }
      return { success: true }
    } catch (error) {
      console.warn('Falha ao deletar imagem do AppWrite:', error.message)
      return { success: true } // Não falha se não conseguir deletar
    }
  }

  // Força refresh do cache (útil após edições no admin)
  async function refreshCache() {
    console.log('Forçando refresh do cache...')
    clearCache()
    await init(true) // forceRefresh = true
  }

  return {
    content,
    loading,
    error,
    init,
    refreshCache,
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
