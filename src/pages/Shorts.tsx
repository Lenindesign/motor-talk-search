import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronUp, ChevronDown, Heart, MessageSquare, Share2, Bookmark, X } from 'lucide-react';
import { mockShortVideos } from '@/services/mockData';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useSavedItems } from '@/contexts/SavedItemsContext';
import '@/styles/shorts.css';

const Shorts: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const { addSavedItem, removeSavedItem, isSaved } = useSavedItems();

  // Find starting index based on URL param
  useEffect(() => {
    if (id) {
      const index = mockShortVideos.findIndex(video => video.id === id);
      if (index !== -1) {
        setActiveIndex(index);
      }
    }
  }, [id]);

  // Handle intersection observer for videos
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const videoIndex = Number(entry.target.getAttribute('data-index'));
          
          if (entry.isIntersecting) {
            setActiveIndex(videoIndex);
            const video = videoRefs.current[videoIndex];
            if (video && isPlaying) {
              video.play().catch(err => console.error('Error playing video:', err));
            }
          } else {
            const video = videoRefs.current[videoIndex];
            if (video) {
              video.pause();
              video.currentTime = 0;
            }
          }
        });
      },
      {
        root: containerRef.current,
        threshold: 0.7, // Video is considered visible when 70% in view
      }
    );

    // Get all video containers
    const videoContainers = containerRef.current.querySelectorAll('.short-video-container');
    videoContainers.forEach(container => {
      observer.observe(container);
    });

    return () => {
      observer.disconnect();
    };
  }, [isPlaying]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        navigateToPrev();
      } else if (e.key === 'ArrowDown') {
        navigateToNext();
      } else if (e.key === ' ') {
        togglePlayPause();
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex]);

  // Update URL when active index changes and handle video playback
  useEffect(() => {
    const currentVideo = mockShortVideos[activeIndex];
    if (currentVideo && currentVideo.id !== id) {
      navigate(`/shorts/${currentVideo.id}`, { replace: true });
    }
    
    // Play the current video if isPlaying is true
    const video = videoRefs.current[activeIndex];
    if (video && isPlaying) {
      video.play().catch(err => console.error('Error playing video:', err));
    }
  }, [activeIndex, navigate, id, isPlaying]);

  const navigateToNext = () => {
    // Pause the current video
    const currentVideo = videoRefs.current[activeIndex];
    if (currentVideo) {
      currentVideo.pause();
    }
    
    if (activeIndex < mockShortVideos.length - 1) {
      setActiveIndex(activeIndex + 1);
    } else {
      // Loop back to the first video when at the end
      setActiveIndex(0);
    }
  };

  const navigateToPrev = () => {
    // Pause the current video
    const currentVideo = videoRefs.current[activeIndex];
    if (currentVideo) {
      currentVideo.pause();
    }
    
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    } else {
      // Loop back to the last video when at the beginning
      setActiveIndex(mockShortVideos.length - 1);
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    const video = videoRefs.current[activeIndex];
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play().catch(err => console.error('Error playing video:', err));
      }
    }
  };

  const handleVideoClick = () => {
    togglePlayPause();
  };

  const handleSave = (videoId: string) => {
    const video = mockShortVideos.find(v => v.id === videoId);
    if (!video) return;

    const savedItem = {
      id: video.id,
      title: video.title,
      type: 'video' as const,
      imageUrl: video.imageUrl,
      savedAt: new Date().toISOString(),
      metadata: {
        duration: video.duration,
        views: video.views,
        publishDate: video.publishDate
      }
    };

    if (isSaved(video.id, 'video')) {
      removeSavedItem(video.id, 'video');
    } else {
      addSavedItem(savedItem);
    }
  };

  const handleClose = () => {
    navigate('/videos');
  };

  return (
    <div className="shorts-page">
      <div className="fixed top-4 left-4 z-50">
        <Button 
          variant="ghost" 
          size="icon" 
          className="bg-black/50 text-white hover:bg-black/70 rounded-full"
          onClick={handleClose}
        >
          <X size={24} />
        </Button>
      </div>

      <div className="navigation-controls fixed right-4 top-1/2 transform -translate-y-1/2 z-40">
        <Button 
          variant="ghost" 
          size="icon" 
          className="bg-black/50 text-white hover:bg-black/70 rounded-full mb-2"
          onClick={navigateToPrev}
        >
          <ChevronUp size={24} />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="bg-black/50 text-white hover:bg-black/70 rounded-full"
          onClick={navigateToNext}
        >
          <ChevronDown size={24} />
        </Button>
      </div>

      <div 
        ref={containerRef}
        className="shorts-container h-screen overflow-y-scroll snap-y snap-mandatory"
      >
        {mockShortVideos.map((video, index) => {
          const isActive = index === activeIndex;
          const isVideoSaved = isSaved(video.id, 'video');

          return (
            <div 
              key={video.id}
              data-index={index}
              className="short-video-container h-screen w-full flex items-center justify-center snap-start snap-always relative"
            >
              <div className="video-wrapper relative w-full max-w-[500px] mx-auto" style={{ aspectRatio: '9/16' }}>
                {/* Video placeholder - in a real app, this would be a real video */}
                <div 
                  className="absolute inset-0 bg-gray-900 flex items-center justify-center overflow-hidden rounded-lg"
                  onClick={handleVideoClick}
                >
                  <video
                    ref={el => videoRefs.current[index] = el}
                    poster={video.imageUrl}
                    className="w-full h-full object-cover"
                    loop
                    playsInline
                    muted
                  >
                    {/* Use the videoUrl from mockShortVideos */}
                    <source src={video.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>

                  {/* Play/Pause overlay */}
                  {!isPlaying && isActive && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <div className="bg-white/20 rounded-full p-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                          <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                      </div>
                    </div>
                  )}
                </div>

                {/* Video info overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                  <h3 className="text-white text-lg font-bold mb-2">{video.title}</h3>
                  <div className="flex items-center text-white/80 text-sm">
                    <span>{video.views} views</span>
                    <span className="mx-2">•</span>
                    <span>{video.publishDate}</span>
                  </div>
                </div>

                {/* Interaction buttons */}
                <div className="absolute right-4 bottom-24 flex flex-col items-center space-y-6">
                  <div className="flex flex-col items-center">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="bg-black/30 text-white hover:bg-black/50 rounded-full h-12 w-12"
                      onClick={() => {}}
                    >
                      <Heart size={24} className="text-white" />
                    </Button>
                    <span className="text-white text-xs mt-1">24.5K</span>
                  </div>

                  <div className="flex flex-col items-center">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="bg-black/30 text-white hover:bg-black/50 rounded-full h-12 w-12"
                      onClick={() => {}}
                    >
                      <MessageSquare size={24} className="text-white" />
                    </Button>
                    <span className="text-white text-xs mt-1">1.2K</span>
                  </div>

                  <div className="flex flex-col items-center">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="bg-black/30 text-white hover:bg-black/50 rounded-full h-12 w-12"
                      onClick={() => {}}
                    >
                      <Share2 size={24} className="text-white" />
                    </Button>
                    <span className="text-white text-xs mt-1">Share</span>
                  </div>

                  <div className="flex flex-col items-center">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className={cn(
                        "bg-black/30 hover:bg-black/50 rounded-full h-12 w-12",
                        isVideoSaved ? "text-motortrend-red" : "text-white"
                      )}
                      onClick={() => handleSave(video.id)}
                    >
                      <Bookmark size={24} className={isVideoSaved ? "fill-motortrend-red text-motortrend-red" : "text-white"} />
                    </Button>
                    <span className="text-white text-xs mt-1">Save</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Shorts;
