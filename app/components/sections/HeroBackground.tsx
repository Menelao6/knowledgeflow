"use client";

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Floating particles component
function FloatingParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  
  const particleCount = 150;
  const positions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
      pointsRef.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#6366F1"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
}

// Study icons component (simplified as floating elements)
function StudyIcons() {
  const iconsRef = useRef<THREE.Group>(null);
  
  const icons = useMemo(() => [
    { type: 'book', position: [1, 0.5, -2] },
    { type: 'laptop', position: [-1, -0.5, -3] },
    { type: 'code', position: [0.5, -1, -1.5] },
    { type: 'math', position: [-0.5, 1, -2.5] },
    { type: 'robot', position: [1.2, 1.2, -4] },
  ], []);

  useFrame((state) => {
    if (iconsRef.current) {
      iconsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      iconsRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <group ref={iconsRef}>
      {icons.map((icon, index) => (
        <mesh key={index} position={icon.position as [number, number, number]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial color="#14B8A6" transparent opacity={0.8} />
        </mesh>
      ))}
    </group>
  );
}

// Main globe with network connections
function AnimatedGlobe() {
  const globeRef = useRef<THREE.Mesh>(null);
  const linesRef = useRef<THREE.Group>(null);
  
  // Create network connections
  const connections = useMemo(() => {
    const connections = [];
    for (let i = 0; i < 50; i++) {
      connections.push({
        start: new THREE.Vector3(
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 2
        ).normalize(),
        end: new THREE.Vector3(
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 2
        ).normalize(),
        progress: Math.random(),
        speed: 0.2 + Math.random() * 0.3,
      });
    }
    return connections;
  }, []);

  useFrame((state) => {
    if (globeRef.current) {
      globeRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
    
    if (linesRef.current) {
      linesRef.current.children.forEach((line, index) => {
        const connection = connections[index];
        connection.progress += connection.speed * 0.01;
        if (connection.progress > 1) connection.progress = 0;
        
        // Animate line progress
        const points = [];
        const segments = 10;
        for (let i = 0; i <= segments; i++) {
          const t = (i / segments) * connection.progress;
          points.push(
            connection.start.clone().lerp(connection.end, t)
          );
        }
        
        line.geometry.setFromPoints(points);
      });
    }
  });

  return (
    <group>
      {/* Globe */}
      <mesh ref={globeRef}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.1}
          wireframe
        />
      </mesh>
      
      {/* Network connections */}
      <group ref={linesRef}>
        {connections.map((_, index) => (
          <line key={index}>
            <bufferGeometry />
            <lineBasicMaterial color="#6366F1" transparent opacity={0.6} />
          </line>
        ))}
      </group>
      
      {/* Nodes */}
      {connections.map((conn, index) => (
        <mesh key={`node-${index}`} position={conn.end}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshBasicMaterial color="#14B8A6" transparent opacity={0.8} />
        </mesh>
      ))}
    </group>
  );
}

export default function HeroBackground() {
  return (
    <div className="hero-background">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
        }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        
        <AnimatedGlobe />
        <FloatingParticles />
        <StudyIcons />
      </Canvas>
    </div>
  );
}