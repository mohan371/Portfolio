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
    const targetX = state.pointer.y * 0.4;
    const targetY = state.pointer.x * 0.55;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.04);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, 0.04);

    // Continuous smooth, restrained rotations
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.2;
      coreRef.current.rotation.x += delta * 0.12;
    }
    if (ring1Ref.current) ring1Ref.current.rotation.z += delta * 0.22;
    if (ring2Ref.current) ring2Ref.current.rotation.x += delta * 0.16;
    if (ring3Ref.current) ring3Ref.current.rotation.y -= delta * 0.18;
  });

  // Warm Pearl Palette Selection:
  // Light: Champagne Metallic Core (#B69A72), Deep Burgundy Wireframe (#873D49), Graphite (#302B2A), Muted Rose (#C58B8B)
  // Dark: Warm Espresso (#24201E), Champagne Gold (#C9B08B), Soft Rose (#D9A0A0)
  const coreColor = isDark ? "#2A2422" : "#B69A72";
  const wireframeColor = isDark ? "#D9A0A0" : "#873D49";
  const ring1Color = isDark ? "#C9B08B" : "#302B2A";
  const ring2Color = isDark ? "#A35360" : "#C58B8B";
  const ring3Color = isDark ? "#C9B08B" : "#B69A72";

  return (
    <group ref={groupRef}>
      {/* Central Solid: Champagne Metallic / Warm Espresso Icosahedron */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1.2, 0]} />
        <meshStandardMaterial
          color={coreColor}
          roughness={isDark ? 0.2 : 0.25}
          metalness={isDark ? 0.75 : 0.85}
        />
      </mesh>

      {/* Inner Wireframe Cage: Signature Burgundy */}
      <mesh>
        <icosahedronGeometry args={[1.22, 1]} />
        <meshBasicMaterial
          color={wireframeColor}
          wireframe
          transparent
          opacity={isDark ? 0.45 : 0.55}
        />
      </mesh>

      {/* Middle Gyroscopic Gimbal Ring 1: Graphite Charcoal */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.7, 0.02, 16, 64]} />
        <meshStandardMaterial
          color={ring1Color}
          metalness={0.85}
          roughness={0.2}
        />
      </mesh>

      {/* Middle Gyroscopic Gimbal Ring 2: Muted Rose */}
      <mesh ref={ring2Ref} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.95, 0.018, 16, 64]} />
        <meshStandardMaterial
          color={ring2Color}
          metalness={0.8}
          roughness={0.25}
        />
      </mesh>

      {/* Outer Coordinate Ring 3: Warm Champagne */}
      <mesh ref={ring3Ref} rotation={[0, Math.PI / 4, Math.PI / 4]}>
        <torusGeometry args={[2.2, 0.015, 16, 64]} />
        <meshBasicMaterial
          color={ring3Color}
          transparent
          opacity={isDark ? 0.5 : 0.65}
        />
      </mesh>

      {/* Orbiting Constellation Nodes */}
      {particlePositions.map((pos, idx) => {
        let nodeColor = isDark
          ? idx % 3 === 0
            ? "#C9B08B"
            : idx % 3 === 1
            ? "#D9A0A0"
            : "#98A89A"
          : idx % 3 === 0
          ? "#873D49"
          : idx % 3 === 1
          ? "#B69A72"
          : "#829084";

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
        {/* Controlled Studio-Style Warm Lighting */}
        <ambientLight intensity={isDark ? 0.7 : 0.9} color="#FFFBF5" />
        <directionalLight
          position={[5, 6, 5]}
          intensity={isDark ? 1.4 : 1.7}
          color="#FFF8EE"
        />
        {/* Warm Burgundy Rim Light */}
        <pointLight
          position={[-4, -3, -2]}
          intensity={isDark ? 1.8 : 2.0}
          color={isDark ? "#A35360" : "#873D49"}
        />
        {/* Champagne Fill Light */}
        <pointLight
          position={[3, -4, 2]}
          intensity={isDark ? 1.4 : 1.6}
          color={isDark ? "#C9B08B" : "#B69A72"}
        />

        {/* Gentle Ambient Float */}
        <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.3}>
          <GyroscopicLattice isDark={isDark} />
        </Float>
      </Canvas>
    </div>
  );
}
