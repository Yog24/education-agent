"use client";

import React, { useEffect } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { ChatArea } from '@/components/chat/ChatArea';
import { InputArea } from '@/components/chat/InputArea';
import { AgentGrid } from '@/components/agents/AgentGrid';
import { useAgentStore } from '@/store/useAgentStore';
import { useChat } from '@/hooks/useChat';
import { DataAnalysisModule } from '@/components/modules/DataAnalysisModule';
import { Bot, Sparkles } from 'lucide-react';

export default function Home() {
  const { selectedAgent, messages, setSelectedAgent } = useAgentStore();
  const { sendMessage, isLoading } = useChat();

  // Optional: Reset state on mount?
  // useEffect(() => {
  //   // setSelectedAgent(MOCK_AGENTS[0]);
  // }, []);

  const hasMessages = messages.length > 0;

  return (
    <MainLayout>
      {/* Header / Top Bar */}
      <div className="h-14 px-6 border-b border-white/40 flex items-center justify-between bg-white/30 backdrop-blur-sm z-10">
        <div className="flex items-center gap-2">
           {selectedAgent ? (
             <>
              <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${selectedAgent.gradient}`} />
              <span className="font-semibold text-gray-700">{selectedAgent.name}</span>
              <span className="text-xs text-gray-400 px-2 py-0.5 bg-white/50 rounded-full border border-white/60">智能体</span>
             </>
           ) : (
             <span className="font-semibold text-gray-700">请选择智能体</span>
           )}
        </div>
        <div className="text-xs text-gray-400 flex items-center gap-1">
           <Sparkles size={12} />
           <span>湖畔小学·教研大模型 | 继续提问</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        
        {/* Chat Area - Takes available space */}
        <div className="flex-1 overflow-hidden flex flex-col">
           {/* Special Handling for Data Analysis Module */}
           {selectedAgent?.id === 'data_analysis' ? (
             <div className="flex-1 h-full overflow-hidden animate-in fade-in duration-300">
                <DataAnalysisModule />
             </div>
           ) : hasMessages || isLoading ? (
             <ChatArea messages={messages} isLoading={isLoading} />
           ) : (
             <div className="flex-1 flex items-center justify-center p-8 text-center text-gray-500">
                {/* Placeholder content if needed, or just empty space for the grid to shine */}
             </div>
           )}
        </div>

        {/* Bottom Section: Grid + Input */}
        {/* Hide Input Area for Data Analysis Module */}
        <div className="z-20 bg-gradient-to-t from-white/80 to-transparent">
          
           {/* Show Agent Grid only if no messages AND not in data analysis mode (unless we want to allow switching back) */}
           {!hasMessages && selectedAgent?.id !== 'data_analysis' && (
             <div className="absolute inset-0 top-0 bottom-20 z-0 overflow-y-auto animate-in fade-in duration-500">
               <AgentGrid />
             </div>
           )}

           {/* Input Area - Hide for Data Analysis */}
           {selectedAgent?.id !== 'data_analysis' && (
             <div className="relative z-10 pb-4">
                <InputArea 
                  onSend={sendMessage} 
                  disabled={isLoading}
                  placeholder={selectedAgent ? `与 ${selectedAgent.name} 对话...` : "输入消息..."}
                />
             </div>
           )}
        </div>

      </div>
    </MainLayout>
  );
}

