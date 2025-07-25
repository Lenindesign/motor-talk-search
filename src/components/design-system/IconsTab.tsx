
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Car, 
  Bookmark, 
  Share2, 
  Star, 
  Eye, 
  Clock, 
  MapPin, 
  Play,
  ChevronRight,
  Search,
  Filter,
  Grid,
  List,
  Heart,
  User,
  Settings,
  Home,
  Calendar,
  Mail,
  Phone,
  Download,
  Upload,
  Edit,
  Trash2,
  Plus,
  Minus,
  X,
  Check,
  AlertCircle,
  Info,
  CheckCircle,
  XCircle
} from 'lucide-react';

const IconsTab = () => {
  const icons = [
    Car, Bookmark, Share2, Star, Eye, Clock, MapPin, Play,
    ChevronRight, Search, Filter, Grid, List, Heart, User, Settings,
    Home, Calendar, Mail, Phone, Download, Upload, Edit, Trash2,
    Plus, Minus, X, Check, AlertCircle, Info, CheckCircle, XCircle
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Icon Library</CardTitle>
          <CardDescription>Lucide React icons used throughout the application</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-16 py-8">
            <div className="col-span-full mb-8">
              <div className="h-px bg-neutral-6 w-full" />
            </div>
            {icons.map((Icon, index) => (
              <div key={index} className="flex flex-col items-center group">
                <div className="flex items-center justify-center h-16 mb-4 group-hover:-translate-y-1 transition-transform duration-200">
                  <Icon size={24} className="text-neutral-3 group-hover:text-neutral-1 transition-colors duration-200" />
                </div>
                <span className="typography-small text-neutral-4 text-center whitespace-nowrap group-hover:text-neutral-2 transition-colors duration-200">
                  {Icon.displayName || Icon.name}
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
                <Car size={16} />
                <span className="typography-small">16px - Small</span>
              </div>
              <div className="flex items-center gap-2">
                <Car size={20} />
                <span className="typography-small">20px - Default</span>
              </div>
              <div className="flex items-center gap-2">
                <Car size={24} />
                <span className="typography-small">24px - Large</span>
              </div>
              <div className="flex items-center gap-2">
                <Car size={32} />
                <span className="typography-small">32px - XL</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="typography-title text-neutral-1 mb-2">Colors</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Car size={20} className="text-neutral-1" />
                <span className="typography-small">Primary</span>
              </div>
              <div className="flex items-center gap-2">
                <Car size={20} className="text-neutral-4" />
                <span className="typography-small">Muted</span>
              </div>
              <div className="flex items-center gap-2">
                <Car size={20} className="text-red-500" />
                <span className="typography-small">Accent</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="typography-title text-neutral-1 mb-2">Context</h4>
            <p className="typography-body text-neutral-4">
              Icons should always be accompanied by text labels or have clear aria-labels for accessibility.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IconsTab;
