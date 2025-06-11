import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

export const Resources = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">Resources</h2>
        <p className="text-sm text-muted-foreground">
          Design system documentation, guidelines, and exceptions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Current Audit Status</h3>
          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Typography Inconsistencies</h4>
                <ul className="list-disc pl-4 space-y-1 text-sm">
                  <li>Direct Tailwind typography classes usage</li>
                  <li>Inconsistent heading hierarchy</li>
                  <li>Typography token standardization needed</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Color Usage Exceptions</h4>
                <ul className="list-disc pl-4 space-y-1 text-sm">
                  <li>Direct color values in some components</li>
                  <li>Inconsistent neutral color scale usage</li>
                  <li>Legacy color values migration needed</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Component Variants</h4>
                <ul className="list-disc pl-4 space-y-1 text-sm">
                  <li>Button variant overlap</li>
                  <li>Multiple shadow implementations</li>
                  <li>Border radius inconsistencies</li>
                </ul>
              </div>
            </div>
          </ScrollArea>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold mb-4">Documented Exceptions</h3>
          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Videos Page Dark Mode</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Custom dark theme for optimal video viewing experience.
                </p>
                <ul className="list-disc pl-4 space-y-1 text-sm">
                  <li>Uses custom body class approach</li>
                  <li>Limited to Videos page only</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Container Width</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Standard: max-width-[980px]
                </p>
                <ul className="list-disc pl-4 space-y-1 text-sm">
                  <li>Photo Gallery: max-w-6xl</li>
                  <li>Car Database: max-w-7xl</li>
                  <li>Home Hero: full-width</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Typography</h4>
                <ul className="list-disc pl-4 space-y-1 text-sm">
                  <li>Email Templates: Arial for compatibility</li>
                  <li>Legal Content: Custom text sizes</li>
                  <li>Car Specs: Monospace font</li>
                </ul>
              </div>
            </div>
          </ScrollArea>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="font-semibold mb-4">Action Items</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-medium mb-2">Short Term</h4>
            <ul className="list-disc pl-4 space-y-1 text-sm">
              <li>Create automated linting rules</li>
              <li>Document component exceptions</li>
              <li>Update component documentation</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Medium Term</h4>
            <ul className="list-disc pl-4 space-y-1 text-sm">
              <li>Migrate legacy color values</li>
              <li>Standardize typography usage</li>
              <li>Consolidate shadow system</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Long Term</h4>
            <ul className="list-disc pl-4 space-y-1 text-sm">
              <li>Create migration guide</li>
              <li>Implement dark mode support</li>
              <li>Standardize responsive patterns</li>
            </ul>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="font-semibold mb-4">Adding New Exceptions</h3>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Follow these steps to add a new exception to the design system:
          </p>
          <ol className="list-decimal pl-4 space-y-2 text-sm">
            <li>Document the exception in EXCEPTIONS.md</li>
            <li>Provide clear justification</li>
            <li>Include implementation details and scope</li>
            <li>Add reference to related components</li>
            <li>Get approval from the design team</li>
          </ol>
        </div>
      </Card>
    </div>
  );
};

export default Resources;
