import { ref, onMounted, onUnmounted } from 'vue'

export function useActiveSection() {
  const currentSection = ref('home')
  
  const sections = ['home', 'about', 'skills', 'projects', 'contact']
  
  const updateActiveSection = () => {
    const scrollPosition = window.scrollY + 100 // Offset untuk navbar
    
    for (const sectionId of sections) {
      const element = document.getElementById(sectionId)
      if (element) {
        const { offsetTop, offsetHeight } = element
        
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          currentSection.value = sectionId
          break
        }
      }
    }
  }
  
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }
  
  onMounted(() => {
    window.addEventListener('scroll', updateActiveSection)
    updateActiveSection() // Initial check
  })
  
  onUnmounted(() => {
    window.removeEventListener('scroll', updateActiveSection)
  })
  
  return {
    currentSection,
    scrollToSection
  }
}