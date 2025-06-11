import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import MaterialIcon from '@/components/ui/MaterialIcon';

const IconsTab = () => {
  const iconList = [
    // Automotive & Navigation
    { name: 'directions_car', label: 'Car' },
    { name: 'local_gas_station', label: 'Gas Station' },
    { name: 'speed', label: 'Speed' },
    { name: 'place', label: 'Location' },
    { name: 'navigation', label: 'Navigation' },
    
    // Actions & Interface
    { name: 'search', label: 'Search' },
    { name: 'bookmark', label: 'Bookmark' },
    { name: 'share', label: 'Share' },
    { name: 'favorite', label: 'Heart' },
    { name: 'star', label: 'Star' },
    { name: 'visibility', label: 'Eye' },
    { name: 'schedule', label: 'Clock' },
    
    // Media & Content
    { name: 'play_arrow', label: 'Play' },
    { name: 'chevron_right', label: 'Chevron Right' },
    { name: 'filter_list', label: 'Filter' },
    { name: 'grid_view', label: 'Grid' },
    { name: 'list', label: 'List' },
    
    // User & Settings
    { name: 'person', label: 'User' },
    { name: 'settings', label: 'Settings' },
    { name: 'home', label: 'Home' },
    { name: 'calendar_today', label: 'Calendar' },
    
    // Communication
    { name: 'mail', label: 'Mail' },
    { name: 'phone', label: 'Phone' },
    { name: 'download', label: 'Download' },
    { name: 'upload', label: 'Upload' },
    
    // Actions
    { name: 'edit', label: 'Edit' },
    { name: 'delete', label: 'Delete' },
    { name: 'add', label: 'Plus' },
    { name: 'remove', label: 'Minus' },
    { name: 'close', label: 'Close' },
    { name: 'check', label: 'Check' },
    
    // Status & Alerts
    { name: 'error', label: 'Error' },
    { name: 'info', label: 'Info' },
    { name: 'check_circle', label: 'Success' },
    { name: 'cancel', label: 'Cancel' },
    
    // Financial
    { name: 'attach_money', label: 'Money' },
    { name: 'payments', label: 'Payments' },
    
    // Electric Vehicle
    { name: 'electric_bolt', label: 'Electric' },
    { name: 'battery_full', label: 'Battery' },
    
    // Awards & Rankings
    { name: 'emoji_events', label: 'Trophy' },
    { name: 'flash_on', label: 'Performance' }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Icon Library</CardTitle>
          <CardDescription>Google Material Icons used throughout the application</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-16 py-8">
            <div className="col-span-full mb-8">
              <div className="h-px bg-neutral-6 w-full" />
            </div>
            {iconList.map((icon, index) => (
              <div key={index} className="flex flex-col items-center group">
                <div className="flex items-center justify-center h-16 mb-4 group-hover:-translate-y-1 transition-transform duration-200">
                  <MaterialIcon 
                    name={icon.name} 
                    size={24} 
                    className="text-neutral-3 group-hover:text-neutral-1 transition-colors duration-200" 
                  />
                </div>
                <span className="typography-small text-neutral-4 text-center whitespace-nowrap group-hover:text-neutral-2 transition-colors duration-200">
                  {icon.label}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Icon Usage Guidelines</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="typography-title text-neutral-1 mb-2">Sizes</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MaterialIcon name="directions_car" size={16} />
                <span className="typography-small">16px - Small</span>
              </div>
              <div className="flex items-center gap-2">
                <MaterialIcon name="directions_car" size={20} />
                <span className="typography-small">20px - Default</span>
              </div>
              <div className="flex items-center gap-2">
                <MaterialIcon name="directions_car" size={24} />
                <span className="typography-small">24px - Large</span>
              </div>
              <div className="flex items-center gap-2">
                <MaterialIcon name="directions_car" size={32} />
                <span className="typography-small">32px - XL</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="typography-title text-neutral-1 mb-2">Colors</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MaterialIcon name="directions_car" size={20} className="text-neutral-1" />
                <span className="typography-small">Primary</span>
              </div>
              <div className="flex items-center gap-2">
                <MaterialIcon name="directions_car" size={20} className="text-neutral-4" />
                <span className="typography-small">Muted</span>
              </div>
              <div className="flex items-center gap-2">
                <MaterialIcon name="directions_car" size={20} className="text-red-500" />
                <span className="typography-small">Accent</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="typography-title text-neutral-1 mb-2">Implementation</h4>
            <div className="space-y-2">
              <p className="typography-body text-neutral-4">
                Use the MaterialIcon component with the icon name:
              </p>
              <code className="text-xs bg-neutral-100 px-2 py-1 rounded">
                &lt;MaterialIcon name="search" size={20} /&gt;
              </code>
              <p className="typography-small text-neutral-4">
                Icons should always be accompanied by text labels or have clear aria-labels for accessibility.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Material Icons Reference</CardTitle>
          <CardDescription>Complete icon reference and guidelines</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="typography-body text-neutral-4">
              We use Google Material Icons for consistent design language. All icons are loaded from Google Fonts and rendered as font icons for optimal performance.
            </p>
            <div className="flex flex-wrap gap-2">
              <a 
                href="https://fonts.google.com/icons" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 transition-colors"
              >
                <MaterialIcon name="open_in_new" size={16} />
                Browse All Icons
              </a>
              <a 
                href="https://material.io/design/iconography/system-icons.html" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 bg-green-50 text-green-700 rounded-md hover:bg-green-100 transition-colors"
              >
                <MaterialIcon name="description" size={16} />
                Design Guidelines
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IconsTab;
