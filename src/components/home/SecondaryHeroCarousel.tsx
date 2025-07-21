import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useCardSave } from '../../hooks/useCardSave';

// Bookmark button component for carousel slides
const SlideBookmarkButton: React.FC<{ slide: SecondaryHeroSlide }> = ({ slide }) => {
  const { isSaved, toggleSave } = useCardSave({
    id: slide.id,
    type: 'article',
    title: slide.title,
    imageUrl: slide.imageUrl,
    metadata: {
      subtitle: slide.subtitle,
      author: slide.author,
      readTime: slide.readTime,
      tag: slide.tag,
      linkTo: slide.linkTo
    }
  });

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={(e) => {
        e.stopPropagation();
        toggleSave();
      }}
      className={`w-10 h-10 rounded-full backdrop-blur-sm transition-all duration-200 border border-white/20 ${
        isSaved 
          ? 'bg-white/20 text-white border-white/40 hover:bg-white/30' 
          : 'bg-black/20 text-white/70 hover:bg-white/15 hover:text-white/90'
      }`}
      aria-label={isSaved ? "Remove from saved stories" : "Save story"}
    >
      <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
      <span className="sr-only">{isSaved ? 'Saved' : 'Save'}</span>
    </Button>
  );
};

export interface SecondaryHeroSlide {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  tag: string;
  tagColor: string;
  author: string;
  readTime: string;
  videoUrl?: string;
  linkTo?: string;
}

const defaultSecondaryHeroSlides: SecondaryHeroSlide[] = [{
  id: 'sh1',
  title: '2025 BMW M5 Touring: First Look',
  subtitle: 'BMW\'s most powerful wagon ever combines electric boost with V8 muscle',
  imageUrl: 'https://hips.hearstapps.com/hmg-prod/images/2025-bmw-m5-touring-spy-photo-1708453570.jpg',
  tag: 'First Look',
  tagColor: 'bg-blue-600',
  author: 'David Miller',
  readTime: '2 hours ago',
  linkTo: '/article/2025-bmw-m5-touring-first-look'
}, {
  id: 'sh2',
  title: 'Future of Off-Roading: Electric 4x4s',
  subtitle: 'How electric powertrains are revolutionizing off-road capability',
  imageUrl: 'https://hips.hearstapps.com/hmg-prod/images/2025-jeep-recon-front-three-quarters-1694714551.jpg',
  tag: 'Technology',
  tagColor: 'bg-green-600',
  author: 'Rachel Chen',
  readTime: '5 hours ago',
  linkTo: '/article/future-of-off-roading-electric-4x4s'
}, {
  id: 'sh3',
  title: 'The Art of Car Design',
  subtitle: 'Inside the studios shaping tomorrow\'s automotive aesthetics',
  imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1920&h=1080',
  tag: 'Design',
  tagColor: 'bg-purple-600',
  author: 'Marcus Wright',
  readTime: '1 day ago',
  linkTo: '/article/art-of-car-design'
}];

interface SecondaryHeroCarouselProps {
  slides?: SecondaryHeroSlide[];
}

const SLIDE_DURATION_SECONDS = 8;

const SecondaryHeroCarousel: React.FC<SecondaryHeroCarouselProps> = ({
  slides
}) => {
  const heroSlides = slides && slides.length > 0 ? slides : defaultSecondaryHeroSlides;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Touch/swipe state
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev + 1) % heroSlides.length);
  }, [heroSlides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide(prev => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, [heroSlides.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  // Touch event handlers
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  useEffect(() => {
    if (isHovered || heroSlides.length <= 1) {
      return;
    }

    const slideTimerId = setInterval(() => {
      nextSlide();
    }, SLIDE_DURATION_SECONDS * 1000);

    return () => {
      clearInterval(slideTimerId);
    };
  }, [currentSlide, isHovered, heroSlides.length, nextSlide]);

  return (
    <div 
      className="relative w-full overflow-hidden rounded-2xl shadow-modern-xl bg-neutral-900" 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={onTouchStart} 
      onTouchMove={onTouchMove} 
      onTouchEnd={onTouchEnd}
    >
      {/* Responsive aspect ratio container */}
      <div className="aspect-[21/9]">
        <div className="relative h-full">
          {/* Slides */}
          <div className="relative w-full h-full">
            {heroSlides.map((slide, index) => (
              <div 
                key={slide.id} 
                className={`absolute inset-0 transition-opacity duration-500 ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div className="relative w-full h-full">
                  {slide.videoUrl ? (
                    <div className="relative w-full h-full">
                      <video 
                        src={slide.videoUrl} 
                        poster={slide.imageUrl} 
                        className="w-full h-full object-cover" 
                        controls={false} 
                        autoPlay={false} 
                        muted 
                        playsInline 
                        preload="metadata" 
                      />
                    </div>
                  ) : (
                    <img 
                      src={slide.imageUrl} 
                      alt={slide.title} 
                      className="w-full h-full object-cover" 
                      loading="lazy" 
                    />
                  )}
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  
                  {/* Bookmark button - top right corner */}
                  <div className="absolute top-4 right-4 z-10">
                    <SlideBookmarkButton slide={slide} />
                  </div>
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 px-6 lg:px-12">
                    <div className="max-w-4xl py-8">
                      <div className="flex items-center gap-4 mb-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${slide.tagColor} text-white`}>
                          {slide.tag}
                        </span>
                        <span className="text-white/90 typography-caption">
                          {slide.readTime} • {slide.author}
                        </span>
                      </div>
                      
                      <h2 className="text-3xl sm:text-4xl font-bold text-white pb-2 leading-tight">
                        {slide.title}
                      </h2>
                      
                      <p className="text-white/80 text-lg sm:text-xl mb-4 line-clamp-2">
                        {slide.subtitle}
                      </p>
                      
                      <div className="mt-4">
                        {slide.linkTo ? (
                          <Button 
                            size="lg" 
                            asChild 
                            className="bg-white hover:bg-white/90 text-black font-semibold px-8 rounded-xl shadow-modern transition-all duration-200 hover:shadow-modern-lg"
                          >
                            <Link to={slide.linkTo}>Read More</Link>
                          </Button>
                        ) : (
                          <Button 
                            size="lg" 
                            className="bg-white hover:bg-white/90 text-black font-semibold px-8 rounded-xl shadow-modern transition-all duration-200 hover:shadow-modern-lg"
                          >
                            Read More
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation arrows */}
          {heroSlides.length > 1 && (
            <>
              <button 
                onClick={prevSlide} 
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/20 backdrop-blur-sm text-white hover:bg-black/40 transition-colors flex items-center justify-center z-10" 
                aria-label="Previous slide"
              >
                <ChevronLeft size={20} />
              </button>
              
              <button 
                onClick={nextSlide} 
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/20 backdrop-blur-sm text-white hover:bg-black/40 transition-colors flex items-center justify-center z-10" 
                aria-label="Next slide"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}

          {/* Dot indicators */}
          {heroSlides.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ease-in-out ${
                    index === currentSlide 
                      ? 'bg-white scale-125' 
                      : 'bg-white/40 hover:bg-white/60'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SecondaryHeroCarousel; 