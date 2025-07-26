"use client"

import { useState } from "react"
import { AnimatedBlob, BlobColors } from "./animated-blob"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Plus, RotateCw, RotateCcw } from "lucide-react"

export function BlobShowcase() {
  // State for all blob settings
  const [size, setSize] = useState([200])
  const [intensity, setIntensity] = useState([0.5])
  const [speed, setSpeed] = useState([1])
  const [vertices, setVertices] = useState([24])
  const [glow, setGlow] = useState(true)
  const [dropShadow, setDropShadow] = useState(true)
  const [selectedColors, setSelectedColors] = useState("purple")
  const [gradientAngle, setGradientAngle] = useState([45])
  const [gradientType, setGradientType] = useState<"linear" | "radial">("linear")

  // New gradient animation states
  const [animateGradient, setAnimateGradient] = useState(false)
  const [gradientSpeed, setGradientSpeed] = useState([1])
  const [gradientDirection, setGradientDirection] = useState<"clockwise" | "counterclockwise">("clockwise")

  const [customColors, setCustomColors] = useState(["#6366f1", "#8b5cf6", "#ec4899"])

  // Custom color functions
  const addCustomColor = () => {
    if (customColors.length < 6) {
      setCustomColors([...customColors, "#ffffff"])
    }
  }

  const removeCustomColor = (index: number) => {
    if (customColors.length > 2) {
      setCustomColors(customColors.filter((_, i) => i !== index))
    }
  }

  const updateCustomColor = (index: number, color: string) => {
    const newColors = [...customColors]
    newColors[index] = color
    setCustomColors(newColors)
  }

  // Get current color array
  const getCurrentColors = () => {
    if (selectedColors === "custom") {
      return customColors
    }
    return BlobColors[selectedColors as keyof typeof BlobColors] || BlobColors.purple
  }

  // Gradient direction presets
  const gradientPresets = [
    { name: "Top to Bottom", angle: 180 },
    { name: "Left to Right", angle: 90 },
    { name: "Diagonal ↘", angle: 135 },
    { name: "Diagonal ↙", angle: 45 },
    { name: "Bottom to Top", angle: 0 },
    { name: "Right to Left", angle: 270 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Interactive Blob Component</h1>
          <p className="text-lg text-white/80">Customize your blob with animated gradients</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Blob Preview */}
          <div className="flex items-center justify-center bg-white/5 backdrop-blur-sm rounded-lg p-8 min-h-[400px]">
            <AnimatedBlob
              size={size[0]}
              colors={getCurrentColors()}
              intensity={intensity[0]}
              speed={speed[0]}
              vertices={vertices[0]}
              glow={glow}
              dropShadow={dropShadow}
              gradientAngle={gradientAngle[0]}
              gradientType={gradientType}
              animateGradient={animateGradient}
              gradientSpeed={gradientSpeed[0]}
              gradientDirection={gradientDirection}
            />
          </div>

          {/* Controls */}
          <div className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Blob Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Size Control */}
                <div className="space-y-2">
                  <Label className="text-white flex justify-between">
                    Size
                    <span className="text-white/60">{size[0]}px</span>
                  </Label>
                  <Slider value={size} onValueChange={setSize} min={50} max={400} step={10} className="w-full" />
                </div>

                {/* Intensity Control */}
                <div className="space-y-2">
                  <Label className="text-white flex justify-between">
                    Morphing Intensity
                    <span className="text-white/60">{intensity[0].toFixed(1)}</span>
                  </Label>
                  <Slider
                    value={intensity}
                    onValueChange={setIntensity}
                    min={0}
                    max={2}
                    step={0.1}
                    className="w-full"
                  />
                </div>

                {/* Speed Control */}
                <div className="space-y-2">
                  <Label className="text-white flex justify-between">
                    Animation Speed
                    <span className="text-white/60">{speed[0].toFixed(1)}x</span>
                  </Label>
                  <Slider value={speed} onValueChange={setSpeed} min={0} max={3} step={0.1} className="w-full" />
                </div>

                {/* Vertices Control */}
                <div className="space-y-2">
                  <Label className="text-white flex justify-between">
                    Smoothness (Vertices)
                    <span className="text-white/60">{vertices[0]}</span>
                  </Label>
                  <Slider value={vertices} onValueChange={setVertices} min={12} max={48} step={2} className="w-full" />
                </div>

                {/* Color Selection */}
                <div className="space-y-4">
                  <Label className="text-white">Color Scheme</Label>

                  {/* Preset Colors */}
                  <Select value={selectedColors} onValueChange={setSelectedColors}>
                    <SelectTrigger className="w-full bg-white/10 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-white/20">
                      <SelectItem value="purple" className="text-white">
                        Purple Gradient
                      </SelectItem>
                      <SelectItem value="ocean" className="text-white">
                        Ocean Blue
                      </SelectItem>
                      <SelectItem value="sunset" className="text-white">
                        Sunset Orange
                      </SelectItem>
                      <SelectItem value="forest" className="text-white">
                        Forest Green
                      </SelectItem>
                      <SelectItem value="rose" className="text-white">
                        Rose Pink
                      </SelectItem>
                      <SelectItem value="monochrome" className="text-white">
                        Monochrome
                      </SelectItem>
                      <SelectItem value="rainbow" className="text-white">
                        Rainbow
                      </SelectItem>
                      <SelectItem value="neon" className="text-white">
                        Neon
                      </SelectItem>
                      <SelectItem value="custom" className="text-white">
                        Custom Colors
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Custom Color Picker */}
                  {selectedColors === "custom" && (
                    <div className="space-y-3 p-4 bg-white/5 rounded-lg border border-white/10">
                      <div className="flex items-center justify-between">
                        <Label className="text-white text-sm">Custom Gradient</Label>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={addCustomColor}
                          className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                        >
                          <Plus className="w-3 h-3 mr-1" />
                          Add Color
                        </Button>
                      </div>

                      <div className="space-y-2">
                        {customColors.map((color, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div className="flex items-center gap-2 flex-1">
                              <div
                                className="w-8 h-8 rounded border-2 border-white/20 cursor-pointer"
                                style={{ backgroundColor: color }}
                                onClick={() => {
                                  const input = document.createElement("input")
                                  input.type = "color"
                                  input.value = color
                                  input.onchange = (e) => updateCustomColor(index, (e.target as HTMLInputElement).value)
                                  input.click()
                                }}
                              />
                              <Input
                                value={color}
                                onChange={(e) => updateCustomColor(index, e.target.value)}
                                className="bg-white/10 border-white/20 text-white text-sm"
                                placeholder="#000000"
                              />
                            </div>
                            {customColors.length > 2 && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => removeCustomColor(index)}
                                className="bg-red-500/20 border-red-500/30 text-red-300 hover:bg-red-500/30 p-2"
                              >
                                <X className="w-3 h-3" />
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Gradient Preview */}
                      <div className="mt-3">
                        <Label className="text-white text-xs">Preview:</Label>
                        <div
                          className="w-full h-6 rounded mt-1 border border-white/20"
                          style={{
                            background:
                              gradientType === "linear"
                                ? `linear-gradient(${gradientAngle[0]}deg, ${customColors.join(", ")})`
                                : `radial-gradient(circle, ${customColors.join(", ")})`,
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Gradient Controls */}
                <div className="space-y-4 p-4 bg-white/5 rounded-lg border border-white/10">
                  <Label className="text-white">Gradient Settings</Label>

                  {/* Gradient Type */}
                  <div className="space-y-2">
                    <Label className="text-white text-sm">Type</Label>
                    <Select value={gradientType} onValueChange={(value: "linear" | "radial") => setGradientType(value)}>
                      <SelectTrigger className="w-full bg-white/10 border-white/20 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-white/20">
                        <SelectItem value="linear" className="text-white">
                          Linear Gradient
                        </SelectItem>
                        <SelectItem value="radial" className="text-white">
                          Radial Gradient
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Gradient Animation Toggle */}
                  <div className="flex items-center justify-between">
                    <Label className="text-white text-sm">Animate Gradient</Label>
                    <Switch checked={animateGradient} onCheckedChange={setAnimateGradient} />
                  </div>

                  {/* Gradient Animation Controls */}
                  {animateGradient && gradientType === "linear" && (
                    <div className="space-y-4 p-3 bg-white/5 rounded border border-white/10">
                      {/* Gradient Speed */}
                      <div className="space-y-2">
                        <Label className="text-white text-xs flex justify-between">
                          Rotation Speed
                          <span className="text-white/60">{gradientSpeed[0].toFixed(1)}x</span>
                        </Label>
                        <Slider
                          value={gradientSpeed}
                          onValueChange={setGradientSpeed}
                          min={0.1}
                          max={3}
                          step={0.1}
                          className="w-full"
                        />
                      </div>

                      {/* Gradient Direction */}
                      <div className="space-y-2">
                        <Label className="text-white text-xs">Direction</Label>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant={gradientDirection === "clockwise" ? "default" : "outline"}
                            onClick={() => setGradientDirection("clockwise")}
                            className={`flex-1 ${
                              gradientDirection === "clockwise"
                                ? "bg-blue-600 hover:bg-blue-700"
                                : "bg-white/10 border-white/20 text-white hover:bg-white/20"
                            }`}
                          >
                            <RotateCw className="w-3 h-3 mr-1" />
                            Clockwise
                          </Button>
                          <Button
                            size="sm"
                            variant={gradientDirection === "counterclockwise" ? "default" : "outline"}
                            onClick={() => setGradientDirection("counterclockwise")}
                            className={`flex-1 ${
                              gradientDirection === "counterclockwise"
                                ? "bg-blue-600 hover:bg-blue-700"
                                : "bg-white/10 border-white/20 text-white hover:bg-white/20"
                            }`}
                          >
                            <RotateCcw className="w-3 h-3 mr-1" />
                            Counter
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Static Gradient Angle (only when not animating) */}
                  {gradientType === "linear" && !animateGradient && (
                    <>
                      <div className="space-y-2">
                        <Label className="text-white text-sm flex justify-between">
                          Angle
                          <span className="text-white/60">{gradientAngle[0]}°</span>
                        </Label>
                        <Slider
                          value={gradientAngle}
                          onValueChange={setGradientAngle}
                          min={0}
                          max={360}
                          step={5}
                          className="w-full"
                        />
                      </div>

                      {/* Quick Angle Presets */}
                      <div className="space-y-2">
                        <Label className="text-white text-xs">Quick Directions</Label>
                        <div className="grid grid-cols-2 gap-2">
                          {gradientPresets.map((preset) => (
                            <Button
                              key={preset.name}
                              size="sm"
                              variant="outline"
                              onClick={() => setGradientAngle([preset.angle])}
                              className="bg-white/10 border-white/20 text-white hover:bg-white/20 text-xs"
                            >
                              {preset.name}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  {/* Visual Direction Indicator */}
                  {gradientType === "linear" && !animateGradient && (
                    <div className="flex items-center justify-center">
                      <div className="relative w-16 h-16 border border-white/20 rounded-full bg-white/5">
                        <div
                          className="absolute w-0.5 h-6 bg-white/60 rounded"
                          style={{
                            top: "50%",
                            left: "50%",
                            transformOrigin: "bottom center",
                            transform: `translate(-50%, -100%) rotate(${gradientAngle[0]}deg)`,
                          }}
                        />
                        <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2" />
                      </div>
                    </div>
                  )}

                  {/* Animated Gradient Indicator */}
                  {gradientType === "linear" && animateGradient && (
                    <div className="flex items-center justify-center">
                      <div className="relative w-16 h-16 border border-white/20 rounded-full bg-white/5">
                        <div className="absolute inset-2 border border-dashed border-white/30 rounded-full animate-spin" />
                        <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2" />
                        <div className="absolute top-2 left-1/2 w-0.5 h-2 bg-white/60 rounded transform -translate-x-1/2" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Effect Toggles */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-white">Glow Effect</Label>
                    <Switch checked={glow} onCheckedChange={setGlow} />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-white">Drop Shadow</Label>
                    <Switch checked={dropShadow} onCheckedChange={setDropShadow} />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Code Output */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Generated Code</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-black/30 p-4 rounded-lg">
                  <code className="text-green-400 text-sm whitespace-pre-wrap">
                    {`<AnimatedBlob
  size={${size[0]}}
  colors={${
    selectedColors === "custom" ? `[${customColors.map((c) => `"${c}"`).join(", ")}]` : `BlobColors.${selectedColors}`
  }}
  intensity={${intensity[0]}}
  speed={${speed[0]}}
  vertices={${vertices[0]}}
  gradientAngle={${gradientAngle[0]}}
  gradientType="${gradientType}"
  animateGradient={${animateGradient}}
  gradientSpeed={${gradientSpeed[0]}}
  gradientDirection="${gradientDirection}"
  glow={${glow}}
  dropShadow={${dropShadow}}
/>`}
                  </code>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Preset Examples */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Animation Presets</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <button
              onClick={() => {
                setSize([150])
                setIntensity([0.2])
                setSpeed([0.8])
                setVertices([24])
                setSelectedColors("purple")
                setGradientAngle([45])
                setGradientType("linear")
                setAnimateGradient(false)
                setGlow(true)
                setDropShadow(true)
              }}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-colors"
            >
              <AnimatedBlob size={80} colors={BlobColors.purple} intensity={0.2} speed={0.8} gradientAngle={45} />
              <p className="text-white text-sm mt-2">Static</p>
            </button>

            <button
              onClick={() => {
                setSize([200])
                setIntensity([0.5])
                setSpeed([1])
                setVertices([24])
                setSelectedColors("rainbow")
                setGradientAngle([0])
                setGradientType("linear")
                setAnimateGradient(true)
                setGradientSpeed([1])
                setGradientDirection("clockwise")
                setGlow(true)
                setDropShadow(true)
              }}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-colors"
            >
              <AnimatedBlob
                size={80}
                colors={BlobColors.rainbow}
                intensity={0.5}
                speed={1}
                animateGradient={true}
                gradientSpeed={1}
              />
              <p className="text-white text-sm mt-2">Rainbow Spin</p>
            </button>

            <button
              onClick={() => {
                setSize([250])
                setIntensity([1.2])
                setSpeed([1.5])
                setVertices([32])
                setSelectedColors("neon")
                setGradientAngle([90])
                setGradientType("linear")
                setAnimateGradient(true)
                setGradientSpeed([2])
                setGradientDirection("counterclockwise")
                setGlow(true)
                setDropShadow(true)
              }}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-colors"
            >
              <AnimatedBlob
                size={80}
                colors={BlobColors.neon}
                intensity={1.2}
                speed={1.5}
                animateGradient={true}
                gradientSpeed={2}
                gradientDirection="counterclockwise"
              />
              <p className="text-white text-sm mt-2">Fast Neon</p>
            </button>

            <button
              onClick={() => {
                setSize([180])
                setIntensity([0.8])
                setSpeed([0.6])
                setVertices([36])
                setSelectedColors("sunset")
                setGradientAngle([135])
                setGradientType("linear")
                setAnimateGradient(true)
                setGradientSpeed([0.5])
                setGradientDirection("clockwise")
                setGlow(true)
                setDropShadow(true)
              }}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-colors"
            >
              <AnimatedBlob
                size={80}
                colors={BlobColors.sunset}
                intensity={0.8}
                speed={0.6}
                animateGradient={true}
                gradientSpeed={0.5}
              />
              <p className="text-white text-sm mt-2">Slow Sunset</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
