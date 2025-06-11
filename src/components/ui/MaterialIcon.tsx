import React from 'react';
import { cn } from '@/lib/utils';

interface MaterialIconProps {
  name: string;
  size?: number;
  className?: string;
}

const MaterialIcon: React.FC<MaterialIconProps> = ({ name, size = 16, className }) => {
  return (
    <span 
      className={cn("material-icons", className)}
      style={{ fontSize: `${size}px` }}
    >
      {name}
    </span>
  );
};

export default MaterialIcon; 