<template>
  <div class="services-view">
    <!-- Hero Section -->
    <section class="services-hero py-5 bg-light">
      <div class="container text-center">
        <h1 class="display-5 fw-bold mb-4">{{ services.title }}</h1>
        <p class="lead">{{ services.subtitle }}</p>
      </div>
    </section>

    <!-- Services Grid -->
    <section class="py-5">
      <div class="container">
        <div class="row g-4">
          <div v-for="(service, index) in services.items" :key="index" class="col-md-6 col-lg-4">
            <div class="card h-100 border-0 shadow-sm service-card">
              <div class="card-body p-4">
                <div class="service-icon mb-3">
                  <i :class="service.icon"></i>
                </div>
                <h3 class="h4 fw-bold mb-3">{{ service.title }}</h3>
                <p class="text-muted mb-3">{{ service.description }}</p>
                <ul class="list-unstyled mb-3">
                  <li v-for="(feature, idx) in service.features" :key="idx" class="mb-2">
                    <i class="bi bi-check-circle-fill text-success me-2"></i>
                    {{ feature }}
                  </li>
                </ul>
                <div class="price-tag mt-3">
                  <span class="badge bg-primary fs-6">{{ service.price }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-5 bg-light">
      <div class="container">
        <h2 class="text-center fw-bold mb-5">{{ services.faqTitle }}</h2>
        <div class="row justify-content-center">
          <div class="col-lg-8">
            <div class="accordion" id="faqAccordion">
              <div v-for="(faq, index) in services.faqs" :key="index" class="accordion-item">
                <h2 class="accordion-header">
                  <button
                    class="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    :data-bs-target="'#faq' + index"
                    :aria-expanded="index === 0 ? 'true' : 'false'"
                    :aria-controls="'faq' + index"
                  >
                    {{ faq.question }}
                  </button>
                </h2>
                <div
                  :id="'faq' + index"
                  class="accordion-collapse collapse"
                  :class="{ show: index === 0 }"
                  data-bs-parent="#faqAccordion"
                >
                  <div class="accordion-body">
                    {{ faq.answer }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-5">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8 text-center">
            <h2 class="display-6 fw-bold mb-4">Pronto para dar o primeiro passo?</h2>
            <p class="lead mb-4">Agende sua primeira consulta e comece sua jornada de transformação.</p>
            <router-link to="/contato" class="btn btn-primary btn-lg px-5">
              Agendar Agora
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useContentStore } from '@/stores/content'

const contentStore = useContentStore()
const services = computed(() => contentStore.content.services)
</script>

<style scoped>
.services-hero {
  padding-top: 100px;
}

.service-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.service-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15) !important;
}

.service-icon {
  font-size: 2.5rem;
}

.price-tag {
  margin-top: auto;
}

.accordion-button:not(.collapsed) {
  background-color: #e7f1ff;
  color: #0d6efd;
}
</style>
