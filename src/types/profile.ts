export interface Profile {
  name: string
  title: string
  role: string
  location: string
  timezone: string
  bio: string
  tagline: string
  email: string
  github: string
  linkedin: string
  fiverr: string
  availability: string
  photo: string
  logo: string
  identities: string[]
  coreMessage: string
  coreStack: string[]
  aiTools: string[]
  languages: string[]
  credentials: Credential[]
}

export interface Credential {
  id: string
  title: string
  issuer: string
  date: string
  description: string
  pdfUrl?: string
  imageUrl?: string
}
