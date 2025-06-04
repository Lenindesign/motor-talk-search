import React from 'react';
import ChatContainer from '../components/ChatContainer';

const Chat: React.FC = () => {
  return (
    <div className="flex h-[calc(100vh-64px)] flex-col bg-white">
      <div className="border-b border-gray-200 px-4 py-3">
        <h1 className="text-xl font-semibold text-motortrend-text">Motor Talk Assistant</h1>
        <p className="text-sm text-gray-500">Ask me anything about cars</p>
      </div>
      <div className="flex-1 overflow-hidden">
        <ChatContainer />
      </div>
    </div>
  );
};

export default Chat;
