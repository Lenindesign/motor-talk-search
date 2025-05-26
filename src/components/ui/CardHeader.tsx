import React from 'react';

interface CardHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

const CardHeader = ({
  title,
  subtitle,
  className = ''
}: CardHeaderProps): React.ReactElement => {
  return (
    <div className={`flex flex-col ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-1">
        {title}
      </h3>
      {subtitle && (
        <p className="text-sm text-gray-500">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default CardHeader;
