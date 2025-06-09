
import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface CodeSnippetProps {
  code?: string;
  tsx?: string;
  language?: string;
  title?: string;
  className?: string;
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({ 
  code, 
  tsx, 
  language = 'typescript', 
  title,
  className = '' 
}) => {
  const [copied, setCopied] = useState(false);
  
  // Use tsx prop if provided, otherwise fall back to code prop
  const codeContent = tsx || code || '';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className={`relative bg-gray-900 rounded-lg overflow-hidden ${className}`}>
      {title && (
        <div className="bg-gray-800 px-4 py-2 text-sm text-gray-300 border-b border-gray-700">
          {title}
        </div>
      )}
      <div className="relative">
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 text-gray-400 hover:text-white z-10"
          onClick={handleCopy}
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        </Button>
        <pre className="p-4 text-sm text-gray-300 overflow-x-auto">
          <code className={`language-${language}`}>
            {codeContent}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default CodeSnippet;
