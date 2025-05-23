
import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Clock, User } from "lucide-react";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface HeroNewsItem {
  id: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  category: string;
  timestamp: string;
  author: string;
  url: string;
}

interface HeroCarouselProps {
  items: HeroNewsItem[];
  className?: string;
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({ items, className }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className={cn("relative w-full", className)}>
      <Carousel
        opts={{ loop: true }}
        className="w-full"
        onSelect={(api) => {
          if (api) {
            setCurrentIndex(api.selectedScrollSnap());
          }
        }}
      >
        <CarouselContent>
          {items.map((item, index) => (
            <CarouselItem key={item.id}>
              <div className="relative h-[500px] w-full overflow-hidden rounded-lg">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="mb-2 flex items-center gap-2">
                      <Badge className="bg-motortrend-red text-white">{item.category}</Badge>
                      <div className="flex items-center gap-1 text-xs text-gray-300">
                        <Clock size={12} />
                        <span>{item.timestamp}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-300">
                        <User size={12} />
                        <span>{item.author}</span>
                      </div>
                    </div>
                    <h2 className="mb-2 text-3xl font-bold tracking-tight">{item.title}</h2>
                    <p className="mb-4 text-sm text-gray-200 line-clamp-2">{item.excerpt}</p>
                    <Button asChild variant="default" size="sm" className="bg-motortrend-red hover:bg-motortrend-red/90">
                      <a href={item.url}>Read Full Story</a>
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        <CarouselPrevious className="absolute left-4 top-1/2 z-10 h-10 w-10 -translate-y-1/2 bg-white/80 hover:bg-white" />
        <CarouselNext className="absolute right-4 top-1/2 z-10 h-10 w-10 -translate-y-1/2 bg-white/80 hover:bg-white" />
      </Carousel>
      
      <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {items.map((_, index) => (
          <button
            key={`indicator-${index}`}
            className={`h-1.5 rounded-full transition-all ${
              currentIndex === index ? "w-8 bg-motortrend-red" : "w-2 bg-white/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
