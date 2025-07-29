# 🌊 Animated Blob Component

A highly customizable animated SVG blob component for React/Next.js. Create beautiful, organic shapes with smooth morphing, gradient effects, and extensive configuration options.
---

## ✨ Features

- 🎨 **Customizable Colors** – Gradients, custom schemes, and preset palettes  
- 🌀 **Smooth Animations** – Organic morphing with adjustable speed and intensity  
- 🌈 **Gradient Control** – Linear or radial gradients with animated rotation  
- 💫 **Visual Effects** – Glow, drop shadows, and advanced styling options  
- 📱 **Responsive** – Scales across all screen sizes  
- ⚡ **Optimized Performance** – Efficient rendering using `requestAnimationFrame`  
- 🧩 **Simple API** – Intuitive props with sensible defaults  
- 🔐 **TypeScript Support** – Full typings and IntelliSense

---

## 🚀 Quick Start

### 1. Installation

Copy the component file:

```bash
# Create a components directory (if needed)
mkdir -p components

# Copy the component file
# (Assumes you have animated-blob.tsx ready)
cp path/to/animated-blob.tsx components/
```

Install dependencies:

```bash
npm install lucide-react
# or
yarn add lucide-react
```

> **Note**: Tailwind CSS must be configured in your project for styling.

---

### 2. Basic Usage

```tsx
import { AnimatedBlob } from './components/animated-blob';

export default function MyComponent() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <AnimatedBlob />
    </div>
  );
}
```

---

## 📖 API Reference

| Prop               | Type                                      | Default                                  | Description                                               |
|--------------------|-------------------------------------------|------------------------------------------|-----------------------------------------------------------|
| `size`             | `number`                                  | `200`                                    | Size of the blob in pixels                                |
| `colors`           | `string[]`                                | `["#6366f1", "#8b5cf6", "#ec4899"]`      | Gradient color array (at least 2 colors recommended)      |
| `speed`            | `number`                                  | `1`                                      | Animation speed multiplier                                |
| `intensity`        | `number`                                  | `0.5`                                    | Morphing intensity (0 = circle, higher = more deformation)|
| `vertices`         | `number`                                  | `24`                                     | Number of polygon points (12–48 recommended)              |
| `glow`             | `boolean`                                 | `true`                                   | Enable/disable glow effect                                |
| `dropShadow`       | `boolean`                                 | `true`                                   | Enable/disable drop shadow                                |
| `gradientAngle`    | `number`                                  | `45`                                     | Angle of the gradient in degrees (0–360)                  |
| `gradientType`     | `"linear"` \| `"radial"`                  | `"linear"`                               | Type of gradient                                           |
| `animateGradient`  | `boolean`                                 | `false`                                  | Whether the gradient rotates                              |
| `gradientSpeed`    | `number`                                  | `1`                                      | Speed of gradient animation                               |
| `gradientDirection`| `"clockwise"` \| `"counterclockwise"`     | `"clockwise"`                            | Direction of animated gradient rotation                   |
| `className`        | `string`                                  | `""`                                     | Additional Tailwind/utility classes                       |
| `style`            | `React.CSSProperties`                     | `{}`                                     | Inline styles                                             |

---

## 💡 Examples

### Basic Blob

```tsx
<AnimatedBlob 
  size={200} 
  colors={["#6366f1", "#8b5cf6", "#ec4899"]}
/>
```

### Custom Colors & Animation

```tsx
<AnimatedBlob
  size={300}
  colors={["#ff6b6b", "#4ecdc4", "#45b7d1"]}
  intensity={1.2}
  speed={1.5}
  vertices={32}
/>
```

### Animated Gradient

```tsx
<AnimatedBlob
  size={250}
  colors={["#f59e0b", "#f97316", "#ef4444"]}
  animateGradient
  gradientSpeed={2}
  gradientDirection="counterclockwise"
/>
```

### Radial Gradient

```tsx
<AnimatedBlob
  size={200}
  colors={["#10b981", "#059669", "#047857"]}
  gradientType="radial"
  intensity={0.8}
/>
```

### Static Blob (No Animation)

```tsx
<AnimatedBlob
  size={150}
  colors={["#374151", "#6b7280", "#9ca3af"]}
  speed={0}
  intensity={0}
/>
```

---

## 🎭 Presets

