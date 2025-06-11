# Design System Exceptions and Audit Results

## Current Audit Status

### Typography Inconsistencies
1. Some components still use direct Tailwind typography classes (text-sm, text-lg, etc.) instead of design system typography tokens
2. Inconsistent heading hierarchy in components (some use h1-h6 directly, others use typography-display/title)
3. Need to standardize use of typography-body-large vs typography-subtitle

### Color Usage Exceptions
1. Some components use direct color values (bg-gray-100, text-blue-500) instead of semantic tokens
2. Inconsistent usage of neutral color scale (some use gray-*, others use neutral-*)
3. Legacy color values in older components need migration to new design system tokens

### Component Variants
1. Button variants have some overlap between new and legacy styles
2. Multiple shadow implementations (shadow-sm, shadow-modern, etc.) need consolidation
3. Border radius inconsistencies (some use rounded-xl, others use rounded-lg)

### Layout & Spacing
1. Container max-width varies between components (some use max-w-6xl, others max-w-[980px])
2. Inconsistent gap usage in grids (gap-4, gap-6, gap-8 used interchangeably)
3. Padding/margin scales need standardization

### Mobile Responsiveness
1. Some components use custom breakpoints instead of design system breakpoints
2. Inconsistent mobile-first approach implementation
3. Variable handling of navigation elements on mobile

### Dark Mode Implementation
1. Videos page uses custom dark mode implementation
2. Inconsistent dark mode color token usage
3. Some components lack dark mode support

## Documented Exceptions

### Videos Page Dark Mode Exception
- **Reason**: Videos page requires a unique dark theme for optimal video viewing experience
- **Implementation**: Uses custom body class and CSS approach
- **Scope**: Limited to Videos page only
- **Reference**: VideosPageWrapper component

### Legacy Button Variants
- **Reason**: Maintaining backward compatibility for existing implementations
- **Variants**: default, destructive, outline, secondary, ghost, link
- **Migration Path**: Gradually replace with new semantic variants

### Container Width Exceptions
- **Standard**: max-width-[980px]
- **Exceptions**:
  1. Photo Gallery: max-w-6xl for larger image display
  2. Car Database: max-w-7xl for data-dense layouts
  3. Home Hero: full-width for immersive experience

### Typography Exceptions
1. **Email Templates**:
   - Uses Arial for email client compatibility
   - Restricted to system fonts

2. **Legal Content**:
   - Uses smaller text sizes for terms/conditions
   - Specific line-height requirements

3. **Car Specifications**:
   - Custom monospace font for technical data
   - Tabular number alignment

### Mobile Navigation Exceptions
1. **Search Implementation**:
   - Header search on desktop
   - Sticky bottom search on mobile
   - Reason: Improved mobile UX

2. **Car Detail Pages**:
   - Custom breakpoints for complex layouts
   - Specialized mobile image galleries

### Component-Specific Exceptions
1. **PhotoCard**:
   - Custom hover effects
   - Special aspect ratio handling
   - Unique metadata display

2. **CarCard**:
   - Complex state handling
   - Multiple interactive elements
   - Special mobile layout

3. **ArticleCard**:
   - Category-specific styling
   - Dynamic image handling

### Shadow System Exceptions
- **Card Shadows**: Uses shadow-modern for elevated cards
- **Button Shadows**: Uses shadow-sm for subtle depth
- **Dropdown Shadows**: Custom shadow for depth perception

## Action Items

### Short Term
1. Create automated linting rules for design system token usage
2. Document all component-specific exceptions in their respective files
3. Update component documentation with exception notes

### Medium Term
1. Migrate legacy color values to semantic tokens
2. Standardize typography usage across components
3. Consolidate shadow system implementations

### Long Term
1. Create migration guide for legacy components
2. Implement comprehensive dark mode support
3. Standardize responsive design patterns

## Adding New Exceptions

To add a new exception to the design system:

1. Document the exception in this file
2. Provide clear justification for the exception
3. Include implementation details and scope
4. Add reference to any related components
5. Get approval from the design team

## Review Process

Exceptions should be reviewed:
- During major version updates
- When implementing new features
- During regular design system audits
- When similar exceptions are requested
