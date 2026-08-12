// Script para popular dados iniciais usando o SDK do AppWrite
import { Client, Databases } from 'appwrite'

const ENDPOINT = 'https://sfo.cloud.appwrite.io/v1'
const PROJECT_ID = '6a7a63bc002f7736c5d6'
const API_KEY = 'standard_0f7f6fd634a5286e2030a66e30ea79ba1b002c9bdbf23036403004c94050e13e82e474fe0a4e79cda27fd12fc053d1e675605d81e698c9b130a0204709784f80503aef34fb78fdfcb436f32d54613d418c66b692176240ea5e8351ba3b90b199648a74ae86182a058d855d832497dc5c3ab2b5a9739941966bebf5550f32dd4a'

const DATABASE_ID = 'main'
const COLLECTION_ID = 'site_content'
const CONTENT_DOC_ID = 'main_content' // Mesmo ID usado no content.js

console.log('🚀 Populando dados iniciais com SDK...\n')

const client = new Client()
client.setEndpoint(ENDPOINT).setProject(PROJECT_ID)

const databases = new Databases(client)

// Adicionar chave via headers para requests de admin
client.headers['X-Appwrite-Key'] = API_KEY

const initialContent = {
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
  hero: {
    titleLine1: 'Um atendimento',
    titleLine2: 'psicológico empático',
    titleLine3: 'faz toda a diferença na sua vida.',
    ctaLabel: 'Agendar consulta',
    image: ''
  },
  sections: [
    {
      id: 'section-about',
      type: 'about-section',
      title: 'Sobre Mim',
      enabled: true,
      content: {
        label: 'Quem sou eu',
        heading: 'Dra. Renata Silva',
        bio: 'Psicóloga clínica com mais de 10 anos de experiência em terapia cognitivo-comportamental. Especialista em ansiedade, depressão e relacionamentos.',
        photo: '',
        credentials: [
          'CRP 06/123456',
          'Especialista em TCC',
          'Mestre em Psicologia Clínica'
        ]
      }
    },
    {
      id: 'section-schedule',
      type: 'schedule',
      title: 'Agenda',
      enabled: true,
      content: {
        label: 'Agende Sua Consulta',
        heading: 'Escolha o melhor <span class="accent">horário para você.</span>',
        description: 'Veja os horários disponíveis e agende diretamente pelo WhatsApp.',
        schedule: {
          hours: { start: 9, end: 22, interval: 1 },
          availability: {
            seg: [9, 10, 11, 14, 15, 16],
            ter: [9, 10, 11, 14, 15, 16, 17],
            qua: [9, 10, 11, 14, 15],
            qui: [9, 10, 11, 14, 15, 16, 17],
            sex: [9, 10, 11, 14, 15]
          }
        }
      }
    },
    {
      id: 'section-benefits',
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
      id: 'section-reviews',
      type: 'reviews',
      title: 'Depoimentos',
      enabled: true,
      content: {
        label: 'Depoimentos',
        heading: 'O que dizem meus <span class="accent">pacientes.</span>',
        rating: '5.0',
        reviews: [
          { name: 'Maria S.', text: 'A Dra. Renata me ajudou muito a superar minha ansiedade. Profissional incrível!' },
          { name: 'João P.', text: 'Atendimento humanizado e muito competente. Recomendo!' }
        ]
      }
    },
    {
      id: 'section-services',
      type: 'services',
      title: 'Serviços',
      enabled: true,
      content: {
        label: 'Modalidades',
        heading: 'Ofereço diferentes <span class="accent">modalidades de atendimento.</span>',
        subtitle: 'Escolha a que melhor se adapta às suas necessidades.',
        items: [
          { icon: 'bi bi-person', title: 'Terapia Individual', description: 'Atendimento personalizado focado nas suas necessidades específicas.', price: 'R$ 200/sessão' },
          { icon: 'bi bi-people', title: 'Terapia de Casal', description: 'Acompanhamento para fortalecer a comunicação e o vínculo do casal.', price: 'R$ 280/sessão' },
          { icon: 'bi bi-camera-video', title: 'Atendimento Online', description: 'Sessões por videochamada com a mesma qualidade do presencial.', price: 'R$ 200/sessão' }
        ]
      }
    },
    {
      id: 'section-faq',
      type: 'faq',
      title: 'FAQ',
      enabled: true,
      content: {
        label: 'Dúvidas Frequentes',
        heading: 'Perguntas <span class="accent">frequentes.</span>',
        faqs: [
          { q: 'Como funciona a primeira consulta?', a: 'Na primeira sessão, fazemos uma avaliação inicial para entender suas necessidades e definir os objetivos do tratamento.' },
          { q: 'Vocês aceitam convênio?', a: 'Trabalhamos apenas com atendimento particular, mas emitimos recibo para reembolso junto ao seu convênio.' }
        ]
      }
    }
  ]
}

async function populateData() {
  console.log('📝 Criando documento inicial...')
  
  try {
    // Tenta atualizar primeiro
    try {
      const doc = await databases.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        CONTENT_DOC_ID,
        { data: JSON.stringify(initialContent) },
        ['read("any")', 'update("any")'] // Permissões públicas
      )
      console.log('   ✅ Documento atualizado:', doc.$id, '\n')
    } catch (updateError) {
      if (updateError.code === 404) {
        // Cria novo documento
        const doc = await databases.createDocument(
          DATABASE_ID,
          COLLECTION_ID,
          CONTENT_DOC_ID,
          { data: JSON.stringify(initialContent) },
          ['read("any")', 'update("any")'] // Permissões públicas
        )
        console.log('   ✅ Documento criado:', doc.$id, '\n')
      } else {
        throw updateError
      }
    }
  } catch (error) {
    console.error('   ❌ Erro:', error.message)
    throw error
  }
}

async function main() {
  try {
    await populateData()
    
    console.log('\n✨ Dados iniciais populados com sucesso!')
    console.log('\n📊 Resumo:')
    console.log('   • Seção "Sobre Mim" integrada')
    console.log('   • Agenda com horários configurados (Seg-Sex, 9h-17h)')
    console.log('   • Depoimentos iniciais')
    console.log('   • FAQ básico')
    console.log('\n✅ Acesse o painel admin para personalizar os dados!')
    console.log('   URL: http://localhost:5173/login\n')
  } catch (error) {
    console.error('\n❌ Erro ao popular dados:')
    console.error(error.message)
    console.error('\n💡 Verifique se o banco foi criado primeiro com setup-appwrite.js\n')
    process.exit(1)
  }
}

main()
