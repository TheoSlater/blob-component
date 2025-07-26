"use client"

import { AnimatedBlob } from "./animated-blob"

export function SimpleBlob() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <AnimatedBlob size={300} colors={["#6366f1", "#8b5cf6", "#ec4899"]} speed={1} />
    </div>
  )
}
