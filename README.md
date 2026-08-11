# Site Profissional - Dra. Renata Psicóloga

Um site moderno e responsivo para psicóloga, construído com Vue.js, Bootstrap e Appwrite.

## 🚀 Funcionalidades

- ✅ **Design Moderno**: Interface limpa e profissional com Bootstrap 5
- ✅ **Totalmente Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- ✅ **Painel Administrativo**: Gerencie todo o conteúdo do site sem precisar de código
- ✅ **Autenticação Segura**: Login protegido para área administrativa
- ✅ **Conteúdo Dinâmico**: Todos os textos, imagens e informações são editáveis
- ✅ **Integração Google Calendar**: Agendamento online integrado
- ✅ **Botão WhatsApp**: Botão flutuante para contato rápido
- ✅ **Appwrite Backend**: Database, Storage e Auth gerenciados pelo Appwrite
- ✅ **SEO Friendly**: Estrutura otimizada para motores de busca

## 📋 Pré-requisitos

- Node.js 16+ 
- npm ou yarn
- Conta no Appwrite (https://cloud.appwrite.io)

## 🛠️ Instalação

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar Appwrite

Siga as instruções detalhadas em `APPWRITE_SETUP.md` para:
- Criar database e collection
- Configurar bucket de storage
- Criar usuário admin
- Atualizar variáveis de ambiente

### 3. Configurar variáveis de ambiente

Edite o arquivo `.env`:

```env
VITE_APPWRITE_ENDPOINT=https://sfo.cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=seu_project_id
VITE_APPWRITE_PROJECT_NAME=Site Renata
VITE_APPWRITE_DATABASE_ID=seu_database_id
VITE_APPWRITE_BUCKET_ID=seu_bucket_id
```

### 4. Rodar o projeto

```bash
npm run dev
```

O site estará disponível em: http://localhost:5173

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Navbar.vue      # Barra de navegação
│   ├── Footer.vue      # Rodapé
│   └── WhatsAppButton.vue  # Botão flutuante do WhatsApp
├── views/              # Páginas do site
│   ├── HomeView.vue    # Página inicial
│   ├── AboutView.vue   # Página Sobre
│   ├── ServicesView.vue # Página de Serviços
│   ├── ContactView.vue # Página de Contato
│   ├── AdminView.vue   # Painel administrativo
│   └── LoginView.vue   # Página de login
├── stores/             # Stores do Pinia
│   ├── auth.js         # Gerenciamento de autenticação
│   └── content.js      # Gerenciamento de conteúdo
├── lib/
│   └── appwrite.js     # Configuração do Appwrite
├── main.js             # Ponto de entrada da aplicação
└── App.vue             # Componente raiz
```

## 🎨 Personalização

### Acessando o Painel Admin

1. Acesse: http://localhost:5173/login
2. Faça login com as credenciais criadas no Appwrite
3. Navegue pelas abas para editar:
   - **Página Inicial**: Título, subtítulo e imagem
   - **Sobre**: Texto e foto de perfil
   - **Serviços**: Adicionar/remover serviços e preços
   - **Contato**: Telefone, email, endereço, WhatsApp e Google Calendar

### Alterar Cores e Estilos

Edite os arquivos CSS nos componentes ou adicione estilos globais em `App.vue`.

### Trocar Imagens

Use o upload de imagens no painel admin ou substitua as URLs diretamente no código.

## 📱 Seções do Site

### 1. Home
- Hero section com call-to-action
- Cards de diferenciais
- Seção de convite para contato

### 2. Sobre
- Foto e biografia
- Formação e credenciais
- Abordagem terapêutica
- Valores profissionais

### 3. Serviços
- Lista de serviços oferecidos
- Preços
- FAQ (Perguntas Frequentes)

### 4. Contato
- Formulário de contato
- Informações de contato
- Integração Google Calendar
- Mapa de localização
- Botão WhatsApp

## 🔐 Segurança

- Autenticação via Appwrite Auth
- Rotas protegidas para área admin
- Sessions seguras
- Dados armazenados no Appwrite Database

## 📊 Google Calendar

Para configurar a agenda:

1. Crie um calendário no Google Calendar
2. Torne-o público (apenas eventos livres/ocupados)
3. Copie o URL de incorporação
4. Cole no painel admin em "Contato"

## 🚀 Deploy

### Build para produção

```bash
npm run build
```

Os arquivos estarão na pasta `dist/`.

### Hospedagem sugerida

- **Vercel**: https://vercel.com
- **Netlify**: https://netlify.com
- **GitHub Pages**: Gratuito
- **Hostinger**: Pago, com domínio próprio

## 📝 Notas Importantes

- Mantenha o arquivo `.env` seguro e nunca commite no Git
- Faça backup regular dos dados no Appwrite
- Teste todas as funcionalidades antes de publicar
- Use senhas fortes para o usuário admin
- Atualize regularmente as dependências

## 🆘 Suporte

Para dúvidas sobre configuração do Appwrite, consulte:
- Documentação oficial: https://appwrite.io/docs
- Arquivo `APPWRITE_SETUP.md` neste repositório

## 📄 Licença

Este projeto é privado e destinado ao uso exclusivo da Dra. Renata.

---

Desenvolvido com ❤️ usando Vue.js, Bootstrap e Appwrite