
import { ComponentType, ButtonProperties, BadgeProperties, CardProperties } from './types';
import { sampleData } from './sampleData';

export const generateSnippets = (
  selectedComponent: ComponentType,
  buttonProps: ButtonProperties,
  badgeProps: BadgeProperties,
  cardProps: CardProperties
) => {
  let tsx = '';
  let tailwind = '';

  if (selectedComponent === 'button') {
    const { variant, size, disabled, withIcon, text } = buttonProps;
    
    tsx = `import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

export default function MyButton() {
  return (
    <Button variant="${variant}" size="${size}"${disabled ? ' disabled' : ''}>
      ${withIcon ? '<Download className="mr-2 h-4 w-4" />' : ''}
      ${text}
    </Button>
  );
}`;

    tailwind = `<button class="btn btn-${variant} btn-${size}${disabled ? ' btn-disabled' : ''}">
  ${withIcon ? '<svg class="mr-2 h-4 w-4">...</svg>' : ''}
  ${text}
</button>`;
  }

  if (selectedComponent === 'badge') {
    const { variant, text } = badgeProps;
    
    tsx = `import { Badge } from '@/components/ui/badge';

export default function MyBadge() {
  return (
    <Badge variant="${variant}">
      ${text}
    </Badge>
  );
}`;

    tailwind = `<span class="badge badge-${variant}">
  ${text}
</span>`;
  }

  if (selectedComponent === 'card') {
    const { cardType } = cardProps;
    const data = cardType === 'usedCar' ? sampleData.usedCar : sampleData[cardType];
    
    tsx = `import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function MyCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>${data.title}</CardTitle>
        <CardDescription>${data.category}</CardDescription>
      </CardHeader>
      <CardContent>
        <img src="${data.imageUrl}" alt="${data.title}" className="w-full h-48 object-cover rounded-md" />
        ${'price' in data ? `<p className="mt-4 text-lg font-semibold">${data.price}</p>` : ''}
        ${'year' in data ? `<p className="text-sm text-gray-600">${data.year}</p>` : ''}
        ${'date' in data ? `<p className="text-sm text-gray-600">${data.date}</p>` : ''}
      </CardContent>
    </Card>
  );
}`;

    tailwind = `<div class="card">
  <div class="card-header">
    <h3 class="card-title">${data.title}</h3>
    <p class="card-description">${data.category}</p>
  </div>
  <div class="card-content">
    <img src="${data.imageUrl}" alt="${data.title}" class="w-full h-48 object-cover rounded-md" />
    ${'price' in data ? `<p class="mt-4 text-lg font-semibold">${data.price}</p>` : ''}
    ${'year' in data ? `<p class="text-sm text-gray-600">${data.year}</p>` : ''}
    ${'date' in data ? `<p class="text-sm text-gray-600">${data.date}</p>` : ''}
  </div>
</div>`;
  }

  return { tsx, tailwind };
};
