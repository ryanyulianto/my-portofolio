export const projects = [
  {
    id: 1,
    title: 'Operational Outsourcing',
    description: 'Developed a resource allocation module that enhances workforce management efficiency.',
    tech: ['Livewire', 'Laravel', 'Filament', 'PostgreSQL', 'Tailwind CSS'],
    image: '/images/operational-outsourcing.png',
    github: null,
    demo: null,
    featured: true
  },
  {
    id: 2,
    title: 'Mining Company Asset Management System',
    description: 'Created an automated asset tracking and maintenance solution for a mining company, improving inventory management and operational workflow.',
    tech: ['Livewire', 'Laravel', 'Filament', 'Tailwind CSS', 'PostgreSQL'],
    image: '/images/mining-company.png',
    github: null,
    demo: null,
    featured: true
  },
  {
    id: 3,
    title: 'Human Resource System',
    description: 'Designed and implemented a full-scale HR system for efficient employee management, attendance tracking, and payroll processing.',
    tech: ['Laravel', 'Tailwind CSS', 'Livewire', 'PostgreSQL'],
    image: '/images/humman-resource.png',
    github: null,
    demo: null,
    featured: true
  },
  {
    id: 4,
    title: 'Imun Plus - Sports Field Booking Platform',
    description: 'Developed a comprehensive sports field booking platform with partner registration system. Built web admin panel, partner dashboard, and REST API with Redis optimization for improved performance.',
    tech: ['Laravel', 'Livewire', 'Redis', 'PostgreSQL', 'Tailwind CSS', 'REST API'],
    image: '/images/imun.png',
    github: null,
    demo: null,
    featured: true
  },
]

export const getFeaturedProjects = () => {
  return projects.filter(project => project.featured).slice(0, 6)
}

export const getAllProjects = () => {
  return projects
}