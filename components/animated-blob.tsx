// MIT Licensed – © 2025 Theo Slater
// https://github.com/TheoSlater/blob-component
// theoslater.xyz


"use client"

import type React from "react"

import { useEffect, useRef } from "react"

export interface AnimatedBlobProps {
  /** Size of the blob in pixels */
  size?: number
  /** Array of colors for the gradient */
  colors?: string[]
  /** Animation speed multiplier (0.1 = very slow, 2 = very fast) */
  speed?: number
  /** Morphing intensity (0 = perfect circle, 1 = subtle, 2 = moderate, 3+ = extreme) */
  intensity?: number
  /** Additional CSS classes */
  className?: string
  /** Custom styles */
  style?: React.CSSProperties
  /** Enable/disable glow effect */
  glow?: boolean
  /** Enable/disable drop shadow */
  dropShadow?: boolean
  /** Number of vertices for smoothness (12-48 recommended) */
  vertices?: number
  /** Gradient angle in degrees (0-360) */
  gradientAngle?: number
  /** Gradient type: 'linear' or 'radial' */
  gradientType?: "linear" | "radial"
  /** Enable gradient angle animation */
  animateGradient?: boolean
  /** Gradient animation speed multiplier */
  gradientSpeed?: number
  /** Gradient animation direction: 'clockwise' or 'counterclockwise' */
  gradientDirection?: "clockwise" | "counterclockwise"
}

