<template>
  <div class="login-view">
    <div class="container">
      <div class="row justify-content-center align-items-center min-vh-100">
        <div class="col-md-6 col-lg-4">
          <div class="card border-0 shadow-lg">
            <div class="card-body p-5">
              <div class="text-center mb-4">
                <i class="bi bi-shield-lock display-4 text-primary"></i>
                <h2 class="fw-bold mt-3">Área Administrativa</h2>
                <p class="text-muted">Faça login para gerenciar o conteúdo do site</p>
              </div>

              <form @submit.prevent="handleLogin">
                <div class="mb-3">
                  <label for="email" class="form-label">E-mail</label>
                  <input 
                    type="email" 
                    class="form-control form-control-lg" 
                    id="email" 
                    v-model="credentials.email"
                    required
                    placeholder="admin@exemplo.com"
                  >
                </div>

                <div class="mb-4">
                  <label for="password" class="form-label">Senha</label>
                  <input 
                    type="password" 
                    class="form-control form-control-lg" 
                    id="password" 
                    v-model="credentials.password"
                    required
                    placeholder="••••••••"
                  >
                </div>

                <button 
                  type="submit" 
                  class="btn btn-primary btn-lg w-100"
                  :disabled="loading"
                >
                  <span v-if="!loading">Entrar</span>
                  <span v-else>
                    <span class="spinner-border spinner-border-sm me-2"></span>
                    Entrando...
                  </span>
                </button>

                <div v-if="errorMessage" class="alert alert-danger mt-3">
                  {{ errorMessage }}
                </div>
              </form>

              <div class="text-center mt-4">
                <router-link to="/" class="text-decoration-none">
                  <i class="bi bi-arrow-left me-2"></i>
                  Voltar ao site
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const credentials = ref({
  email: '',
  password: '',
})

const loading = ref(false)
const errorMessage = ref('')

const handleLogin = async () => {
  loading.value = true
  errorMessage.value = ''

  try {
    const result = await authStore.login(credentials.value.email, credentials.value.password)
    
    if (result.success) {
      router.push('/admin')
    } else {
      errorMessage.value = result.error || 'E-mail ou senha incorretos'
    }
  } catch (error) {
    errorMessage.value = 'Erro ao fazer login. Tente novamente.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-view {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.card {
  border-radius: 16px;
}

.form-control:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 0.25rem rgba(102, 126, 234, 0.25);
}
</style>
