import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, X, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  content: string;
  image?: string;
  backgroundColor?: string;
  isQuote?: boolean;
  isStory?: boolean;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Introducing My Garage",
    subtitle: "A personalized experience for every driver",
    content: "Welcome to My Garage - your personal automotive hub where you can save, organize, and track all your vehicles in one place.",
    image: "https://d2kde5ohu8qb21.cloudfront.net/files/684f21c88feb2d000827e604/adobestock-416249405.jpeg",
    backgroundColor: "bg-gradient-to-br from-neutral-8 to-neutral-7"
  },
  {
    id: 2,
    title: "Meet Greg The Enthusiast",
    subtitle: "The Car Enthusiast",
    content: "**Background:** Greg is a passionate car enthusiast who has loved cars since childhood. He owns a classic vintage car that he enjoys tinkering with on weekends. Greg isn't actively buying cars but dreams about adding to his collection someday.\n\n**Needs and Goals:** Greg uses \"My Garage\" to track maintenance on his current vehicle, plan upgrades, and create a wishlist of dream cars. He enjoys comparing different models and imagining future project cars.\n\n**Motivation:** For Greg, cars aren't just transportation—they're a passion and hobby. He wants features that support his automotive enthusiasm and help him connect with the car community.",
    backgroundColor: "bg-gradient-to-br from-neutral-8 to-neutral-7"
  },
  {
    id: 3,
    title: "Greg The Enthusiast",
    subtitle: "Car Enthusiast",
    content: "You know, for me, cars are more than just transportation. They're memories, they're passion projects, they're a part of who I am.",
    image: "https://d2kde5ohu8qb21.cloudfront.net/files/684eff06ad70b40008438c69/greg.png",
    backgroundColor: "bg-gradient-to-br from-neutral-8 to-neutral-7",
    isQuote: true
  },
  {
    id: 4,
    title: "Greg's Story – Why he loves cars",
    subtitle: "From Toy Hot-Wheels to Track Days—Greg's Journey on Four Wheels",
    content: "1. Childhood spark (age 6)\n• Hot-Wheels and weekend car shows with his dad planted the seed.\n\n2. Formative moment (college years)\nGreg working on a project car\n• Rebuilt a 1986 Mazda RX-7 in the dorm parking lot—learned patience and mechanics.\n\n3. Today – the hobby turns social\nAutocross run\n• Monthly track-day community gives him adrenaline and friendships.\n\n4. What Greg wants next\n\"…a car that's track-ready out of the box, but civil for Monday to-work.\"",
    image: "https://d2kde5ohu8qb21.cloudfront.net/files/684f0d537a225e0008ee0726/chatgptimagejun15-2025-11-13-19am.png",
    backgroundColor: "bg-gradient-to-br from-neutral-8 to-neutral-7",
    isStory: true
  },
  {
    id: 5,
    title: "Meet Paula the Practical Buyer",
    subtitle: "The Practical Buyer",
    content: "**Background:** Paula is a busy professional who needs a reliable car for her daily commute. She isn't a car enthusiast, but she values practicality and efficiency. Paula is in the market for a new car that's fuel-efficient and affordable, and she wants to make a well-informed decision.\n\n**Needs and Goals:** Paula uses \"My Garage\" to compare different cars she's considering, calculate monthly payments, and keep track of test drives. She wants a feature that simplifies the car-buying process and helps her stay organized throughout her search.\n\n**Motivation:** Paula is motivated by convenience and efficiency. She wants to find a car that fits her lifestyle and budget without too much hassle.",
    backgroundColor: "bg-gradient-to-br from-neutral-8 to-neutral-7"
  },
  {
    id: 6,
    title: "Paula the Practical Buyer",
    subtitle: "Practical Buyer",
    content: "I just need a car that fits my life. Something reliable that gets me where I need to go and makes things a little easier every day.",
    image: "https://d2kde5ohu8qb21.cloudfront.net/files/684f0501ad70b40008438c6d/paula.png",
    backgroundColor: "bg-gradient-to-br from-neutral-8 to-neutral-7",
    isQuote: true
  },
  {
    id: 7,
    title: "Paula's Story – Why she needs a new car",
    subtitle: "From Frustration to Freedom—Paula's Search for Peace-of-Mind Mobility",
    content: "1. The problem (yesterday's commute)\nPhoto: Paula waiting for a tow truck, phone in hand\n• 14-mile commute ballooned to two hours after her 2008 sedan overheated—again.\n\n2. Life changes (this year)\n• New baby → safety first.\n• Side-hustle deliveries → cargo space.\n• Rising repair bills → budget drain.\n\n3. Decision criteria\n• 5-star safety rating\n• 40+ MPG (gas or equivalent EV range)\n• Under $450/mo all-in financing\n\n4. The \"aha\" moment\nTestimonial quote placeholder\n• \"Your Smart-Lease bundle fit every box—plus concierge maintenance so I never see a tow again.\"",
    image: "https://d2kde5ohu8qb21.cloudfront.net/files/684f0affe07a220008e85b17/chatgptimagejun15-2025-11-03-00am.png",
    backgroundColor: "bg-gradient-to-br from-neutral-8 to-neutral-7",
    isStory: true
  },
  {
    id: 8,
    title: "Save Your Vehicles",
    subtitle: "Build your automotive collection",
    content: "Easily save cars you own, are interested in, or have test-driven. Create a comprehensive collection of your automotive journey.",
    backgroundColor: "bg-gradient-to-br from-neutral-8 to-neutral-7"
  },
  {
    id: 9,
    title: "Track Maintenance",
    subtitle: "Stay on top of vehicle care",
    content: "Keep detailed maintenance records, set reminders, and track service history to ensure your vehicles stay in perfect condition.",
    backgroundColor: "bg-gradient-to-br from-neutral-8 to-neutral-7"
  },
  {
    id: 10,
    title: "Compare & Research",
    subtitle: "Make informed decisions",
    content: "Compare specifications, prices, and features across different vehicles to make the best automotive decisions.",
    backgroundColor: "bg-gradient-to-br from-neutral-8 to-neutral-7"
  },
  {
    id: 11,
    title: "Dream Car Wishlist",
    subtitle: "Plan your next purchase",
    content: "Create a wishlist of dream cars with target prices, must-have features, and priority levels to plan your future purchases.",
    backgroundColor: "bg-gradient-to-br from-neutral-8 to-neutral-7"
  }
];

