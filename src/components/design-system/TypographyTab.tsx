
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface TypographyStyle {
  name: string;
  class: string;
  example: string;
  specs: string;
  usage: string;
}

interface TypographyCategory {
  category: string;
  styles: TypographyStyle[];
}

const TypographyTab: React.FC = () => {
  const typographyStyles: TypographyCategory[] = [
    {
      category: 'Headlines',
      styles: [
        {
          name: 'Hero',
          class: 'typography-hero',
          example: 'The Future of Cars',
          specs: 'clamp(3rem, 6vw, 5rem), line-height: 1.1',
          usage: 'Main hero headlines, large feature titles'
        },
        {
          name: 'Display',
          class: 'typography-display',
          example: '2024 Honda Accord Review',
          specs: 'clamp(2rem, 4vw, 3rem), line-height: 1.2',
          usage: 'Page titles, major section headers'
        },
        {
          name: 'Title',
          class: 'typography-title',
          example: 'Latest Car Reviews & News',
          specs: 'clamp(1.25rem, 2vw, 1.5rem), line-height: 1.3',
          usage: 'Section headers, card titles'
        },
        {
          name: 'Subtitle',
          class: 'typography-subtitle',
          example: '2024 Honda Civic Type R',
          specs: '1rem (16px), line-height: 1.4',
          usage: 'Card headlines, smaller titles'
        }
      ]
    },
    {
      category: 'Body Text',
      styles: [
        {
          name: 'Body Large',
          class: 'typography-body-large',
          example: 'The all-new Honda Accord redefines the midsize sedan segment with bold styling and advanced technology.',
          specs: '1.125rem (18px), var(--line-height-normal)',
          usage: 'Lead paragraphs, featured content'
        },
        {
          name: 'Body',
          class: 'typography-body',
          example: 'Experience exceptional handling and a smooth ride with the redesigned suspension system.',
          specs: '1rem (16px), var(--line-height-normal)',
          usage: 'Main content, descriptions'
        },
        {
          name: 'Body Small',
          class: 'typography-body-small',
          example: 'EPA estimated 30 city / 38 highway MPG for LX trim.',
          specs: '0.875rem (14px), var(--line-height-normal)',
          usage: 'Secondary content, specifications'
        }
      ]
    },
    {
      category: 'UI Elements',
      styles: [
        {
          name: 'Caption',
          class: 'typography-caption',
          example: 'Last updated: March 15, 2024',
          specs: '0.875rem (14px), var(--line-height-normal)',
          usage: 'Timestamps, metadata'
        },
        {
          name: 'Small',
          class: 'typography-small',
          example: '© 2024 MotorTrend. All rights reserved.',
          specs: '0.75rem (12px), var(--line-height-tight)',
          usage: 'Legal text, footnotes'
        },
        {
          name: 'Label',
          class: 'typography-label',
          example: 'NEW • FEATURED • TRENDING',
          specs: '0.75rem (12px), var(--letter-spacing-wider)',
          usage: 'Tags, badges, labels'
        }
      ]
    },
    {
      category: 'Buttons',
      styles: [
        {
          name: 'Button 1',
          class: 'typography-button1',
          example: 'VIEW ALL REVIEWS',
          specs: '1rem (16px), line-height: 1rem, font-weight: semi-bold',
          usage: 'Primary buttons, large CTAs'
        },
        {
          name: 'Button 2',
          class: 'typography-button2',
          example: 'Search',
          specs: '0.875rem (14px), line-height: 1rem, font-weight: semi-bold',
          usage: 'Standard buttons, form controls'
        }
      ]
    }
  ];

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="typography-title text-color-neutral-1">Typography System</h2>
        <p className="typography-body text-color-neutral-4">
          Our typography system is designed to create clear visual hierarchy and ensure readability across all devices.
          Each style serves a specific purpose in our interface.
        </p>
      </div>

      {typographyStyles.map((category) => (
        <Card key={category.category}>
          <CardHeader>
            <CardTitle>{category.category}</CardTitle>
            <CardDescription>Typography styles for {category.category.toLowerCase()}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {category.styles.map((style, styleIndex) => (
              <div key={style.name}>
                {styleIndex > 0 && <Separator className="my-6" />}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-3 space-y-1">
                    <p className="typography-caption-bold text-color-neutral-1">{style.name}</p>
                    <p className="typography-small text-color-neutral-4 font-mono">.{style.class}</p>
                    <p className="typography-small text-color-neutral-4">{style.specs}</p>
                    <p className="typography-caption text-color-neutral-4 mt-2">{style.usage}</p>
                  </div>
                  <div className="lg:col-span-9">
                    <div className={`${style.class} text-color-neutral-1`}>
                      {style.example}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}

      <Card>
        <CardHeader>
          <CardTitle>Font Families</CardTitle>
          <CardDescription>Base fonts used throughout the application</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-neutral-6 rounded-lg">
              <h4 className="typography-title mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Poppins
              </h4>
              <p className="typography-body text-neutral-4 mb-2">
                Used for headings, titles, hero sections, buttons, and subtitles
              </p>
              <p className="typography-small text-neutral-4 font-mono">
                font-family: 'Poppins', sans-serif
              </p>
              <div className="mt-4 space-y-2">
                <p className="typography-small text-neutral-4">Used in:</p>
                <ul className="list-disc list-inside text-neutral-4 typography-small">
                  <li>Hero text (--font-hero)</li>
                  <li>Headings (--font-heading)</li>
                  <li>Subtitles (--font-subtitle)</li>
                  <li>Buttons (--font-button)</li>
                </ul>
              </div>
            </div>
            <div className="p-4 border border-neutral-6 rounded-lg">
              <h4 className="typography-title mb-2" style={{ fontFamily: 'Geist, sans-serif' }}>
                Geist
              </h4>
              <p className="typography-body text-neutral-4 mb-2">
                Used for body text and captions
              </p>
              <p className="typography-small text-neutral-4 font-mono">
                font-family: 'Geist', sans-serif
              </p>
              <div className="mt-4 space-y-2">
                <p className="typography-small text-neutral-4">Used in:</p>
                <ul className="list-disc list-inside text-neutral-4 typography-small">
                  <li>Body text (--font-body)</li>
                  <li>Captions (--font-caption)</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TypographyTab;
