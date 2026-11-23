"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function GyroscopicLattice() {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  // Generate lightweight orbiting constellation vertices
  const particlePositions = useMemo(() => {
    const coords: [number, number, number][] = [];
    const count = 28;
    for (let i = 0; i < count; i++) {
      const radius = 2.4 + Math.random() * 0.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      coords.push([
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi),
      ]);
    }
    return coords;
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Smooth pointer damping / orientation shift
    const targetX = state.pointer.y * 0.45;
    const targetY = state.pointer.x * 0.65;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.05);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, 0.05);

    // Continuous smooth idle rotations at different speeds
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.25;
      coreRef.current.rotation.x += delta * 0.15;
    }
    if (ring1Ref.current) ring1Ref.current.rotation.z += delta * 0.3;
    if (ring2Ref.current) ring2Ref.current.rotation.x += delta * 0.2;
    if (ring3Ref.current) ring3Ref.current.rotation.y -= delta * 0.25;
  });

  return (
    <group ref={groupRef}>
      {/* Central Inner Solid: Metallic Icosahedron */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1.2, 0]} />
        <meshStandardMaterial
          color="#18181b"
          roughness={0.15}
          metalness={0.85}
          wireframe={false}
        />
      </mesh>

      {/* Inner Wireframe Cage Overlay */}
      <mesh>
        <icosahedronGeometry args={[1.22, 1]} />
        <meshBasicMaterial color="#00f5ff" wireframe transparent opacity={0.35} />
      </mesh>

      {/* Middle Gyroscopic Gimbal Ring 1 */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.7, 0.02, 16, 64]} />
        <meshStandardMaterial color="#ffffff" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Middle Gyroscopic Gimbal Ring 2 */}
      <mesh ref={ring2Ref} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.95, 0.018, 16, 64]} />
        <meshStandardMaterial color="#8b5cf6" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Outer Datum Coordinate Ring 3 */}
      <mesh ref={ring3Ref} rotation={[0, Math.PI / 4, Math.PI / 4]}>
        <torusGeometry args={[2.2, 0.015, 16, 64]} />
        <meshBasicMaterial color="#00f5ff" transparent opacity={0.4} />
      </mesh>

      {/* Orbiting Constellation Nodes */}
      {particlePositions.map((pos, idx) => (
        <mesh key={idx} position={pos}>
          <sphereGeometry args={[0.035, 8, 8]} />
          <meshBasicMaterial color={idx % 3 === 0 ? "#00f5ff" : "#ffffff"} />
        </mesh>
      ))}
    </group>
  );
}

export default function ArchitecturalCore3D() {
  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        {/* Balanced Laboratory Lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 6, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-4, -3, -2]} intensity={2.0} color="#00f5ff" />
        <pointLight position={[3, -4, 2]} intensity={1.5} color="#8b5cf6" />

        {/* Gentle Ambient Float */}
        <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.4}>
          <GyroscopicLattice />
        </Float>
      </Canvas>
    </div>
  );
}
