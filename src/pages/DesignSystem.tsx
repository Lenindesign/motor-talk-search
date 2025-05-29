import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { toast } from '@/components/ui/use-toast';
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
import GarageStats from '@/components/GarageStats';
import ArticleCard from '@/components/ArticleCard';
import { CarData } from '@/components/CarCard';
import GarageCarCard from '@/components/CarCard';

const DesignSystem = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Sample data for components
  const sampleCarData: CarData = {
    id: '1',
    title: '2024 Toyota Camry',
    imageUrl: '/lovable-uploads/63b8496b-1701-478b-bdda-3cb3dc187a2a.png',
    price: '$28,500',
    category: 'Sedan',
    year: 2024,
    mileage: '15,000 miles',
    fuelType: 'Hybrid',
    drivetrain: 'FWD',
    location: 'Los Angeles, CA',
    bodyStyle: 'Sedan',
    isNew: true,
    motorTrendScore: 8.5,
    motorTrendRank: 3,
    motorTrendCategoryRank: 1
  };

  const sampleArticle = {
    id: 'art1',
    title: 'Best SUVs for Families in 2025',
    imageUrl: '/lovable-uploads/930641e7-042c-4f43-a9f6-c81fa3a9a0c4.png',
    date: '2025-03-15',
    category: 'SUV'
  };

  const colorPalette = [
    { name: 'Primary Red', value: '#c11b17', css: '--color-primary-1' },
    { name: 'MotorTrend Red', value: '#e90c17', css: '--color-primary-2' },
    { name: 'Light Red', value: '#ff858a', css: '--color-primary-3' },
    { name: 'Neutral Dark', value: '#141416', css: '--color-neutral-1' },
    { name: 'Neutral 2', value: '#23262f', css: '--color-neutral-2' },
    { name: 'Neutral 3', value: '#353945', css: '--color-neutral-3' },
    { name: 'Neutral 4', value: '#6e7481', css: '--color-neutral-4' },
    { name: 'Neutral 5', value: '#b1b5c3', css: '--color-neutral-5' },
    { name: 'Neutral 6', value: '#e6e8ec', css: '--color-neutral-6' },
    { name: 'Neutral 7', value: '#f4f5f6', css: '--color-neutral-7' },
    { name: 'Neutral Light', value: '#fcfcfd', css: '--color-neutral-8' },
    { name: 'Success Green', value: '#388e3c', css: '--color-success-2' },
    { name: 'Warning Orange', value: '#f57c00', css: '--color-warning-2' },
    { name: 'Error Red', value: '#d32f2f', css: '--color-error-2' },
    { name: 'Info Blue', value: '#0865b4', css: '--color-info-2' }
  ];

  const fontSizes = [
    { name: 'Hero', size: 'clamp(3rem, 6vw, 5rem)', class: 'typography-hero' },
    { name: 'Display', size: 'clamp(2rem, 4vw, 3rem)', class: 'typography-display' },
    { name: 'Title', size: 'clamp(1.25rem, 2vw, 1.5rem)', class: 'typography-title' },
    { name: 'Body Large', size: '1.125rem', class: 'typography-body-large' },
    { name: 'Body', size: '1rem', class: 'typography-body' },
    { name: 'Caption', size: '0.875rem', class: 'typography-caption' },
    { name: 'Small', size: '0.75rem', class: 'typography-small' }
  ];

  const spacingSystem = [
    { name: 'Tight', value: '0.5rem', class: 'space-tight' },
    { name: 'Element', value: '1rem', class: 'space-element' },
    { name: 'Content', value: '2rem', class: 'space-content' },
    { name: 'Section', value: '4rem', class: 'space-section' }
  ];

  const animations = [
    { name: 'Fade In', class: 'animate-fade-in', duration: '0.3s' },
    { name: 'Scale In', class: 'animate-scale-in', duration: '0.2s' },
    { name: 'Slide In', class: 'animate-slide-in', duration: '0.3s' },
    { name: 'Accordion Down', class: 'animate-accordion-down', duration: '0.2s' },
    { name: 'Pulse', class: 'animate-pulse', duration: '2s' },
    { name: 'Bounce Subtle', class: 'animate-bounce-subtle', duration: '2s' }
  ];

  const shadowStyles = [
    { name: 'Modern', class: 'shadow-modern', description: 'Subtle shadow for cards' },
    { name: 'Modern Large', class: 'shadow-modern-lg', description: 'Medium shadow for elevated content' },
    { name: 'Modern XL', class: 'shadow-modern-xl', description: 'Large shadow for modals' }
  ];

  return (
    <div className="min-h-screen bg-neutral-8 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="typography-hero text-neutral-1 mb-4">Design System</h1>
          <p className="typography-body-large text-neutral-4 max-w-2xl">
            A comprehensive style guide and component library for the MotorTrend application. 
            Built with atomic design principles and modern design tokens.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-8 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="colors">Colors</TabsTrigger>
            <TabsTrigger value="typography">Typography</TabsTrigger>
            <TabsTrigger value="spacing">Spacing</TabsTrigger>
            <TabsTrigger value="components">Components</TabsTrigger>
            <TabsTrigger value="cards">Cards</TabsTrigger>
            <TabsTrigger value="icons">Icons</TabsTrigger>
            <TabsTrigger value="animations">Animations</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Design Principles</CardTitle>
                <CardDescription>Core principles that guide our design decisions</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <h3 className="typography-title text-neutral-1">Consistency</h3>
                  <p className="typography-body text-neutral-4">
                    Uniform patterns and components across all interfaces
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="typography-title text-neutral-1">Accessibility</h3>
                  <p className="typography-body text-neutral-4">
                    Inclusive design that works for all users
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="typography-title text-neutral-1">Performance</h3>
                  <p className="typography-body text-neutral-4">
                    Optimized components for fast loading and smooth interactions
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Atomic Design Structure</CardTitle>
                <CardDescription>Our component hierarchy follows atomic design principles</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 border border-neutral-6 rounded-lg">
                    <h4 className="typography-title text-neutral-1 mb-2">Atoms</h4>
                    <p className="typography-caption text-neutral-4 mb-3">Basic building blocks</p>
                    <ul className="typography-small text-neutral-4 space-y-1">
                      <li>• Buttons</li>
                      <li>• Icons</li>
                      <li>• Typography</li>
                      <li>• Colors</li>
                    </ul>
                  </div>
                  <div className="p-4 border border-neutral-6 rounded-lg">
                    <h4 className="typography-title text-neutral-1 mb-2">Molecules</h4>
                    <p className="typography-caption text-neutral-4 mb-3">Simple component groups</p>
                    <ul className="typography-small text-neutral-4 space-y-1">
                      <li>• Search Bar</li>
                      <li>• Form Fields</li>
                      <li>• Card Headers</li>
                      <li>• Navigation Items</li>
                    </ul>
                  </div>
                  <div className="p-4 border border-neutral-6 rounded-lg">
                    <h4 className="typography-title text-neutral-1 mb-2">Organisms</h4>
                    <p className="typography-caption text-neutral-4 mb-3">Complex component groups</p>
                    <ul className="typography-small text-neutral-4 space-y-1">
                      <li>• Car Cards</li>
                      <li>• Article Cards</li>
                      <li>• Navigation Bar</li>
                      <li>• Garage Stats</li>
                    </ul>
                  </div>
                  <div className="p-4 border border-neutral-6 rounded-lg">
                    <h4 className="typography-title text-neutral-1 mb-2">Templates</h4>
                    <p className="typography-caption text-neutral-4 mb-3">Page-level layouts</p>
                    <ul className="typography-small text-neutral-4 space-y-1">
                      <li>• Dashboard</li>
                      <li>• Garage</li>
                      <li>• Car Research</li>
                      <li>• Article Pages</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="colors" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Color Palette</CardTitle>
                <CardDescription>Our complete color system with CSS custom properties</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {colorPalette.map((color) => (
                    <div key={color.name} className="space-y-2">
                      <div 
                        className="w-full h-20 rounded-lg border border-neutral-6"
                        style={{ backgroundColor: color.value }}
                      />
                      <div>
                        <p className="typography-caption font-medium text-neutral-1">{color.name}</p>
                        <p className="typography-small text-neutral-4">{color.value}</p>
                        <p className="typography-small text-neutral-4 font-mono">{color.css}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Usage Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="typography-title text-neutral-1 mb-2">Primary Colors</h4>
                    <p className="typography-body text-neutral-4 mb-3">
                      Use for primary actions, brand elements, and key interactive components.
                    </p>
                    <div className="flex gap-2">
                      <Button>Primary Action</Button>
                      <Button variant="outline">Secondary</Button>
                    </div>
                  </div>
                  <div>
                    <h4 className="typography-title text-neutral-1 mb-2">Neutral Colors</h4>
                    <p className="typography-body text-neutral-4 mb-3">
                      Use for text, backgrounds, borders, and subtle UI elements.
                    </p>
                    <div className="space-y-2">
                      <div className="p-3 bg-neutral-7 rounded">Background Light</div>
                      <div className="p-3 bg-neutral-2 text-white rounded">Background Dark</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="typography" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Typography Scale</CardTitle>
                <CardDescription>Responsive typography system with consistent hierarchy</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {fontSizes.map((font) => (
                  <div key={font.name} className="flex items-center gap-6 p-4 border border-neutral-6 rounded-lg">
                    <div className="min-w-32">
                      <p className="typography-caption font-medium text-neutral-1">{font.name}</p>
                      <p className="typography-small text-neutral-4">{font.size}</p>
                      <p className="typography-small text-neutral-4 font-mono">.{font.class}</p>
                    </div>
                    <div className={font.class}>
                      The quick brown fox jumps over the lazy dog
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Font Families</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border border-neutral-6 rounded-lg">
                    <h4 className="typography-title mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      Poppins
                    </h4>
                    <p className="typography-body text-neutral-4 mb-2">
                      Used for headings, titles, and brand elements
                    </p>
                    <p className="typography-small text-neutral-4 font-mono">
                      font-family: 'Poppins', sans-serif
                    </p>
                  </div>
                  <div className="p-4 border border-neutral-6 rounded-lg">
                    <h4 className="typography-title mb-2" style={{ fontFamily: 'Geist, sans-serif' }}>
                      Geist
                    </h4>
                    <p className="typography-body text-neutral-4 mb-2">
                      Used for body text, captions, and UI text
                    </p>
                    <p className="typography-small text-neutral-4 font-mono">
                      font-family: 'Geist', sans-serif
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="spacing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Spacing System</CardTitle>
                <CardDescription>Consistent spacing scale for layout and component spacing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {spacingSystem.map((space) => (
                  <div key={space.name} className="flex items-center gap-6 p-4 border border-neutral-6 rounded-lg">
                    <div className="min-w-32">
                      <p className="typography-caption font-medium text-neutral-1">{space.name}</p>
                      <p className="typography-small text-neutral-4">{space.value}</p>
                      <p className="typography-small text-neutral-4 font-mono">.{space.class}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div 
                        className="bg-blue-200 rounded"
                        style={{ width: space.value, height: '24px' }}
                      />
                      <span className="typography-small text-neutral-4">Visual representation</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Shadow System</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {shadowStyles.map((shadow) => (
                  <div key={shadow.name} className={`p-6 bg-white rounded-lg ${shadow.class}`}>
                    <h4 className="typography-title text-neutral-1 mb-2">{shadow.name}</h4>
                    <p className="typography-caption text-neutral-4 mb-2">{shadow.description}</p>
                    <p className="typography-small text-neutral-4 font-mono">.{shadow.class}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="components" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Form Components</CardTitle>
                <CardDescription>Input fields, selects, and form controls</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="input-demo">Input Field</Label>
                      <Input id="input-demo" placeholder="Enter text here" />
                    </div>
                    <div>
                      <Label htmlFor="textarea-demo">Textarea</Label>
                      <Textarea id="textarea-demo" placeholder="Enter longer text here" />
                    </div>
                    <div>
                      <Label htmlFor="select-demo">Select</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose an option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="option1">Option 1</SelectItem>
                          <SelectItem value="option2">Option 2</SelectItem>
                          <SelectItem value="option3">Option 3</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="checkbox-demo" />
                      <Label htmlFor="checkbox-demo">Checkbox</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="switch-demo" />
                      <Label htmlFor="switch-demo">Switch</Label>
                    </div>
                    <RadioGroup defaultValue="option1">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option1" id="r1" />
                        <Label htmlFor="r1">Radio Option 1</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option2" id="r2" />
                        <Label htmlFor="r2">Radio Option 2</Label>
                      </div>
                    </RadioGroup>
                    <div>
                      <Label>Slider</Label>
                      <Slider defaultValue={[33]} max={100} step={1} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Button Variants</CardTitle>
                <CardDescription>All button styles and states</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Button className="w-full">Primary</Button>
                    <Button variant="secondary" className="w-full">Secondary</Button>
                    <Button variant="outline" className="w-full">Outline</Button>
                    <Button variant="ghost" className="w-full">Ghost</Button>
                  </div>
                  <div className="space-y-2">
                    <Button size="sm" className="w-full">Small</Button>
                    <Button size="default" className="w-full">Default</Button>
                    <Button size="lg" className="w-full">Large</Button>
                    <Button size="icon"><Plus size={16} /></Button>
                  </div>
                  <div className="space-y-2">
                    <Button disabled className="w-full">Disabled</Button>
                    <Button variant="destructive" className="w-full">Destructive</Button>
                    <Button variant="link" className="w-full">Link</Button>
                  </div>
                  <div className="space-y-2">
                    <Button className="w-full">
                      <Download size={16} />
                      With Icon
                    </Button>
                    <Button variant="outline" className="w-full">
                      Loading...
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Feedback Components</CardTitle>
                <CardDescription>Alerts, progress, and status indicators</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertTitle>Information</AlertTitle>
                    <AlertDescription>
                      This is an informational alert message.
                    </AlertDescription>
                  </Alert>
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                      This is an error alert message.
                    </AlertDescription>
                  </Alert>
                </div>
                <div className="space-y-2">
                  <Label>Progress Bar</Label>
                  <Progress value={33} />
                </div>
                <div className="flex gap-2">
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="outline">Outline</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cards" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Content Cards</CardTitle>
                <CardDescription>Card components used throughout the application</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="typography-title text-neutral-1 mb-4">Car Card</h4>
                  <div className="max-w-md">
                    <GarageCarCard car={sampleCarData} type="new" />
                  </div>
                </div>
                <Separator />
                <div>
                  <h4 className="typography-title text-neutral-1 mb-4">Article Card</h4>
                  <div className="max-w-md">
                    <ArticleCard article={sampleArticle} />
                  </div>
                </div>
                <Separator />
                <div>
                  <h4 className="typography-title text-neutral-1 mb-4">Garage Stats</h4>
                  <GarageStats />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Card Anatomy</CardTitle>
                <CardDescription>Structure and components of content cards</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="typography-title text-neutral-1">Card Elements</h4>
                    <ul className="typography-body text-neutral-4 space-y-2">
                      <li>• <strong>Image:</strong> 16:9 aspect ratio, optimized loading</li>
                      <li>• <strong>Title:</strong> Typography-title, line clamp for overflow</li>
                      <li>• <strong>Metadata:</strong> Small text with icons</li>
                      <li>• <strong>Actions:</strong> Save, share, and menu buttons</li>
                      <li>• <strong>Badges:</strong> Status indicators and categories</li>
                      <li>• <strong>Price:</strong> Prominent pricing display</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="typography-title text-neutral-1">Interactive States</h4>
                    <ul className="typography-body text-neutral-4 space-y-2">
                      <li>• <strong>Hover:</strong> Subtle shadow elevation</li>
                      <li>• <strong>Focus:</strong> Keyboard accessibility outline</li>
                      <li>• <strong>Loading:</strong> Skeleton states</li>
                      <li>• <strong>Saved:</strong> Visual indication of saved state</li>
                      <li>• <strong>Error:</strong> Fallback images and states</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="icons" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Icon Library</CardTitle>
                <CardDescription>Lucide React icons used throughout the application</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-4">
                  {[
                    Car, Bookmark, Share2, Star, Eye, Clock, MapPin, Play,
                    ChevronRight, Search, Filter, Grid, List, Heart, User, Settings,
                    Home, Calendar, Mail, Phone, Download, Upload, Edit, Trash2,
                    Plus, Minus, X, Check, AlertCircle, Info, CheckCircle, XCircle
                  ].map((Icon, index) => (
                    <div key={index} className="flex flex-col items-center p-3 border border-neutral-6 rounded-lg hover:bg-neutral-7 transition-colors">
                      <Icon size={24} className="text-neutral-2 mb-2" />
                      <span className="typography-small text-neutral-4 text-center">
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
          </TabsContent>

          <TabsContent value="animations" className="space-y-6">
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DesignSystem;
