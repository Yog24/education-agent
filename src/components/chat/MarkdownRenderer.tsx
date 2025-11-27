import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export const MarkdownRenderer = ({ content, className }: MarkdownRendererProps) => {
  // react-markdown v9+ does not support className prop directly on the component.
  // We need to wrap it in a div to apply classes.
  return (
    <div className={`prose prose-sm max-w-none break-words ${className || ''}`}>
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
          a: ({node, ...props}) => <a className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer" {...props} />,
          ul: ({node, ...props}) => <ul className="list-disc list-inside mb-2" {...props} />,
          ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-2" {...props} />,
          li: ({node, ...props}) => <li className="mb-1" {...props} />,
          code: ({node, ...props}) => {
             const { inline, className, children } = props as any;
             if (inline) {
                 return <code className="bg-gray-100 text-red-500 rounded px-1 py-0.5 text-xs font-mono" {...props} />;
             }
             return (
               <div className="bg-gray-800 text-gray-100 rounded-lg p-3 my-2 overflow-x-auto text-xs font-mono">
                  <code {...props} />
               </div>
             );
          },
          table: ({node, ...props}) => <table className="min-w-full divide-y divide-gray-200 my-2 border border-gray-200" {...props} />,
          th: ({node, ...props}) => <th className="px-3 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b" {...props} />,
          td: ({node, ...props}) => <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500 border-b" {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
