import { Client, Account, Databases, Storage, ID } from 'appwrite'

const getEndpoint = () => {
  return import.meta.env.VITE_APPWRITE_ENDPOINT
}

const getProjectId = () => {
  return import.meta.env.VITE_APPWRITE_PROJECT_ID
}

const getProjectName = () => {
  return import.meta.env.VITE_APPWRITE_PROJECT_NAME
}

const getApiKey = () => {
  return import.meta.env.VITE_APPWRITE_API_KEY
}

const getDatabaseId = () => {
  return import.meta.env.VITE_APPWRITE_DATABASE_ID || 'main'
}

const getBucketId = () => {
  return import.meta.env.VITE_APPWRITE_BUCKET_ID || 'site_images'
}

// Cliente configurado
const client = new Client()
  .setEndpoint(getEndpoint())
  .setProject(getProjectId())

// Nota: API Keys são usadas apenas no backend/servidor
// Para frontend, usamos autenticação de usuário ou permissões públicas
// A API Key no .env é mantida para referência futura

const account = new Account(client)
const databases = new Databases(client)
const storage = new Storage(client)

// IDs padrão
const DATABASE_ID = getDatabaseId()
const COLLECTION_ID = 'site_content'
const BUCKET_ID = getBucketId()

export { 
  client, 
  account, 
  databases, 
  storage, 
  getEndpoint, 
  getProjectName, 
  getProjectId,
  DATABASE_ID,
  COLLECTION_ID,
  BUCKET_ID,
  ID
}
