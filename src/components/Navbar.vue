<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  currentSection: {
    type: String,
    default: 'home'
  }
})

const emit = defineEmits(['scroll-to-section'])

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const scrollToSection = (sectionId) => {
  emit('scroll-to-section', sectionId)
  isMenuOpen.value = false
}

const menuItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' }
]

const isActiveSection = (sectionId) => {
  return props.currentSection === sectionId
}
</script>

<template>
  <nav class="fixed top-0 w-full z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-700/50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <div class="flex-shrink-0">
          <h1 class="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Ryan Yulianto
          </h1>
        </div>
        
        <!-- Desktop Menu -->
        <div class="hidden md:block">
          <div class="ml-10 flex items-baseline space-x-8">
            <a 
              v-for="item in menuItems" 
              :key="item.id"
              @click="scrollToSection(item.id)" 
              :class="[
                'hover:text-blue-400 transition-colors cursor-pointer relative',
                isActiveSection(item.id) ? 'text-blue-400' : 'text-white'
              ]"
            >
              {{ item.label }}
              <span 
                v-if="isActiveSection(item.id)"
                class="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-purple-500"
              ></span>
            </a>
          </div>
        </div>
        
        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button @click="toggleMenu" class="text-gray-300 hover:text-white focus:outline-none">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path v-if="!isMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
    
    <!-- Mobile Menu -->
    <div v-show="isMenuOpen" class="md:hidden bg-gray-800/95 backdrop-blur-md">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <a 
          v-for="item in menuItems" 
          :key="item.id"
          @click="scrollToSection(item.id)" 
          :class="[
            'block px-3 py-2 hover:text-blue-400 transition-colors cursor-pointer',
            isActiveSection(item.id) ? 'text-blue-400 bg-blue-500/10' : 'text-white'
          ]"
        >
          {{ item.label }}
        </a>
      </div>
    </div>
  </nav>
</template>