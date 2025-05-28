
import { useState, useEffect, useCallback, useRef } from 'react';

interface UseOptimizedImageLoaderProps {
  imageUrl: string;
  fallbackImageUrl?: string;
  priority?: boolean;
}

interface ImageLoaderState {
  currentImage: string;
  isLoading: boolean;
  hasError: boolean;
}

export const useOptimizedImageLoader = ({
  imageUrl,
  fallbackImageUrl = 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3',
  priority = false
}: UseOptimizedImageLoaderProps) => {
  const [state, setState] = useState<ImageLoaderState>({
    currentImage: imageUrl,
    isLoading: true,
    hasError: false
  });
  
  const imageRef = useRef<HTMLImageElement | null>(null);
  const fallbackRef = useRef<HTMLImageElement | null>(null);

  const cleanup = useCallback(() => {
    if (imageRef.current) {
      imageRef.current.onload = null;
      imageRef.current.onerror = null;
      imageRef.current = null;
    }
    if (fallbackRef.current) {
      fallbackRef.current.onload = null;
      fallbackRef.current.onerror = null;
      fallbackRef.current = null;
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    
    const loadImage = async () => {
      cleanup();
      
      const img = new Image();
      imageRef.current = img;
      
      img.onload = () => {
        if (!cancelled) {
          setState({
            currentImage: imageUrl,
            isLoading: false,
            hasError: false
          });
        }
      };
      
      img.onerror = () => {
        if (!cancelled && fallbackImageUrl) {
          const fallbackImg = new Image();
          fallbackRef.current = fallbackImg;
          
          fallbackImg.onload = () => {
            if (!cancelled) {
              setState({
                currentImage: fallbackImageUrl,
                isLoading: false,
                hasError: false
              });
            }
          };
          
          fallbackImg.onerror = () => {
            if (!cancelled) {
              setState({
                currentImage: fallbackImageUrl,
                isLoading: false,
                hasError: true
              });
            }
          };
          
          fallbackImg.src = fallbackImageUrl;
        } else if (!cancelled) {
          setState({
            currentImage: imageUrl,
            isLoading: false,
            hasError: true
          });
        }
      };
      
      if (priority) {
        img.loading = 'eager';
      }
      
      img.src = imageUrl;
    };

    loadImage();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [imageUrl, fallbackImageUrl, priority, cleanup]);

  return state;
};
