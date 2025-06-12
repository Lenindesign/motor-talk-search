
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
import { Download } from 'lucide-react';
import CodeSnippet from './CodeSnippet';
import ArticleCard from '@/components/ArticleCard';
import CarCard from '@/components/CarCard';
import VideoCard from '@/components/VideoCard';
import PhotoCard from '@/components/PhotoCard';
import { CarData } from '@/components/CarCard/types';

// Types
type BodyStyle = 'SUV' | 'Sports Car' | 'Sedan' | 'Truck' | 'Minivan' | 'Crossover' | 'Coupe' | 'Convertible' | 'Hatchback' | 'Wagon';
type CardType = 'article' | 'photo' | 'video' | 'newCar' | 'usedCar';
type ButtonVariant = 'solid' | 'solid-light' | 'outline-black' | 'ghost-black' | 'solid-red' | 'solid-red-light' | 'outline-red' | 'ghost-red' | 'solid-primary' | 'solid-primary-light' | 'outline-primary' | 'ghost-primary' | 'outline' | 'ghost' | 'link' | 'minimal' | 'default' | 'secondary' | 'destructive';
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl' | 'icon-sm' | 'icon' | 'icon-lg';
type ComponentType = 'button' | 'badge' | 'card';

// Interfaces
interface BaseData {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
}

interface CarData extends BaseData {
  price: string;
  year: string;
  mileage?: string;
  fuelType: string;
  drivetrain: string;
  location: string;
  bodyStyle: BodyStyle;
  isNew: boolean;
  motorTrendScore: string;
  motorTrendRank: string;
  motorTrendCategoryRank: boolean;
}

interface ArticleData extends BaseData {
  date: string;
  author: string;
  readTime: string;
}

interface PhotoData extends BaseData {
  date: string;
  photoCount: number;
  photographer: string;
  position?: string;
  make?: string;
  carModel?: string;
  year?: string;
}

interface VideoData extends BaseData {
  date?: string;
  duration: string;
  views?: string;
  channelName?: string;
  description?: string;
  url?: string;
}

