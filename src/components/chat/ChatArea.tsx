import React, { useEffect, useRef } from 'react';
import { Message } from '@/types';
import { MessageBubble } from './MessageBubble';
import { Loader2 } from 'lucide-react';

interface ChatAreaProps {
  messages: Message[];
  isLoading?: boolean;
}

export const ChatArea = ({ messages, isLoading }: ChatAreaProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto scroll when messages change or loading state changes
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  if (messages.length === 0 && !isLoading) {
    return null;
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
        <div className="max-w-4xl mx-auto w-full">
            {messages.map((msg, index) => {
                // Animate only the last message if it's from assistant and we are NOT loading (meaning it just arrived)
                // Actually, if we just finished loading, the last message is the new AI response.
                // We want to animate it. But if we reload the page, we don't want to re-animate history.
                // For this prototype, animating the last message if it's AI is acceptable behavior.
                const isLast = index === messages.length - 1;
                return (
                    <MessageBubble 
                        key={msg.id} 
                        message={msg} 
                        animate={isLast && msg.role === 'assistant'} 
                    />
                );
            })}
            
            {/* Thinking Indicator */}
            {isLoading && (
                <div className="flex w-full mb-4 justify-start animate-pulse">
                  <div className="max-w-[80%] rounded-2xl px-5 py-3 text-sm leading-relaxed shadow-sm bg-white text-gray-500 border border-gray-100 rounded-tl-none flex items-center gap-2">
                     <Loader2 className="animate-spin" size={14} />
                     <span>模型正在思考中...</span>
                  </div>
                </div>
            )}

            <div ref={bottomRef} />
        </div>
    </div>
  );
};
