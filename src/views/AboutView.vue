<template>
  <div class="about-view">
    <!-- Hero Section -->
    <section class="about-hero py-5">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6 order-lg-2">
            <img
              :src="about.image || 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&h=700&fit=crop'"
              alt="Dra. Renata"
              class="img-fluid rounded shadow-lg"
            >
          </div>
          <div class="col-lg-6 order-lg-1">
            <h1 class="display-5 fw-bold mb-4">{{ about.title }}</h1>
            <p class="lead mb-4">{{ about.text }}</p>
            <div class="credentials">
              <h4 class="fw-bold mb-3">Formação e Credenciais</h4>
              <ul class="list-unstyled">
                <li v-for="(credential, index) in credentials" :key="index" class="mb-2">
                  <i class="bi bi-check-circle-fill text-primary me-2"></i>
                  {{ credential }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Approach Section -->
    <section class="py-5 bg-light">
      <div class="container">
        <h2 class="text-center fw-bold mb-5">{{ about.approachTitle }}</h2>
        <div class="row g-4">
          <div class="col-md-6" v-for="(a, i) in about.approaches" :key="i">
            <div class="card border-0 h-100">
              <div class="card-body p-4">
                <h3 class="h4 fw-bold mb-3">
                  <i :class="a.icon + ' text-primary me-2'"></i>
                  {{ a.title }}
                </h3>
                <p class="text-muted">{{ a.desc }}</p>
              </div>
            </div>
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
const about = computed(() => contentStore.content.about)
const credentials = computed(() => [
  'Graduação em Psicologia',
  'Especialização em Terapia Cognitivo-Comportamental',
  'Pós-graduação em Saúde Mental',
  `CRP: ${contentStore.content.site.crp}`,
  'Membro da Associação Brasileira de Psicologia',
])
</script>

<style scoped>
.about-hero {
  padding-top: 100px;
}

.value-card {
  padding: 2rem;
  transition: transform 0.3s ease;
}

.value-card:hover {
  transform: translateY(-10px);
}
</style>
