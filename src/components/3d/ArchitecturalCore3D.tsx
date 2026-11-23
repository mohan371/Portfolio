"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function useIsDarkMode() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkDark = () => {
      const root = document.documentElement;
      setIsDark(root.classList.contains("dark") || root.getAttribute("data-theme") === "obsidian");
    };

    checkDark();

    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  return isDark;
}

function GyroscopicLattice({ isDark }: { isDark: boolean }) {
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

    // Continuous smooth idle rotations
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.25;
      coreRef.current.rotation.x += delta * 0.15;
    }
    if (ring1Ref.current) ring1Ref.current.rotation.z += delta * 0.3;
    if (ring2Ref.current) ring2Ref.current.rotation.x += delta * 0.2;
    if (ring3Ref.current) ring3Ref.current.rotation.y -= delta * 0.25;
  });

  // Palette selection
  const coreColor = isDark ? "#18181b" : "#64748b";
  const wireframeColor = isDark ? "#00f5ff" : "#2563eb";
  const ring1Color = isDark ? "#ffffff" : "#334155";
  const ring2Color = isDark ? "#8b5cf6" : "#2563eb";
  const ring3Color = isDark ? "#00f5ff" : "#0f766e";

  return (
    <group ref={groupRef}>
      {/* Central Inner Solid: Metallic Silver / Obsidian Icosahedron */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1.2, 0]} />
        <meshStandardMaterial
          color={coreColor}
          roughness={isDark ? 0.15 : 0.2}
          metalness={isDark ? 0.85 : 0.9}
        />
      </mesh>

      {/* Inner Wireframe Cage Overlay */}
      <mesh>
        <icosahedronGeometry args={[1.22, 1]} />
        <meshBasicMaterial
          color={wireframeColor}
          wireframe
          transparent
          opacity={isDark ? 0.35 : 0.45}
        />
      </mesh>

      {/* Middle Gyroscopic Gimbal Ring 1 */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.7, 0.02, 16, 64]} />
        <meshStandardMaterial
          color={ring1Color}
          metalness={0.9}
          roughness={0.15}
        />
      </mesh>

      {/* Middle Gyroscopic Gimbal Ring 2 */}
      <mesh ref={ring2Ref} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.95, 0.018, 16, 64]} />
        <meshStandardMaterial
          color={ring2Color}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Outer Datum Coordinate Ring 3 */}
      <mesh ref={ring3Ref} rotation={[0, Math.PI / 4, Math.PI / 4]}>
        <torusGeometry args={[2.2, 0.015, 16, 64]} />
        <meshBasicMaterial
          color={ring3Color}
          transparent
          opacity={isDark ? 0.4 : 0.6}
        />
      </mesh>

      {/* Orbiting Constellation Nodes */}
      {particlePositions.map((pos, idx) => {
        let nodeColor = isDark
          ? idx % 3 === 0
            ? "#00f5ff"
            : "#ffffff"
          : idx % 3 === 0
          ? "#2563eb"
          : idx % 3 === 1
          ? "#0f766e"
          : "#64748b";

        return (
          <mesh key={idx} position={pos}>
            <sphereGeometry args={[0.035, 8, 8]} />
            <meshBasicMaterial color={nodeColor} />
          </mesh>
        );
      })}
    </group>
  );
}

export default function ArchitecturalCore3D() {
  const isDark = useIsDarkMode();

  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        {/* Balanced Engineering Lighting */}
        <ambientLight intensity={isDark ? 0.6 : 0.85} />
        <directionalLight
          position={[5, 6, 5]}
          intensity={isDark ? 1.5 : 1.8}
          color="#ffffff"
        />
        <pointLight
          position={[-4, -3, -2]}
          intensity={isDark ? 2.0 : 2.4}
          color={isDark ? "#00f5ff" : "#2563eb"}
        />
        <pointLight
          position={[3, -4, 2]}
          intensity={isDark ? 1.5 : 1.8}
          color={isDark ? "#8b5cf6" : "#0f766e"}
        />

        {/* Gentle Ambient Float */}
        <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.4}>
          <GyroscopicLattice isDark={isDark} />
        </Float>
      </Canvas>
    </div>
  );
}
