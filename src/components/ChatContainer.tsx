import React, { useState, useEffect, useRef } from 'react';
import { generateChatResponse } from '../services/mockData';
import ChatMessage from './ChatMessage';

interface Message {
  text: string;
  isUser: boolean;
  timestamp: string;
}

const ChatContainer: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Add user message
    const userMessage: Message = {
      text: inputValue,
      isUser: true,
      timestamp: currentTime,
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Get chatbot response
    const responseText = generateChatResponse(inputValue);
    
    const botMessage: Message = {
      text: responseText,
      isUser: false,
      timestamp: currentTime,
    };
    
    setTimeout(() => {
      setMessages(prev => [...prev, botMessage]);
    }, 500);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            message={message.text}
            isUser={message.isUser}
            timestamp={message.timestamp}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask me about cars..."
            className="flex-1 rounded-full border border-gray-300 px-4 py-2 focus:border-motortrend-red focus:outline-none focus:ring-1 focus:ring-motortrend-red"
          />
          <button
            type="submit"
            className="rounded-full bg-motortrend-red px-6 py-2 text-white hover:bg-motortrend-red/90 focus:outline-none focus:ring-2 focus:ring-motortrend-red focus:ring-offset-2"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatContainer;
