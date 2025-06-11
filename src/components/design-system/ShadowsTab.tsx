import React from 'react';

interface ShadowCardProps {
  name: string;
  cssVar: string;
  tailwindClass: string;
}

const ShadowCard: React.FC<ShadowCardProps> = ({ name, cssVar, tailwindClass }) => {
  return (
    <div className="flex flex-col gap-4">
      <div 
        className={`w-full h-24 rounded-xl bg-white ${tailwindClass} flex items-center justify-center`}
      >
        <span className="typography-body text-neutral-4">{name}</span>
      </div>
      <div className="space-y-1">
        <p className="typography-body font-semibold">{name}</p>
        <p className="typography-caption text-neutral-4">CSS: {cssVar}</p>
        <p className="typography-caption text-neutral-4">Tailwind: {tailwindClass}</p>
      </div>
    </div>
  );
};

export default function ShadowsTab() {
  const shadows = [
    { name: 'Shadow SM', cssVar: 'var(--shadow-sm)', tailwindClass: 'shadow-sm' },
    { name: 'Shadow MD', cssVar: 'var(--shadow-md)', tailwindClass: 'shadow-md' },
    { name: 'Shadow LG', cssVar: 'var(--shadow-lg)', tailwindClass: 'shadow-lg' },
    { name: 'Shadow XL', cssVar: 'var(--shadow-xl)', tailwindClass: 'shadow-xl' },
    { name: 'Shadow 2XL', cssVar: 'var(--shadow-2xl)', tailwindClass: 'shadow-2xl' },
    { name: 'Shadow Inner', cssVar: 'var(--shadow-inner)', tailwindClass: 'shadow-inner' },
    { name: 'Shadow Card', cssVar: 'Custom card shadow', tailwindClass: 'shadow-card' },
    { name: 'Shadow Dropdown', cssVar: 'Custom dropdown shadow', tailwindClass: 'shadow-dropdown' },
    { name: 'Shadow Modal', cssVar: 'Custom modal shadow', tailwindClass: 'shadow-modal' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="typography-title mb-2">Shadow System</h3>
        <p className="typography-body text-neutral-4 mb-6">
          Consistent shadow utilities for depth and elevation in the MotorTrend design system.
          Use these standardized shadows to create visual hierarchy and focus.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {shadows.map((shadow) => (
          <ShadowCard
            key={shadow.name}
            name={shadow.name}
            cssVar={shadow.cssVar}
            tailwindClass={shadow.tailwindClass}
          />
        ))}
      </div>

      <div className="mt-8 p-4 bg-neutral-8 rounded-lg border border-neutral-6">
        <h4 className="typography-body font-semibold mb-2">Usage Guidelines</h4>
        <ul className="typography-body-sm space-y-2 text-neutral-4">
          <li>• Use <code className="text-neutral-1 bg-neutral-7 px-1 rounded">shadow-sm</code> for subtle elevation (buttons, cards)</li>
          <li>• Use <code className="text-neutral-1 bg-neutral-7 px-1 rounded">shadow-md</code> for medium elevation (dropdown menus)</li>
          <li>• Use <code className="text-neutral-1 bg-neutral-7 px-1 rounded">shadow-lg</code> for significant elevation (popovers)</li>
          <li>• Use <code className="text-neutral-1 bg-neutral-7 px-1 rounded">shadow-xl</code> and <code className="text-neutral-1 bg-neutral-7 px-1 rounded">shadow-2xl</code> for modals and dialogs</li>
          <li>• Use <code className="text-neutral-1 bg-neutral-7 px-1 rounded">shadow-inner</code> for inset shadows (pressed buttons, form inputs)</li>
          <li>• Use semantic shadows (<code className="text-neutral-1 bg-neutral-7 px-1 rounded">shadow-card</code>, <code className="text-neutral-1 bg-neutral-7 px-1 rounded">shadow-dropdown</code>, <code className="text-neutral-1 bg-neutral-7 px-1 rounded">shadow-modal</code>) for specific components</li>
        </ul>
      </div>
    </div>
  );
}
