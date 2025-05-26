import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  tag: string;
  tagColor: string;
  author: string;
  readTime: string;
}
const heroSlides: HeroSlide[] = [{
  id: '1',
  title: '2025 Tesla Cybertruck: Everything We Know About the Electric Pickup Revolution',
  subtitle: 'The highly anticipated electric truck is finally here, and it\'s changing the pickup landscape forever. Here\'s our exclusive first drive and in-depth analysis.',
  imageUrl: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&w=1920&h=1080',
  tag: 'First Drive',
  tagColor: 'bg-motortrend-red',
  author: 'John Carter',
  readTime: '8 hours ago'
}, {
  id: '2',
  title: '2025 Ford Mustang GT: The Evolution of an Icon',
  subtitle: 'Ford\'s latest Mustang GT brings more power and refinement to America\'s favorite sports car.',
  imageUrl: 'https://images.unsplash.com/photo-1494905998402-395d579af36f?auto=format&fit=crop&w=1920&h=1080',
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
}];
const HeroCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % heroSlides.length);
  };
  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + heroSlides.length) % heroSlides.length);
  };
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };
  return <div className="relative w-full h-[500px] lg:h-[600px] overflow-hidden rounded-2xl shadow-modern-xl">
      {/* Slides */}
      <div className="relative w-full h-full">
        {heroSlides.map((slide, index) => <div key={slide.id} className={`absolute inset-0 transition-opacity duration-500 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
            <div className="relative w-full h-full">
              <img src={slide.imageUrl} alt={slide.title} className="w-full h-full object-cover" />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-12">
                <div className="max-w-4xl">
                  <div className="flex items-center gap-4 mb-4">
                    <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-white typography-small font-semibold tracking-wide ${slide.tagColor}`}>
                      {slide.tag}
                    </span>
                    <span className="text-white typography-caption">
                      {slide.readTime} • {slide.author}
                    </span>
                  </div>
                  
                  <h1 className="typography-hero text-white mb-4 max-w-4xl text-lg">
                    {slide.title}
                  </h1>
                  
                  
                  
                  <Button size="lg" className="bg-motortrend-red hover:bg-motortrend-red/90 text-white font-semibold px-8 py-3 rounded-xl shadow-modern transition-all duration-200 hover:shadow-modern-lg">
                    Read Full Story
                  </Button>
                </div>
              </div>
            </div>
          </div>)}
      </div>

      {/* Navigation arrows */}
      <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/20 backdrop-blur-sm text-white hover:bg-black/40 transition-colors flex items-center justify-center" aria-label="Previous slide">
        <ChevronLeft size={24} />
      </button>
      
      <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/20 backdrop-blur-sm text-white hover:bg-black/40 transition-colors flex items-center justify-center" aria-label="Next slide">
        <ChevronRight size={24} />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {heroSlides.map((_, index) => <button key={index} onClick={() => goToSlide(index)} className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? 'bg-white' : 'bg-white/40'}`} aria-label={`Go to slide ${index + 1}`} />)}
      </div>
    </div>;
};
export default HeroCarousel;