```tsx
import { AnimatedBlob, BlobPresets } from './components/animated-blob';

<AnimatedBlob {...BlobPresets.subtle} />
<AnimatedBlob {...BlobPresets.dynamic} />
<AnimatedBlob {...BlobPresets.extreme} />
<AnimatedBlob {...BlobPresets.static} />
<AnimatedBlob {...BlobPresets.gradientSpin} />
```

---

## 🎨 Color Presets

```tsx
import { AnimatedBlob, BlobColors } from './components/animated-blob';

<AnimatedBlob colors={BlobColors.purple} />
<AnimatedBlob colors={BlobColors.ocean} />
<AnimatedBlob colors={BlobColors.sunset} />
<AnimatedBlob colors={BlobColors.rainbow} />
<AnimatedBlob colors={BlobColors.neon} />
```

---

## 🧩 Use Cases

### Hero Sections

```tsx
<section className="relative min-h-screen flex items-center justify-center overflow-hidden">
  <div className="absolute top-10 right-10 opacity-20">
    <AnimatedBlob 
      size={400} 
      colors={BlobColors.sunset}
      intensity={0.8}
      speed={0.5}
    />
  </div>
  <div className="absolute bottom-20 left-10 opacity-30">
    <AnimatedBlob 
      size={300}
      colors={BlobColors.ocean}
      intensity={1.2}
      speed={0.8}
    />
  </div>
  <h1 className="text-6xl font-bold text-center z-10">
    Welcome to Our Platform
  </h1>
</section>
```

### Loading Indicators

```tsx
<div className="flex items-center justify-center p-8">
  <AnimatedBlob
    size={100}
    colors={["#3b82f6", "#1d4ed8"]}
    intensity={1.5}
    speed={2}
    vertices={16}
  />
  <span className="ml-4 text-lg">Loading...</span>
</div>
```

### Decorative Backgrounds

```tsx
<div className="grid grid-cols-3 gap-8 p-8">
  {features.map((feature, index) => (
    <div key={index} className="relative p-6 bg-white rounded-lg shadow-lg">
      <div className="absolute -top-4 -right-4 opacity-60">
        <AnimatedBlob
          size={80}
          colors={BlobColors.neon}
          intensity={0.5}
          speed={0.8}
        />
      </div>
      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
      <p className="text-gray-600">{feature.description}</p>
    </div>
  ))}
</div>
```

---

## 🛠️ Advanced Customization

### Custom Brand Colors

```tsx
const brandColors = ["#123456", "#abcdef", "#ff00ff"];

<AnimatedBlob colors={brandColors} />
```

### Responsive Sizing

```tsx
<AnimatedBlob
  size={window.innerWidth < 768 ? 150 : 300}
  className="w-full max-w-sm mx-auto"
/>
```

### Multiple Overlapping Blobs

```tsx
<div className="relative w-full h-screen overflow-hidden">
  <AnimatedBlob
    size={200}
    colors={BlobColors.purple}
    className="absolute top-10 left-10"
    speed={0.8}
  />
  <AnimatedBlob
    size={150}
    colors={BlobColors.ocean}
    className="absolute top-20 right-20"
    speed={1.2}
  />
  <AnimatedBlob
    size={100}
    colors={BlobColors.sunset}
    className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
    speed={1.5}
  />
</div>
```

---

## 🧩 Troubleshooting

**Blob not animating**  
- Ensure `speed > 0`  
- Check `intensity !== 0`

**Performance issues**  
- Reduce `vertices` (try 12–24)  
- Lower `speed`  
- Disable `glow` and `dropShadow`

**Gradient not showing**  
- Make sure `colors.length >= 2`  
- Use valid hex color codes

**TypeScript errors**  
- Use correct prop types  
- Ensure you're importing the component with types

---

## 🌐 Browser Support

- ✅ Chrome 60+  
- ✅ Firefox 55+  
- ✅ Safari 12+  
- ✅ Edge 79+  
- ✅ Mobile browsers (iOS, Android)

---

## 🤝 Contributing

1. Fork the repo  
2. Create your feature branch: `git checkout -b feature/awesome-feature`  
3. Commit your changes: `git commit -m 'Add awesome feature'`  
4. Push the branch: `git push origin feature/awesome-feature`  
5. Open a pull request 🎉

---

## 📄 License

MIT — see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Inspired by modern web design patterns  
- Powered by React, SVG, and Tailwind CSS

---

**Made with ❤️ for the React community.**  
