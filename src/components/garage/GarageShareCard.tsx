import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Share2, Instagram, Twitter, Link, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface GarageShareCardProps {
  garageUrl?: string;
  carCount: number;
}

const GarageShareCard: React.FC<GarageShareCardProps> = ({ 
  garageUrl = window.location.href,
  carCount 
}) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopyLink = () => {
    navigator.clipboard.writeText(garageUrl);
    setCopied(true);
    toast({
      title: "Link copied!",
      description: "Share your garage with friends",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = (platform: 'instagram' | 'twitter') => {
    const message = `Check out my garage with ${carCount} amazing cars!`;
    
    if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(garageUrl)}`, '_blank');
    } else {
      // Instagram doesn't support direct URL sharing, so we'll show a message
      toast({
        title: "Share on Instagram",
        description: "Copy the link and share it in your Instagram story or bio!",
      });
    }
  };

  return (
    <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-neutral-1">Share Your Garage</h4>
            <p className="text-sm text-neutral-3">Show off your collection</p>
          </div>
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => handleShare('instagram')}
              className="hover:bg-purple-100"
            >
              <Instagram className="h-4 w-4" />
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => handleShare('twitter')}
              className="hover:bg-purple-100"
            >
              <Twitter className="h-4 w-4" />
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={handleCopyLink}
              className="hover:bg-purple-100"
            >
              {copied ? <Check className="h-4 w-4" /> : <Link className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GarageShareCard; 