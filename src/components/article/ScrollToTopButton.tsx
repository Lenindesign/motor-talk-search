
import React from 'react';
import { ChevronUp } from 'lucide-react';

interface ScrollToTopButtonProps {
  showScrollTop: boolean;
  scrollToTop: () => void;
}

const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({
  showScrollTop,
  scrollToTop
}) => {
  if (!showScrollTop) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 bg-motortrend-red text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition-colors z-40"
      aria-label="Scroll to top"
    >
      <ChevronUp size={24} />
    </button>
  );
};

export default ScrollToTopButton;
