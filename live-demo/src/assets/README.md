# Assets Directory

This directory contains static assets for the Brodo Swaggins Middle-Earth Survival Kit.

## Directory Structure

```
assets/
├── images/          # Images imported into components
│   ├── features/    # Feature-specific images (icons, screenshots)
│   └── backgrounds/ # Background images and textures
├── icons/           # SVG icons and vector graphics
└── fonts/           # Custom font files
```

## Usage Guidelines

### Images (`images/`)

Place images that will be imported into Vue components here. These get optimized and bundled by Vite.

**Example usage:**
```vue
<script setup lang="ts">
import heroImage from '@/assets/images/hero-shire.jpg'
</script>

<template>
  <img :src="heroImage" alt="The Shire" />
</template>
```

**Recommended files:**
- `hero-shire.jpg` - Hero section background
- `features/lembas.png` - Lembas Calculator icon
- `features/ring.png` - Ring Detector icon
- `features/sword.png` - Weapons Tracker icon
- `features/herb.png` - First Aid icon
- `features/map.png` - Travel Planner icon
- `features/pipeweed.png` - Pipe-Weed Finder icon
- `backgrounds/parchment-texture.jpg` - Background texture

### Icons (`icons/`)

SVG icons and vector graphics. Can be imported directly or used as Vue components.

**Example usage:**
```vue
<script setup lang="ts">
import GandalfIcon from '@/assets/icons/gandalf.svg'
</script>

<template>
  <component :is="GandalfIcon" class="icon" />
</template>
```

**Recommended files:**
- `gandalf.svg` - Wizard icon
- `one-ring.svg` - The One Ring icon
- `hobbit-feet.svg` - Hobbit feet icon
- `shire-leaf.svg` - Shire/nature icon

### Fonts (`fonts/`)

Custom font files for the application. Reference these in your CSS.

**Example usage in CSS:**
```css
@font-face {
  font-family: 'Hobbit';
  src: url('@/assets/fonts/hobbit-font.woff2') format('woff2');
  font-weight: normal;
  font-style: normal;
}
```

## Image Optimization Tips

1. **Use appropriate formats:**
   - JPG for photos and complex images
   - PNG for images with transparency
   - SVG for icons and vector graphics
   - WebP for modern browsers (better compression)

2. **Optimize before adding:**
   - Compress images using tools like TinyPNG, ImageOptim
   - Resize to appropriate dimensions (don't use 4K images for thumbnails)
   - Target ~100-200KB for hero images, <50KB for icons

3. **Naming conventions:**
   - Use kebab-case: `hero-shire.jpg`
   - Be descriptive: `lembas-bread-icon.png`
   - Include size if variants: `logo-small.png`, `logo-large.png`

## Static Assets (Public Directory)

For assets that need fixed URLs or shouldn't be processed by Vite, use `/public/` instead:

```
public/
├── favicon.ico
├── og-image.jpg
└── robots.txt
```

Access with absolute paths: `/favicon.ico`

## Path Aliases

Use the `@` alias for cleaner imports:
```ts
import logo from '@/assets/images/logo.png'  // ✅ Good
import logo from '../../../assets/images/logo.png'  // ❌ Avoid
```

---

*"Even the smallest image can make a big difference in the look of your application."* - Gandalf (probably)
