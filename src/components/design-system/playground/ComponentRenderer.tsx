
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Download } from 'lucide-react';
import ArticleCard from '@/components/ArticleCard';
import CarCard from '@/components/CarCard';
import VideoCard from '@/components/VideoCard';
import PhotoCard from '@/components/PhotoCard';
import { ComponentType, ButtonProperties, BadgeProperties, CardProperties } from './types';
import { sampleData } from './sampleData';
import { CarData } from '@/components/CarCard/types';

interface ComponentRendererProps {
  selectedComponent: ComponentType;
  buttonProps: ButtonProperties;
  badgeProps: BadgeProperties;
  cardProps: CardProperties;
}

const ComponentRenderer: React.FC<ComponentRendererProps> = ({
  selectedComponent,
  buttonProps,
  badgeProps,
  cardProps
}) => {
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

export default ComponentRenderer;
