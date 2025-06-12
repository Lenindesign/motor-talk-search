
import { ComponentType, ButtonProperties, BadgeProperties, CardProperties } from './types';
import { sampleData } from './sampleData';

export const generateSnippets = (
  selectedComponent: ComponentType,
  buttonProps: ButtonProperties,
  badgeProps: BadgeProperties,
  cardProps: CardProperties
) => {
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
  const car = {
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
