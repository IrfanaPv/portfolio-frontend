'use client'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useRef, useMemo, useEffect } from 'react'
import * as THREE from 'three'

function Waves({ mouse }) {
  const groupRef = useRef()
  const topRef = useRef()
  const { viewport } = useThree()

  const ribbonData = useMemo(
    () => Array.from({ length: 7 }).map((_, i) => ({ geo: new THREE.PlaneGeometry(16, 4, 60, 24), seed: i })),
    []
  )

  // keep the ribbon group scaled to actually fill whatever viewport it's given —
  // this is what makes it "fully cover" on a phone as much as a widescreen monitor
  useEffect(() => {
    if (groupRef.current) {
      const scale = Math.max(viewport.width / 13, viewport.height / 7, 1)
      groupRef.current.scale.setScalar(scale)
    }
  }, [viewport.width, viewport.height])

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouse.x * 0.25, 0.05)
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -mouse.y * 0.1, 0.05)
      groupRef.current.position.y = 0.15 + Math.sin(t * 0.3) * 0.08
    }
    if (topRef.current) {
      const pos = topRef.current.geometry.attributes.position
      for (let j = 0; j < pos.count; j++) {
        const x = pos.getX(j)
        pos.setZ(j, Math.sin(x * 0.8 + t * 0.6) * 0.7 + Math.cos(x * 0.35 - t * 0.3) * 0.35)
      }
      pos.needsUpdate = true
    }
  })

  ribbonData.forEach(({ geo, seed }) => {
    const pos = geo.attributes.position
    for (let j = 0; j < pos.count; j++) {
      const x = pos.getX(j)
      pos.setZ(j, Math.sin(x * 0.8 + seed) * 0.7 + Math.cos(x * 0.35) * 0.35)
    }
    pos.needsUpdate = true
  })

  return (
    <group ref={groupRef} position={[0.4, 0, 0]} rotation={[0, -0.25, 0]}>
      {ribbonData.map(({ geo }, i) => (
        <mesh key={i} ref={i === 0 ? topRef : null} geometry={geo} position={[0, 1.8 - i * 0.6, -i * 0.35]}>
          <meshStandardMaterial
            color={i % 2 ? '#a7f3d0' : '#5eead4'}
            transparent
            opacity={0.68 - i * 0.06}
            side={THREE.DoubleSide}
            roughness={0.2}
            metalness={0.15}
          />
        </mesh>
      ))}
    </group>
  )
}

export default function HeroScene({ mouse }) {
  return (
    <Canvas camera={{ position: [0, 0.3, 9], fov: 55 }} gl={{ alpha: true, antialias: true }}>
      <fog attach="fog" args={['#04070a', 6, 15]} />
      <ambientLight intensity={1.05} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
      <pointLight position={[-3, 2, 3]} intensity={1.2} color="#5eead4" />
      <pointLight position={[4, -1, 2]} intensity={0.5} color="#a7f3d0" />
      <Waves mouse={mouse} />
    </Canvas>
  )
}