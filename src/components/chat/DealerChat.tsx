import React, { useState } from 'react';
import { Send, Paperclip, Image as ImageIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'dealer';
  timestamp: Date;
}

interface DealerInfo {
  name: string;
  dealership: string;
  avatar: string;
}

interface DealerChatProps {
  dealer: DealerInfo;
  carDetails: {
    make: string;
    model: string;
    year: number;
    trim: string;
    msrp: number;
  };
}

const DealerChat: React.FC<DealerChatProps> = ({ dealer, carDetails }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Hi! I'm ${dealer.name} from ${dealer.dealership}. I see you're interested in the ${carDetails.year} ${carDetails.make} ${carDetails.model} ${carDetails.trim}. How can I help you today?`,
      sender: 'dealer',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');

    // Simulate dealer response after 2 seconds
    setTimeout(() => {
      const dealerResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "I can offer you a great deal on this model. The MSRP is $" + 
              carDetails.msrp.toLocaleString() + 
              ", but I can offer it to you for $" + 
              Math.floor(carDetails.msrp * 0.92).toLocaleString() + 
              " out the door. Would you like to know more about the available options?",
        sender: 'dealer',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, dealerResponse]);
    }, 2000);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      {/* Chat Header */}
      <div className="p-4 border-b bg-white rounded-t-xl">
        <div className="flex items-center gap-3">
          <Avatar className="w-12 h-12">
            <AvatarImage src={dealer.avatar} />
            <AvatarFallback>{dealer.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-neutral-1">{dealer.name}</h3>
            <p className="text-sm text-neutral-2">{dealer.dealership}</p>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="h-[400px] overflow-y-auto p-4 space-y-4 bg-neutral-50">
        {messages.map(message => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl p-3 ${
                message.sender === 'user'
                  ? 'bg-motortrend-red text-white'
                  : 'bg-white border'
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <div
                className={`text-xs mt-1 ${
                  message.sender === 'user' ? 'text-white/80' : 'text-neutral-3'
                }`}
              >
                {message.timestamp.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Input */}
      <div className="p-4 border-t bg-white rounded-b-xl">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-neutral-3 hover:text-neutral-1"
          >
            <Paperclip className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-neutral-3 hover:text-neutral-1"
          >
            <ImageIcon className="w-5 h-5" />
          </Button>
          <Input
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button
            onClick={handleSend}
            className="bg-motortrend-red hover:bg-motortrend-red/90"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default DealerChat;
