
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const AnimationsTab = () => {
  const animations = [
    { name: 'Fade In', class: 'animate-fade-in', duration: '0.3s' },
    { name: 'Scale In', class: 'animate-scale-in', duration: '0.2s' },
    { name: 'Slide In', class: 'animate-slide-in', duration: '0.3s' },
    { name: 'Accordion Down', class: 'animate-accordion-down', duration: '0.2s' },
    { name: 'Pulse', class: 'animate-pulse', duration: '2s' },
    { name: 'Bounce Subtle', class: 'animate-bounce-subtle', duration: '2s' }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Animation Library</CardTitle>
          <CardDescription>CSS animations and transitions used in the application</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {animations.map((animation) => (
              <div key={animation.name} className="p-4 border border-neutral-6 rounded-lg">
                <h4 className="typography-title text-neutral-1 mb-2">{animation.name}</h4>
                <p className="typography-small text-neutral-4 mb-3">Duration: {animation.duration}</p>
                <p className="typography-small text-neutral-4 font-mono mb-3">.{animation.class}</p>
                <Button 
                  size="sm" 
                  onClick={() => {
                    const element = document.getElementById(`demo-${animation.name}`);
                    if (element) {
                      element.classList.remove(animation.class);
                      setTimeout(() => element.classList.add(animation.class), 10);
                    }
                  }}
                >
                  Preview
                </Button>
                <div 
                  id={`demo-${animation.name}`}
                  className={`mt-2 w-8 h-8 bg-red-500 rounded ${animation.class}`}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Animation Principles</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="typography-title text-neutral-1 mb-2">Performance</h4>
            <ul className="typography-body text-neutral-4 space-y-1">
              <li>• Use transform and opacity for smooth animations</li>
              <li>• Prefer CSS animations over JavaScript</li>
              <li>• Keep animations under 300ms for micro-interactions</li>
              <li>• Use will-change sparingly</li>
            </ul>
          </div>
          <div>
            <h4 className="typography-title text-neutral-1 mb-2">Accessibility</h4>
            <ul className="typography-body text-neutral-4 space-y-1">
              <li>• Respect prefers-reduced-motion</li>
              <li>• Provide skip options for long animations</li>
              <li>• Avoid flashing or rapid movements</li>
              <li>• Use focus indicators that animate smoothly</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnimationsTab;
