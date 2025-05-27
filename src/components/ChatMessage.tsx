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
            MT
          </div>
        )}
        <div
          className={`rounded-2xl px-3 py-2 sm:px-4 sm:py-2.5 ${
            isUser
              ? "bg-motortrend-dark text-white"
              : "bg-motortrend-gray text-motortrend-text"
          }`}
        >
          {!isUser && processedMessageHtml ? (
            <p
              className="text-sm sm:text-base font-normal text-left break-words"
              dangerouslySetInnerHTML={{ __html: processedMessageHtml }}
            />
          ) : (
            <p className="text-sm sm:text-base font-normal text-left break-words">
              {message}
            </p>
          )}
          {timestamp && (
            <p className="mt-1 text-xs opacity-70">{timestamp}</p>
          )}
        </div>
        {isUser && (
          <div className="ml-2 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-300 text-gray-600">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="sm:w-[18px] sm:h-[18px]"
            >
              <path
                d="M20 21C20 18.2386 16.4183 16 12 16C7.58172 16 4 18.2386 4 21M12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8C17 10.7614 14.7614 13 12 13Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;