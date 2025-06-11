import { useEffect, useRef } from 'react';

interface SwipeGestureOptions {
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  threshold?: number;
}

/**
 * A hook to handle swipe gestures on touch devices
 */
export const useSwipeGesture = (
  elementRef: React.RefObject<HTMLElement>,
  options: SwipeGestureOptions
) => {
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const { onSwipeUp, onSwipeDown, onSwipeLeft, onSwipeRight, threshold = 50 } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStartRef.current) return;

      const touch = e.changedTouches[0];
      const deltaX = touch.clientX - touchStartRef.current.x;
      const deltaY = touch.clientY - touchStartRef.current.y;

      // Determine if the swipe was primarily horizontal or vertical
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal swipe
        if (deltaX > threshold) {
          onSwipeRight?.();
        } else if (deltaX < -threshold) {
          onSwipeLeft?.();
        }
      } else {
        // Vertical swipe
        if (deltaY > threshold) {
          onSwipeDown?.();
        } else if (deltaY < -threshold) {
          onSwipeUp?.();
        }
      }

      touchStartRef.current = null;
    };

    element.addEventListener('touchstart', handleTouchStart);
    element.addEventListener('touchend', handleTouchEnd);

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, [elementRef, onSwipeUp, onSwipeDown, onSwipeLeft, onSwipeRight, threshold]);
};

export default useSwipeGesture;
