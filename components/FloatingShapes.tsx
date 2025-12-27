
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, MeshWobbleMaterial, Torus } from '@react-three/drei';
import * as THREE from 'three';

interface ShapeProps {
  position: [number, number, number];
  color: string;
  type: 'sphere' | 'torus' | 'distort';
  parallaxFactor?: number;
  scale?: number;
}

const Shape = ({ position, color, type, parallaxFactor = 1, scale = 1 }: ShapeProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialY = position[1];
  const { mouse } = useThree();

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.getElapsedTime();
      
      // Idle rotation
      meshRef.current.rotation.x = Math.cos(t / 4) / 4;
      meshRef.current.rotation.y = Math.sin(t / 4) / 4;
      
      // Floating hover
      const hover = Math.sin(t) * 0.1;
      
      // Scroll Parallax
      const scrollY = typeof window !== 'undefined' ? window.scrollY : 0;
      const scrollParallax = scrollY * 0.003 * parallaxFactor;
      
      // Mouse Parallax (Interactivity)
      const mouseX = mouse.x * 0.5 * parallaxFactor;
      const mouseY = mouse.y * 0.5 * parallaxFactor;

      meshRef.current.position.y = initialY + hover + scrollParallax + mouseY;
      meshRef.current.position.x = position[0] + mouseX;
    }
  });

  if (type === 'distort') {
    return (
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <Sphere args={[1 * scale, 64, 64]} position={position} ref={meshRef}>
          <MeshDistortMaterial
            color={color}
            speed={3}
            distort={0.4}
            radius={1}
          />
        </Sphere>
      </Float>
    );
  }

  if (type === 'torus') {
    return (
      <Float speed={1.5} rotationIntensity={1} floatIntensity={0.5}>
        <Torus args={[0.7 * scale, 0.15 * scale, 16, 100]} position={position} ref={meshRef}>
          <MeshWobbleMaterial color={color} factor={0.5} speed={2} />
        </Torus>
      </Float>
    );
  }

  return (
    <Float speed={3} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere args={[0.4 * scale, 32, 32]} position={position} ref={meshRef}>
        <meshStandardMaterial color={color} roughness={0.1} metalness={0.8} />
      </Sphere>
    </Float>
  );
};

export const FloatingShapes: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 65 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        
        <Shape position={[-1.8, 1, 0]} color="#4f46e5" type="distort" parallaxFactor={0.6} scale={0.7} />
        <Shape position={[1.8, -0.8, -1]} color="#db2777" type="torus" parallaxFactor={0.9} scale={0.7} />
        <Shape position={[0, -1.5, 1]} color="#10b981" type="sphere" parallaxFactor={0.4} scale={0.7} />
        <Shape position={[-2.5, -1.8, -2]} color="#f59e0b" type="sphere" parallaxFactor={1.2} scale={0.6} />
        <Shape position={[2.5, 1.8, -1]} color="#6366f1" type="sphere" parallaxFactor={0.8} scale={0.6} />
      </Canvas>
    </div>
  );
};
