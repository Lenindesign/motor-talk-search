import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight, Download, Share, Heart, ZoomIn, Bookmark } from 'lucide-react';
import { useSavedItems } from '../contexts/SavedItemsContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { mockPhotos } from '@/services/mockData';
const PhotoDetail: React.FC = () => {
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const navigate = useNavigate();
  const {
    addSavedItem,
    removeSavedItem,
    isSaved
  } = useSavedItems();
  const isPhotoSaved = isSaved(id, 'photo');
  const handleSave = () => {
    const savedItem = {
      id,
      title: photo.title,
      type: 'photo' as const,
      imageUrl: photo.imageUrl,
      savedAt: new Date().toISOString(),
      metadata: {
        position: photo.position,
        make: photo.make,
        carModel: photo.carModel,
        year: photo.year
      }
    };
    if (isPhotoSaved) {
      removeSavedItem(id, 'photo');
    } else {
      addSavedItem(savedItem);
    }
  };
  const photo = mockPhotos.find(p => p.id === id);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  if (!photo) {
    return <div className="min-h-screen bg-gray-50">
        
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Photo Not Found</h1>
            <Link to="/" className="text-motortrend-red hover:underline">
              Browse All Photos
            </Link>
          </div>
        </main>
      </div>;
  }

  // Find current photo index and create related photos
  const currentPhotoIndex = mockPhotos.findIndex(p => p.id === id);
  const relatedPhotos = mockPhotos.slice(Math.max(0, currentPhotoIndex - 2), currentPhotoIndex + 3);
  const currentPhoto = relatedPhotos[Math.min(2, currentPhotoIndex)];
  const navigatePhoto = (direction: 'prev' | 'next') => {
    const currentIdx = relatedPhotos.findIndex(p => p.id === photo.id);
    let newIndex;
    if (direction === 'prev') {
      newIndex = currentIdx > 0 ? currentIdx - 1 : relatedPhotos.length - 1;
    } else {
      newIndex = currentIdx < relatedPhotos.length - 1 ? currentIdx + 1 : 0;
    }
    window.location.href = `/photo/${relatedPhotos[newIndex].id}`;
  };
  const mockPhotoSeries = [photo.imageUrl, "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=500&auto=format&fit=crop&q=60", "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=500&auto=format&fit=crop&q=60", "https://d2kde5ohu8qb21.cloudfront.net/files/683a0abf00b694000887671f/024-2025-aston-martin-vanquish.jpg?w=500&auto=format&fit=crop&q=60", "https://d2kde5ohu8qb21.cloudfront.net/files/65b819aba0798d000828ef2f/2008-honda-element-02.jpg?w=500&auto=format&fit=crop&q=60"];
  return <div className="min-h-screen bg-black">
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Photo Viewer */}
          <div className="lg:col-span-3">
            <div className="relative">
              <div className="relative bg-gray-900 rounded-lg overflow-hidden">
                <img src={mockPhotoSeries[currentIndex]} alt={photo.title} className={`w-full transition-transform duration-300 ${isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'}`} style={{
                height: '70vh',
                objectFit: 'contain'
              }} onClick={() => setIsZoomed(!isZoomed)} />
                
                {/* Navigation Arrows */}
                <button onClick={() => setCurrentIndex(currentIndex > 0 ? currentIndex - 1 : mockPhotoSeries.length - 1)} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors">
                  <ChevronLeft size={24} />
                </button>
                <button onClick={() => setCurrentIndex(currentIndex < mockPhotoSeries.length - 1 ? currentIndex + 1 : 0)} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors">
                  <ChevronRight size={24} />
                </button>
                
                {/* Save Button */}
                <button onClick={handleSave} className={`absolute top-4 left-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors ${isPhotoSaved ? 'bg-motortrend-red' : ''}`}>
                  <Bookmark size={20} className={`${isPhotoSaved ? 'fill-current' : 'stroke-current'}`} />
                </button>

                {/* Photo Counter */}
                <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded">
                  {currentIndex + 1} / {mockPhotoSeries.length}
                </div>

                {/* Zoom Indicator */}
                <div className="absolute bottom-4 right-4">
                  <Button variant="ghost" size="sm" className="bg-black/50 hover:bg-black/70 text-white" onClick={() => setIsZoomed(!isZoomed)}>
                    <ZoomIn size={16} />
                  </Button>
                </div>
              </div>

              {/* Thumbnail Strip */}
              <div className="mt-4 flex space-x-2 overflow-x-auto pb-2">
                {mockPhotoSeries.map((src, index) => <button key={index} onClick={() => setCurrentIndex(index)} className={`flex-shrink-0 rounded overflow-hidden ${currentIndex === index ? 'ring-2 ring-motortrend-red' : ''}`}>
                    <img src={src} alt={`Thumbnail ${index + 1}`} className="w-20 h-16 object-cover" />
                  </button>)}
              </div>
            </div>
          </div>

          {/* Photo Information Sidebar */}
          <div className="space-y-6">
            <Card className="bg-gray-900 border-gray-700 text-white">
              <CardContent className="pb-4">
                <h1 className="text-2xl font-bold mb-4">{photo.title}</h1>
                
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-gray-400">Position:</span>
                    <span className="ml-2">{photo.position}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Make:</span>
                    <span className="ml-2">{photo.make}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Model:</span>
                    <span className="ml-2">{photo.carModel}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Year:</span>
                    <span className="ml-2">{photo.year}</span>
                  </div>
                </div>

                <div className="flex space-x-2 mt-6">
                  
                  

                </div>
              </CardContent>
            </Card>

            {/* Photo Series Navigation */}
            <Card className="bg-gray-900 border-gray-700 text-white">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Related Photos</h3>
                <div className="space-y-2">
                  {relatedPhotos.map((relatedPhoto, index) => <Link key={relatedPhoto.id} to={`/photo/${relatedPhoto.id}`} className={`block p-2 rounded hover:bg-gray-800 transition-colors ${relatedPhoto.id === photo.id ? 'bg-gray-800 border-l-2 border-motortrend-red' : ''}`}>
                      <div className="flex items-center space-x-3">
                        <img src={relatedPhoto.imageUrl} alt={relatedPhoto.title} className="w-12 h-8 object-cover rounded" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{relatedPhoto.title}</p>
                          <p className="text-xs text-gray-400">{relatedPhoto.position}</p>
                        </div>
                      </div>
                    </Link>)}
                </div>
              </CardContent>
            </Card>

            {/* Navigation */}
            
          </div>
        </div>
      </main>
    </div>;
};
export default PhotoDetail;