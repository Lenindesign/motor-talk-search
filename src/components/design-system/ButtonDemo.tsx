import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, ArrowRight, Plus, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

const ButtonDemo = () => {
  return (
    <div className="space-y-12">
      {/* Monochrome & Red Variants */}
      <section>
        <h3 className="typography-heading-3 mb-6">Button Variants</h3>
        <div className="grid gap-8">
          {/* Solid Buttons */}
          <div className="space-y-4">
            <h4 className="typography-title text-neutral-2">Solid</h4>
            <div className="flex flex-wrap gap-6">
              <Button variant="solid">Solid Black</Button>
              <Button variant="solid-light">Light Black</Button>
              <Button variant="solid-red">Solid Red</Button>
              <Button variant="solid-red-light">Light Gray</Button>
            </div>
          </div>

          {/* Outline Buttons */}
          <div className="space-y-4">
            <h4 className="typography-title text-neutral-2">Outline</h4>
            <div className="flex flex-wrap gap-6">
              <Button variant="outline-black">Outline Black</Button>
              <Button variant="outline-red">Outline Red</Button>
            </div>
          </div>

          {/* Ghost Buttons */}
          <div className="space-y-4">
            <h4 className="typography-title text-neutral-2">Ghost</h4>
            <div className="flex flex-wrap gap-6">
              <Button variant="ghost-black">Ghost Black</Button>
              <Button variant="ghost-red">Ghost Red</Button>
            </div>
          </div>

          {/* Minimal */}
          <div className="space-y-4">
            <h4 className="typography-title text-neutral-2">Minimal</h4>
            <div className="flex flex-wrap gap-6 items-center">
              <Button variant="minimal">Minimal</Button>
              <Button variant="minimal" className="text-[var(--motortrend-red)]">
                Minimal Red <ExternalLink className="ml-1 h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Sizes */}
      <section>
        <h3 className="typography-heading-3 mb-6">Sizes</h3>
        <div className="flex flex-wrap items-center gap-6">
          <Button variant="solid" size="sm">Small</Button>
          <Button variant="solid">Default</Button>
          <Button variant="solid" size="lg">Large</Button>
          <Button variant="solid" size="xl">Extra Large</Button>
        </div>
      </section>

      {/* With Icons */}
      <section>
        <h3 className="typography-heading-3 mb-6">With Icons</h3>
        <div className="flex flex-wrap gap-6">
          <Button variant="solid">
            <Download className="mr-1" /> Download
          </Button>
          <Button variant="outline-black">
            Next <ArrowRight className="ml-1" />
          </Button>
          <Button variant="solid" size="icon">
            <Plus />
          </Button>
          <Button variant="solid" size="icon-sm">
            <Plus />
          </Button>
          <Button variant="solid" size="icon-lg">
            <Plus />
          </Button>
        </div>
      </section>

      {/* States */}
      <section>
        <h3 className="typography-heading-3 mb-6">States</h3>
        <div className="flex flex-wrap gap-6 items-center">
          <Button variant="solid" disabled>
            Disabled
          </Button>
          <Button variant="solid" className="opacity-40 cursor-not-allowed">
            Loading...
          </Button>
          <div className="p-8 bg-neutral-8 rounded-xl">
            <Button variant="ghost-black">Ghost on Gray</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ButtonDemo;
