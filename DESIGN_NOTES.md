# AWS Community Day - Design Notes

## Design System & Guidelines

### Color Palette
- **Primary Orange**: `#FF9900` (AWS Orange)
- **Primary Black**: `#111827` (AWS Black)
- **Primary White**: `#FFFFFF`
- **Gray Scale**: `#F9FAFB`, `#F3F4F6`, `#E5E7EB`, `#4B5563`, `#111827`

### Typography
- **Primary Font**: Inter (Google Fonts)
- **Fallback**: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif
- **Headings**: 700-800 weight
- **Body**: 400-500 weight
- **Accent**: 600 weight

### Spacing System
- **Base Unit**: 4px
- **Scale**: 4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px, 60px, 80px
- **Container Max Width**: 1200px
- **Container Padding**: 20px (desktop), 16px (mobile)

### Border Radius
- **Standard**: 12px
- **Small**: 8px
- **Large**: 16px
- **Circular**: 50%

### Shadows
- **Light**: `0 4px 6px rgba(0, 0, 0, 0.1)`
- **Medium**: `0 10px 15px rgba(0, 0, 0, 0.1)`
- **Heavy**: `0 20px 25px rgba(0, 0, 0, 0.1)`
- **AWS Orange Glow**: `0 4px 15px rgba(255, 153, 0, 0.3)`

## Layout & Grid System

### Responsive Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Grid System
- **Auto-fit Grid**: `repeat(auto-fit, minmax(280px, 1fr))`
- **Gap**: 32px (desktop), 24px (tablet), 16px (mobile)
- **Speakers Grid**: 4 columns → 2 columns → 1 column
- **Highlights Grid**: 3 columns → 2 columns → 1 column

## Component Design Patterns

### Cards
- **Background**: White with subtle shadow
- **Padding**: 32px (desktop), 24px (mobile)
- **Hover Effect**: `translateY(-8px)` with enhanced shadow
- **Border**: 1px solid light gray
- **Transition**: `0.3s cubic-bezier(0.4, 0, 0.2, 1)`

### Buttons
- **Primary**: AWS Orange background, white text
- **Secondary**: Transparent background, AWS Orange border
- **Outline**: White border on dark backgrounds
- **Hover Effects**: 
  - `translateY(-2px)` lift
  - Enhanced shadow
  - Shimmer effect with `::before` pseudo-element

### Hero Section
- **Background**: Linear gradient from AWS Orange to darker orange
- **Overlay**: Subtle grid pattern at 30% opacity
- **Content**: Centered, max-width 800px
- **Countdown**: Glass-morphism effect with backdrop-filter
- **Animation**: Fade-in-up on load

### Speaker Cards
- **Image**: 250px height, object-fit cover
- **Overlay**: Gradient overlay on hover (AWS Orange to Black)
- **Social Links**: Circular buttons with glass-morphism
- **Hover State**: Scale image 1.05x, show social overlay
- **Info Section**: 24px padding, centered text

### Schedule Timeline
- **Layout**: Flexbox with time column and content column
- **Time**: Fixed width 120px, AWS Orange color
- **Border**: Left border color-coded by session type
- **Hover**: `translateX(8px)` slide effect
- **Session Types**:
  - Keynote: Purple border
  - Technical: AWS Orange border
  - Break: Green border
  - Panel: Blue border

## Animation Guidelines

### Micro-interactions
- **Hover Transitions**: 0.3s cubic-bezier easing
- **Button Hover**: Lift + shadow + shimmer
- **Card Hover**: Lift + enhanced shadow
- **Link Hover**: Underline animation from left to right

### Page Animations
- **Scroll Animations**: Intersection Observer for fade-in effects
- **Stagger Animations**: 0.1s delay between grid items
- **Countdown**: Real-time updates with smooth transitions

### Loading States
- **Form Submission**: Button loading state with spinner
- **Image Loading**: Skeleton placeholders
- **Content Loading**: Fade-in when ready

## Accessibility Features

### Color Contrast
- **Text on White**: Minimum 4.5:1 ratio
- **Text on AWS Orange**: White text for maximum contrast
- **Focus States**: 2px AWS Orange outline with 2px offset

