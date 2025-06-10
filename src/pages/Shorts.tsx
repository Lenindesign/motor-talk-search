import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronUp, ChevronDown, Heart, MessageSquare, Share2, Bookmark, X, Play, Pause, Volume2, VolumeX, ThumbsUp, ThumbsDown, MoreVertical } from 'lucide-react';
import { mockShortVideos } from '@/services/mockData';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useSavedItems } from '@/contexts/SavedItemsContext';
import '@/styles/shorts.css';

const Shorts = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addSavedItem, removeSavedItem, isSaved } = useSavedItems();
  
  // Ensure we only use exactly 6 videos for the shorts experience
  const MAX_SHORTS = 6;
  
  // Find the current video and its index within the first 6 videos
  const currentVideoIndex = mockShortVideos.slice(0, MAX_SHORTS).findIndex(video => video.id === id);
  const [activeIndex, setActiveIndex] = useState(currentVideoIndex !== -1 ? currentVideoIndex : 0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [likeCount, setLikeCount] = useState<Record<string, number>>({});
  const [dislikeCount, setDislikeCount] = useState<Record<string, number>>({});
  const [userLiked, setUserLiked] = useState<Record<string, boolean>>({});
  const [userDisliked, setUserDisliked] = useState<Record<string, boolean>>({});
  const [showControls, setShowControls] = useState(false);
  const [navArrowsAnimation, setNavArrowsAnimation] = useState<'enter' | 'exit' | 'idle'>('idle');
  const [controlsAnimation, setControlsAnimation] = useState<'enter' | 'exit' | 'idle'>('idle');
  
  // Refs for videos and container
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Find starting index based on URL param
  useEffect(() => {
    if (id) {
      const index = mockShortVideos.findIndex(video => video.id === id);
      if (index !== -1) {
        setActiveIndex(index);
      }
    }
  }, [id]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

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
    if (isPlaying) {
      playVideo(activeIndex);
    }
  }, [activeIndex, navigate, id, isPlaying]);

  const navigateToNext = () => {
    // Pause the current video
    const currentVideo = videoRefs.current[activeIndex];
    if (currentVideo) {
      currentVideo.pause();
    }
    
    // Calculate next index ensuring we only use the first 6 videos
    let nextIndex;
    if (activeIndex < MAX_SHORTS - 1) {
      nextIndex = activeIndex + 1;
    } else {
      // Loop back to the first video when at the end
      nextIndex = 0;
    }
    
    // Scroll to the next video
    if (containerRef.current) {
      const videoContainers = containerRef.current.querySelectorAll('.short-video-container');
      const targetContainer = videoContainers[nextIndex] as HTMLElement;
      if (targetContainer) {
        targetContainer.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }
    }
    
    setActiveIndex(nextIndex);
    // Use a small delay to ensure state is updated before playing
    setTimeout(() => playVideo(nextIndex), 100);
  };

  const navigateToPrev = () => {
    // Pause the current video
    const currentVideo = videoRefs.current[activeIndex];
    if (currentVideo) {
      currentVideo.pause();
    }
    
    // Calculate previous index ensuring we only use the first 6 videos
    let prevIndex;
    if (activeIndex > 0) {
      prevIndex = activeIndex - 1;
    } else {
      // Loop back to video #6 when at the beginning
      prevIndex = MAX_SHORTS - 1;
    }
    
    // Scroll to the previous video
    if (containerRef.current) {
      const videoContainers = containerRef.current.querySelectorAll('.short-video-container');
      const targetContainer = videoContainers[prevIndex] as HTMLElement;
      if (targetContainer) {
        targetContainer.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }
    }
    
    setActiveIndex(prevIndex);
    // Use a small delay to ensure state is updated before playing
    setTimeout(() => playVideo(prevIndex), 100);
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

  const playVideo = (index: number) => {
    // Pause all videos first
    videoRefs.current.forEach(video => {
      if (video) video.pause();
    });

    // Play the active video
    const video = videoRefs.current[index];
    if (video) {
      video.currentTime = 0; // Reset to beginning
      video.muted = isMuted; // Apply current mute state
      video.play().catch(error => {
        console.error('Error playing video:', error);
      });
      setIsPlaying(true);
    }
  };

  const handleVideoClick = () => {
    togglePlayPause();
    showControlsTemporarily();
  };

  const showControlsTemporarily = () => {
    setShowControls(true);
    setNavArrowsAnimation('enter');
    setControlsAnimation('enter');
    
    // Clear existing timeout
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    
    // Hide controls after 3 seconds
    controlsTimeoutRef.current = setTimeout(() => {
      setNavArrowsAnimation('exit');
      setControlsAnimation('exit');
      // Hide controls after exit animation completes
      setTimeout(() => {
        setShowControls(false);
        setNavArrowsAnimation('idle');
        setControlsAnimation('idle');
      }, 300); // Match the exit animation duration
    }, 3000);
  };

  const handleControlsInteraction = () => {
    showControlsTemporarily();
  };

  const toggleMute = () => {
    const video = videoRefs.current[activeIndex];
    if (video) {
      video.muted = !isMuted;
      setIsMuted(!isMuted);
    }
    showControlsTemporarily();
  };

  const handleLike = (videoId: string) => {
    showControlsTemporarily();
    setUserLiked(prev => {
      const wasLiked = prev[videoId] || false;
      const newState = {...prev, [videoId]: !wasLiked};
      
      // Update like count
      setLikeCount(prevCounts => {
        const currentCount = prevCounts[videoId] || 0;
        return {
          ...prevCounts,
          [videoId]: wasLiked ? currentCount - 1 : currentCount + 1
        };
      });
      
      // If user had previously disliked, remove the dislike
      if (!wasLiked && userDisliked[videoId]) {
        setUserDisliked(prevDislikes => ({
          ...prevDislikes,
          [videoId]: false
        }));
        
        setDislikeCount(prevCounts => {
          const currentCount = prevCounts[videoId] || 0;
          return {
            ...prevCounts,
            [videoId]: Math.max(0, currentCount - 1)
          };
        });
      }
      
      return newState;
    });
  };

  const handleDislike = (videoId: string) => {
    showControlsTemporarily();
    setUserDisliked(prev => {
      const wasDisliked = prev[videoId] || false;
      const newState = {...prev, [videoId]: !wasDisliked};
      
      // Update dislike count
      setDislikeCount(prevCounts => {
        const currentCount = prevCounts[videoId] || 0;
        return {
          ...prevCounts,
          [videoId]: wasDisliked ? currentCount - 1 : currentCount + 1
        };
      });
      
      // If user had previously liked, remove the like
      if (!wasDisliked && userLiked[videoId]) {
        setUserLiked(prevLikes => ({
          ...prevLikes,
          [videoId]: false
        }));
        
        setLikeCount(prevCounts => {
          const currentCount = prevCounts[videoId] || 0;
          return {
            ...prevCounts,
            [videoId]: Math.max(0, currentCount - 1)
          };
        });
      }
      
      return newState;
    });
  };

  const handleSave = (videoId: string) => {
    showControlsTemporarily();
    const video = mockShortVideos.find(v => v.id === videoId);
    if (!video) return;

    if (isSaved(videoId, 'video')) {
      removeSavedItem(videoId, 'video');
    } else {
      const savedItem = {
        id: video.id,
        title: video.title,
        type: 'video' as const,
        imageUrl: video.imageUrl,
        savedAt: new Date().toISOString()
      };
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



      <div 
        ref={containerRef}
        className="shorts-container h-screen overflow-y-scroll snap-y snap-mandatory"
      >
        {mockShortVideos.slice(0, MAX_SHORTS).map((video, index) => {
          const isActive = index === activeIndex;
          const isVideoSaved = isSaved(video.id, 'video');

          return (
            <div 
              key={video.id}
              data-index={index}
              className="short-video-container h-screen w-full flex items-center justify-center snap-start snap-always relative"
            >
              <div 
                className="video-wrapper relative w-full max-w-[500px] mx-auto" 
                style={{ aspectRatio: '9/16' }}
                onMouseEnter={showControlsTemporarily}
                onMouseLeave={() => {
                  if (controlsTimeoutRef.current) {
                    clearTimeout(controlsTimeoutRef.current);
                  }
                  controlsTimeoutRef.current = setTimeout(() => {
                    setNavArrowsAnimation('exit');
                    setControlsAnimation('exit');
                    setTimeout(() => {
                      setShowControls(false);
                      setNavArrowsAnimation('idle');
                      setControlsAnimation('idle');
                    }, 300);
                  }, 1000);
                }}
                onTouchStart={showControlsTemporarily}
              >
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
                        <Play size={32} className="text-white" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Video info overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                  <h3 className="text-white text-lg font-bold mb-2">{video.title}</h3>
                  <div className="flex items-center text-white/80 text-sm">
                    <span>@MotorTrendWatch</span>
                    <span className="mx-2">•</span>
                    <span>{video.publishDate}</span>
                  </div>
                </div>

                {/* Video controls - top */}
                {(showControls || controlsAnimation !== 'idle') && (
                  <div className={cn(
                    "absolute top-4 right-4 flex space-x-2",
                    controlsAnimation === 'enter' && "controls-enter",
                    controlsAnimation === 'exit' && "controls-exit"
                  )}>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="bg-black/30 text-white hover:bg-black/50 rounded-full h-10 w-10 controls-hover"
                      onClick={toggleMute}
                    >
                      {isMuted ? <VolumeX size={20} className="text-white" /> : <Volume2 size={20} className="text-white" />}
                    </Button>
                  </div>
                )}

                {/* Interaction buttons - right side */}
                {(showControls || controlsAnimation !== 'idle') && (
                  <div className={cn(
                    "absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col items-center space-y-6",
                    controlsAnimation === 'enter' && "controls-enter",
                    controlsAnimation === 'exit' && "controls-exit"
                  )}>
                  {/* Like button */}
                  <div className="flex flex-col items-center">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className={cn(
                        "bg-black/30 hover:bg-black/50 rounded-full h-12 w-12 controls-hover",
                        userLiked[video.id] ? "text-white bg-gray-700" : "text-white"
                      )}
                      onClick={() => handleLike(video.id)}
                    >
                      <ThumbsUp size={24} className={userLiked[video.id] ? "fill-white text-black" : "text-white"} />
                    </Button>
                    <span className="text-white text-xs mt-1">{likeCount[video.id] || 0}</span>
                  </div>

                  {/* Dislike button */}
                  <div className="flex flex-col items-center">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className={cn(
                        "bg-black/30 hover:bg-black/50 rounded-full h-12 w-12 controls-hover",
                        userDisliked[video.id] ? "text-white bg-gray-700" : "text-white"
                      )}
                      onClick={() => handleDislike(video.id)}
                    >
                      <ThumbsDown size={24} className={userDisliked[video.id] ? "fill-white text-black" : "text-white"} />
                    </Button>
                    <span className="text-white text-xs mt-1">Dislike</span>
                  </div>

                  {/* Comments button */}
                  <div className="flex flex-col items-center">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="bg-black/30 text-white hover:bg-black/50 rounded-full h-12 w-12 controls-hover"
                      onClick={() => showControlsTemporarily()}
                    >
                      <MessageSquare size={24} className="text-white" />
                    </Button>
                    <span className="text-white text-xs mt-1">19</span>
                  </div>

                  {/* Share button */}
                  <div className="flex flex-col items-center">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="bg-black/30 text-white hover:bg-black/50 rounded-full h-12 w-12 controls-hover"
                      onClick={() => showControlsTemporarily()}
                    >
                      <Share2 size={24} className="text-white" />
                    </Button>
                    <span className="text-white text-xs mt-1">Share</span>
                  </div>

                  {/* Save button */}
                  <div className="flex flex-col items-center">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className={cn(
                        "bg-black/30 hover:bg-black/50 rounded-full h-12 w-12 controls-hover",
                        isVideoSaved ? "text-motortrend-red" : "text-white"
                      )}
                      onClick={() => handleSave(video.id)}
                    >
                      <Bookmark size={24} className={isVideoSaved ? "fill-motortrend-red text-motortrend-red" : "text-white"} />
                    </Button>
                    <span className="text-white text-xs mt-1">Save</span>
                  </div>
                  
                  {/* More options button */}
                  <div className="flex flex-col items-center">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="bg-black/30 text-white hover:bg-black/50 rounded-full h-12 w-12 controls-hover"
                      onClick={() => showControlsTemporarily()}
                    >
                      <MoreVertical size={24} className="text-white" />
                    </Button>
                  </div>
                </div>
                )}

                {/* Navigation controls - positioned on the left side */}
                {(showControls || navArrowsAnimation !== 'idle') && (
                  <div className={cn(
                    "absolute left-4 top-1/2 transform -translate-y-1/2 flex flex-col space-y-4 z-20",
                    navArrowsAnimation === 'enter' && "nav-arrow-enter",
                    navArrowsAnimation === 'exit' && "nav-arrow-exit"
                  )}>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="bg-black/50 text-white hover:bg-black/70 rounded-full h-12 w-12 nav-arrow-hover"
                      onClick={navigateToPrev}
                    >
                      <ChevronUp size={24} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="bg-black/50 text-white hover:bg-black/70 rounded-full h-12 w-12 nav-arrow-hover"
                      onClick={navigateToNext}
                    >
                      <ChevronDown size={24} />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Shorts;
