
// @deprecated - Use useOptimizedImageLoader instead
// This file is kept for backward compatibility
import { useState, useEffect } from 'react';

interface UseImageLoaderProps {
  imageUrl: string;
  fallbackImageUrl?: string;
  secondaryFallbackImageUrl?: string;
  tertiaryFallbackImageUrl?: string;
  quaternaryFallbackImageUrl?: string;
  quinaryFallbackImageUrl?: string;
}

export const useImageLoader = ({
  imageUrl,
  fallbackImageUrl
}: UseImageLoaderProps) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [currentImage, setCurrentImage] = useState<string>(imageUrl);

  useEffect(() => {
    // Simplified version for backward compatibility
    const img = new Image();
    img.onload = () => {
      setCurrentImage(imageUrl);
      setImageLoading(false);
      setImageError(false);
    };
    img.onerror = () => {
      if (fallbackImageUrl) {
        setCurrentImage(fallbackImageUrl);
        setImageLoading(false);
        setImageError(false);
      } else {
        setImageError(true);
        setImageLoading(false);
      }
    };
    img.src = imageUrl;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [imageUrl, fallbackImageUrl]);

  return {
    imageLoading,
    imageError,
    currentImage
  };
};
