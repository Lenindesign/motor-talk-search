import React, { useState, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Monitor, Smartphone, Tablet } from 'lucide-react';

interface ResponsivePreviewProps {
  children: ReactNode;
  showControls?: boolean;
  defaultDevice?: 'mobile' | 'tablet' | 'desktop';
}

const ResponsivePreview: React.FC<ResponsivePreviewProps> = ({ 
  children, 
  showControls = true,
  defaultDevice = 'desktop'
}) => {
  const [device, setDevice] = useState<'mobile' | 'tablet' | 'desktop'>(defaultDevice);

  const deviceSizes = {
    mobile: { width: '375px', height: '667px' },
    tablet: { width: '768px', height: '1024px' },
    desktop: { width: '100%', height: 'auto' }
  };

  return (
    <div className="w-full mb-4">
      {showControls && (
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm text-neutral-4">Preview component in different devices</p>
          <div className="flex gap-2">
            <Button 
              variant={device === 'mobile' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setDevice('mobile')}
              aria-label="Mobile preview"
            >
              <Smartphone className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Mobile</span>
            </Button>
            <Button 
              variant={device === 'tablet' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setDevice('tablet')}
              aria-label="Tablet preview"
            >
              <Tablet className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Tablet</span>
            </Button>
            <Button 
              variant={device === 'desktop' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setDevice('desktop')}
              aria-label="Desktop preview"
            >
              <Monitor className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Desktop</span>
            </Button>
          </div>
        </div>
      )}

      <div className="border border-neutral-6 rounded-lg bg-white overflow-auto">
        <div
          className={`transition-all duration-300 mx-auto ${device !== 'desktop' ? 'border-x border-neutral-6' : ''}`}
          style={{ 
            width: deviceSizes[device].width,
            height: deviceSizes[device].height,
            maxWidth: '100%'
          }}
        >
          {children}
        </div>
      </div>

      {device !== 'desktop' && (
        <div className="mt-2 text-center">
          <p className="text-sm text-neutral-4">
            {device === 'mobile' ? '375 × 667px' : '768 × 1024px'} preview
          </p>
        </div>
      )}
    </div>
  );
};

export default ResponsivePreview;
