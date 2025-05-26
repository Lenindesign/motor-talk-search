import React from 'react';
import { Loader2 } from 'lucide-react';
import { CARD_STYLES } from '@/styles/cardStyles';

interface LoadingSpinnerProps {
  isLoading?: boolean;
  className?: string;
}

const LoadingSpinner = ({ isLoading = true, className = '' }: LoadingSpinnerProps): React.ReactElement => {
  if (!isLoading) return null;

  return (
    <div className={`${className} ${CARD_STYLES.loading}`}>
      <Loader2 className="animate-spin h-6 w-6" />
    </div>
  );
};

export default LoadingSpinner;