interface PropertyControl {
  type: 'select' | 'boolean' | 'text' | 'range';
  label: string;
  name: string;
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

interface BadgeProperties {
  variant: ButtonVariant;
  text: string;
}

interface ButtonProperties {
  variant: ButtonVariant;
  size: ButtonSize;
  disabled: boolean;
  withIcon: boolean;
  text: string;
}

interface CardProperties {
  withHeader: boolean;
  withFooter: boolean;
  title: string;
  description: string;
  cardType: CardType;
}

type ComponentProperties = ButtonProperties | BadgeProperties | CardProperties;

const ComponentPlayground: React.FC = () => {
  // Sample data for cards
  const sampleData = {
    article: {
      id: '1',
      title: '2024 BMW M5 First Look: The Ultimate 700+ HP Hybrid Machine',
      imageUrl: 'https://example.com/bmw-m5.jpg',
      date: 'July 1, 2023',
      category: 'First Look',
      author: 'John Smith',
      readTime: '5 min read'
    } satisfies ArticleData,
    photo: {
      id: '2',
      title: '2024 Porsche 911 GT3 RS: Track Test Gallery',
      imageUrl: 'https://example.com/porsche-gt3.jpg',
      date: 'June 30, 2023',
      category: 'Photo Gallery',
      photoCount: 25,
      photographer: 'Jane Doe',
      position: 'Lead Photographer',
      make: 'Porsche',
      carModel: '911 GT3 RS',
      year: '2024'
    } satisfies PhotoData,
    video: {
      id: '3',
      title: 'Tesla Model S Plaid vs Lucid Air Sapphire: EV Supersedan Showdown',
      imageUrl: 'https://example.com/tesla-vs-lucid.jpg',
      date: 'June 29, 2023',
      category: 'Comparison Tests',
      duration: '15:30',
      channelName: 'MotorTrend Channel',
      description: 'Watch as we pit these two electric powerhouses against each other',
      url: 'https://example.com/video'
    } satisfies VideoData,
    newCar: {
      id: '4',
      title: '2024 Mercedes-AMG C63 S E Performance',
      imageUrl: 'https://example.com/amg-c63.jpg',
      price: '$89,900',
      category: 'Luxury',
      year: '2024',
      fuelType: 'Hybrid',
      drivetrain: 'AWD',
      location: 'Los Angeles, CA',
      bodyStyle: 'Sedan',
      isNew: true,
      motorTrendScore: '9.1/10',
      motorTrendRank: '#1',
      motorTrendCategoryRank: true
    } satisfies CarData,
    usedCar: {
      id: '5',
      title: '2021 Porsche Taycan Turbo S',
      imageUrl: 'https://example.com/used-taycan.jpg',
      price: '$129,000',
      category: 'Electric',
      year: '2021',
      mileage: '12,500',
      fuelType: 'Electric',
      drivetrain: 'AWD',
      location: 'Miami, FL',
      bodyStyle: 'Sedan',
      isNew: false,
      motorTrendScore: '9.3/10',
      motorTrendRank: '#1',
      motorTrendCategoryRank: true
    } satisfies CarData
  } as const;

  // State for component properties
  const [selectedComponent, setSelectedComponent] = useState<ComponentType>('button');
  const [buttonProps, setButtonProps] = useState<ButtonProperties>({
    variant: 'solid',
    size: 'md',
    disabled: false,
    withIcon: false,
    text: 'Click me'
  });
  const [badgeProps, setBadgeProps] = useState<BadgeProperties>({
    variant: 'solid',
    text: 'Badge'
  });
  const [cardProps, setCardProps] = useState<CardProperties>({
    withHeader: true,
    withFooter: true,
    title: 'Card Title',
    description: 'Card Description',
    cardType: 'article'
  });

  // Function to update component properties
  const handlePropertyChange = (propName: string, value: any) => {
    if (selectedComponent === 'button') {
      setButtonProps(prev => ({ ...prev, [propName]: value }));
    } else if (selectedComponent === 'badge') {
      setBadgeProps(prev => ({ ...prev, [propName]: value }));
    } else {
      setCardProps(prev => ({ ...prev, [propName]: value }));
    }
  };

  // Component configuration
  const components: Record<ComponentType, ComponentConfig> = {
    button: {
      name: 'Button',
      description: 'Interactive button component with various styles and states',
      properties: {
        variant: {
          type: 'select',
          label: 'Variant',
          name: 'variant',
          options: ['solid', 'solid-light', 'outline-black', 'ghost-black', 'solid-red', 'solid-red-light', 'outline-red', 'ghost-red', 'solid-primary', 'solid-primary-light', 'outline-primary', 'ghost-primary', 'outline', 'ghost', 'link', 'minimal']
        },
        size: {
          type: 'select',
          label: 'Size',
          name: 'size',
          options: ['sm', 'md', 'lg', 'xl', 'icon-sm', 'icon', 'icon-lg']
        },
        disabled: {
          type: 'boolean',
          label: 'Disabled',
          name: 'disabled'
        },
        withIcon: {
          type: 'boolean',
          label: 'With Icon',
          name: 'withIcon'
        },
        text: {
          type: 'text',
          label: 'Button Text',
          name: 'text'
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
          name: 'variant',
          options: ['solid', 'solid-light', 'outline-black', 'ghost-black', 'solid-red', 'solid-red-light', 'outline-red', 'ghost-red', 'solid-primary', 'solid-primary-light', 'outline-primary', 'ghost-primary', 'outline', 'ghost', 'link', 'minimal']
        },
        text: {
          type: 'text',
          label: 'Badge Text',
          name: 'text'
        }
      }
    },
    card: {
      name: 'Card',
      description: 'Container for related content and actions',
      properties: {
        withHeader: {
          type: 'boolean',
          label: 'With Header',
          name: 'withHeader'
        },
        withFooter: {
          type: 'boolean',
          label: 'With Footer',
          name: 'withFooter'
        },
        title: {
          type: 'text',
          label: 'Title',
          name: 'title'
        },
        description: {
          type: 'text',
          label: 'Description',
          name: 'description'
        },
        cardType: {
          type: 'select',
          label: 'Card Type',
          name: 'cardType',
          options: ['article', 'photo', 'video', 'newCar', 'usedCar']
        }
      }
    }
  };

  // Generate code snippets based on selected component
  const generateSnippets = () => {
    let tsxCode = '';
    let tailwindCode = '';
    
    if (selectedComponent === 'button') {
      const { variant, size, disabled, withIcon, text } = buttonProps;
      
      tsxCode = `import { Button } from '@/components/ui/button';
${withIcon ? "import { Download } from 'lucide-react';\n" : ''}
export function ButtonDemo() {
  return (
    <Button 
      variant="${variant}" 
      size="${size}"
      ${disabled ? 'disabled' : ''}
    >
      ${withIcon ? '<Download className="mr-2 h-4 w-4" /> ' : ''}${text}
    </Button>
  );
}`;      
      
      tailwindCode = `<button 
  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background 
  ${variant === 'solid' ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 
    variant === 'outline' ? 'border border-input bg-background hover:bg-accent hover:text-accent-foreground' : 
    variant === 'ghost' ? 'hover:bg-accent hover:text-accent-foreground' : 
    'text-primary underline-offset-4 hover:underline'} 
  ${size === 'sm' ? 'h-9 px-3' : 
    size === 'lg' ? 'h-11 px-8' : 
    size === 'xl' ? 'h-12 px-10 text-base' : 
    'h-10 px-4'} 
  ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}"
>
  ${withIcon ? '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 h-4 w-4"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>' : ''}${text}
</button>`;
      
    } else if (selectedComponent === 'badge') {
      const { variant, text } = badgeProps;
      
      tsxCode = `import { Badge } from '@/components/ui/badge';

export function BadgeDemo() {
  return <Badge variant="${variant}">${text}</Badge>;
}`;
      
      tailwindCode = `<span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold 
  ${variant === 'solid' ? 'bg-primary text-primary-foreground' : 
    variant === 'outline' ? 'border border-input' : 
    variant === 'solid-red' ? 'bg-red-500 text-white' : 
    'text-foreground'}"
>
  ${text}
</span>`;
      
    } else if (selectedComponent === 'card') {
      const { withHeader, withFooter, title, description, cardType } = cardProps;
      
      if (cardType === 'newCar' || cardType === 'usedCar') {
        const carData = cardType === 'newCar' ? sampleData.newCar : sampleData.usedCar;
        const isNew = cardType === 'newCar';
        
        tsxCode = `import CarCard from '@/components/CarCard';

export function ${isNew ? 'NewCarCardDemo' : 'UsedCarCardDemo'}() {
  const car: CarData = {
    id: '${carData.id}',
    title: '${carData.title}',
    imageUrl: '${carData.imageUrl}',
    price: '${carData.price}',
    year: '${carData.year}',
    ${!isNew ? `mileage: '${carData.mileage || ''}',` : ''}
    fuelType: '${carData.fuelType}',
    drivetrain: '${carData.drivetrain}',
    location: '${carData.location}',
    bodyStyle: '${carData.bodyStyle}',
    isNew: ${isNew},
    motorTrendScore: '${carData.motorTrendScore}',
    motorTrendRank: '${carData.motorTrendRank}',
    motorTrendCategoryRank: ${carData.motorTrendCategoryRank}
  };

  return <CarCard car={car} type="${isNew ? 'new' : 'used'}" />;
}`;

        tailwindCode = `<!-- ${isNew ? 'New' : 'Used'} Car Card Component -->
<div className="overflow-hidden rounded-lg border bg-card shadow-sm transition-shadow hover:shadow-md">
  <div className="aspect-w-16 aspect-h-9 relative">
    <img 
      src="${carData.imageUrl}" 
      alt="${carData.title}" 
      className="object-cover w-full h-full"
    />
    ${isNew ? '<span className="absolute top-2 left-2 rounded-full px-2.5 py-0.5 bg-green-600 text-xs font-semibold text-white">New</span>' : ''}
  </div>
  <div className="p-4">
    <h3 className="font-bold text-lg line-clamp-2">${carData.title}</h3>
    <span className="font-bold text-lg text-primary">${carData.price}</span>
  </div>
</div>`;
      } else if (cardType === 'article') {
        tsxCode = `import ArticleCard from '@/components/ArticleCard';

export function ArticleCardDemo() {
  const article = {
    id: '${sampleData.article.id}',
    title: '${sampleData.article.title}',
    imageUrl: '${sampleData.article.imageUrl}',
    date: '${sampleData.article.date}',
    category: '${sampleData.article.category}',
    author: '${sampleData.article.author}',
    readTime: '${sampleData.article.readTime}'
  };
  
  return <ArticleCard article={article} />;
}`;

        tailwindCode = `<!-- Article Card Component -->
<div className="overflow-hidden rounded-lg border bg-card shadow-sm">
  <img src="${sampleData.article.imageUrl}" alt="${sampleData.article.title}" className="object-cover w-full h-full" />
  <div className="p-4">
    <h3 className="font-bold text-lg">${sampleData.article.title}</h3>
  </div>
</div>`;
      } else {
        // Default card
        tsxCode = `import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';

export function CardDemo() {
  return (
    <Card>
      ${withHeader ? `<CardHeader>
        <CardTitle>${title}</CardTitle>
        <CardDescription>${description}</CardDescription>
      </CardHeader>` : ''}
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      ${withFooter ? `<CardFooter>
        <Button variant="outline">Cancel</Button>
        <Button>Submit</Button>
      </CardFooter>` : ''}
    </Card>
  );
}`;

        tailwindCode = `<div className="rounded-lg border bg-card text-card-foreground shadow-sm">
  ${withHeader ? `<div className="flex flex-col space-y-1.5 p-6">
    <h3 className="text-2xl font-semibold">${title}</h3>
    <p className="text-sm text-muted-foreground">${description}</p>
  </div>` : ''}
  <div className="p-6 pt-0">Card Content</div>
  ${withFooter ? `<div className="flex items-center p-6 pt-0">Footer content</div>` : ''}
</div>`;
      }
    }

    return { tsx: tsxCode, tailwind: tailwindCode };
  };

  // Get the code snippets for the current component and properties
  const { tsx, tailwind } = generateSnippets();

  // Render component based on selected properties
  const renderComponent = () => {
    if (selectedComponent === 'button') {
      const { variant, size, disabled, withIcon, text } = buttonProps;
      return (
        <Button variant={variant as any} size={size} disabled={disabled}>
          {withIcon && <Download className="mr-2 h-4 w-4" />}
          {text}
        </Button>
      );
    }
    if (selectedComponent === 'badge') {
      const { variant, text } = badgeProps;
      return <Badge variant={variant as any}>{text}</Badge>;
    }
    if (selectedComponent === 'card') {
      const { withHeader, withFooter, title, description, cardType } = cardProps;
    
      if (cardType === 'article') {
        return (
          <div className="w-full max-w-md mx-auto p-1">
            <ArticleCard article={sampleData.article as unknown as any} />
          </div>
        );
      }
      if (cardType === 'photo') {
        return (
          <div className="w-full max-w-md mx-auto p-1">
            <PhotoCard photo={sampleData.photo as unknown as any} />
          </div>
        );
      }
      if (cardType === 'video') {
        return (
          <div className="w-full max-w-md mx-auto p-1">
            <VideoCard video={sampleData.video as unknown as any} />
          </div>
        );
      }
      if (cardType === 'newCar' || cardType === 'usedCar') {
        const carData = cardType === 'newCar' ? sampleData.newCar : sampleData.usedCar;
        return (
          <div className="w-full max-w-md mx-auto p-1">
            <CarCard car={carData as unknown as CarData} type={cardType === 'newCar' ? 'new' : 'used'} />
          </div>
        );
      }

      // Default card
      return (
        <Card>
          {withHeader && (
            <CardHeader>
              <CardTitle>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
          )}
          <CardContent className="p-6">
            <p>Card Content</p>
          </CardContent>
          {withFooter && (
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>Submit</Button>
            </CardFooter>
          )}
        </Card>
      );
    }
    
    return null;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Component Playground</CardTitle>
          <CardDescription>
            Experiment with components, adjust properties, and generate code snippets
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Component Selection */}
            <div className="lg:col-span-1 space-y-8">
              <h3 className="font-medium text-sm">1. Select Component</h3>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(components).map(([id, component]) => (
                  <Button
                    key={id}
                    variant={selectedComponent === id ? 'default' : 'outline'}
                    onClick={() => setSelectedComponent(id as ComponentType)}
                    className="justify-start"
                  >
                    {component.name}
                  </Button>
                ))}
              </div>
            </div>

