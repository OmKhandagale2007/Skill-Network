export interface UserProfile {
  id: string
  name: string
  email: string
  avatar: string
  bio: string
  skills: string[]
  lookingFor: string
  github: string
  linkedin?: string
  college?: string
  createdAt: number
}

export interface Opportunity {
  id: string
  type: 'hackathon' | 'study-group' | 'mentor' | 'internship' | 'club'
  title: string
  description: string
  skillsNeeded: string[]
  postedBy: string
  deadline?: string
}

export type MatchCategory = Opportunity['type']
