import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  tag: string;
  tagColor: string;
  author: string;
  readTime: string;
  videoUrl?: string;
}
const defaultHeroSlides: HeroSlide[] = [{
  id: '1',
  title: '2025 Ferrari 296 GT3: The Ultimate Track Weapon',
  subtitle: 'Ferrari unveils its latest track-focused supercar with revolutionary hybrid technology and track performance',
  imageUrl: 'https://www.ferrarisiliconvalley.com/static/dealer-20428/New_Ferrari_V12_ext_02_red_media_de9bb413-30d8-448c-bb64-2458e003d949.webp',
  tag: 'First Drive',
  tagColor: 'bg-motortrend-red',
  author: 'John Carter',
  readTime: '8 hours ago'
}, {
  id: '2',
  title: '2025 Ford Mustang GT: The Evolution of an Icon',
  subtitle: 'Ford\'s latest Mustang GT brings more power and refinement to America\'s favorite sports car.',
  imageUrl: 'https://www.usnews.com/dims4/USNEWS/1f68db0/2147483647/thumbnail/970x647/quality/85/?url=https%3A%2F%2Fwww.usnews.com%2Fcmsmedia%2Fff%2Fb8%2F1541dfa646598a340d0e1d5cd797%2Fmaverick-lobo-2.jpg',
  tag: 'Review',
  tagColor: 'bg-blue-600',
  author: 'Sarah Johnson',
  readTime: '4 hours ago'
}, {
  id: '3',
  title: 'Electric vs Gas: The Future of Performance Cars',
  subtitle: 'A comprehensive comparison of electric and traditional powertrains in today\'s performance vehicle market.',
  imageUrl: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1920&h=1080',
  tag: 'Analysis',
  tagColor: 'bg-green-600',
  author: 'Mike Thompson',
  readTime: '2 hours ago'
}, {
  id: '4',
  title: '2025 Ford Mustang 60th Anniversary Edition Revealed',
  subtitle: 'Ford celebrates six decades of the iconic Mustang with a special anniversary package.',
  imageUrl: 'https://hips.hearstapps.com/hmg-prod/images/2025-ford-mustang-60th-anniversary-exterior-66227932bb88e.jpg',
  tag: 'New Model',
  tagColor: 'bg-red-700',
  author: 'MotorTrend Staff',
  readTime: 'Just In'
}];
interface HeroCarouselProps {
  slides?: HeroSlide[];
}
const SLIDE_DURATION_SECONDS = 10; // New constant for duration

