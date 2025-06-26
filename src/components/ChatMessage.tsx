import React from "react";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp?: string;
}

// Helper function to convert markdown links to HTML anchor tags
const parseMarkdownLinks = (text: string): string => {
  const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  // Replace markdown links with HTML <a> tags
  // Links will open in a new tab and have specific styling
  return text.replace(
    markdownLinkRegex,
    '<a href="$2" class="text-motortrend-red hover:underline" target="_blank" rel="noopener noreferrer">$1</a>'
  );
};

const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  isUser,
  timestamp,
}) => {
  // Only parse links for messages from the bot
  const processedMessageHtml = !isUser ? parseMarkdownLinks(message) : null;

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      } mb-4 animate-fade-in`}
    >
      <div className={`flex max-w-[90%] sm:max-w-[80%]`}>
        {!isUser && (
          <div className="mr-2 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-motortrend-red text-white">
            <img 
              src="https://d2kde5ohu8qb21.cloudfront.net/files/68477633dcb7490008110dd5/mt-logo.svg" 
              alt="MT Logo" 
              className="w-4 h-4 brightness-0 invert"
            />
          </div>
        )}
        <div
          className={`rounded-2xl px-3 py-2 sm:px-4 sm:py-2.5 ${
            isUser
              ? "bg-motortrend-dark text-white !important"
              : "bg-motortrend-gray text-motortrend-text"
          }`}
        >
          {!isUser && processedMessageHtml ? (
            <p
              className="typography-caption sm:typography-body text-left break-words"
              dangerouslySetInnerHTML={{ __html: processedMessageHtml }}
            />
          ) : (
            <p className={`typography-caption sm:typography-body text-left break-words ${isUser ? '!text-white' : 'text-motortrend-text'}`}>
              {message}
            </p>
          )}
          {timestamp && (
            <p className={`mt-1 typography-caption-small ${isUser ? '!text-white/70' : 'text-neutral-4'}`}>
              {timestamp}
            </p>
          )}
        </div>
        {isUser && (
          <div className="ml-2 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full overflow-hidden">
            <img 
              src="https://d2kde5ohu8qb21.cloudfront.net/files/684f12307a225e0008ee0727/greg-profile.jpg" 
              alt="User" 
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;

<iframe height="1950px" width="100%" style={{ border: '0px' }} src="https://www.intelliprice.com/intellipricedealer/start.htm?dealerid=0441004"></iframe>