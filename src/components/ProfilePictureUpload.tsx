
import React, { useState, useRef } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Camera, User } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ProfilePictureUploadProps {
  currentImageUrl?: string;
  onImageChange: (imageDataUrl: string) => void;
}

const ProfilePictureUpload: React.FC<ProfilePictureUploadProps> = ({ 
  currentImageUrl, 
  onImageChange 
}) => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | undefined>(currentImageUrl);
  
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    if (!file) return;
    
    // Check file type
    if (!file.type.match('image.*')) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file (JPEG, PNG)",
        variant: "destructive"
      });
      return;
    }
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image smaller than 5MB",
        variant: "destructive"
      });
      return;
    }
    
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setImagePreview(result);
      onImageChange(result);
    };
    
    reader.readAsDataURL(file);
  };
  
  return (
    <div className="flex flex-col items-center gap-4">
      <Avatar className="h-24 w-24 border-2 border-gray-200">
        <AvatarImage src={imagePreview} alt="Profile picture" />
        <AvatarFallback className="bg-gray-200">
          <User className="h-12 w-12 text-gray-400" />
        </AvatarFallback>
      </Avatar>
      
      <div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/png, image/jpeg"
          className="hidden"
        />
        <Button 
          variant="outline" 
          onClick={handleButtonClick}
          size="sm"
          className="flex items-center gap-2"
        >
          <Camera size={16} />
          Change Picture
        </Button>
      </div>
    </div>
  );
};

export default ProfilePictureUpload;
