import React from "react";
interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp?: string;
}
const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  isUser,
  timestamp
}) => {
  return <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 animate-fade-in`}>
      <div className="flex max-w-[80%]">
        {!isUser && <div className="mr-2 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-motortrend-red text-white">
            MT
          </div>}
        <div className={`rounded-2xl px-4 py-2 ${isUser ? 'bg-motortrend-dark text-white' : 'bg-motortrend-gray text-motortrend-text'}`}>
          <p className="text-base font-normal text-left">{message}</p>
          {timestamp && <p className="mt-1 text-xs opacity-70">{timestamp}</p>}
        </div>
        {isUser && <div className="ml-2 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-300 text-gray-600">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 21C20 18.2386 16.4183 16 12 16C7.58172 16 4 18.2386 4 21M12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8C17 10.7614 14.7614 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>}
      </div>
    </div>;
};
export default ChatMessage;