import React from 'react';
import { Message } from '@/types';
import { cn } from '@/lib/utils';
import { Typewriter } from './Typewriter';
import { MarkdownRenderer } from './MarkdownRenderer';

interface MessageBubbleProps {
  message: Message;
  animate?: boolean;
}

export const MessageBubble = ({ message, animate = false }: MessageBubbleProps) => {
  const isUser = message.role === 'user';

  // If user, just show text. If assistant, use Markdown.
  // For animation: Typewriter outputs raw text string incrementally. 
  // We need to feed that string into MarkdownRenderer.
  // However, rendering partial markdown can sometimes look glitchy (e.g. unclosed bold tags).
  // But usually it's acceptable. Let's try wrapping Typewriter to render Markdown.

  return (
    <div className={cn(
      "flex w-full mb-4",
      isUser ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
        "max-w-[80%] rounded-2xl px-5 py-3 text-sm leading-relaxed shadow-sm",
        isUser 
          ? "bg-purple-600 text-white rounded-tr-none" 
          : "bg-white text-gray-800 border border-gray-100 rounded-tl-none"
      )}>
        {isUser ? (
            message.content
        ) : animate ? (
            <Typewriter 
                text={message.content} 
                speed={20} 
                // Custom renderer for the typed text
                render={(text) => <MarkdownRenderer content={text} />}
            />
        ) : (
            <MarkdownRenderer content={message.content} />
        )}
      </div>
    </div>
  );
};
