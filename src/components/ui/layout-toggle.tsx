import React from 'react';
import { LayoutGrid, List } from 'lucide-react';
import { Button } from './button';

export type LayoutMode = 'grid' | 'list';

interface LayoutToggleProps {
  mode: LayoutMode;
  onModeChange: (mode: LayoutMode) => void;
  className?: string;
}

export const LayoutToggle: React.FC<LayoutToggleProps> = ({ 
  mode, 
  onModeChange,
  className = ''
}) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Button
        variant={mode === 'grid' ? 'solid-primary' : 'ghost-black'}
        size="icon"
        onClick={() => onModeChange('grid')}
        aria-label="Grid view"
      >
        <LayoutGrid className="h-4 w-4" />
      </Button>
      <Button
        variant={mode === 'list' ? 'solid-primary' : 'ghost-black'}
        size="icon"
        onClick={() => onModeChange('list')}
        aria-label="List view"
      >
        <List className="h-4 w-4" />
      </Button>
    </div>
  );
};
