import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Html, Line } from '@react-three/drei'
import * as THREE from 'three'
import { useMemo } from 'react'
import { orbitingSkills, orbitalRings } from '../data/skills'

function NucleusCore() {
  const coreRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)
  const shellRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    const pulse = 1 + Math.sin(t * 2.5) * 0.06
    if (coreRef.current) coreRef.current.scale.setScalar(pulse)
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1.2 + Math.sin(t * 2) * 0.15)
      ;(glowRef.current.material as THREE.MeshBasicMaterial).opacity = 0.15 + Math.sin(t * 2) * 0.08
    }
    if (shellRef.current) shellRef.current.rotation.y = t * 0.4
  })

  return (
    <group>
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.42, 64, 64]} />
        <meshStandardMaterial
          color="#ff6b35"
          emissive="#ff4500"
          emissiveIntensity={1.2}
          roughness={0.15}
          metalness={0.6}
        />
      </mesh>
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.65, 32, 32]} />
        <meshBasicMaterial color="#ffa500" transparent opacity={0.2} />
      </mesh>
      <mesh ref={shellRef}>
        <icosahedronGeometry args={[0.55, 1]} />
        <meshStandardMaterial
          color="#ff8c42"
          wireframe
          transparent
          opacity={0.25}
          emissive="#ff6b35"
          emissiveIntensity={0.3}
        />
      </mesh>
      <pointLight color="#ff6b35" intensity={3} distance={6} />
    </group>
  )
}

function OrbitalRing({ radius, tilt, color }: { radius: number; tilt: number; color: string }) {
  const points = useMemo(() => {
    const pts: THREE.Vector3[] = []
    for (let i = 0; i <= 64; i++) {
      const angle = (i / 64) * Math.PI * 2
      pts.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius))
    }
    return pts
  }, [radius])

  return (
    <group rotation={[tilt, 0, 0]}>
      <Line points={points} color={color} lineWidth={0.5} transparent opacity={0.25} />
    </group>
  )
}

function OrbitingElectron({
  label,
  logo,
  color,
  orbitRadius,
  orbitSpeed,
  orbitTilt,
  phase,
}: {
  label: string
  logo: string
  color: string
  orbitRadius: number
  orbitSpeed: number
  orbitTilt: number
  phase: number
}) {
  const orbitRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (!orbitRef.current) return
    const t = clock.getElapsedTime() * orbitSpeed + phase
    orbitRef.current.position.set(
      Math.cos(t) * orbitRadius,
      0,
      Math.sin(t) * orbitRadius
    )
  })

  return (
    <group rotation={[orbitTilt, 0, 0]}>
      <group ref={orbitRef}>
        <mesh>
          <sphereGeometry args={[0.14, 16, 16]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.8}
            roughness={0.2}
            metalness={0.7}
          />
        </mesh>

        <Html center distanceFactor={8} style={{ pointerEvents: 'none', userSelect: 'none' }}>
          <div className="flex flex-col items-center gap-1">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center border border-white/20"
              style={{
                background: 'rgba(10,10,15,0.9)',
                backdropFilter: 'blur(8px)',
                boxShadow: `0 0 20px ${color}55`,
              }}
            >
              <img src={logo} alt={label} className="w-5 h-5 object-contain" draggable={false} />
            </div>
            <span
              className="text-[10px] font-semibold whitespace-nowrap px-2 py-0.5 rounded-full"
              style={{
                color: '#fff',
                background: `${color}33`,
                border: `1px solid ${color}66`,
              }}
            >
              {label}
            </span>
          </div>
        </Html>
      </group>
    </group>
  )
}

function AmbientParticles() {
  const count = 120
  const ref = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 5 + Math.random() * 8
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
    }
    return pos
  }, [])

  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * 0.015
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#14b8a6" transparent opacity={0.5} sizeAttenuation />
    </points>
  )
}

function NucleusScene() {
  return (
    <>
      <ambientLight intensity={0.25} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#14b8a6" />
      <pointLight position={[-5, -3, -5]} intensity={0.4} color="#a855f7" />
      <AmbientParticles />
      {orbitalRings.map((ring) => (
        <OrbitalRing key={ring.radius} radius={ring.radius} tilt={ring.tilt} color={ring.color} />
      ))}
      <NucleusCore />
      {orbitingSkills.map((skill) => (
        <OrbitingElectron
          key={skill.id}
          label={skill.label}
          logo={skill.logo}
          color={skill.color}
          orbitRadius={skill.orbitRadius}
          orbitSpeed={skill.orbitSpeed}
          orbitTilt={skill.orbitTilt}
          phase={skill.phase}
        />
      ))}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.35}
        maxPolarAngle={Math.PI / 1.6}
        minPolarAngle={Math.PI / 4}
      />
    </>
  )
}

export default function SkillNucleus3D() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 1.5, 9], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <NucleusScene />
      </Canvas>
    </div>
  )
}
