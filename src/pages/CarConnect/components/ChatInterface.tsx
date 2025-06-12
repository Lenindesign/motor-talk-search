import React, { useState, useRef, useEffect } from 'react';
import { Send, Image, Paperclip, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dealer, Message } from '../types';
import { cn } from '@/lib/utils';

interface ChatInterfaceProps {
  dealer: Dealer;
  messages?: Message[];
}

const ChatInterface = ({ dealer, messages: initialMessages = [] }: ChatInterfaceProps) => {
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>(initialMessages || []);
  const [inputValue, setInputValue] = useState('');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: String(Date.now()),
      content: inputValue,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate dealer response
    setTimeout(() => {
      const dealerMessage: Message = {
        id: String(Date.now() + 1),
        content: 'Thank you for your message. I will check the availability and get back to you shortly.',
        sender: 'dealer',
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, dealerMessage]);
      setIsTyping(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg border border-gray-200 overflow-hidden">
      {dealer && (
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100">
                <img 
                  src={dealer.image} 
                  alt={dealer.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="font-semibold text-base flex items-center">
                  {dealer.name}
                  {dealer.verified && (
                    <svg className="w-4 h-4 ml-1.5 text-motortrend-red" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                  )}
                </h2>
                <div className="flex items-center text-sm">
                  <Star className="w-4 h-4 text-motortrend-red mr-1" />
                  <span className="font-medium">{dealer.rating.toFixed(1)}</span>
                  <span className="text-gray-400 mx-1">·</span>
                  <span className="text-gray-600">{dealer.distance}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              'flex gap-2',
              message.sender === 'user' ? 'justify-end' : 'justify-start items-end'
            )}
          >
            {message.sender === 'dealer' && (
              <div className="w-6 h-6 rounded overflow-hidden flex-shrink-0">
                <img 
                  src={dealer?.image} 
                  alt={dealer?.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div
              className={cn(
                'max-w-[70%] rounded-2xl px-4 py-2',
                message.sender === 'user'
                  ? 'bg-motortrend-red text-white rounded-tr-sm'
                  : 'bg-gray-100 text-gray-900 rounded-tl-sm'
              )}
            >
              <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
              <div className={cn(
                'text-[10px] mt-1',
                message.sender === 'user' ? 'text-white/70' : 'text-gray-500'
              )}>
                {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex items-end gap-2">
            <div className="w-6 h-6 rounded overflow-hidden">
              <img 
                src={dealer?.image} 
                alt={dealer?.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-2">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area - sticky at bottom */}
      <div className="p-4 border-t border-gray-200 bg-white sticky bottom-0 z-10">
        <div className="grid grid-cols-2 gap-2 mb-4">
          <Button
            variant="outline"
            className="text-sm h-9"
            onClick={() => setInputValue('I would like to schedule a test drive')}
          >
            Schedule Test Drive
          </Button>
          <Button
            variant="outline"
            className="text-sm h-9"
            onClick={() => setInputValue('What is your best price?')}
          >
            Get Price Quote
          </Button>
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="Type a message..."
            className="flex-1"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <Button size="icon" variant="ghost">
            <Image className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="ghost">
            <Paperclip className="h-4 w-4" />
          </Button>
          <Button onClick={handleSend} disabled={!inputValue.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
