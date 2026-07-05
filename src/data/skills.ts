export interface OrbitingSkill {
  id: string
  label: string
  logo: string
  color: string
  orbitRadius: number
  orbitSpeed: number
  /** Ring tilt in radians (rotation around X axis) */
  orbitTilt: number
  /** Starting angle offset */
  phase: number
  ringIndex: number
}

export const orbitingSkills: OrbitingSkill[] = [
  {
    id: 'react',
    label: 'React',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    color: '#61dafb',
    orbitRadius: 2.4,
    orbitSpeed: 0.9,
    orbitTilt: 0,
    phase: 0,
    ringIndex: 0,
  },
  {
    id: 'figma',
    label: 'UI/UX',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
    color: '#f472b6',
    orbitRadius: 2.4,
    orbitSpeed: 0.9,
    orbitTilt: 0,
    phase: Math.PI,
    ringIndex: 0,
  },
  {
    id: 'python',
    label: 'ML',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    color: '#34d399',
    orbitRadius: 3.2,
    orbitSpeed: 0.65,
    orbitTilt: Math.PI / 3,
    phase: 0.5,
    ringIndex: 1,
  },
  {
    id: 'docker',
    label: 'DevOps',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
    color: '#38bdf8',
    orbitRadius: 3.2,
    orbitSpeed: 0.65,
    orbitTilt: Math.PI / 3,
    phase: Math.PI + 0.5,
    ringIndex: 1,
  },
  {
    id: 'flutter',
    label: 'Mobile',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg',
    color: '#60a5fa',
    orbitRadius: 3.2,
    orbitSpeed: 0.65,
    orbitTilt: Math.PI / 3,
    phase: Math.PI / 2,
    ringIndex: 1,
  },
  {
    id: 'nodejs',
    label: 'Backend',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    color: '#4ade80',
    orbitRadius: 4.0,
    orbitSpeed: 0.45,
    orbitTilt: Math.PI / 2.2,
    phase: 0,
    ringIndex: 2,
  },
  {
    id: 'typescript',
    label: 'TypeScript',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    color: '#818cf8',
    orbitRadius: 4.0,
    orbitSpeed: 0.45,
    orbitTilt: Math.PI / 2.2,
    phase: Math.PI * 0.66,
    ringIndex: 2,
  },
  {
    id: 'tensorflow',
    label: 'AI',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg',
    color: '#fb923c',
    orbitRadius: 4.0,
    orbitSpeed: 0.45,
    orbitTilt: Math.PI / 2.2,
    phase: Math.PI * 1.33,
    ringIndex: 2,
  },
]

export const orbitalRings = [
  { radius: 2.4, tilt: 0, color: '#14b8a6' },
  { radius: 3.2, tilt: Math.PI / 3, color: '#f97316' },
  { radius: 4.0, tilt: Math.PI / 2.2, color: '#a855f7' },
]
