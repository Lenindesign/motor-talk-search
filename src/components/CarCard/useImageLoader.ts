
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
  fallbackImageUrl,
  secondaryFallbackImageUrl,
  tertiaryFallbackImageUrl,
  quaternaryFallbackImageUrl,
  quinaryFallbackImageUrl
}: UseImageLoaderProps) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [currentImage, setCurrentImage] = useState<string>(imageUrl);

  useEffect(() => {
    const loadImage = async () => {
      try {
        const img = new Image();
        img.onload = () => {
          setCurrentImage(imageUrl);
          setImageLoading(false);
          setImageError(false);
        };
        img.onerror = () => {
          // Try fallback images in order
          const fallbacks = [
            fallbackImageUrl,
            secondaryFallbackImageUrl,
            tertiaryFallbackImageUrl,
            quaternaryFallbackImageUrl,
            quinaryFallbackImageUrl
          ];
          for (const fallback of fallbacks) {
            if (fallback) {
              setCurrentImage(fallback);
              setImageLoading(true);
              setImageError(false);
              const fallbackImg = new Image();
              fallbackImg.onload = () => {
                setCurrentImage(fallback);
                setImageLoading(false);
                setImageError(false);
              };
              fallbackImg.onerror = () => {
                setImageError(true);
              };
              fallbackImg.src = fallback;
              return;
            }
          }
          setImageError(true);
        };
        img.src = imageUrl;
      } catch (error) {
        console.error('Error loading image:', error);
        setImageLoading(false);
        setImageError(true);
      }
    };

    loadImage();
  }, [imageUrl, fallbackImageUrl, secondaryFallbackImageUrl, tertiaryFallbackImageUrl, quaternaryFallbackImageUrl, quinaryFallbackImageUrl]);

  return {
    imageLoading,
    imageError,
    currentImage
  };
};
