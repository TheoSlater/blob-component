"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Palette, Copy, Check } from "lucide-react"

interface ColorPickerModalProps {
  colors: string[]
  onColorsChange: (colors: string[]) => void
}

export function ColorPickerModal({ colors, onColorsChange }: ColorPickerModalProps) {
  const [tempColors, setTempColors] = useState(colors)
  const [copied, setCopied] = useState(false)

  const predefinedColors = [
    "#ff6b6b",
    "#4ecdc4",
    "#45b7d1",
    "#96ceb4",
    "#feca57",
    "#ff9ff3",
    "#54a0ff",
    "#5f27cd",
    "#00d2d3",
    "#ff9f43",
    "#10ac84",
    "#ee5a24",
    "#0abde3",
    "#006ba6",
    "#f38ba8",
    "#a8e6cf",
    "#ffd93d",
    "#6c5ce7",
  ]

  const addColor = () => {
    if (tempColors.length < 8) {
      setTempColors([...tempColors, "#ffffff"])
    }
  }

  const removeColor = (index: number) => {
    if (tempColors.length > 2) {
      setTempColors(tempColors.filter((_, i) => i !== index))
    }
  }

  const updateColor = (index: number, color: string) => {
    const newColors = [...tempColors]
    newColors[index] = color
    setTempColors(newColors)
  }

  const applyColors = () => {
    onColorsChange(tempColors)
  }

  const copyGradientCSS = () => {
    const css = `background: linear-gradient(45deg, ${tempColors.join(", ")});`
    navigator.clipboard.writeText(css)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
          <Palette className="w-4 h-4 mr-2" />
          Advanced Colors
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-slate-900 border-white/20 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle>Custom Gradient Creator</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Current Colors */}
          <div className="space-y-3">
            <Label>Gradient Colors ({tempColors.length}/8)</Label>
            <div className="grid grid-cols-2 gap-3">
              {tempColors.map((color, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div
                    className="w-10 h-10 rounded border-2 border-white/20 cursor-pointer flex-shrink-0"
                    style={{ backgroundColor: color }}
                    onClick={() => {
                      const input = document.createElement("input")
                      input.type = "color"
                      input.value = color
                      input.onchange = (e) => updateColor(index, (e.target as HTMLInputElement).value)
                      input.click()
                    }}
                  />
                  <Input
                    value={color}
                    onChange={(e) => updateColor(index, e.target.value)}
                    className="bg-white/10 border-white/20 text-white"
                    placeholder="#000000"
                  />
                  {tempColors.length > 2 && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => removeColor(index)}
                      className="bg-red-500/20 border-red-500/30 text-red-300 hover:bg-red-500/30"
                    >
                      ×
                    </Button>
                  )}
                </div>
              ))}
            </div>

            {tempColors.length < 8 && (
              <Button
                onClick={addColor}
                variant="outline"
                className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                Add Color Stop
              </Button>
            )}
          </div>

          {/* Predefined Colors */}
          <div className="space-y-3">
            <Label>Quick Colors</Label>
            <div className="grid grid-cols-9 gap-2">
              {predefinedColors.map((color, index) => (
                <button
                  key={index}
                  className="w-8 h-8 rounded border-2 border-white/20 hover:border-white/40 transition-colors"
                  style={{ backgroundColor: color }}
                  onClick={() => {
                    if (tempColors.length < 8) {
                      setTempColors([...tempColors, color])
                    }
                  }}
                />
              ))}
            </div>
          </div>

          {/* Gradient Preview */}
          <div className="space-y-2">
            <Label>Preview</Label>
            <div
              className="w-full h-16 rounded border border-white/20"
              style={{
                background: `linear-gradient(45deg, ${tempColors.join(", ")})`,
              }}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button onClick={applyColors} className="flex-1">
              Apply to Blob
            </Button>
            <Button
              onClick={copyGradientCSS}
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
