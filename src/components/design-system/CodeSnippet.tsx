import React, { useState } from 'react';
import { Check, Copy, Code, Terminal } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

interface CodeSnippetProps {
  code: string;
  language: string;
  showLineNumbers?: boolean;
  caption?: string;
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({ 
  code,
  language,
  showLineNumbers = true,
  caption
}) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  // Add line numbers to code
  const formatCodeWithLineNumbers = (code: string) => {
    if (!code) return '';
    if (!showLineNumbers) return code;
    
    return code.split('\n').map((line, i) => (
      <div key={i} className="table-row">
        <span className="table-cell pr-4 text-right select-none text-neutral-5 text-xs">{i + 1}</span>
        <span className="table-cell">{line || ' '}</span>
      </div>
    ));
  };

  return (
    <div className="relative">
      {caption && (
        <div className="mb-2 text-sm text-color-neutral-4">{caption}</div>
      )}
      <div className="rounded-lg border border-color-neutral-6 bg-color-neutral-8 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 border-b border-color-neutral-6">
          <div className="flex items-center text-xs">
            <Code className="h-3 w-3 mr-1" />
            <span>{language}</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={copyToClipboard}
          >
            {copied ? (
              <Check className="h-3 w-3" />
            ) : (
              <Copy className="h-3 w-3" />
            )}
          </Button>
        </div>
        <pre className="p-4 overflow-x-auto">
          <code className="text-sm">
            {formatCodeWithLineNumbers(code)}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default CodeSnippet;
