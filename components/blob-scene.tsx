"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import { MeshBlob } from "./mesh-blob"

export function BlobScene() {
  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} gl={{ antialias: true, alpha: true }}>
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff6b6b" />
        <pointLight position={[10, -10, 10]} intensity={0.5} color="#4ecdc4" />

        {/* Environment for reflections */}
        <Environment preset="city" />

        {/* Main blob */}
        <MeshBlob position={[0, 0, 0]} scale={1.5} color="#6366f1" />

        {/* Additional smaller blobs */}
        <MeshBlob position={[-3, 1, -2]} scale={0.8} color="#ec4899" />
        <MeshBlob position={[3, -1, -1]} scale={0.6} color="#10b981" />
        <MeshBlob position={[0, 2.5, -3]} scale={0.4} color="#f59e0b" />

        {/* Controls */}
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          minDistance={3}
          maxDistance={10}
          autoRotate={true}
          autoRotateSpeed={0.5}
        />
      </Canvas>

      {/* UI Overlay */}
      <div className="absolute top-8 left-8 text-white">
        <h1 className="text-4xl font-bold mb-2">Mesh Blob</h1>
        <p className="text-lg opacity-80">Interactive 3D organic shapes</p>
        <p className="text-sm opacity-60 mt-4">Drag to rotate • Scroll to zoom</p>
      </div>
    </div>
  )
}
