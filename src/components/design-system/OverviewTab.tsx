
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const OverviewTab = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Design Principles</CardTitle>
          <CardDescription>Core principles that guide our design decisions</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <h3 className="typography-title text-neutral-1">Consistency</h3>
            <p className="typography-body text-neutral-4">
              Uniform patterns and components across all interfaces
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="typography-title text-neutral-1">Accessibility</h3>
            <p className="typography-body text-neutral-4">
              Inclusive design that works for all users
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="typography-title text-neutral-1">Performance</h3>
            <p className="typography-body text-neutral-4">
              Optimized components for fast loading and smooth interactions
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Atomic Design Structure</CardTitle>
          <CardDescription>Our component hierarchy follows atomic design principles</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 border border-neutral-6 rounded-lg">
              <h4 className="typography-title text-neutral-1 mb-2">Atoms</h4>
              <p className="typography-caption text-neutral-4 mb-3">Basic building blocks</p>
              <ul className="typography-small text-neutral-4 space-y-1">
                <li>• Buttons</li>
                <li>• Icons</li>
                <li>• Typography</li>
                <li>• Colors</li>
              </ul>
            </div>
            <div className="p-4 border border-neutral-6 rounded-lg">
              <h4 className="typography-title text-neutral-1 mb-2">Molecules</h4>
              <p className="typography-caption text-neutral-4 mb-3">Simple component groups</p>
              <ul className="typography-small text-neutral-4 space-y-1">
                <li>• Search Bar</li>
                <li>• Form Fields</li>
                <li>• Card Headers</li>
                <li>• Navigation Items</li>
              </ul>
            </div>
            <div className="p-4 border border-neutral-6 rounded-lg">
              <h4 className="typography-title text-neutral-1 mb-2">Organisms</h4>
              <p className="typography-caption text-neutral-4 mb-3">Complex component groups</p>
              <ul className="typography-small text-neutral-4 space-y-1">
                <li>• Car Cards</li>
                <li>• Article Cards</li>
                <li>• Navigation Bar</li>
                <li>• Garage Stats</li>
              </ul>
            </div>
            <div className="p-4 border border-neutral-6 rounded-lg">
              <h4 className="typography-title text-neutral-1 mb-2">Templates</h4>
              <p className="typography-caption text-neutral-4 mb-3">Page-level layouts</p>
              <ul className="typography-small text-neutral-4 space-y-1">
                <li>• Dashboard</li>
                <li>• Garage</li>
                <li>• Car Research</li>
                <li>• Article Pages</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewTab;
