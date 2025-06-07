import React from 'react';
import { Separator } from '@/components/ui/separator';
import CodeSnippet from './CodeSnippet';

const LayoutTab = () => {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="typography-heading-2 mb-4">Layout Patterns</h2>
        <p className="typography-body-large text-color-neutral-4 mb-6">
          Standardized layout patterns and grid systems for consistent page structure.
        </p>
        
        {/* Container Layout */}
        <div className="mb-8">
          <h3 className="typography-heading-3 mb-4">Container</h3>
          <p className="typography-body mb-4">
            The Container component maintains a consistent max-width of 1024px and proper padding across the application, aligning with Tailwind's lg breakpoint.
          </p>
          <div className="bg-color-neutral-7 p-4 rounded-lg mb-4">
            <div className="bg-color-neutral-6 p-4 rounded border border-color-neutral-5 text-center">
              max-width: 1024px
            </div>
          </div>
          <CodeSnippet
            code={`<Container>
  <YourContent />
</Container>`}
            language="tsx"
          />
        </div>

        {/* Grid System */}
        <div className="mb-8">
          <h3 className="typography-heading-3 mb-4">Grid System</h3>
          <p className="typography-body mb-4">
            Standard grid layouts for different content types.
          </p>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="bg-color-neutral-7 p-4 rounded-lg text-center">
                  Column {item}
                </div>
              ))}
            </div>
          </div>
          <CodeSnippet
            code={`<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  {items.map((item) => (
    <YourCard key={item.id} {...item} />
  ))}
</div>`}
            language="tsx"
          />
        </div>

        {/* Spacing System */}
        <div className="mb-8">
          <h3 className="typography-heading-3 mb-4">Vertical Spacing</h3>
          <p className="typography-body mb-4">
            Consistent 32px (2rem) spacing between major sections.
          </p>
          <div className="space-y-8">
            <div className="bg-color-neutral-7 p-4 rounded-lg">Section 1</div>
            <div className="bg-color-neutral-7 p-4 rounded-lg">Section 2</div>
            <div className="bg-color-neutral-7 p-4 rounded-lg">Section 3</div>
          </div>
          <CodeSnippet
            code={`<main className="space-y-8">
  <Section1 />
  <Section2 />
  <Section3 />
</main>`}
            language="tsx"
          />
        </div>

        {/* Responsive Patterns */}
        <div>
          <h3 className="typography-heading-3 mb-4">Responsive Patterns</h3>
          <p className="typography-body mb-4">
            Common responsive layout patterns used throughout the application.
          </p>
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 bg-color-neutral-7 p-4 rounded-lg">Main Content</div>
              <div className="md:w-1/3 bg-color-neutral-7 p-4 rounded-lg">Sidebar</div>
            </div>
          </div>
          <CodeSnippet
            code={`<div className="flex flex-col md:flex-row gap-4">
  <main className="flex-1">Main Content</main>
  <aside className="md:w-1/3">Sidebar</aside>
</div>`}
            language="tsx"
          />
        </div>
      </section>
    </div>
  );
};

export default LayoutTab;
