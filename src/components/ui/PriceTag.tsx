import React from 'react';
import { CARD_STYLES } from '@/styles/cardStyles';

interface PriceTagProps {
  price: string;
  className?: string;
}

const PriceTag: React.FC<PriceTagProps> = ({ price, className = '' }) => {
  return (
    <span className={`${className} ${CARD_STYLES.price} flex-shrink-0`}>
      {price}
    </span>
  );
};

export default PriceTag;
