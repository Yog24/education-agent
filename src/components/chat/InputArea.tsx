import React, { useState, KeyboardEvent } from 'react';
import { Send, Mic, Image as ImageIcon } from 'lucide-react';

interface InputAreaProps {
  onSend: (content: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export const InputArea = ({ onSend, disabled, placeholder = "输入消息..." }: InputAreaProps) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-full bg-white/80 backdrop-blur-md border-t border-white/40 p-4">
      <div className="max-w-4xl mx-auto relative bg-white border border-purple-100 rounded-2xl shadow-sm transition-all">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          rows={1} 
          className="w-full py-3 pl-4 pr-12 bg-transparent border-none resize-none outline-none focus:ring-0 text-gray-700 placeholder:text-gray-400 min-h-[50px] max-h-[200px]"
          style={{ minHeight: '50px' }}
        />
        <div className="absolute right-2 bottom-2 flex items-center gap-1">
             <button className="p-2 text-gray-400 hover:text-purple-600 transition-colors">
                <ImageIcon size={18} />
             </button>
             <button className="p-2 text-gray-400 hover:text-purple-600 transition-colors">
                <Mic size={18} />
             </button>
            <button 
                onClick={handleSend}
                disabled={!input.trim() || disabled}
                className="p-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
                <Send size={18} />
            </button>
        </div>
      </div>
      <div className="text-center text-xs text-gray-400 mt-2">
        由湖畔小学·教研大模型生成，内容仅供参考
      </div>
    </div>
  );
};
