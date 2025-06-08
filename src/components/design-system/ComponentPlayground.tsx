import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Check, Plus, Download, ExternalLink, Settings } from 'lucide-react';
import CodeSnippet from './CodeSnippet';
import ArticleCard from '@/components/ArticleCard';
import { CarData } from '@/components/CarCard';
import CarCard from '@/components/CarCard';
import VideoCard from '@/components/VideoCard';
import PhotoCard from '@/components/PhotoCard';
interface PropertyControl {
  type: 'select' | 'boolean' | 'text' | 'range';
  label: string;
  options?: string[];
  min?: number;
  max?: number;
  step?: number;
}
interface ComponentConfig {
  name: string;
  description: string;
  properties: Record<string, PropertyControl>;
}
type ButtonVariant = 'solid' | 'solid-light' | 'outline-black' | 'ghost-black' | 
  'solid-red' | 'solid-red-light' | 'outline-red' | 'ghost-red' | 
  'solid-primary' | 'solid-primary-light' | 'outline-primary' | 'ghost-primary' | 
  'outline' | 'ghost' | 'link' | 'minimal';

type ButtonSize = 'sm' | 'md' | 'lg' | 'xl' | 'icon-sm' | 'icon' | 'icon-lg';

type BadgeProperties = {
  variant: ButtonVariant;
  text: string;
};

type ButtonProperties = {
  variant: ButtonVariant;
  size: ButtonSize;
  disabled: boolean;
  withIcon: boolean;
  text: string;
};

type CardProperties = {
  withHeader: boolean;
  withFooter: boolean;
  title: string;
  description: string;
  cardType: string;
};

type ComponentProperties = ButtonProperties | BadgeProperties | CardProperties;

