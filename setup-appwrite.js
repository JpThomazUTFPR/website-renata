// Configuração
const ENDPOINT = 'https://sfo.cloud.appwrite.io/v1' // ALTERE para seu endpoint correto
const PROJECT_ID = '6a7a63bc002f7736c5d6'
const API_KEY = 'standard_0f7f6fd634a5286e2030a66e30ea79ba1b002c9bdbf23036403004c94050e13e82e474fe0a4e79cda27fd12fc053d1e675605d81e698c9b130a0204709784f80503aef34fb78fdfcb436f32d54613d418c66b692176240ea5e8351ba3b90b199648a74ae86182a058d855d832497dc5c3ab2b5a9739941966bebf5550f32dd4a'

// IDs que serão criados
const DATABASE_ID = 'main'
const COLLECTION_ID = 'site_content'
const BUCKET_ID = 'site_images'

console.log('🚀 Iniciando configuração automática do AppWrite...\n')

// Função helper para fazer requests à API
async function apiRequest(method, path, body = null) {
  const url = `${ENDPOINT}${path}`
  const headers = {
    'Content-Type': 'application/json',
    'X-Appwrite-Project': PROJECT_ID,
    'X-Appwrite-Key': API_KEY
  }

  const options = {
    method,
    headers
  }

  if (body) {
    options.body = JSON.stringify(body)
  }

  const response = await fetch(url, options)
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw { 
      code: response.status, 
      message: error.message || `HTTP ${response.status}`,
      ...error
    }
  }

  return response.json()
}

async function setupDatabase() {
  console.log('📦 1. Criando Database...')
  try {
    await apiRequest('POST', '/databases', {
      databaseId: DATABASE_ID,
      name: DATABASE_ID
    })
    console.log('   ✅ Database "main" criado com sucesso!\n')
  } catch (error) {
    if (error.code === 409) {
      console.log('   ℹ️  Database já existe, pulando...\n')
    } else {
      throw error
    }
  }
}

async function setupCollection() {
  console.log('📋 2. Criando Collection...')
  try {
    await apiRequest('POST', `/databases/${DATABASE_ID}/collections`, {
      collectionId: COLLECTION_ID,
      name: COLLECTION_ID,
      permissions: ['read("any")']
    })
    console.log('   ✅ Collection "site_content" criada com sucesso!\n')
  } catch (error) {
    if (error.code === 409) {
      console.log('   ℹ️  Collection já existe, pulando...\n')
    } else {
      throw error
    }
  }
}

async function setupAttribute() {
  console.log('🔧 3. Adicionando atributo "data"...')
  try {
    await apiRequest('POST', `/databases/${DATABASE_ID}/collections/${COLLECTION_ID}/attributes/string`, {
      key: 'data',
      size: 100000,
      required: true
    })
    console.log('   ✅ Atributo "data" adicionado com sucesso!\n')
  } catch (error) {
    if (error.code === 409) {
      console.log('   ℹ️  Atributo já existe, pulando...\n')
    } else {
      throw error
    }
  }
}

async function setupBucket() {
  console.log('🗂️  4. Criando Storage Bucket...')
  try {
    await apiRequest('POST', '/storage/buckets', {
      bucketId: BUCKET_ID,
      name: BUCKET_ID,
      permissions: ['read("any")'],
      enabled: true,
      maximumFileSize: 5242880, // 5MB
      allowedFileExtensions: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
      encryption: false
    })
    console.log('   ✅ Bucket "site_images" criado com sucesso!\n')
  } catch (error) {
    if (error.code === 409) {
      console.log('   ℹ️  Bucket já existe, pulando...\n')
    } else {
      throw error
    }
  }
}

async function main() {
  try {
    await setupDatabase()
    await setupCollection()
    await setupAttribute()
    await setupBucket()
    
    console.log('\n✨ Configuração concluída com sucesso!')
    console.log('\n📊 Resumo:')
    console.log(`   • Database: ${DATABASE_ID}`)
    console.log(`   • Collection: ${COLLECTION_ID}`)
    console.log(`   • Atributo: data (String, 100000, Required)`)
    console.log(`   • Bucket: ${BUCKET_ID}`)
    console.log('\n✅ Agora você pode usar o painel admin normalmente!')
    console.log('   Acesse: http://localhost:5173/login\n')
  } catch (error) {
    console.error('\n❌ Erro durante a configuração:')
    console.error(error.message)
    console.error('\n💡 Dicas:')
    console.error('   1. Verifique se o ENDPOINT está correto no script')
    console.error('   2. Verifique se a API_KEY é válida')
    console.error('   3. Verifique se o PROJECT_ID está correto')
    console.error('   4. Consulte SETUP_APPWRITE_COMPLETE.md para configuração manual\n')
    process.exit(1)
  }
}

main()
