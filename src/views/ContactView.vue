<template>
  <div class="contact-view">
    <!-- Hero Section -->
    <section class="contact-hero py-5 bg-light">
      <div class="container text-center">
        <h1 class="display-5 fw-bold mb-4">{{ contact.title }}</h1>
        <p class="lead">{{ contact.subtitle }}</p>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="py-5">
      <div class="container">
        <div class="row g-5">
          <!-- Contact Info -->
          <div class="col-lg-5">
            <h2 class="fw-bold mb-4">Informações de Contato</h2>

            <div class="contact-item mb-4">
              <div class="d-flex align-items-start">
                <i class="bi bi-telephone-fill text-primary fs-4 me-3"></i>
                <div>
                  <h5 class="fw-bold mb-1">Telefone / WhatsApp</h5>
                  <p class="text-muted mb-0">{{ contact.phone }}</p>
                </div>
              </div>
            </div>

            <div class="contact-item mb-4">
              <div class="d-flex align-items-start">
                <i class="bi bi-envelope-fill text-primary fs-4 me-3"></i>
                <div>
                  <h5 class="fw-bold mb-1">E-mail</h5>
                  <p class="text-muted mb-0">{{ contact.email }}</p>
                </div>
              </div>
            </div>

            <div class="contact-item mb-4">
              <div class="d-flex align-items-start">
                <i class="bi bi-geo-alt-fill text-primary fs-4 me-3"></i>
                <div>
                  <h5 class="fw-bold mb-1">Endereço</h5>
                  <p class="text-muted mb-0">{{ contact.address }}</p>
                </div>
              </div>
            </div>

            <div class="contact-item mb-4">
              <div class="d-flex align-items-start">
                <i class="bi bi-clock-fill text-primary fs-4 me-3"></i>
                <div>
                  <h5 class="fw-bold mb-1">Horário de Atendimento</h5>
                  <p class="text-muted mb-0" style="white-space: pre-line">{{ contact.hours }}</p>
                </div>
              </div>
            </div>

            <!-- WhatsApp Button -->
            <a
              :href="whatsappLink"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-success btn-lg w-100 mt-3"
            >
              <i class="bi bi-whatsapp me-2"></i>
              Falar pelo WhatsApp
            </a>
          </div>

          <!-- Contact Form -->
          <div class="col-lg-7">
            <div class="card border-0 shadow-sm">
              <div class="card-body p-4 p-md-5">
                <h2 class="fw-bold mb-4">Envie uma Mensagem</h2>
                
                <form @submit.prevent="handleSubmit">
                  <div class="mb-3">
                    <label for="name" class="form-label">Nome Completo</label>
                    <input 
                      type="text" 
                      class="form-control" 
                      id="name" 
                      v-model="form.name"
                      required
                      placeholder="Seu nome completo"
                    >
                  </div>

                  <div class="mb-3">
                    <label for="email" class="form-label">E-mail</label>
                    <input 
                      type="email" 
                      class="form-control" 
                      id="email" 
                      v-model="form.email"
                      required
                      placeholder="seu@email.com"
                    >
                  </div>

                  <div class="mb-3">
                    <label for="phone" class="form-label">Telefone</label>
                    <input 
                      type="tel" 
                      class="form-control" 
                      id="phone" 
                      v-model="form.phone"
                      placeholder="(11) 99999-9999"
                    >
                  </div>

                  <div class="mb-3">
                    <label for="subject" class="form-label">Assunto</label>
                    <select class="form-select" id="subject" v-model="form.subject" required>
                      <option value="">Selecione um assunto</option>
                      <option value="agendamento">Agendamento de Consulta</option>
                      <option value="informacoes">Informações sobre Terapia</option>
                      <option value="outros">Outros</option>
                    </select>
                  </div>

                  <div class="mb-3">
                    <label for="message" class="form-label">Mensagem</label>
                    <textarea 
                      class="form-control" 
                      id="message" 
                      rows="5" 
                      v-model="form.message"
                      required
                      placeholder="Como posso ajudar você?"
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    class="btn btn-primary btn-lg w-100"
                    :disabled="loading"
                  >
                    <span v-if="!loading">Enviar Mensagem</span>
                    <span v-else>
                      <span class="spinner-border spinner-border-sm me-2"></span>
                      Enviando...
                    </span>
                  </button>

                  <div v-if="successMessage" class="alert alert-success mt-3">
                    {{ successMessage }}
                  </div>

                  <div v-if="errorMessage" class="alert alert-danger mt-3">
                    {{ errorMessage }}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Google Calendar Integration -->
    <section class="py-5 bg-light">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8 text-center">
            <h2 class="fw-bold mb-4">Agende sua Consulta</h2>
            <p class="lead mb-4">Veja minha disponibilidade e agende diretamente pelo Google Calendar.</p>
            
            <div class="calendar-container">
              <iframe
                :src="calendarUrl"
                style="border: 0"
                width="100%"
                height="600"
                frameborder="0"
                scrolling="no"
              ></iframe>
            </div>
            
            <div class="mt-4">
              <p class="text-muted">
                <small>
                  * Substitua o link acima pelo seu Google Calendar público de agendamentos
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Map Section -->
    <section class="py-5">
      <div class="container">
        <h2 class="text-center fw-bold mb-4">Localização</h2>
        <div class="ratio ratio-21x9">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.1234567890123!2d-46.12345678901234!3d-23.123456789012345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDA3JzI0LjQiUyA0NsKwMDcnMjQuNCJX!5e2!8m2!3d1!4d1"
            width="600" 
            height="450" 
            style="border:0;" 
            allowfullscreen="" 
            loading="lazy" 
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useContentStore } from '@/stores/content'

const contentStore = useContentStore()
const contact = computed(() => contentStore.content.contact)
const calendarUrl = computed(() => {
  const agenda = contentStore.content.sections.find((s) => s.type === 'schedule')
  return agenda?.content.calendarUrl || ''
})

const whatsappLink = computed(() => {
  const msg = encodeURIComponent('Olá! Gostaria de agendar uma consulta.')
  return `https://wa.me/${contact.value.whatsappNumber || contentStore.content.site.whatsappNumber}?text=${msg}`
})

const form = ref({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
})

const loading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const handleSubmit = async () => {
  loading.value = true
  successMessage.value = ''
  errorMessage.value = ''

  try {
    // Aqui você pode integrar com Appwrite ou outro serviço de e-mail
    // Por enquanto, apenas simulamos o envio
    await new Promise(resolve => setTimeout(resolve, 1500))

    successMessage.value = 'Mensagem enviada com sucesso! Entrarei em contato em breve.'

    // Limpar formulário
    form.value = {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    }
  } catch (error) {
    errorMessage.value = 'Erro ao enviar mensagem. Tente novamente mais tarde.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.contact-hero {
  padding-top: 100px;
}

.contact-item {
  transition: transform 0.3s ease;
}

.contact-item:hover {
  transform: translateX(10px);
}

.calendar-container {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.form-control:focus,
.form-select:focus {
  border-color: #0d6efd;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}
</style>
