// src/components/HeroSection/HeroSection.tsx
import { useFrame } from '@react-three/fiber'
import { Float, Text } from '@react-three/drei'
import * as THREE from 'three'
import { useRef } from 'react'

const halftoneShader = {
  vertexShader: `
    varying vec2 vUv;
    varying vec3 vNormal;
    void main() {
      vUv = uv;
      vNormal = normal;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 uColor;
    varying vec2 vUv;
    varying vec3 vNormal;
    
    float circle(vec2 uv, vec2 center, float radius) {
      return 1.0 - smoothstep(radius-0.01, radius+0.01, length(uv - center));
    }

    void main() {
      vec3 comicColor = uColor;
      vec2 uv = vUv * 10.0;
      vec2 grid = fract(uv);
      
      // Halftone dots
      float dotSize = 0.3;
      float dot = circle(grid, vec2(0.5), dotSize);
      float shade = dot * (0.8 + 0.2 * sin(vUv.x * 50.0 + vUv.y * 30.0));
      
      // Comic outline
      float outline = smoothstep(0.4, 0.45, abs(vNormal.z));
      
      gl_FragColor = vec4(comicColor * shade + outline * vec3(0.0), 1.0);
    }
  `
}

export default function HeroSection() {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  
    // filepath: comic-portfolio/src/components/HeroSection/HeroSection.tsx
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.2;
    }
    if (materialRef.current) {
      materialRef.current.uniforms.uColor.value = new THREE.Color(
        `hsl(${(clock.elapsedTime * 30) % 360}, 70%, 60%)`
      );
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <mesh ref={meshRef}>
          <boxGeometry args={[2, 2, 2]} />
          <shaderMaterial
            ref={materialRef}
            attach="material"
            args={[{
              ...halftoneShader,
              uniforms: {
                uColor: { value: new THREE.Color('#ff4d4d') }
              }
            }]}
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
    </group>
  )
}