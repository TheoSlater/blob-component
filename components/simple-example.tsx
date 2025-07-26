"use client"

import { AnimatedBlob, BlobColors, BlobPresets } from "./animated-blob"

export function SimpleExample() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 gap-8">
      {/* Basic blob */}
      <AnimatedBlob />

      {/* Custom blob */}
      <AnimatedBlob size={250} colors={BlobColors.sunset} intensity={0.3} speed={1.2} />

      {/* Preset blob */}
      <AnimatedBlob size={180} colors={BlobColors.ocean} {...BlobPresets.subtle} />
    </div>
  )
}
