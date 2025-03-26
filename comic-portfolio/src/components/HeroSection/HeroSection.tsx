// src/components/HeroSection/HeroSection.tsx
import { useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { Text, Float, useTexture, Html } from '@react-three/drei'
import { motion } from 'framer-motion'

export default function HeroSection() {
  const meshRef = useRef<THREE.Mesh>(null)
  const texture = useTexture('/assets/textures/halftone_pattern.png')
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.2
    }
  })

  return (
    <group position={[0, 0, 0]}>
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <mesh ref={meshRef}>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial 
          map={texture} 
          color="#ff4d4d"
          roughness={0.3}
          metalness={0.2}
        />
        </mesh>
      </Float>
      
      <Text
        position={[0, -2, 0]}
        fontSize={1}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        font="/assets/comic-font.woff"
      >
        WELCOME TO MY WORLD
      </Text>
      {/* <Html position={[0, -3, 0]}> */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="hero-content"
      >
        <Text>CREATIVE DEVELOPER</Text>
        <Text>Bringing comic book aesthetics to the digital realm</Text>
      </motion.div>
      {/* </Html> */}
    </group>
  )
}