const ComponentPlayground = () => {
  const [selectedComponent, setSelectedComponent] = useState<keyof typeof components>('button');
  const [buttonProps, setButtonProps] = useState<ButtonProperties>({
    variant: 'solid',
    size: 'md',
    disabled: false,
    withIcon: false,
    text: 'Button Text'
  });

  const [badgeProps, setBadgeProps] = useState<BadgeProperties>({
    variant: 'solid',
    text: 'Badge Text'
  });

  const [cardProps, setCardProps] = useState<CardProperties>({
    withHeader: true,
    withFooter: false,
    title: 'Card Title',
    description: 'Card Description',
    cardType: 'article'
  });

  const properties = selectedComponent === 'button' ? buttonProps :
    selectedComponent === 'badge' ? badgeProps :
    cardProps;

  const setProperties = (newProps: Partial<ButtonProperties | BadgeProperties | CardProperties>) => {
    if (selectedComponent === 'button') {
      setButtonProps(prev => ({ ...prev, ...newProps }));
    } else if (selectedComponent === 'badge') {
      setBadgeProps(prev => ({ ...prev, ...newProps }));
    } else {
      setCardProps(prev => ({ ...prev, ...newProps }));
    }
  };

  // Initial state for button
    variant: 'solid',
    size: 'md',
    disabled: false,
    withIcon: false,
    text: 'Button Text'
  });

  // Define available components for the playground
  const components: Record<string, ComponentConfig> = {
    button: {
      name: 'Button',
      description: 'Interactive button component with various styles and states',
      properties: {
        variant: {
          type: 'select',
          label: 'Variant',
          options: ['solid', 'solid-light', 'outline-black', 'ghost-black', 'solid-red', 'solid-red-light', 'outline-red', 'ghost-red', 'solid-primary', 'solid-primary-light', 'outline-primary', 'ghost-primary', 'outline', 'ghost', 'link', 'minimal']
        },
        size: {
          type: 'select',
          label: 'Size',
          options: ['sm', 'md', 'lg', 'xl', 'icon-sm', 'icon', 'icon-lg']
        },
        disabled: {
          type: 'boolean',
          label: 'Disabled'
        },
        withIcon: {
          type: 'boolean',
          label: 'With Icon'
        },
        text: {
          type: 'text',
          label: 'Button Text'
        }
      }
    },
    badge: {
      name: 'Badge',
      description: 'Small status descriptors for UI elements',
      properties: {
        variant: {
          type: 'select',
          label: 'Variant',
          options: ['solid', 'solid-light', 'outline-black', 'ghost-black', 'solid-red', 'solid-red-light', 'outline-red', 'ghost-red', 'solid-primary', 'solid-primary-light', 'outline-primary', 'ghost-primary', 'outline', 'ghost', 'link', 'minimal']
        },
        text: {
          type: 'text',
          label: 'Badge Text'
        }
      }
    },
    card: {
      name: 'Card',
      description: 'Container for related content and actions',
      properties: {
        withHeader: {
          type: 'boolean',
          label: 'With Header'
        },
        withFooter: {
          type: 'boolean',
          label: 'With Footer'
        },
        title: {
          type: 'text',
          label: 'Title'
        },
        description: {
          type: 'text',
          label: 'Description'
        }
      }
    },
    contentCard: {
      name: 'Content Card',
      description: 'Different card types used throughout the application',
      properties: {
        cardType: {
          type: 'select',
          label: 'Card Type',
          options: ['article', 'photo', 'video', 'newCar', 'usedCar']
        }
      }
    }
  };

  // Sample data for different card types
  const sampleData = {
    article: {
      id: 'art1',
      title: 'Best SUVs for Families in 2025',
      imageUrl: 'https://www.motortrend.com/files/67eeb24ae58cfc000822372c/bestmidsizesuvs.jpg',
      date: '2025-03-15',
      category: 'SUV',
      author: 'Jane Smith',
      readTime: '5 min read'
    },
    photo: {
      id: 'ph1',
      title: '2025 Porsche 911 GT3 RS - Track Ready',
      imageUrl: 'https://www.motortrend.com/files/679a40fb03dfa1000846f1f8/2025porsche911gt3weissach1.jpg',
      date: '2025-04-02',
      category: 'Sports Car',
      photoCount: 24,
      photographer: 'Michael Johnson',
      position: '1',
      make: 'Porsche',
      carModel: '911 GT3 RS',
      year: '2025'
    },
    video: {
      id: 'vid1',
      title: '2025 Rivian R2 Off-Road Test: Better Than a Jeep?',
      imageUrl: 'https://d2kde5ohu8qb21.cloudfront.net/files/65ebc644c7bc5b000866ad3e/0051-rivian-r2-first-look-fullcut-thumbnail-1920x1080.jpg',
      date: '2025-03-28',
      category: 'SUV',
      duration: '12:48',
      views: '245K',
      channelName: 'MotorTrend',
      description: 'We take the all-new Rivian R2 off-road to see how it compares to traditional off-roaders',
      url: '#video-player'
    },
    newCar: {
      id: '1',
      title: '2025 Tesla Model 3 Performance',
      imageUrl: 'https://media.ed.edmunds-media.com/tesla/model-3/2025/oem/2025_tesla_model-3_sedan_long-range_fq_oem_1_1600.jpg',
      price: '$54,990',
      category: 'Electric',
      year: '2025',
      fuelType: 'Electric',
      drivetrain: 'AWD',
      location: 'San Francisco, CA',
      bodyStyle: 'Sedan',
      isNew: true,
      motorTrendScore: '9.2',
      motorTrendRank: '1',
      motorTrendCategoryRank: true,
    },
    usedCar: {
      id: '2',
      title: '2022 Toyota Camry XSE',
      imageUrl: 'https://www.motortrend.com/uploads/2021/12/2022-Toyota-Camry-SE-23.jpg',
      price: '$28,500',
      category: 'Sedan',
      year: '2022',
      mileage: '15,000 miles',
      fuelType: 'Hybrid',
      drivetrain: 'FWD',
      location: 'Los Angeles, CA',
      bodyStyle: 'Sedan',
      isNew: false,
      motorTrendScore: '8.5',
      motorTrendRank: '3',
      motorTrendCategoryRank: true
    }
  };

  // Handle property changes
  const handlePropertyChange = (property: string, value: string | boolean | number) => {
    setProperties({ [property]: value });
    setProperties(prev => ({
      ...prev,
      [property]: value
    }));
  };

  // Generate code snippets based on selected component and properties
  const generateSnippets = () => {
    if (selectedComponent === 'button') {
      const {
        variant,
        size,
        disabled,
        withIcon,
        text
      } = properties as ButtonProperties;
      const tsxCode = `import { Button } from "@/components/ui/button";
${withIcon ? 'import { Download } from "lucide-react";\n' : ''}
export function ButtonDemo() {
  return (
    <Button
      variant="${variant}"
      size="${size}"${disabled ? '\n      disabled' : ''}
    >${withIcon ? '\n      <Download className="mr-2 h-4 w-4" />' : ''}
      ${text}
    </Button>
  );
}`;
    const tailwindCode = `<button 
  class="${variant === 'default' ? 'bg-primary text-white' : variant === 'destructive' ? 'bg-red-500 text-white' : variant === 'outline' ? 'border border-input bg-transparent' : variant === 'secondary' ? 'bg-secondary text-secondary-foreground' : variant === 'ghost' ? 'hover:bg-accent hover:text-accent-foreground' : ''} ${size === 'sm' ? 'h-8 text-xs px-3' : size === 'lg' ? 'h-12 px-6 text-base' : 'h-9 px-4 text-sm'} rounded-md font-medium shadow inline-flex items-center justify-center${disabled ? ' opacity-50 cursor-not-allowed' : ''}"${disabled ? ' disabled' : ''}>
  ${withIcon ? '<svg class="mr-2 h-4 w-4" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>' : ''}
  ${text}
</button>`;
    return {
      tsx: tsxCode,
      tailwind: tailwindCode
    };
  }
  if (selectedComponent === 'badge') {
    const {
      variant,
      text
    } = properties as BadgeProperties;
    const tsxCode = `import { Badge } from "@/components/ui/badge";
        tailwind: tailwindCode
      };
    }
    if (selectedComponent === 'badge') {
      const {
        variant,
        text
      } = properties as BadgeProperties;
      const tsxCode = `import { Badge } from "@/components/ui/badge";

export function BadgeDemo() {
  return <Badge variant="${variant}">${text}</Badge>;
}`;
      const tailwindCode = `<span class="${variant === 'default' ? 'bg-primary text-primary-foreground' : variant === 'secondary' ? 'bg-secondary text-secondary-foreground' : variant === 'destructive' ? 'bg-destructive text-destructive-foreground' : variant === 'outline' ? 'border border-input bg-transparent text-foreground' : ''} rounded-md px-2 py-1 text-xs font-medium">
  ${text}
</span>`;
      return {
        tsx: tsxCode,
        tailwind: tailwindCode
      };
    }
    if (selectedComponent === 'card') {
      const {
        withHeader,
        withFooter,
        title,
        description
      } = properties;
      const tsxCode = `import {
  Card,${withHeader ? '\n  CardHeader,' : ''}${withHeader ? '\n  CardTitle,' : ''}${withHeader && description ? '\n  CardDescription,' : ''}
  CardContent,${withFooter ? '\n  CardFooter,' : ''}
} from "@/components/ui/card";${withFooter ? '\nimport { Button } from "@/components/ui/button";' : ''}

export function CardDemo() {
  return (
    <Card>
      ${withHeader ? `<CardHeader>
        <CardTitle>${title}</CardTitle>${description ? `\n        <CardDescription>${description}</CardDescription>` : ''}
      </CardHeader>` : ''}
      <CardContent>
        <p>Card content goes here</p>
      </CardContent>${withFooter ? `\n      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Save</Button>
      </CardFooter>` : ''}
    </Card>
  );
}`;
      const tailwindCode = `<div class="rounded-lg border shadow-sm">
  ${withHeader ? `<div class="p-6 flex flex-col space-y-1.5">
    <h3 class="text-lg font-semibold leading-none">${title}</h3>${description ? `\n    <p class="text-sm text-muted-foreground">${description}</p>` : ''}
  </div>` : ''}
  <div class="p-6">
    <p>Card content goes here</p>
  </div>${withFooter ? `\n  <div class="p-6 flex justify-between items-center border-t">
    <button class="inline-flex items-center justify-center rounded-md border px-4 h-9">Cancel</button>
    <button class="inline-flex items-center justify-center rounded-md bg-primary px-4 h-9 text-white">Save</button>
  </div>` : ''}
</div>`;
      return {
        tsx: tsxCode,
        tailwind: tailwindCode
      };
    }
    if (selectedComponent === 'contentCard') {
      const {
        cardType
      } = properties;
      let tsxCode = '';
      let tailwindCode = '';
      if (cardType === 'article') {
        tsxCode = `import ArticleCard from '@/components/ArticleCard';

export function ArticleCardDemo() {
  const article = {
    id: 'art1',
    title: 'Best SUVs for Families in 2025',
    imageUrl: 'https://www.motortrend.com/files/67eeb24ae58cfc000822372c/bestmidsizesuvs.jpg',
    date: '2025-03-15',
    category: 'SUV',
    author: 'Jane Smith',
    readTime: '5 min read'
  };

  return <ArticleCard article={article} />;
}`;
        tailwindCode = `<!-- Article Card Component -->
<div class="overflow-hidden rounded-lg border bg-card shadow-sm transition-shadow hover:shadow-md">
  <div class="aspect-w-16 aspect-h-9 relative">
    <img 
      src="https://www.motortrend.com/files/67eeb24ae58cfc000822372c/bestmidsizesuvs.jpg" 
      alt="Best SUVs for Families in 2025" 
      class="object-cover w-full h-full"
    />
    <span class="absolute top-2 left-2 rounded-full px-2.5 py-0.5 bg-primary/90 text-xs font-semibold text-white">
      SUV
    </span>
  </div>
  <div class="p-4">
    <h3 class="font-bold text-lg line-clamp-2 mb-2">Best SUVs for Families in 2025</h3>
    <div class="flex items-center text-sm text-muted-foreground space-x-3">
      <span>Mar 15, 2025</span>
      <span>•</span>
      <span>5 min read</span>
    </div>
  </div>
</div>`;
      } else if (cardType === 'photo') {
        tsxCode = `import PhotoCard from '@/components/PhotoCard';

export function PhotoCardDemo() {
  const photo = {
    id: 'ph1',
    title: '2025 Porsche 911 GT3 RS - Track Ready',
    imageUrl: 'https://www.motortrend.com/files/679a40fb03dfa1000846f1f8/2025porsche911gt3weissach1.jpg',
    date: '2025-04-02',
    category: 'Sports Car',
    photoCount: 24,
    photographer: 'Michael Johnson',
    position: '1',
    make: 'Porsche',
    carModel: '911 GT3 RS',
    year: '2025'
  };

  return <PhotoCard photo={photo} />;
}`;
        tailwindCode = `<!-- Photo Card Component -->
<div class="overflow-hidden rounded-lg border bg-card shadow-sm transition-shadow hover:shadow-md">
  <div class="aspect-w-16 aspect-h-9 relative">
    <img 
      src="https://www.motortrend.com/files/679a40fb03dfa1000846f1f8/2025porsche911gt3weissach1.jpg" 
      alt="2025 Porsche 911 GT3 RS - Track Ready" 
      class="object-cover w-full h-full"
    />
    <div class="absolute top-2 right-2 rounded-full px-2.5 py-0.5 bg-black/70 text-xs font-semibold text-white flex items-center">
      <svg class="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5"/>
      </svg>
      24 Photos
    </div>
  </div>
  <div class="p-4">
    <h3 class="font-bold text-lg line-clamp-2 mb-2">2025 Porsche 911 GT3 RS - Track Ready</h3>
    <div class="flex items-center text-sm text-muted-foreground space-x-3">
      <span>Sports Car</span>
      <span>•</span>
      <span>Apr 2, 2025</span>
    </div>
  </div>
</div>`;
      } else if (cardType === 'video') {
        tsxCode = `import VideoCard from '@/components/VideoCard';

export function VideoCardDemo() {
  const video = {
    id: 'vid1',
    title: '2025 Rivian R2 Off-Road Test: Better Than a Jeep?',
    imageUrl: 'https://d2kde5ohu8qb21.cloudfront.net/files/65ebc644c7bc5b000866ad3e/0051-rivian-r2-first-look-fullcut-thumbnail-1920x1080.jpg',
    date: '2025-03-28',
    category: 'SUV',
    duration: '12:48',
    views: '245K',
    channelName: 'MotorTrend',
    description: 'We take the all-new Rivian R2 off-road to see how it compares to traditional off-roaders',
    url: '#video-player'
  };

  return <VideoCard video={video} />;
}`;
        tailwindCode = `<!-- Video Card Component -->
<div class="overflow-hidden rounded-lg border bg-card shadow-sm transition-shadow hover:shadow-md">
  <div class="aspect-w-16 aspect-h-9 relative group">
    <img 
      src="https://d2kde5ohu8qb21.cloudfront.net/files/65ebc644c7bc5b000866ad3e/0051-rivian-r2-first-look-fullcut-thumbnail-1920x1080.jpg" 
      alt="2025 Rivian R2 Off-Road Test" 
      class="object-cover w-full h-full"
    />
    <div class="absolute inset-0 flex items-center justify-center">
      <div class="h-16 w-16 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 transition-transform">
        <svg class="h-8 w-8 text-white" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="5 3 19 12 5 21 5 3"></polygon>
        </svg>
      </div>
    </div>
    <div class="absolute bottom-2 right-2 rounded-sm px-1.5 py-0.5 bg-black/80 text-xs font-medium text-white">
      12:48
    </div>
  </div>
  <div class="p-4">
    <h3 class="font-bold text-lg line-clamp-2 mb-2">2025 Rivian R2 Off-Road Test: Better Than a Jeep?</h3>
    <div class="flex items-center text-sm text-muted-foreground space-x-3">
      <span>MotorTrend</span>
      <span>•</span>
      <span>245K views</span>
    </div>
  </div>
</div>`;
      } else if (cardType === 'newCar' || cardType === 'usedCar') {
        const isNew = cardType === 'newCar';
        const car = isNew ? {
          id: '1',
          title: '2025 Tesla Model 3 Performance',
          imageUrl: 'https://media.ed.edmunds-media.com/tesla/model-3/2025/oem/2025_tesla_model-3_sedan_long-range_fq_oem_1_1600.jpg',
          price: '$54,990',
          category: 'Electric',
          year: '2025',
          isNew: true
        } : {
          id: '2',
          title: '2022 Toyota Camry XSE',
          imageUrl: 'https://www.motortrend.com/uploads/2021/12/2022-Toyota-Camry-SE-23.jpg',
          price: '$28,500',
          category: 'Sedan',
          year: '2022',
          mileage: '15,000 miles',
          isNew: false
        };
        tsxCode = `import CarCard from '@/components/CarCard';
import { CarData } from '@/components/CarCard';

export function ${isNew ? 'NewCarCardDemo' : 'UsedCarCardDemo'}() {
  const car: CarData = {
    id: '${car.id}',
    title: '${car.title}',
    imageUrl: '${car.imageUrl}',
    price: '${car.price}',
    category: '${car.category}',
    year: '${car.year}',${!isNew ? `
    mileage: '${car.mileage}',` : ''}
    fuelType: '${isNew ? 'Electric' : 'Hybrid'}',
    drivetrain: '${isNew ? 'AWD' : 'FWD'}',
    location: '${isNew ? 'San Francisco, CA' : 'Los Angeles, CA'}',
    bodyStyle: 'Sedan',
    isNew: ${isNew},
    motorTrendScore: ${isNew ? '9.2' : '8.5'},
    motorTrendRank: ${isNew ? '1' : '3'},
    motorTrendCategoryRank: 1,
    // New car specs
    msrp: '${isNew ? 'From $54,990' : 'From $46,800'}',
    mpg: '${!isNew ? 'Up to 15 city / 24 highway' : ''}',
    mpge: '${isNew ? 'Up to 134 city / 126 highway' : ''}',
    range: '${isNew ? '315 to 341 mi battery-only' : '320 mi fuel tank'}',
    engine: '${isNew ? 'Electric' : '5.0L V8'}',
    horsepower: '${isNew ? '450 to 510 hp' : '486 hp'}',
    transmission: '${isNew ? '1-speed automatic' : '6-speed manual'}'
  };

  return <CarCard car={car} type="${isNew ? 'new' : 'used'}" />;
}`;
        tailwindCode = `<!-- ${isNew ? 'New' : 'Used'} Car Card Component -->
<div class="overflow-hidden rounded-lg border bg-card shadow-sm transition-shadow hover:shadow-md">
  <div class="aspect-w-16 aspect-h-9 relative">
    <img 
      src="${car.imageUrl}" 
      alt="${car.title}" 
      class="object-cover w-full h-full"
    />
    ${isNew ? '<span class="absolute top-2 left-2 rounded-full px-2.5 py-0.5 bg-green-600 text-xs font-semibold text-white">New</span>' : ''}
    <button class="absolute top-2 right-2 rounded-full p-1.5 bg-white/80 hover:bg-white shadow-sm">
      <svg class="w-5 h-5 text-neutral-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
      </svg>
    </button>
  </div>
  <div class="p-4">
    <div class="flex justify-between items-start mb-2">
      <h3 class="font-bold text-lg line-clamp-2">${car.title}</h3>
      <span class="font-bold text-lg text-primary">${car.price}</span>
    </div>
    <div class="flex items-center text-sm text-muted-foreground space-x-2 mb-3">
      <span>${car.category}</span>
      <span>•</span>
      <span>${car.year}</span>${!isNew ? `
      <span>•</span>
      <span>${car.mileage}</span>` : ''}
    </div>
    <div class="flex items-center">
      <div class="text-sm font-medium bg-neutral-100 rounded px-2 py-0.5 flex items-center">
        <span class="text-primary font-bold mr-1">${isNew ? '9.2' : '8.5'}</span>
        <span>MT Score</span>
      </div>
    </div>
  </div>
</div>`;
      }
      return {
        tsx: tsxCode,
        tailwind: tailwindCode
      };
    }
    return {
      tsx: '// Select a component to see code',
      tailwind: '// Select a component to see code'
    };
  };
  const { tsx, tailwind } = generateSnippets();

  // Render component based on selected properties
  const renderComponent = () => {
    if (selectedComponent === 'button') {
      const {
        variant,
        size,
        disabled,
        withIcon,
        text
      } = properties;
      return <Button variant={variant} size={size} disabled={disabled}>
        {withIcon && <Download className="mr-2 h-4 w-4" />}
        {text}
      </Button>;
    }
    if (selectedComponent === 'card') {
      const {
        withHeader,
        withFooter,
        title,
        description
      } = properties;
      return <Card className="w-full max-w-md">
          {withHeader && <CardHeader>
              <CardTitle>{title}</CardTitle>
              {description && <CardDescription>{description}</CardDescription>}
            </CardHeader>}
          <CardContent>
            <p>Card content goes here</p>
          </CardContent>
          {withFooter && <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>Save</Button>
            </CardFooter>}
        </Card>;
    }
    if (selectedComponent === 'contentCard') {
      const {
        cardType
      } = properties;
      const cardData = sampleData[cardType as keyof typeof sampleData];
      if (cardType === 'article') {
        return <div className="w-full max-w-md mx-auto p-1">
            <ArticleCard article={cardData as any} />
          </div>;
      }
      if (cardType === 'photo') {
        return <div className="w-full max-w-md mx-auto p-1">
            <PhotoCard photo={cardData as any} />
          </div>;
      }
      if (cardType === 'video') {
        return <div className="w-full max-w-md mx-auto p-1">
            <VideoCard video={cardData as any} />
          </div>;
      }
      if (cardType === 'newCar' || cardType === 'usedCar') {
        return <div className="w-full max-w-md mx-auto p-1">
            <CarCard car={cardData as CarData} type={cardType === 'newCar' ? 'new' : 'used'} />
          </div>;
      }
    }
    return null;
  };
  return <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Component Playground</CardTitle>
          <CardDescription>
            Experiment with components, adjust properties, and generate code snippets
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Component Selection */}
            <div className="space-y-4">
              <h3 className="font-medium text-sm">1. Select Component</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-2">
                {Object.entries(components).map(([id, component]) => <Button key={id} variant={selectedComponent === id ? 'default' : 'outline'} onClick={() => setSelectedComponent(id)} className="justify-start">
                    {component.name}
                  </Button>)}
              </div>
            </div>
            
            {/* Properties Panel */}
            <div>
              <h3 className="font-medium text-sm mb-4">2. Customize Properties</h3>
              <div className="space-y-4">
                {selectedComponent && components[selectedComponent] && Object.entries(components[selectedComponent].properties).map(([propName, control]) => <div key={propName} className="grid gap-2">
                      <Label htmlFor={propName}>{control.label}</Label>
                      
                      {control.type === 'select' && <Select value={properties[propName] || control.options?.[0]} onValueChange={value => handlePropertyChange(propName, value)}>
                          <SelectTrigger id={propName}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {control.options?.map(option => <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>)}
                          </SelectContent>
                        </Select>}
                      
                      {control.type === 'boolean' && <div className="flex items-center space-x-2">
                          <Switch id={propName} checked={!!properties[propName]} onCheckedChange={checked => handlePropertyChange(propName, checked)} />
                          <Label htmlFor={propName}>{properties[propName] ? 'On' : 'Off'}</Label>
                        </div>}
                      
                      {control.type === 'text' && <Input id={propName} value={properties[propName] || ''} onChange={e => handlePropertyChange(propName, e.target.value)} />}
                      
                      {control.type === 'range' && <Slider id={propName} min={control.min || 0} max={control.max || 100} step={control.step || 1} value={[properties[propName] || control.min || 0]} onValueChange={([value]) => handlePropertyChange(propName, value)} />}
                    </div>)}
              </div>
            </div>
            
            {/* Preview */}
            <div className="space-y-4">
              <h3 className="font-medium text-sm">3. Preview Result</h3>
              <div className="border rounded-md bg-gray-50 min-h-40 flex items-center justify-center p-12 py-[4px] px-[4px]">
                {renderComponent()}
              </div>
            </div>
          </div>
          
          {/* Code Snippets */}
          <div className="mt-8">
            <h3 className="font-medium text-sm mb-4">4. Get Code</h3>
            <div className="space-y-4">
              <CodeSnippet code={tsx} language="tsx" caption="TypeScript/React" />
              <CodeSnippet code={tailwind} language="html" caption="HTML/Tailwind" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>;
};
export default ComponentPlayground;