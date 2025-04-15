import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const Starfield = ({ starColor }) => {
  const starsRef = useRef();
  const hueOffsets = useRef(new Float32Array(1000));

  const { positions, originalPositions, phaseOffsets, twinkleFactors, colors } = useMemo(() => {
    const positionsArray = [];
    const colorsArray = [];
    const phaseOffsets = [];
    const twinkleFactors = [];
    
    for (let i = 0; i < 1000; i++) {
      const x = (Math.random() - 0.5) * 800;
      const y = (Math.random() - 0.5) * 800;
      const z = (Math.random() - 0.5) * 800;
      positionsArray.push(x, y, z);
      colorsArray.push(1, 1, 1); // Initial white color (will be multiplied by starColor)
      phaseOffsets.push(Math.random() * Math.PI * 2);
      twinkleFactors.push(0.5 + Math.random() * 1.5);
    }

    return {
      positions: new THREE.Float32BufferAttribute(positionsArray, 3),
      originalPositions: new Float32Array(positionsArray),
      colors: new THREE.Float32BufferAttribute(colorsArray, 3),
      phaseOffsets,
      twinkleFactors,
    };
  }, []);

  const originalPositionsRef = useRef(originalPositions);
  const shootStartTimesRef = useRef(new Float32Array(1000));
  const lastWaveTimeRef = useRef(0);
  const waveDirectionRef = useRef(new THREE.Vector2(1, -1).normalize());

  useFrame((state) => {
    if (starsRef.current) {
      const time = state.clock.getElapsedTime();
      const opacityArray = starsRef.current.geometry.attributes.opacity.array;
      const positionsArray = starsRef.current.geometry.attributes.position.array;
      const colorsArray = starsRef.current.geometry.attributes.color.array;
      const originalPositions = originalPositionsRef.current;
      const shootStartTimes = shootStartTimesRef.current;

      // Trigger new wave every 3.5 seconds with flowing pattern
      if (time - lastWaveTimeRef.current > 3.5) {
        const baseAngle = (time * 0.2) % (Math.PI * 2);
        const waveCenter = new THREE.Vector2(
          Math.cos(baseAngle) * 300,
          Math.sin(baseAngle) * 300
        );

        for (let i = 0; i < 40; i++) {
          const angle = baseAngle + (i / 40) * Math.PI * 0.5;
          const radius = 150 + (i % 10) * 30;
          const targetIndex = Math.floor(
            ((angle % (Math.PI * 2)) / (Math.PI * 2)) * 1000
          );

          if (targetIndex < 1000) {
            shootStartTimes[targetIndex] = time;
            hueOffsets.current[targetIndex] = Math.random() * Math.PI * 2;
            
            // Set initial wave pattern positions
            const i3 = targetIndex * 3;
            positionsArray[i3] = waveCenter.x + Math.cos(angle) * radius;
            positionsArray[i3 + 1] = waveCenter.y + Math.sin(angle) * radius;
          }
        }
        lastWaveTimeRef.current = time;
      }

      // Update shooting stars
      for (let i = 0; i < 1000; i++) {
        if (shootStartTimes[i] > 0) {
          const elapsed = time - shootStartTimes[i];
          const i3 = i * 3;
          
          if (elapsed >= 1.5) {
            // Reset to original position
            positionsArray[i3] = originalPositions[i3];
            positionsArray[i3 + 1] = originalPositions[i3 + 1];
            positionsArray[i3 + 2] = originalPositions[i3 + 2];
            shootStartTimes[i] = 0;
            
            // Reset color
            colorsArray[i3] = 1;
            colorsArray[i3 + 1] = 1;
            colorsArray[i3 + 2] = 1;
          } else {
            // Rainbow color animation
            const hue = ((elapsed * 2) + hueOffsets.current[i]) % 1;
            const rgb = new THREE.Color().setHSL(hue, 1, 0.8);
            
            colorsArray[i3] = rgb.r * 2; // Boost brightness
            colorsArray[i3 + 1] = rgb.g * 2;
            colorsArray[i3 + 2] = rgb.b * 2;

            // Dynamic motion with easing
            const progress = Math.sin((elapsed / 1.5) * Math.PI / 2);
            const velocity = 600 * progress;
            
            positionsArray[i3] += waveDirectionRef.current.x * velocity * state.clock.deltaTime;
            positionsArray[i3 + 1] += waveDirectionRef.current.y * velocity * state.clock.deltaTime;
            
            // Size boost and fade tail
            opacityArray[i] = 1 - (elapsed / 1.5);
          }
        } else {
          // Normal twinkle effect
          opacityArray[i] = 0.3 + Math.sin(time * twinkleFactors[i] + phaseOffsets[i]) * 0.3;
        }
      }

      // Update attributes
      starsRef.current.geometry.attributes.opacity.needsUpdate = true;
      starsRef.current.geometry.attributes.position.needsUpdate = true;
      starsRef.current.geometry.attributes.color.needsUpdate = true;
    }
  });

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" {...positions} />
        <bufferAttribute
          attach="attributes-opacity"
          array={new Float32Array(1000).fill(0.8)}
          itemSize={1}
        />
        <bufferAttribute attach="attributes-color" {...colors} />
      </bufferGeometry>
      <pointsMaterial
        size={1.5}
        color={starColor}
        transparent
        vertexColors={true}
        opacity={1.0}
        blending={THREE.AdditiveBlending}
        sizeAttenuation={false}
      />
    </points>
  );
};

// ParticleBackground component remains the same