import React, { useState } from 'react';
import { Check, Copy, Code, Terminal } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

interface CodeSnippetProps {
  jsx?: string;
  tsx?: string;
  css?: string;
  tailwind?: string;
  showLineNumbers?: boolean;
  caption?: string;
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({ 
  jsx, 
  tsx, 
  css, 
  tailwind,
  showLineNumbers = true,
  caption
}) => {
  const [copied, setCopied] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>(() => {
    if (tsx) return 'tsx';
    if (jsx) return 'jsx';
    if (tailwind) return 'tailwind';
    if (css) return 'css';
    return 'tsx';
  });

  // Filter to only show tabs that have content
  const availableTabs = [
    { id: 'tsx', label: 'TypeScript', content: tsx, icon: <Code className="h-3 w-3" /> },
    { id: 'jsx', label: 'JSX', content: jsx, icon: <Code className="h-3 w-3" /> },
    { id: 'tailwind', label: 'Tailwind', content: tailwind, icon: <Code className="h-3 w-3" /> },
    { id: 'css', label: 'CSS', content: css, icon: <Terminal className="h-3 w-3" /> }
  ].filter(tab => tab.content);

  const copyToClipboard = (content: string, id: string) => {
    navigator.clipboard.writeText(content);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
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
    <div className="rounded-md overflow-hidden border border-neutral-6">
      {availableTabs.length > 1 && (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-6 bg-neutral-7">
            <TabsList className="h-8 p-1">
              {availableTabs.map(tab => (
                <TabsTrigger 
                  key={tab.id} 
                  value={tab.id}
                  className="text-xs flex items-center gap-1 h-6 px-2"
                >
                  {tab.icon}
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0"
              onClick={() => {
                const tab = availableTabs.find(t => t.id === activeTab);
                if (tab?.content) copyToClipboard(tab.content, tab.id);
              }}
            >
              {copied === activeTab ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4 text-neutral-5 hover:text-neutral-1" />
              )}
            </Button>
          </div>

          {availableTabs.map(tab => (
            <TabsContent key={tab.id} value={tab.id} className="m-0 p-0">
              <pre className="p-4 text-sm overflow-x-auto bg-neutral-8">
                {showLineNumbers ? (
                  <div className="table">{formatCodeWithLineNumbers(tab.content || '')}</div>
                ) : (
                  tab.content
                )}
              </pre>
            </TabsContent>
          ))}
        </Tabs>
      )}

      {availableTabs.length === 1 && (
        <>
          <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-6 bg-neutral-7">
            <div className="flex items-center gap-1 text-xs text-neutral-4">
              {availableTabs[0].icon}
              {availableTabs[0].label}
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0"
              onClick={() => {
                if (availableTabs[0].content) {
                  copyToClipboard(availableTabs[0].content, availableTabs[0].id);
                }
              }}
            >
              {copied === availableTabs[0].id ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4 text-neutral-5 hover:text-neutral-1" />
              )}
            </Button>
          </div>
          <pre className="p-4 text-sm overflow-x-auto bg-neutral-8">
            {showLineNumbers ? (
              <div className="table">{formatCodeWithLineNumbers(availableTabs[0].content || '')}</div>
            ) : (
              availableTabs[0].content
            )}
          </pre>
        </>
      )}

      {caption && (
        <div className="px-4 py-2 border-t border-neutral-6 bg-neutral-7">
          <p className="text-xs text-neutral-4">{caption}</p>
        </div>
      )}
    </div>
  );
};

export default CodeSnippet;
