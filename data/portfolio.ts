export interface Project {
  id: string
  title: string
  client: string
  sector: string
  description: string
  technologies: string[]
  metrics: {
    label: string
    value: string
  }[]
  image: string
  featured: boolean
}

// Projects will be added here when ready
export const projects: Project[] = []

export const sectors = [
  'Tous',
  'Web',
  'Mobile', 
  'ERP/CRM',
  'Intelligence Artificielle',
  'E-commerce',
  'Finance',
]