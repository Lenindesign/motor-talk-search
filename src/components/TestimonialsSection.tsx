import React from 'react';
import { Card } from './ui/card';

interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  text: string;
  rating?: number;
}

interface TestimonialsSectionProps {
  testimonials?: Testimonial[];
  title?: string;
  subtitle?: string;
}

const defaultTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    avatar: '/api/placeholder/48/48',
    text: 'Motor Talk has been incredibly helpful in my car buying journey. The detailed reviews and comparisons made my decision so much easier.',
    rating: 5
  },
  {
    id: '2',
    name: 'Mike Chen',
    avatar: '/api/placeholder/48/48',
    text: 'I love the community aspect of Motor Talk. Getting real advice from actual car owners has saved me thousands of dollars.',
    rating: 5
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    avatar: '/api/placeholder/48/48',
    text: 'The garage feature is amazing! I can track all my cars and maintenance in one place. Highly recommend to any car enthusiast.',
    rating: 5
  },
  {
    id: '4',
    name: 'David Thompson',
    avatar: '/api/placeholder/48/48',
    text: 'Motor Talk\'s pricing tools helped me negotiate a better deal on my new car. The market insights are incredibly accurate.',
    rating: 5
  },
  {
    id: '5',
    name: 'Lisa Park',
    avatar: '/api/placeholder/48/48',
    text: 'As a first-time car buyer, Motor Talk guided me through every step. The educational content is top-notch.',
    rating: 5
  },
  {
    id: '6',
    name: 'James Wilson',
    avatar: '/api/placeholder/48/48',
    text: 'The video reviews and comparisons on Motor Talk are the best I\'ve found. They really know their stuff about cars.',
    rating: 5
  }
];

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  testimonials = defaultTestimonials,
  title = "What Our Community Says",
  subtitle = "Real experiences from real car enthusiasts"
}) => {
  const renderStars = (rating: number = 5) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="p-6 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow duration-200">
              {/* Rating */}
              <div className="flex items-center mb-4">
                {renderStars(testimonial.rating)}
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                "{testimonial.text}"
              </blockquote>

              {/* User Info */}
              <div className="flex items-center">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=dc2626&color=fff&size=48`;
                  }}
                />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Motor Talk Member
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Join thousands of car enthusiasts who trust Motor Talk
          </p>
          <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
            Join Our Community
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection; 