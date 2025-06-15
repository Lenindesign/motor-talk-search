
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeftRight, FileText, Share2, Settings } from 'lucide-react';

interface GarageQuickActionsProps {
  carCount: number;
}

const GarageQuickActions: React.FC<GarageQuickActionsProps> = ({ carCount }) => {
  return (
    <Card className="bg-neutral-8 border-neutral-6">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="typography-subtitle text-neutral-1">Quick Actions</h3>
          <span className="typography-caption text-neutral-4">{carCount} vehicles</span>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <Button variant="outline" size="sm" className="flex-col h-auto py-3 px-2">
            <ArrowLeftRight className="w-4 h-4 mb-1" />
            <span className="text-xs">Compare</span>
          </Button>
          <Button variant="outline" size="sm" className="flex-col h-auto py-3 px-2">
            <FileText className="w-4 h-4 mb-1" />
            <span className="text-xs">Export</span>
          </Button>
          <Button variant="outline" size="sm" className="flex-col h-auto py-3 px-2">
            <Share2 className="w-4 h-4 mb-1" />
            <span className="text-xs">Share</span>
          </Button>
          <Button variant="outline" size="sm" className="flex-col h-auto py-3 px-2">
            <Settings className="w-4 h-4 mb-1" />
            <span className="text-xs">Settings</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default GarageQuickActions;