const HeroCarousel: React.FC<HeroCarouselProps> = ({
  slides
}) => {
  const heroSlides = slides && slides.length > 0 ? slides : defaultHeroSlides;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [countdown, setCountdown] = useState(SLIDE_DURATION_SECONDS); // Use constant
  const [isHovered, setIsHovered] = useState(false);
  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev + 1) % heroSlides.length);
  }, [heroSlides.length]);
  const prevSlide = useCallback(() => {
    setCurrentSlide(prev => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, [heroSlides.length]);
  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);
  useEffect(() => {
    // Reset countdown to full duration whenever the slide changes or hover state ends
    setCountdown(SLIDE_DURATION_SECONDS);
    if (isHovered || heroSlides.length <= 1) {
      return;
    }

    // Interval to advance to the next slide
    const slideTimerId = setInterval(() => {
      nextSlide();
    }, SLIDE_DURATION_SECONDS * 1000); // Use constant

    // Interval to update the countdown display (ticks every second)
    const countdownTimerId = setInterval(() => {
      setCountdown(prev => prev > 1 ? prev - 1 : SLIDE_DURATION_SECONDS); // Use constant for reset
    }, 1000);

    // Cleanup function to clear intervals when component unmounts or dependencies change
    return () => {
      clearInterval(slideTimerId);
      clearInterval(countdownTimerId);
    };
  }, [currentSlide, isHovered, heroSlides.length, nextSlide]);

  // SVG Circle properties for the progress timer
  const radius = 18; // Radius of the circle
  const circumference = 2 * Math.PI * radius;
  // Calculate progress based on SLIDE_DURATION_SECONDS
  const progressOffset = circumference * (1 - (SLIDE_DURATION_SECONDS - countdown) / SLIDE_DURATION_SECONDS);
  return <div className="relative w-full overflow-hidden rounded-2xl shadow-modern-xl" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      {/* Responsive aspect ratio container */}
      <div className="aspect-[4/6] sm:aspect-[16/9]">
        <div className="relative h-full">
          {/* Slides */}
          <div className="relative w-full h-full">
            {heroSlides.map((slide, index) => <div key={slide.id} className={`absolute inset-0 transition-opacity duration-500 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
                <div className="relative w-full h-full">
                  {slide.videoUrl ? <div className="relative w-full h-full">
                      <video src={slide.videoUrl} poster={slide.imageUrl} className="w-full h-full object-cover" controls={false} autoPlay={false} muted playsInline preload="metadata" />
                      {/* Play icon overlay */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="bg-black/60 rounded-full p-4">
                          <Play className="text-white w-10 h-10" />
                        </div>
                      </div>
                    </div> : <img src={slide.imageUrl} alt={slide.title} className="w-full h-full object-cover" loading="lazy" />}
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 px-6 lg:px-12">
                    <div className="max-w-4xl py-12">
                      <div className="flex items-center gap-4 mb-4">
                        <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-white typography-small font-semibold tracking-wide ${slide.tagColor}`}>
                          {slide.tag}
                        </span>
                        <span className="text-white typography-caption">
                          {slide.readTime} • {slide.author}
                        </span>
                      </div>
                      
                      <h1 className="typography-display text-white pt-0 pb-4">
                        {slide.title}
                      </h1>
                      
                      <Button size="lg" className="bg-motortrend-red hover:bg-motortrend-red/90 text-white font-semibold px-8 rounded-xl shadow-modern transition-all duration-200 hover:shadow-modern-lg py-0">
                        Read Full Story
                      </Button>
                    </div>
                  </div>
                </div>
              </div>)}
          </div>

          {/* Navigation arrows */}
          {heroSlides.length > 1 && <>
              <button onClick={prevSlide} className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/20 backdrop-blur-sm text-white hover:bg-black/40 transition-colors flex items-center justify-center z-10" aria-label="Previous slide">
                <ChevronLeft size={20} />
              </button>
              
              <button onClick={nextSlide} className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/20 backdrop-blur-sm text-white hover:bg-black/40 transition-colors flex items-center justify-center z-10" aria-label="Next slide">
                {/* Circular Progress SVG */}
                {heroSlides.length > 1 && <svg className="absolute inset-0 w-full h-full" viewBox="0 0 40 40"> {/* Adjusted viewBox for a 20px radius circle centered */}
                    {/* Background track */}
                    <circle cx="20" cy="20" r={radius} fill="transparent" stroke="rgba(255, 255, 255, 0.2)" // Lighter track
              strokeWidth="3" />
                    {/* Progress stroke */}
                    <circle cx="20" cy="20" r={radius} fill="transparent" stroke="rgba(255, 255, 255, 0.6)" // Changed to semi-transparent white
              strokeWidth="3" strokeDasharray={circumference} strokeDashoffset={isHovered ? circumference : progressOffset} // Pause animation on hover by setting offset to full
              strokeLinecap="round" transform="rotate(-90 20 20)" // Start from the top
              style={{
                transition: isHovered ? 'none' : 'stroke-dashoffset 0.2s linear'
              }} // Smooth transition, no transition on hover resume to avoid jump
              />
                  </svg>}
                <ChevronRight size={20} className="relative z-10" /> {/* Icon on top */}
              </button>
            </>}

          {/* Dot indicators */}
          {heroSlides.length > 1 && <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {heroSlides.map((_, index) => <button key={index} onClick={() => goToSlide(index)} className={`w-3 h-3 rounded-full transition-all duration-300 ease-in-out ${index === currentSlide ? 'bg-white scale-125' : 'bg-white/40 scale-100'}`} aria-label={`Go to slide ${index + 1}`} />)}
            </div>}
        </div>
      </div>
    </div>;
};
export default HeroCarousel;