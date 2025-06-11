import React from 'react';
import { HandshakeIcon, MessageSquare, DollarSign, Car } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import MainLayout from '@/components/layout/MainLayout';

const Feature = ({ 
  number, 
  title, 
  description, 
  icon: Icon 
}: { 
  number: number; 
  title: string; 
  description: string; 
  icon: React.ElementType;
}) => (
  <div className="flex items-start gap-4 p-6">
    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-motortrend-red text-white flex items-center justify-center font-bold text-xl">
      {number}
    </div>
    <div className="flex-1">
      <div className="flex items-center gap-2 mb-1">
        <Icon className="w-5 h-5 text-motortrend-red" />
        <h3 className="font-bold text-lg text-neutral-1">{title}</h3>
      </div>
      <p className="text-neutral-2">{description}</p>
    </div>
  </div>
);

const InstantDealerChat = () => {
  return (
    <MainLayout>
      <div className="min-h-screen bg-neutral-50 py-12">
        <div className="max-w-[980px] mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <HandshakeIcon className="w-12 h-12 text-motortrend-red" strokeWidth={1.5} />
                <h1 className="text-3xl font-bold text-neutral-1">
                  HOW INSTANT DEALER CHAT SOLVES THESE PROBLEMS
                </h1>
              </div>
              <p className="text-lg text-neutral-2 mb-8">
                Get the best deal on your next car with our instant dealer chat service. 
                No hassle, no pressure - just straightforward pricing and easy communication.
              </p>
              <Button 
                size="lg"
                className="bg-motortrend-red hover:bg-motortrend-red/90 text-white px-8"
              >
                Start Chat Now
              </Button>
            </div>

            <Card className="divide-y">
              <Feature 
                number={1}
                title="Get Real Pricing Instantly"
                description="No waiting, no unnecessary forms."
                icon={DollarSign}
              />
              <Feature 
                number={2}
                title="Chat with Dealers on Your Terms"
                description="Engage when you're ready without spam or pressure."
                icon={MessageSquare}
              />
              <Feature 
                number={3}
                title="Negotiate with Transparency"
                description="Upfront, out-the-door pricing without back-and-forth games."
                icon={HandshakeIcon}
              />
              <Feature 
                number={4}
                title="No Dealership Visits Required"
                description="Complete the process from anywhere, saving time and effort."
                icon={Car}
              />
            </Card>
          </div>

          {/* Additional Content Section */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6">
              <h3 className="font-bold text-lg text-neutral-1 mb-3">
                Average Savings
              </h3>
              <div className="text-3xl font-bold text-motortrend-red mb-2">$3,500</div>
              <p className="text-neutral-2">
                Average customer savings off MSRP through our instant chat service
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="font-bold text-lg text-neutral-1 mb-3">
                Response Time
              </h3>
              <div className="text-3xl font-bold text-motortrend-red mb-2">&lt; 5 min</div>
              <p className="text-neutral-2">
                Average dealer response time during business hours
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="font-bold text-lg text-neutral-1 mb-3">
                Customer Satisfaction
              </h3>
              <div className="text-3xl font-bold text-motortrend-red mb-2">96%</div>
              <p className="text-neutral-2">
                Of customers recommend our instant chat service
              </p>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default InstantDealerChat;
