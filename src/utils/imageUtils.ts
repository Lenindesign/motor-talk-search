// Utility functions for handling images in the social feed

/**
 * Generate a placeholder image URL using a service like Unsplash
 * @param width - Image width
 * @param height - Image height
 * @param category - Category for the image (cars, automotive, etc.)
 * @returns Placeholder image URL
 */
export const generatePlaceholderImage = (
  width: number = 800, 
  height: number = 450, 
  category: string = 'automotive'
): string => {
  // Using Unsplash for high-quality automotive images
  const categories = {
    automotive: 'automotive,car,vehicle',
    cars: 'cars,automobile,luxury-car',
    electric: 'electric-car,tesla,ev',
    racing: 'racing-car,sports-car,track',
    vintage: 'vintage-car,classic-car',
    truck: 'truck,pickup,commercial'
  };
  
  const query = categories[category as keyof typeof categories] || categories.automotive;
  return `https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=${width}&h=${height}&fit=crop&auto=format&q=80`;
};

/**
 * Generate a user avatar placeholder
 * @param name - User name for initials
 * @param size - Avatar size
 * @returns Avatar placeholder URL or data URI
 */
export const generateAvatarPlaceholder = (name: string, size: number = 40): string => {
  const initials = name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
  
  // Generate a simple avatar using a service
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=${size}&background=6b7280&color=fff&bold=true`;
};

/**
 * Handle image loading errors with fallback
 * @param event - Image error event
 * @param fallbackSrc - Fallback image source
 */
export const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>, fallbackSrc?: string) => {
  const target = event.target as HTMLImageElement;
  if (fallbackSrc) {
    target.src = fallbackSrc;
  } else {
    target.src = '/images/cars/placeholder.jpg';
  }
  
  // Prevent infinite loop if fallback also fails
  target.onerror = null;
};
