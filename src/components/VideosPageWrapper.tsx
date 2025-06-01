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
    // Add a class to the body element
    document.body.classList.add('videos-page-dark-mode');
    
    // Clean up when component unmounts
    return () => {
      document.body.classList.remove('videos-page-dark-mode');
    };
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {children}
    </div>
  );
};

export default VideosPageWrapper;