interface MyGarageSlideshowProps {
  className?: string;
}

const MyGarageSlideshow: React.FC<MyGarageSlideshowProps> = ({ className }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Helper function to render text with bold markdown
  const renderTextWithBold = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        const boldText = part.slice(2, -2);
        return <strong key={index} className="font-bold text-neutral-1">{boldText}</strong>;
      }
      return part;
    });
  };

  // Navigation functions
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  const toggleFullscreen = useCallback(() => {
    setIsFullscreen(!isFullscreen);
  }, [isFullscreen]);

  const toggleAutoplay = useCallback(() => {
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000); // 4 seconds per slide

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          prevSlide();
          break;
        case 'ArrowRight':
          event.preventDefault();
          nextSlide();
          break;
        case 'Escape':
          if (isFullscreen) {
            event.preventDefault();
            setIsFullscreen(false);
          }
          break;
        case ' ':
          event.preventDefault();
          toggleAutoplay();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen, prevSlide, nextSlide, toggleAutoplay]);

  const currentSlideData = slides[currentSlide];

  const renderSlideContent = () => {
    if (currentSlideData.isQuote) {
      return (
        /* Quote slide layout with image */
        <div className="flex items-center justify-center gap-8 md:gap-16 max-w-6xl w-full">
          {/* Greg's Photo */}
          <div className="flex-shrink-0">
            <img 
              src={currentSlideData.image} 
              alt="Greg The Enthusiast"
              className={cn(
                "rounded-xl object-cover",
                isFullscreen ? "w-80 h-80 md:w-96 md:h-96" : "w-48 h-48 md:w-64 md:h-64"
              )}
            />
          </div>
          
          {/* Quote Content */}
          <div className="flex-1 text-left">
            {/* Title */}
            <h1 className={cn(
              "font-bold text-neutral-1 mb-2 leading-tight",
              isFullscreen ? "text-4xl md:text-6xl" : "text-2xl md:text-4xl"
            )}>
              {currentSlideData.title}
            </h1>
            
            {/* Subtitle */}
            <p className={cn(
              "text-neutral-4 mb-6 uppercase tracking-wide",
              isFullscreen ? "text-lg md:text-xl" : "text-sm md:text-base"
            )}>
              {currentSlideData.subtitle}
            </p>
            
            {/* Quote */}
            <blockquote className={cn(
              "text-neutral-2 italic border-l-4 border-motortrend-red pl-6",
              isFullscreen ? "text-2xl md:text-3xl leading-relaxed" : "text-xl md:text-2xl leading-relaxed"
            )}>
              {renderTextWithBold(currentSlideData.content)}
            </blockquote>
          </div>
        </div>
      );
    }

    if (currentSlideData.isStory) {
      return (
        /* Story slide layout with timeline content and image */
        <div className="flex items-center justify-center gap-8 md:gap-16 max-w-6xl w-full">
          {/* RX-7 Photo */}
          <div className="flex-shrink-0">
            <img 
              src={currentSlideData.image} 
              alt="RX-7"
              className={cn(
                "rounded-xl object-cover",
                isFullscreen ? "w-80 h-80 md:w-96 md:h-96" : "w-48 h-48 md:w-64 md:h-64"
              )}
            />
          </div>
          
          {/* Timeline Content */}
          <div className="flex-1 text-left">
            {/* Title */}
            <h1 className={cn(
              "font-bold text-neutral-1 mb-2 leading-tight",
              isFullscreen ? "text-4xl md:text-6xl" : "text-2xl md:text-4xl"
            )}>
              {currentSlideData.title}
            </h1>
            
            {/* Subtitle */}
            <p className={cn(
              "text-neutral-4 mb-6 uppercase tracking-wide",
              isFullscreen ? "text-lg md:text-xl" : "text-sm md:text-base"
            )}>
              {currentSlideData.subtitle}
            </p>
            
            {/* Timeline */}
            <div className={cn(
              "text-neutral-3 max-w-3xl mx-auto text-left",
              isFullscreen ? "text-lg md:text-xl" : "text-base md:text-lg"
            )}>
              {currentSlideData.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4 last:mb-0">
                  {renderTextWithBold(paragraph)}
                </p>
              ))}
            </div>
          </div>
        </div>
      );
    }

    // Regular slide layout
    return (
      <div className="text-center max-w-4xl">
        {/* Title */}
        <h1 className={cn(
          "font-bold mb-4 leading-tight",
          currentSlide === 0 ? "text-white" : "text-neutral-1",
          isFullscreen ? "text-6xl md:text-8xl" : "text-4xl md:text-6xl"
        )}>
          {currentSlideData.title}
        </h1>
        
        {/* Subtitle */}
        <p className={cn(
          "mb-6",
          currentSlide === 0 ? "text-white/90" : "text-neutral-2",
          isFullscreen ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"
        )}>
          {currentSlideData.subtitle}
        </p>
        
        {/* Red accent line */}
        <div className="w-16 h-1 bg-motortrend-red mx-auto mb-6"></div>
        
        {/* Content */}
        <div 
          className={cn(
            "max-w-4xl mx-auto text-center",
            currentSlide === 0 ? "!text-white font-medium" : "text-neutral-3",
            currentSlide === 0 
              ? isFullscreen ? "text-3xl md:text-4xl leading-relaxed" : "text-2xl md:text-3xl leading-relaxed"
              : isFullscreen ? "text-lg md:text-xl" : "text-base md:text-lg"
          )}
          style={currentSlide === 0 ? {
            color: '#ffffff !important',
            fontSize: '24px',
            fontWeight: '500',
            textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
            filter: 'none'
          } : {}}
        >
          {currentSlideData.content.split('\n\n').map((paragraph, index) => (
            <p 
              key={index} 
              className={cn(
                "mb-4 last:mb-0",
                currentSlide === 0 ? "drop-shadow-lg !text-white" : ""
              )}
              style={currentSlide === 0 ? {
                color: '#ffffff !important',
                fontSize: 'inherit',
                fontWeight: 'inherit',
                filter: 'none',
                opacity: '1'
              } : {}}
            >
              {renderTextWithBold(paragraph)}
            </p>
          ))}
        </div>
      </div>
    );
  };

  const slideshowContent = (
    <div className={cn(
      "relative overflow-hidden rounded-xl",
      isFullscreen ? "fixed inset-0 z-50 rounded-none" : "aspect-video",
      currentSlideData.backgroundColor
    )}>
      {/* Background Image for first slide */}
      {currentSlide === 0 && currentSlideData.image && (
        <>
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${currentSlideData.image})` }}
          />
          <div className="absolute inset-0 bg-black/40" />
        </>
      )}
      
      {/* Slide Content */}
      <div className="relative h-full flex items-center justify-center p-8 md:p-16 z-10">
        {renderSlideContent()}
      </div>

      {/* Controls */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-20">
        {/* Navigation Dots */}
        <div className="flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-200 border cursor-pointer",
                index === currentSlide 
                  ? currentSlide === 0 
                    ? "bg-white border-white scale-110" 
                    : "bg-neutral-1 border-neutral-1 scale-110"
                  : currentSlide === 0
                    ? "bg-white/40 border-white/40 hover:bg-white/60 hover:border-white/60"
                    : "bg-neutral-4 border-neutral-4 hover:bg-neutral-3 hover:border-neutral-3"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Control Buttons */}
        <div className="flex items-center space-x-2">
          {/* Auto-play toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleAutoplay}
            className={cn(
              "hover:bg-white/20 cursor-pointer",
              currentSlide === 0 ? "text-white" : "text-black"
            )}
            aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </Button>

          {/* Previous */}
          <Button
            variant="ghost"
            size="sm"
            onClick={prevSlide}
            className={cn(
              "hover:bg-white/20 cursor-pointer",
              currentSlide === 0 ? "text-white" : "text-black"
            )}
            aria-label="Previous slide"
          >
            <ChevronLeft size={16} />
          </Button>

          {/* Next */}
          <Button
            variant="ghost"
            size="sm"
            onClick={nextSlide}
            className={cn(
              "hover:bg-white/20 cursor-pointer",
              currentSlide === 0 ? "text-white" : "text-black"
            )}
            aria-label="Next slide"
          >
            <ChevronRight size={16} />
          </Button>

          {/* Fullscreen toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleFullscreen}
            className={cn(
              "hover:bg-white/20 cursor-pointer",
              currentSlide === 0 ? "text-white" : "text-black"
            )}
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            {isFullscreen ? <X size={16} /> : <Maximize2 size={16} />}
          </Button>
        </div>
      </div>

      {/* Slide counter */}
      <div className={cn(
        "absolute top-4 right-4 backdrop-blur-sm rounded-full px-3 py-1 z-20",
        currentSlide === 0 ? "bg-white/20" : "bg-black/20"
      )}>
        <span className={cn(
          "text-sm font-medium",
          currentSlide === 0 ? "text-white" : "text-black"
        )}>
          {currentSlide + 1} / {slides.length}
        </span>
      </div>
    </div>
  );

  if (isFullscreen) {
    return slideshowContent;
  }

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-0">
        {slideshowContent}
      </CardContent>
    </Card>
  );
};

export default MyGarageSlideshow;
