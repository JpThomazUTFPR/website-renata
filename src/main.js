import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import '@appwrite.io/pink-icons'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import App from './App.vue'

// Importar rotas (serão criadas)
import HomeView from './views/HomeView.vue'
import AboutView from './views/AboutView.vue'
import ServicesView from './views/ServicesView.vue'
import ContactView from './views/ContactView.vue'
import AdminView from './views/AdminView.vue'
import LoginView from './views/LoginView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/sobre', redirect: '/#sobre-mim' }, // Redireciona para seção na home
  { path: '/servicos', name: 'services', component: ServicesView },
  { path: '/contato', name: 'contact', component: ContactView },
  { path: '/admin', name: 'admin', component: AdminView, meta: { requiresAuth: true } },
  { path: '/login', name: 'login', component: LoginView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

// Guard de navegação para rotas protegidas
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('isAdminAuthenticated') === 'true'
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(pinia)
app.mount('#app')
