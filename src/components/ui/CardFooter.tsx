import React from 'react';
import { CARD_STYLES } from '@/styles/cardStyles';

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
  align?: 'left' | 'center' | 'right';
}

const CardFooter: React.FC<CardFooterProps> = ({
  children,
  className = '',
  align = 'left'
}) => {
  const alignClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end'
  };

  return (
    <div
      className={`${className} ${CARD_STYLES.footer} flex items-center ${alignClasses[align]}`}
    >
      {children}
    </div>
  );
};

export default CardFooter;
