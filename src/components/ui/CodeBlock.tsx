'use client';

import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';
import { clsx } from 'clsx';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  allowCopy?: boolean;
  maxHeight?: string;
}

export function CodeBlock({ 
  code, 
  language = 'typescript', 
  title, 
  allowCopy = true,
  maxHeight = '400px'
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-void-black border border-fog-gray rounded-lg overflow-hidden">
      {(title || allowCopy) && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-fog-gray bg-shadow-gray/50">
          {title && (
            <span className="text-sm font-medium text-ghost-white">{title}</span>
          )}
          {allowCopy && (
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-3 py-1 text-xs text-spirit-gray hover:text-ghost-white transition-colors rounded hover:bg-mist-gray"
              aria-label="Copy code"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy</span>
                </>
              )}
            </button>
          )}
        </div>
      )}
      <div className={clsx('overflow-x-auto')} style={{ maxHeight }}>
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: '1rem',
            background: 'transparent',
            fontSize: '0.875rem',
          }}
          codeTagProps={{
            style: {
              fontFamily: 'JetBrains Mono, Fira Code, monospace',
            }
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
