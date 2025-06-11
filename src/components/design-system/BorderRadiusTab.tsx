import React from 'react';

interface RadiusCardProps {
  name: string;
  cssVar: string;
  tailwindClass: string;
  size: string;
}

const RadiusCard: React.FC<RadiusCardProps> = ({ name, cssVar, tailwindClass, size }) => {
  return (
    <div className="flex flex-col gap-4">
      <div 
        className={`w-full h-24 bg-neutral-8 border border-neutral-6 ${tailwindClass} flex items-center justify-center`}
        style={{ borderRadius: `var(${cssVar})` }}
      >
        <span className="typography-body text-neutral-4">{size}</span>
      </div>
      <div className="space-y-1">
        <p className="typography-body font-semibold">{name}</p>
        <p className="typography-caption text-neutral-4">CSS: {cssVar}</p>
        <p className="typography-caption text-neutral-4">Tailwind: {tailwindClass}</p>
      </div>
    </div>
  );
};

export default function BorderRadiusTab() {
  const radiusValues = [
    { name: 'None', cssVar: '--radius-none', tailwindClass: 'rounded-none', size: '0px' },
    { name: 'Small', cssVar: '--radius-sm', tailwindClass: 'rounded-sm', size: '0.25rem' },
    { name: 'Medium', cssVar: '--radius-md', tailwindClass: 'rounded-md', size: '0.375rem' },
    { name: 'Large', cssVar: '--radius-lg', tailwindClass: 'rounded-lg', size: '0.5rem' },
    { name: 'Extra Large', cssVar: '--radius-xl', tailwindClass: 'rounded-xl', size: '0.75rem' },
    { name: '2XL', cssVar: '--radius-2xl', tailwindClass: 'rounded-2xl', size: '1rem' },
    { name: '3XL', cssVar: '--radius-3xl', tailwindClass: 'rounded-3xl', size: '1.5rem' },
    { name: 'Full', cssVar: '--radius-full', tailwindClass: 'rounded-full', size: '9999px' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="typography-title mb-2">Border Radius System</h3>
        <p className="typography-body text-neutral-4 mb-6">
          Consistent border radius utilities for the MotorTrend design system.
          Use these standardized radius values to create visual consistency across components.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {radiusValues.map((radius) => (
          <RadiusCard
            key={radius.name}
            name={radius.name}
            cssVar={radius.cssVar}
            tailwindClass={radius.tailwindClass}
            size={radius.size}
          />
        ))}
      </div>

      <div className="mt-8 p-4 bg-neutral-8 rounded-lg border border-neutral-6">
        <h4 className="typography-body font-semibold mb-2">Usage Guidelines</h4>
        <ul className="typography-body-sm space-y-2 text-neutral-4">
          <li>• Use <code className="text-neutral-1 bg-neutral-7 px-1 rounded">rounded-none</code> for elements that should have sharp corners</li>
          <li>• Use <code className="text-neutral-1 bg-neutral-7 px-1 rounded">rounded-sm</code> to <code className="text-neutral-1 bg-neutral-7 px-1 rounded">rounded-lg</code> for most UI components like cards, buttons, and form inputs</li>
          <li>• Use <code className="text-neutral-1 bg-neutral-7 px-1 rounded">rounded-xl</code> to <code className="text-neutral-1 bg-neutral-7 px-1 rounded">rounded-3xl</code> for prominent elements that need more distinctive rounding</li>
          <li>• Use <code className="text-neutral-1 bg-neutral-7 px-1 rounded">rounded-full</code> for circular elements like avatars, badges, or pill-shaped buttons</li>
          <li>• Apply directional rounding with <code className="text-neutral-1 bg-neutral-7 px-1 rounded">rounded-t-lg</code>, <code className="text-neutral-1 bg-neutral-7 px-1 rounded">rounded-r-lg</code>, etc.</li>
        </ul>
      </div>
    </div>
  );
}
