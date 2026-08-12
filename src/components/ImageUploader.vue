<template>
  <div class="image-uploader">
    <div 
      class="upload-zone" 
      :class="{ 
        'upload-zone--filled': previewUrl,
        'upload-zone--dragover': isDragOver 
      }"
      @dragover.prevent="isDragOver = true"
      @dragleave.prevent="isDragOver = false"
      @drop.prevent="handleDrop"
    >
      <!-- Preview -->
      <img v-if="previewUrl" :src="previewUrl" class="upload-zone__preview" alt="Preview" />
      
      <!-- Placeholder -->
      <div v-else class="upload-zone__placeholder">
        <i class="bi bi-cloud-arrow-up"></i>
        <span>{{ placeholderText }}</span>
        <small>Clique ou arraste uma imagem</small>
      </div>
      
      <!-- Input file -->
      <input 
        type="file" 
        class="upload-zone__input" 
        accept="image/*" 
        @change="handleFileSelect"
        ref="fileInput"
      />
      
      <!-- Remove button -->
      <button 
        v-if="previewUrl && !disabled" 
        type="button" 
        class="upload-zone__remove btn btn-sm btn-danger" 
        @click="removeImage"
      >
        <i class="bi bi-trash me-1"></i>Remover
      </button>
    </div>
    
    <!-- Progress bar -->
    <div v-if="uploading" class="upload-progress mt-2">
      <div class="progress">
        <div class="progress-bar progress-bar-striped progress-bar-animated" :style="{ width: progress + '%' }"></div>
      </div>
      <small class="text-muted">Enviando... {{ progress }}%</small>
    </div>
    
    <!-- Error message -->
    <div v-if="error" class="alert alert-danger mt-2 py-2">
      <i class="bi bi-exclamation-triangle me-2"></i>{{ error }}
    </div>
    
    <!-- File info -->
    <div v-if="fileInfo && !error" class="file-info mt-2">
      <small class="text-muted">
        <i class="bi bi-file-image me-1"></i>
        {{ fileInfo.name }} ({{ formatFileSize(fileInfo.size) }})
      </small>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useContentStore } from '@/stores/content'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholderText: {
    type: String,
    default: 'Clique para enviar imagem'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  maxSize: {
    type: Number,
    default: 5 // MB
  }
})

const emit = defineEmits(['update:modelValue', 'uploaded'])

const contentStore = useContentStore()
const previewUrl = ref(props.modelValue)
const uploading = ref(false)
const progress = ref(0)
const error = ref(null)
const fileInfo = ref(null)
const isDragOver = ref(false)
const fileInput = ref(null)

// Watch for external changes
watch(() => props.modelValue, (newVal) => {
  previewUrl.value = newVal
})

async function handleFileSelect(event) {
  const file = event.target.files[0]
  if (!file) return
  await processFile(file)
}

function handleDrop(event) {
  isDragOver.value = false
  const file = event.dataTransfer.files[0]
  if (!file) return
  processFile(file)
}

async function processFile(file) {
  error.value = null
  
  // Validate file type
  if (!file.type.startsWith('image/')) {
    error.value = 'O arquivo precisa ser uma imagem.'
    return
  }
  
  // Validate file size
  const maxSizeBytes = props.maxSize * 1024 * 1024
  if (file.size > maxSizeBytes) {
    error.value = `Imagem muito grande (máx. ${props.maxSize}MB).`
    return
  }
  
  // Show preview
  fileInfo.value = file
  const reader = new FileReader()
  reader.onload = (e) => {
    previewUrl.value = e.target.result
  }
  reader.readAsDataURL(file)
  
  // Upload
  await uploadFile(file)
}

async function uploadFile(file) {
  uploading.value = true
  progress.value = 0
  
  try {
    // Simulate progress (since AppWrite SDK doesn't provide progress)
    const progressInterval = setInterval(() => {
      if (progress.value < 90) {
        progress.value += 10
      }
    }, 200)
    
    const result = await contentStore.uploadImage(file)
    
    clearInterval(progressInterval)
    progress.value = 100
    
    if (result.success) {
      previewUrl.value = result.url
      emit('update:modelValue', result.url)
      emit('uploaded', result)
      setTimeout(() => {
        uploading.value = false
        progress.value = 0
      }, 500)
    } else {
      throw new Error(result.error)
    }
  } catch (err) {
    error.value = err.message || 'Erro ao enviar imagem'
    uploading.value = false
    progress.value = 0
  }
}

function removeImage() {
  previewUrl.value = ''
  fileInfo.value = null
  error.value = null
  emit('update:modelValue', '')
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}
</script>

<style scoped>
.image-uploader { width: 100%; }

.upload-zone {
  position: relative;
  border: 2px dashed rgba(201,168,130,0.5);
  border-radius: 14px;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  cursor: pointer;
  background: #FCFAF7;
  transition: all 0.3s ease;
}

.upload-zone:hover {
  border-color: #C9A882;
  background: #F8F4F0;
}

.upload-zone--dragover {
  border-color: #6B3A2E;
  background: rgba(107, 58, 46, 0.05);
  transform: scale(1.02);
}

.upload-zone--filled {
  border-style: solid;
}

.upload-zone__preview {
  width: 100%;
  height: 100%;
  max-height: 300px;
  object-fit: cover;
}

.upload-zone__placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: #B8956A;
  text-align: center;
}

.upload-zone__placeholder i {
  font-size: 3rem;
  opacity: 0.5;
}

.upload-zone__placeholder span {
  font-weight: 600;
  font-size: 1rem;
}

.upload-zone__placeholder small {
  font-size: 0.8rem;
  opacity: 0.7;
}

.upload-zone__input {
  position: absolute;
  inset: 0;
  opacity: 0;
  cursor: pointer;
}

.upload-zone__remove {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  z-index: 2;
}

.upload-progress {
  animation: fadeIn 0.3s ease;
}

.file-info {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
