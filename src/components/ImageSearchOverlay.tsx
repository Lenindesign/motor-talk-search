import React, { useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Upload, Camera, X as CloseIcon } from 'lucide-react';

interface ImageSearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onImageSelected: (file: File) => void; // Callback for when an image is ready
  onTakePhotoClicked: () => void; // Callback for when user wants to use camera
}

const ImageSearchOverlay: React.FC<ImageSearchOverlayProps> = ({
  isOpen,
  onClose,
  onImageSelected,
  onTakePhotoClicked,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log('File selected:', file.name);
      onImageSelected(file);
      // onClose(); // Optionally close overlay after selection
    }
  };

  const handleTakePhoto = () => {
    console.log('Take photo clicked');
    onTakePhotoClicked();
    // onClose(); // Optionally close overlay after clicking
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px] bg-white dark:bg-neutral-1 transition-standard">
        <DialogHeader>
          <DialogTitle className="typography-title text-neutral-1 dark:text-white">Search by Image</DialogTitle>
          <DialogDescription className="typography-body-large text-neutral-4 dark:text-neutral-3">
            Upload a photo of a car or use your camera to identify it.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Button variant="outline" onClick={handleUploadClick} className="w-full justify-start text-left dark:hover:bg-neutral-2 typography-body-large transition-standard focus-ring">
            <Upload className="mr-2 h-5 w-5" />
            Upload an image
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          <Button variant="outline" onClick={handleTakePhoto} className="w-full justify-start text-left dark:hover:bg-neutral-2 typography-body-large transition-standard focus-ring">
            <Camera className="mr-2 h-5 w-5" />
            Take a photo
          </Button>
        </div>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="ghost" onClick={onClose} className="dark:text-neutral-3 dark:hover:bg-neutral-2 dark:hover:text-neutral-2 typography-caption transition-standard focus-ring">
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImageSearchOverlay;