            {/* Properties Panel */}
            <div>
              <h3 className="text-lg font-medium">Properties</h3>
              <p className="text-sm text-muted-foreground">
                Customize the selected component
              </p>
              <div className="grid gap-4">
                {selectedComponent &&
                  components[selectedComponent] &&
                  Object.entries(components[selectedComponent].properties).map(([propName, control]) => (
                    <div key={propName} className="grid gap-2">
                      <Label htmlFor={propName}>{control.label}</Label>

                      {control.type === 'select' && (
                        <Select
                          value={
                            (selectedComponent === 'button'
                              ? buttonProps[propName as keyof ButtonProperties]
                              : selectedComponent === 'badge'
                              ? badgeProps[propName as keyof BadgeProperties]
                              : cardProps[propName as keyof CardProperties]) as string || control.options?.[0]
                          }
                          onValueChange={(value) => handlePropertyChange(propName, value)}
                        >
                          <SelectTrigger id={propName}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {control.options?.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}

                      {control.type === 'boolean' && (
                        <div className="flex items-center space-x-2">
                          <Switch
                            id={propName}
                            checked={
                              selectedComponent === 'button'
                                ? buttonProps[propName as keyof ButtonProperties] as boolean
                                : selectedComponent === 'badge'
                                ? badgeProps[propName as keyof BadgeProperties] as boolean
                                : cardProps[propName as keyof CardProperties] as boolean
                            }
                            onCheckedChange={(value) => handlePropertyChange(propName, value)}
                          />
                        </div>
                      )}

                      {control.type === 'text' && (
                        <Input
                          id={propName}
                          value={
                            (selectedComponent === 'button'
                              ? buttonProps[propName as keyof ButtonProperties]
                              : selectedComponent === 'badge'
                              ? badgeProps[propName as keyof BadgeProperties]
                              : cardProps[propName as keyof CardProperties]) as string || ''
                          }
                          onChange={(e) => handlePropertyChange(propName, e.target.value)}
                        />
                      )}

                      {control.type === 'range' && (
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm">{control.min}</span>
                            <span className="text-sm">
                              {selectedComponent === 'button'
                                ? buttonProps[propName as keyof ButtonProperties]
                                : selectedComponent === 'badge'
                                ? badgeProps[propName as keyof BadgeProperties]
                                : cardProps[propName as keyof CardProperties]}
                            </span>
                            <span className="text-sm">{control.max}</span>
                          </div>
                          <Slider
                            id={propName}
                            min={control.min}
                            max={control.max}
                            step={control.step}
                            value={[
                              (selectedComponent === 'button'
                                ? buttonProps[propName as keyof ButtonProperties]
                                : selectedComponent === 'badge'
                                ? badgeProps[propName as keyof BadgeProperties]
                                : cardProps[propName as keyof CardProperties]) as number,
                            ]}
                            onValueChange={(values) => handlePropertyChange(propName, values[0])}
                          />
                        </div>
                      )}
                    </div>
                  ))}
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
    </div>
  );
};

export default ComponentPlayground;
