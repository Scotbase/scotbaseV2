# Image Management Guide

This guide explains how to manage images for the Scotbase Entertainment website.

## Current Setup

The website uses a **hybrid approach** for images:

### 1. Local Images (Recommended for Production)
Some images are stored locally in the `public/images/` folder:
- `abba-a-rival-duo.png`
- `abba-a-rival-quartet.png`
- `forever-abba.png`
- `gimme-abba.png`
- `super-troopers.png`

These are referenced in the code as:
```javascript
image: "/images/abba-a-rival-duo.png"
```

### 2. External URLs
Most images currently reference external URLs from scotbase.com:
```javascript
image: "https://scotbase.com/images/freddie%20-%20queen%20experience%20tribute%20show6.jpg?crc=4285150676"
```

### 3. Fallback Placeholders
If an image fails to load, the site automatically displays a genre-appropriate placeholder from Unsplash using the `imageHelper.js` utility.

## Adding New Images

### Option A: Local Hosting (Best Performance)

1. **Add image to public folder**:
   ```
   public/images/your-image-name.png
   ```

2. **Update the artist data** in `src/data/artists.js`:
   ```javascript
   {
     id: 6,
     name: "Your Artist",
     image: "/images/your-image-name.png",
     // ... other fields
   }
   ```

**Benefits**:
- ✅ Faster loading (no external requests)
- ✅ Full control over images
- ✅ Works offline
- ✅ No CORS issues

### Option B: External URLs

Use an image hosting service or CDN:
```javascript
image: "https://your-cdn.com/artist-photo.jpg"
```

**Benefits**:
- ✅ Doesn't increase build size
- ✅ Easy to update without rebuilding
- ⚠️ Requires internet connection
- ⚠️ Subject to external service reliability

### Option C: CDN Solution (Recommended for Large Sites)

For many images, consider using:
- **Cloudinary** (free tier available)
- **Imgix**
- **AWS S3 + CloudFront**

## Image Requirements

### Format
- **Recommended**: PNG, JPG, or WebP
- **Size**: Keep under 500KB per image
- **Dimensions**: 800x800px to 1200x1200px (square or portrait)

### Optimization
Before adding images, optimize them:
- Use [TinyPNG](https://tinypng.com/) for compression
- Use [Squoosh](https://squoosh.app/) for modern formats
- Or use an automated build tool

## Updating Theme Colors for Images

The website applies a subtle overlay to images to match the site theme. To customize:

Edit `src/index.css`:
```css
:root {
  /* Change these colors to match your brand */
  --image-bg-gradient-start: #667eea;  /* Purple-blue */
  --image-bg-gradient-end: #764ba2;    /* Purple */
  
  /* Adjust overlay opacity (0.0 to 1.0) */
  --image-overlay-start: rgba(102, 126, 234, 0.1);    /* 10% opacity */
  --image-overlay-end: rgba(118, 75, 162, 0.1);
}
```

## Troubleshooting

### Images not displaying?

1. **Check file path**: Ensure the path in `artists.js` matches the actual file location
2. **Check file name**: macOS/Linux are case-sensitive (`Image.png` ≠ `image.png`)
3. **Clear cache**: Hard refresh the browser (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)
4. **Check console**: Open browser DevTools and look for 404 errors

### Images load slowly?

1. **Optimize file size**: Compress images to under 500KB
2. **Use modern formats**: WebP is 25-35% smaller than JPG
3. **Consider a CDN**: Serve images from a CDN for faster delivery
4. **Implement lazy loading**: Load images only when needed

## Migration to Full Local Hosting

To move all images to local hosting:

1. Download all images from scotbase.com
2. Place them in `public/images/`
3. Update each artist entry in `src/data/artists.js`
4. Test all pages to ensure images load correctly

Example migration script:
```bash
# Download images (example)
cd public/images
curl -O "https://scotbase.com/images/artist-photo.jpg"
```

Then update the data file:
```javascript
// Before
image: "https://scotbase.com/images/artist-photo.jpg?crc=123456"

// After
image: "/images/artist-photo.jpg"
```

## Need Help?

Check the fallback system in `src/utils/imageHelper.js` which provides genre-specific placeholder images if an image fails to load.

