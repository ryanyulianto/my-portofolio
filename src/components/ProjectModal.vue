<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  projects: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['close'])

const closeModal = () => {
  emit('close')
}

const handleEscapeKey = (event) => {
  if (event.key === 'Escape') {
    closeModal()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleEscapeKey)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscapeKey)
})
</script>

<template>
  <Teleport to="body">
    <!-- Modal Backdrop -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div 
        v-if="isOpen" 
        class="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4"
        @click="closeModal"
      >
        <!-- Modal Content -->
        <Transition
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0 scale-95 translate-y-4"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="transition-all duration-200 ease-in"
          leave-from-class="opacity-100 scale-100 translate-y-0"
          leave-to-class="opacity-0 scale-95 translate-y-4"
        >
          <div 
            v-if="isOpen"
            class="relative w-full max-h-[90vh] overflow-y-auto"
            @click.stop
          >
            <div class="relative max-w-7xl mx-auto bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-gray-700/50 shadow-2xl">
          <!-- Header -->
          <div class="sticky top-0 bg-gray-900/95 backdrop-blur-md rounded-t-2xl border-b border-gray-700/50 p-4 sm:p-6 lg:p-8">
            <div class="flex items-start sm:items-center justify-between gap-4">
              <div class="flex-1 min-w-0">
                <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-1 sm:mb-2">
                  Semua Projects
                </h2>
                <p class="text-gray-400 text-sm sm:text-base lg:text-lg">Koleksi lengkap project yang telah saya kerjakan</p>
              </div>
              <button 
                @click="closeModal"
                class="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-all hover:scale-110 group"
              >
                <svg class="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          </div>
          
          <!-- Projects Grid -->
          <div class="p-4 sm:p-6 lg:p-8">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              <div 
                v-for="project in projects" 
                :key="project.title" 
                class="bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/10 group"
              >
                <!-- Project Image -->
                <div class="relative h-52 overflow-hidden">
                  <img 
                    :src="project.image" 
                    :alt="project.title" 
                    class="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  >
                  <div class="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent"></div>
                </div>
                
                <div class="p-4 sm:p-5 lg:p-6">
                  <h3 class="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3 group-hover:text-blue-400 transition-colors">{{ project.title }}</h3>
                  <p class="text-gray-400 text-xs sm:text-sm mb-4 sm:mb-5 line-clamp-3 leading-relaxed">{{ project.description }}</p>
                  
                  <!-- Tech Stack -->
                  <div class="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                    <span 
                      v-for="tech in project.tech" 
                      :key="tech"
                      class="px-2 sm:px-3 py-1 sm:py-1.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 text-xs rounded-full border border-blue-500/30 hover:border-blue-400/50 transition-colors"
                    >
                      {{ tech }}
                    </span>
                  </div>
                  
                  <!-- Links -->
                  <div class="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <a 
                      :href="project.github" 
                      target="_blank"
                      class="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-700/80 hover:bg-gray-600 text-white text-xs sm:text-sm rounded-xl transition-all hover:scale-105 hover:shadow-lg"
                    >
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      Code
                    </a>
                    <a 
                      :href="project.demo" 
                      target="_blank"
                      class="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-xs sm:text-sm rounded-xl transition-all hover:scale-105 hover:shadow-lg"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                      </svg>
                      Demo
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Custom Scrollbar */
.overflow-y-auto::-webkit-scrollbar {
  width: 8px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: rgba(31, 41, 55, 0.5);
  border-radius: 4px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
  border-radius: 4px;
  border: 1px solid rgba(55, 65, 81, 0.5);
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #2563eb, #7c3aed);
}

/* Smooth scroll behavior */
.overflow-y-auto {
  scroll-behavior: smooth;
}

/* Prevent body scroll when modal is open */
body:has(.modal-open) {
  overflow: hidden;
}
</style>