### Keyboard Navigation
- **Tab Order**: Logical flow through interactive elements
- **Focus Indicators**: Visible focus rings on all interactive elements
- **Skip Links**: Hidden skip-to-content links

### Screen Reader Support
- **Alt Text**: Descriptive alt text for all images
- **ARIA Labels**: Proper labeling for interactive elements
- **Semantic HTML**: Proper heading hierarchy and landmarks

## Mobile-First Approach

### Mobile Optimizations
- **Touch Targets**: Minimum 44px for all interactive elements
- **Font Sizes**: Scalable with clamp() function
- **Navigation**: Collapsible hamburger menu
- **Forms**: Large input fields with proper spacing
- **Images**: Optimized sizes and lazy loading

### Progressive Enhancement
- **Base Experience**: Works without JavaScript
- **Enhanced Features**: Countdown, animations, interactive elements
- **Fallbacks**: Graceful degradation for older browsers

## Performance Considerations

### Image Optimization
- **Format**: WebP with JPEG fallback
- **Sizes**: Multiple sizes for different screen densities
- **Lazy Loading**: Intersection Observer for below-fold images
- **Compression**: Optimized for web delivery

### CSS Optimization
- **Critical CSS**: Inline critical styles
- **Non-critical CSS**: Async loading
- **Unused CSS**: Purged in production build
- **CSS Custom Properties**: For theme switching

### JavaScript Optimization
- **Bundle Splitting**: Separate vendor and app bundles
- **Tree Shaking**: Remove unused code
- **Lazy Loading**: Route-based code splitting
- **Service Worker**: Cache static assets

## Dark Mode Implementation

### Color Variables
- **CSS Custom Properties**: All colors defined as variables
- **Theme Toggle**: Smooth transition between themes
- **Persistence**: Theme preference saved in localStorage
- **System Preference**: Respects user's OS theme preference

### Dark Mode Colors
- **Background**: `#1F2937` (Dark gray)
- **Surface**: `#374151` (Medium gray)
- **Text**: `#F9FAFB` (Light gray)
- **Accent**: AWS Orange (unchanged)

## Interactive Features

### Countdown Timer
- **Real-time Updates**: Updates every second
- **Format**: DD:HH:MM:SS with labels
- **Styling**: Glass-morphism cards with hover effects
- **Responsive**: Stacks on mobile devices

### Speaker Social Wall
- **Trigger**: Hover over speaker image
- **Effect**: Gradient overlay with social icons
- **Icons**: LinkedIn, Twitter, GitHub
- **Animation**: Fade-in with scale effect

### FAQ Accordion
- **Interaction**: Click to expand/collapse
- **Animation**: Smooth slide-down effect
- **Icons**: Chevron rotation on state change
- **Accessibility**: Proper ARIA attributes

### Registration Form
- **Validation**: Real-time client-side validation
- **Success State**: Animated success message with QR code
- **Error Handling**: Inline error messages
- **Accessibility**: Proper labels and error associations

## Deployment Considerations

### Build Process
- **Minification**: CSS and JavaScript minification
- **Compression**: Gzip compression for text assets
- **Cache Busting**: Hashed filenames for cache invalidation
- **Source Maps**: For debugging in production

### SEO Optimization
- **Meta Tags**: Proper title, description, and Open Graph tags
- **Structured Data**: JSON-LD for event information
- **Sitemap**: XML sitemap for search engines
- **Robots.txt**: Proper crawling instructions

### Analytics & Monitoring
- **Google Analytics**: Event tracking for user interactions
- **Performance Monitoring**: Core Web Vitals tracking
- **Error Tracking**: JavaScript error monitoring
- **User Feedback**: Contact forms and feedback mechanisms

## Browser Support

### Target Browsers
- **Chrome**: Last 2 versions
- **Firefox**: Last 2 versions
- **Safari**: Last 2 versions
- **Edge**: Last 2 versions
- **Mobile**: iOS Safari, Chrome Mobile

### Fallbacks
- **CSS Grid**: Flexbox fallback for older browsers
- **Custom Properties**: Sass variables fallback
- **Modern JavaScript**: Babel transpilation
- **Web APIs**: Polyfills for missing features

This design system ensures consistency, accessibility, and performance across all devices while maintaining the professional AWS brand identity.