# AR Models

Drop your `.glb` (Android/WebXR) and `.usdz` (iOS) 3D models here.

## Supported Formats

| Platform | Format | How it works |
|----------|--------|--------------|
| iOS | `.usdz` | AR Quick Look - opens native camera |
| Android | `.glb` | Scene Viewer / WebXR |
| Web | `.glb` | 3D preview in the modal |

## Model Naming

Name your models to match the `modelPath` in `page.tsx`:
- `espresso-cup.glb` / `espresso-cup.usdz`
- `cappuccino.glb` / `cappuccino.usdz`
- `latte.glb` / `latte.usdz`
- `macchiato.glb` / `macchiato.usdz`
- `pour-over.glb` / `pour-over.usdz`
- `cold-brew.glb` / `cold-brew.usdz`
- `iced-latte.glb` / `iced-latte.usdz`
- `affogato.glb` / `affogato.usdz`
- `croissant.glb` / `croissant.usdz`
- `pastry.glb` / `pastry.usdz`
- `bread.glb` / `bread.usdz`
- `avocado-toast.glb` / `avocado-toast.usdz`

## How to Create AR Models

### Option 1: Scan Real Objects (Recommended)
- **Polycam** (iOS/Android) - LiDAR and photo scanning
- **Scaniverse** (iOS/Android) - AI-powered 3D scanning
- **Luma AI** - Photogrammetry from photos

### Option 2: Download Free Models
- Google Poly (shutting down, try alternatives)
- Sketchfab
- Poly Pizza

### Option 3: Create 3D Models
- Blender
- Cinema 4D
- Spline (web-based)

## Export Settings

For best AR results:
- **Format**: glTF 2.0 (.glb) for Android/Web, USDZ for iOS
- **Texture**: Max 2048x2048, WebP compression
- **Poly count**: Under 50k triangles
- **Scale**: Real-world scale (e.g., coffee cup ~10cm tall)
- **Materials**: PBR metallic-roughness workflow