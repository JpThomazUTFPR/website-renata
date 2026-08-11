# Guia Completo - Site Dra. Renata (Psicóloga)

## 🔐 Credenciais de Acesso ao Painel Admin

> **Importante:** Crie primeiro o usuário no Appwrite Console (passo 4 abaixo).

- **URL de Login:** http://localhost:5173/login (ou `seudominio.com/login`)
- **E-mail:** O e-mail que você cadastrar no Appwrite (ex: `admin@drarenata.com.br`)
- **Senha:** A senha que você definir no Appwrite Auth

---

## 📋 Passo a Passo para Configuração

### 1. Acessar Appwrite Console
- Acesse: https://cloud.appwrite.io
- Selecione o projeto **"Site Renata"** (ID: `6a7a63bc002f7736c5d6`)

### 2. Criar Database
1. Vá em **Databases** > **Create Database**
2. Nome: `main`
3. Anote o Database ID

### 3. Criar Collection `site_content`
1. Dentro do database, clique em **Create Collection**
2. Nome: `site_content`
3. Adicione os atributos:
   - `type` (String, Required, Size: 50)
   - `title` (String, Size: 255)
   - `subtitle` (String, Size: 500)
   - `description` (String, Size: 5000)
   - `content` (String, Size: 10000)
   - `price` (String, Size: 100)
   - `image_url` (String, Size: 500)
   - `phone` (String, Size: 50)
   - `email` (String, Size: 255)
   - `address` (String, Size: 500)
   - `whatsapp_number` (String, Size: 50)
   - `calendar_url` (String, Size: 500)
   - `data` (String, Size: 10000)

### 4. Criar Usuário Admin
1. Vá em **Auth** > **Create User**
2. Preencha:
   - **Email:** `admin@drarenata.com.br`
   - **Password:** `Renata@2026!` (escolha uma senha forte)
   - **Name:** `Administrador`
3. Clique em **Create**

### 5. Configurar Storage (para imagens)
1. Vá em **Storage** > **Create Bucket**
2. Nome: `site_images`
3. Permissões: File-level security
4. Anote o Bucket ID

### 6. Atualizar `.env`
```env
VITE_APPWRITE_ENDPOINT=https://sfo.cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=6a7a63bc002f7736c5d6
VITE_APPWRITE_PROJECT_NAME=Site Renata
VITE_APPWRITE_DATABASE_ID=<SEU_DATABASE_ID>
VITE_APPWRITE_BUCKET_ID=<SEU_BUCKET_ID>
```

---

## 🚀 Como Subir para Deploy (Produção)

### Opção 1: Vercel (Recomendado - Grátis)

1. Acesse: https://vercel.com
2. Faça login com GitHub
3. Clique em **New Project**
4. Importe o repositório do site
5. Em **Build and Output Settings**:
   - Framework: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Em **Environment Variables**, adicione as variáveis do `.env`
7. Clique **Deploy**

O site ficará em: `https://site-renata.vercel.app`

### Opção 2: Netlify (Grátis)

1. Acesse: https://netlify.com
2. Clique em **Add new site** > **Import an existing project**
3. Conecte o GitHub
4. Build Command: `npm run build`
5. Publish Directory: `dist`
6. Adicione as variáveis de ambiente
7. Deploy

### Opção 3: Build Manual e Upload

```bash
npm run build
```

Os arquivos da pasta `dist/` podem ser hospedados em qualquer servidor (Hostinger, HostGator, etc.)

---

## 📱 Personalizando o Site

### Acessar Painel Admin
1. Acesse `http://localhost:5173/login`
2. Faça login com as credenciais criadas
3. Edite:
   - Textos da página inicial
   - Informações "Sobre"
   - Serviços e preços
   - Dados de contato
   - WhatsApp e redes sociais
   - URL do Google Calendar

### Configurar Agenda (Google Calendar)
1. Crie um calendário público no Google Calendar
2. Vá em **Configurações** > **Integrar calendário**
3. Copie o URL público de incorporação
4. Cole no painel admin em "Contato" > "URL do Google Calendar"

### Personalizar Número do WhatsApp
Edite o arquivo `.env` ou os componentes para alterar o número `5511999999999` para o número real.

---

## 🎨 Paleta de Cores
- Fundo: `#F8F4F0` (bege claro)
- Fundo alternativo: `#EDE8E1`
- Destaque: `#C9A882` (dourado rosé)
- Texto: `#5D4E37` (marrom escuro)
- Botões: `#B8956A` (dourado)

---

## 📝 Notas Importantes
- Mantenha o `.env` fora do Git (já está no `.gitignore`)
- Faça backup dos dados no Appwrite
- Use senhas fortes
- Teste todas as funcionalidades antes de publicar
- Para domínio próprio, configure o DNS apontando para Vercel/Netlify

