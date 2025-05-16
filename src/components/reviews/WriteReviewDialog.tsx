
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface WriteReviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  carId: string;
  carTitle: string;
}

const WriteReviewDialog: React.FC<WriteReviewDialogProps> = ({
  open,
  onOpenChange,
  carId,
  carTitle,
}) => {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      toast({
        title: "Rating required",
        description: "Please select a rating before submitting your review.",
        variant: "destructive",
      });
      return;
    }
    
    if (!title.trim()) {
      toast({
        title: "Title required",
        description: "Please provide a title for your review.",
        variant: "destructive",
      });
      return;
    }
    
    if (content.trim().length < 20) {
      toast({
        title: "Review too short",
        description: "Please write a more detailed review (at least 20 characters).",
        variant: "destructive",
      });
      return;
    }
    
    // Simulate submitting the review
    setIsSubmitting(true);
    
    // In a real app, we would send this data to a backend API
    setTimeout(() => {
      setIsSubmitting(false);
      onOpenChange(false);
      
      // Reset form
      setRating(0);
      setTitle("");
      setContent("");
      
      toast({
        title: "Review submitted",
        description: "Thank you for sharing your experience with this vehicle!",
      });
    }, 1000);
  };
  
  const renderStars = () => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <Star
          key={index}
          className={`h-8 w-8 cursor-pointer transition-all ${
            (hoverRating || rating) > index
              ? "fill-yellow-500 text-yellow-500"
              : "text-gray-300"
          }`}
          onMouseEnter={() => setHoverRating(index + 1)}
          onMouseLeave={() => setHoverRating(0)}
          onClick={() => setRating(index + 1)}
        />
      ));
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Write a Review</DialogTitle>
          <DialogDescription>
            Share your experience with the {carTitle}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Your Rating</label>
            <div className="flex space-x-1">{renderStars()}</div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="review-title" className="text-sm font-medium">
              Review Title
            </label>
            <Input
              id="review-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Summarize your experience"
              maxLength={100}
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="review-content" className="text-sm font-medium">
              Your Review
            </label>
            <Textarea
              id="review-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share details of your experience with this vehicle"
              className="min-h-[120px]"
              maxLength={2000}
            />
            <p className="text-xs text-gray-500">
              {content.length}/2000 characters
            </p>
          </div>
          
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-motortrend-red hover:bg-motortrend-red/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default WriteReviewDialog;
