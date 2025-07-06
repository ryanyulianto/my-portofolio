<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  project: {
    type: Object,
    required: true
  }
})

const isImageModalOpen = ref(false)

const openImageModal = () => {
  isImageModalOpen.value = true
}

const closeImageModal = () => {
  isImageModalOpen.value = false
}

// Lock body scroll when modal is open
watch(isImageModalOpen, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
</script>

<template>
  <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50 hover:border-blue-500/50 transition-all group">
    <div class="relative overflow-hidden cursor-pointer" @click="openImageModal">
      <img 
        :src="project.image" 
        :alt="project.title" 
        class="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
      >
      <div class="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
      <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div class="bg-black/50 rounded-full p-3">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path>
          </svg>
        </div>
      </div>
    </div>
    
    <div class="p-6">
      <h3 class="text-xl font-semibold mb-3 group-hover:text-blue-400 transition-colors">
        {{ project.title }}
      </h3>
      <p class="text-gray-300 mb-4 text-sm leading-relaxed">
        {{ project.description }}
      </p>
      
      <div class="flex flex-wrap gap-2 mb-4">
        <span 
          v-for="tech in project.tech" 
          :key="tech" 
          class="px-3 py-1 bg-blue-600/20 text-blue-300 rounded-full text-xs border border-blue-500/30"
        >
          {{ tech }}
        </span>
      </div>
      
      <div class="flex space-x-4">
        <a 
          v-if="project.github"
          :href="project.github" 
          class="flex items-center space-x-2 text-gray-300 hover:text-blue-400 transition-colors"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          <span class="text-sm">Code</span>
        </a>
        <a 
          v-if="project.demo"
          :href="project.demo" 
          class="flex items-center space-x-2 text-gray-300 hover:text-purple-400 transition-colors"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
          </svg>
          <span class="text-sm">Demo</span>
        </a>
      </div>
    </div>
    
    <!-- Image Modal -->
    <Teleport to="body">
      <div v-if="isImageModalOpen" class="fixed inset-0 z-[9999] bg-black" @click="closeImageModal" style="margin: 0; padding: 0; width: 100vw; height: 100vh; top: 0; left: 0;">
        <div class="relative w-full h-full flex items-center justify-center" @click.stop>
          <button 
            @click="closeImageModal"
            class="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors bg-black/50 rounded-full p-2"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
          <img 
            :src="project.image" 
            :alt="project.title" 
            class="max-w-full max-h-full object-contain"
          >
          <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
            <h3 class="text-xl font-semibold text-white mb-2">{{ project.title }}</h3>
            <p class="text-gray-300 text-sm">{{ project.description }}</p>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>