export function AnimatedBlob({
  size = 200,
  colors = ["#6366f1", "#8b5cf6", "#ec4899"],
  speed = 1,
  intensity = 0.5,
  className = "",
  style = {},
  glow = true,
  dropShadow = true,
  vertices = 24,
  gradientAngle = 45,
  gradientType = "linear",
  animateGradient = false,
  gradientSpeed = 1,
  gradientDirection = "clockwise",
}: AnimatedBlobProps) {
  const pathRef = useRef<SVGPathElement>(null)
  const gradientRef = useRef<SVGLinearGradientElement | SVGRadialGradientElement>(null)
  const animationRef = useRef<number>()
  const gradientId = useRef(`blob-gradient-${Math.random().toString(36).substr(2, 9)}`)

  useEffect(() => {
    let time = 0

    const animate = () => {
      time += 0.01 * speed

      if (pathRef.current) {
        const path = generateBlobPath(size / 2, time, intensity, vertices)
        pathRef.current.setAttribute("d", path)
      }

      // Animate gradient if enabled
      if (animateGradient && gradientRef.current && gradientType === "linear") {
        const gradientTime = time * gradientSpeed
        const direction = gradientDirection === "clockwise" ? 1 : -1
        const animatedAngle = gradientAngle + gradientTime * 30 * direction // 30 degrees per second base speed
        const gradientCoords = getGradientCoords(animatedAngle, gradientType)

        gradientRef.current.setAttribute("x1", gradientCoords.x1)
        gradientRef.current.setAttribute("y1", gradientCoords.y1)
        gradientRef.current.setAttribute("x2", gradientCoords.x2)
        gradientRef.current.setAttribute("y2", gradientCoords.y2)
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [size, speed, intensity, vertices, gradientAngle, gradientType, animateGradient, gradientSpeed, gradientDirection])

  const generateBlobPath = (baseRadius: number, time: number, morphIntensity: number, pointCount: number): string => {
    const padding = Math.max(20, baseRadius * 0.1) // Dynamic padding based on size
    const radius = baseRadius - padding
    const points = Math.max(12, Math.min(48, pointCount)) // Clamp vertices between 12-48
    const angleStep = (Math.PI * 2) / points
    let path = ""

    const coords: Array<{ x: number; y: number }> = []

    // Base noise multiplier - much more subtle for circular appearance
    const baseNoise = morphIntensity * 0.03 // Even more reduced

    // Generate points around a circle with noise
    for (let i = 0; i <= points; i++) {
      const angle = i * angleStep

      // Multiple layers of noise with very subtle amplitudes
      const noise1 = Math.sin(angle * 3 + time) * baseNoise
      const noise2 = Math.cos(angle * 5 + time * 1.5) * (baseNoise * 0.5)
      const noise3 = Math.sin(angle * 7 + time * 0.8) * (baseNoise * 0.25)

      const radiusVariation = 1 + noise1 + noise2 + noise3
      const currentRadius = radius * radiusVariation

      const x = Math.cos(angle) * currentRadius + size / 2
      const y = Math.sin(angle) * currentRadius + size / 2

      coords.push({ x, y })
    }

    // Create smooth curved path using cubic Bezier curves
    if (coords.length > 0) {
      path = `M ${coords[0].x} ${coords[0].y}`

      for (let i = 0; i < coords.length - 1; i++) {
        const current = coords[i]
        const next = coords[(i + 1) % coords.length]
        const nextNext = coords[(i + 2) % coords.length]
        const prev = coords[(i - 1 + coords.length) % coords.length]

        // Calculate control points for smooth cubic curves
        const cp1x = current.x + (next.x - prev.x) * 0.15
        const cp1y = current.y + (next.y - prev.y) * 0.15
        const cp2x = next.x - (nextNext.x - current.x) * 0.15
        const cp2y = next.y - (nextNext.y - current.y) * 0.15

        path += ` C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${next.x} ${next.y}`
      }

      path += " Z"
    }

    return path
  }

  // Calculate gradient coordinates based on angle
  const getGradientCoords = (angle: number, type: "linear" | "radial") => {
    if (type === "radial") {
      return {
        x1: "50%",
        y1: "50%",
        x2: "50%",
        y2: "50%",
        r: "50%",
      }
    }

    // Convert angle to radians and calculate coordinates
    const radians = (angle * Math.PI) / 180
    const x1 = 50 - 50 * Math.cos(radians)
    const y1 = 50 - 50 * Math.sin(radians)
    const x2 = 50 + 50 * Math.cos(radians)
    const y2 = 50 + 50 * Math.sin(radians)

    return {
      x1: `${x1}%`,
      y1: `${y1}%`,
      x2: `${x2}%`,
      y2: `${y2}%`,
    }
  }

  const gradientCoords = getGradientCoords(gradientAngle, gradientType)
  const shadowClass = dropShadow ? "drop-shadow-lg" : ""

  return (
    <div className={`relative ${className}`} style={style}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className={shadowClass}>
        <defs>
          {gradientType === "linear" ? (
            <linearGradient
              ref={gradientRef as React.RefObject<SVGLinearGradientElement>}
              id={gradientId.current}
              x1={gradientCoords.x1}
              y1={gradientCoords.y1}
              x2={gradientCoords.x2}
              y2={gradientCoords.y2}
            >
              {colors.map((color, index) => (
                <stop key={index} offset={`${(index / Math.max(1, colors.length - 1)) * 100}%`} stopColor={color} />
              ))}
            </linearGradient>
          ) : (
            <radialGradient
              ref={gradientRef as React.RefObject<SVGRadialGradientElement>}
              id={gradientId.current}
              cx={gradientCoords.x1}
              cy={gradientCoords.y1}
              r={gradientCoords.r}
            >
              {colors.map((color, index) => (
                <stop key={index} offset={`${(index / Math.max(1, colors.length - 1)) * 100}%`} stopColor={color} />
              ))}
            </radialGradient>
          )}
          {glow && (
            <filter id={`glow-${gradientId.current}`}>
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          )}
        </defs>
        <path
          ref={pathRef}
          fill={`url(#${gradientId.current})`}
          filter={glow ? `url(#glow-${gradientId.current})` : undefined}
          className="transition-all duration-100 ease-out"
        />
      </svg>
    </div>
  )
}

// Preset configurations for common use cases
export const BlobPresets = {
  subtle: { intensity: 0.3, speed: 0.8 },
  normal: { intensity: 0.5, speed: 1 },
  dynamic: { intensity: 1, speed: 1.5 },
  extreme: { intensity: 2, speed: 2 },
  static: { intensity: 0, speed: 0 },
  gradientSpin: { intensity: 0.5, speed: 1, animateGradient: true, gradientSpeed: 1 },
  fastSpin: { intensity: 0.8, speed: 1.2, animateGradient: true, gradientSpeed: 2 },
} as const

// Color presets
export const BlobColors = {
  purple: ["#6366f1", "#8b5cf6", "#ec4899"],
  ocean: ["#06b6d4", "#0891b2", "#0e7490"],
  sunset: ["#f59e0b", "#f97316", "#ef4444"],
  forest: ["#10b981", "#059669", "#047857"],
  rose: ["#ec4899", "#be185d", "#9f1239"],
  monochrome: ["#374151", "#6b7280", "#9ca3af"],
  rainbow: [
    "#ff0000",
    "#ff8000",
    "#ffff00",
    "#80ff00",
    "#00ff00",
    "#00ff80",
    "#00ffff",
    "#0080ff",
    "#0000ff",
    "#8000ff",
    "#ff00ff",
    "#ff0080",
  ],
  neon: ["#ff006e", "#8338ec", "#3a86ff", "#06ffa5"],
} as const
