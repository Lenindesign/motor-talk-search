import React, { useEffect } from 'react';

interface VideosPageWrapperProps {
  children: React.ReactNode;
}

/**
 * A wrapper component specifically for the Videos page
 * Applies dark mode styling only to this page
 */
const VideosPageWrapper: React.FC<VideosPageWrapperProps> = ({ children }) => {
  // Apply dark mode styling when component mounts
  useEffect(() => {
    // Add class to the body element for dark mode styling
    document.body.classList.add('videos-page-dark-mode');
    
    // Find the main layout container and modify its background
    const mainLayoutDiv = document.querySelector('.flex.flex-col.min-h-screen.bg-white');
    if (mainLayoutDiv) {
      mainLayoutDiv.classList.remove('bg-white');
      mainLayoutDiv.classList.add('bg-gray-900');
    }
    
    // Clean up when component unmounts
    return () => {
      document.body.classList.remove('videos-page-dark-mode');
      if (mainLayoutDiv) {
        mainLayoutDiv.classList.remove('bg-gray-900');
        mainLayoutDiv.classList.add('bg-white');
      }
    };
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-900 text-white w-full max-w-none overflow-x-hidden">
      {children}
    </div>
  );
};

export default VideosPageWrapper;
