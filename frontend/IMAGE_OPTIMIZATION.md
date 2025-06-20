# Image Optimization Guide for MangaMecca

This document provides guidelines for optimizing images in the MangaMecca e-commerce website to improve performance, especially on mobile devices.

## Implemented Optimizations

1. **Responsive Images**
   - Multiple image sizes are generated for each original image:
     - Small (400px width)
     - Medium (800px width)
     - Original (full size)
   - These are served based on device screen size using `srcset` and `sizes` attributes

2. **Lazy Loading**
   - Images are loaded only when they enter (or approach) the viewport
   - Uses Intersection Observer API for efficient detection
   - Reduces initial page load time and saves bandwidth

3. **Progressive Loading & Visual Feedback**
   - Shimmer effect placeholder while images are loading
   - Smooth fade-in transition when images complete loading
   - Maintains aspect ratio to prevent layout shifts

4. **Priority Loading**
   - Critical images (e.g., hero images, above-the-fold content) are loaded with priority
   - Non-critical images use lazy loading

## How to Use OptimizedImage Component

```jsx
import OptimizedImage from './common/OptimizedImage';

// Basic usage
<OptimizedImage
  src="/path/to/image.jpg"
  alt="Description of image"
  className="w-full"
/>

// With all options
<OptimizedImage
  src="/path/to/image.jpg"
  alt="Description of image"
  className="custom-class"
  width={400}
  height={300}
  sizes="(max-width: 768px) 100vw, 50vw"
  priority={true}
  onClick={handleImageClick}
  placeholderColor="#1f2937"
  animation={true}
  objectFit="cover"
/>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| src | string | required | Path to the image |
| alt | string | required | Alt text for accessibility |
| className | string | '' | Additional CSS classes |
| width | number | undefined | Width in pixels |
| height | number | undefined | Height in pixels |
| sizes | string | '100vw' | Sizes attribute for responsive images |
| priority | boolean | false | Whether to load image with priority |
| onClick | function | undefined | Click handler |
| placeholderColor | string | '#1f2937' | Background color while loading |
| animation | boolean | true | Whether to animate image appearance |
| objectFit | string | 'cover' | CSS object-fit property |

## Generating Responsive Images

We use a script to automatically generate responsive image variants:

1. Install dependencies:
   ```bash
   npm install sharp
   ```

2. Run the image generation script:
   ```bash
   npm run generate-images
   ```

This will create small and medium versions of all images in the specified directories.

## Best Practices

1. **Use Appropriate Image Formats**
   - Use WebP for better compression when possible
   - Use JPEG for photos
   - Use PNG for images with transparency
   - Use SVG for icons and simple graphics

2. **Set Proper Image Dimensions**
   - Specify width and height to prevent layout shifts
   - Use aspect ratio classes for consistent sizing

3. **Optimize Image Loading**
   - Set `priority={true}` only for critical above-the-fold images
   - Use appropriate `sizes` attribute based on your layout

4. **Responsive Design**
   - Use different image sizes based on viewport width
   - Consider art direction (different crops) for important images

5. **Performance Monitoring**
   - Regularly check Core Web Vitals metrics
   - Pay attention to LCP (Largest Contentful Paint) and CLS (Cumulative Layout Shift)

## Further Improvements

- Consider implementing image CDN for automatic optimization
- Add WebP conversion to the image generation script
- Implement image compression during build process 