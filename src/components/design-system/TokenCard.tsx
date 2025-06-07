import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Copy } from 'lucide-react';

interface TokenCardProps {
  title: string;
  description: string;
  tokens: {
    name: string;
    value: string;
    description?: string;
    preview?: React.ReactNode;
  }[];
}

const TokenCard: React.FC<TokenCardProps> = ({ title, description, tokens }) => {
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const copyToClipboard = async (token: string) => {
    try {
      await navigator.clipboard.writeText(token);
      setCopiedToken(token);
      setTimeout(() => setCopiedToken(null), 2000);
    } catch (err) {
      console.error('Failed to copy token:', err);
    }
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tokens.map((token) => (
            <div
              key={token.name}
              className="p-4 rounded-xl border border-neutral-6 bg-neutral-8 hover:border-neutral-5 transition-all duration-200"
            >
              <div className="flex items-start justify-between gap-4 mb-2">
                <div className="flex-1">
                  <div className="font-mono text-sm text-neutral-1 mb-1">
                    {token.name}
                  </div>
                  <div className="font-mono text-xs text-neutral-4">
                    {token.value}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="shrink-0"
                  onClick={() => copyToClipboard(token.value)}
                >
                  {copiedToken === token.value ? (
                    <Check className="h-4 w-4 text-success" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {token.preview && (
                <div className="mt-4 p-2 rounded-lg bg-white shadow-sm">
                  {token.preview}
                </div>
              )}
              {token.description && (
                <p className="mt-2 text-xs text-neutral-4">{token.description}</p>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TokenCard;
