import React from 'react';
import { MessageSquarePlus, Search, User, MoreHorizontal, Sidebar as SidebarIcon, MessageSquare } from 'lucide-react';
import { useAgentStore } from '@/store/useAgentStore';
import { cn } from '@/lib/utils';

export const Sidebar = () => {
  const { 
    isSidebarOpen, 
    toggleSidebar, 
    sessions, 
    currentSessionId, 
    selectSession, 
    createSession 
  } = useAgentStore();

  if (!isSidebarOpen) {
    return (
      <div className="w-16 h-full bg-white/50 border-r border-white/40 backdrop-blur-xl flex flex-col items-center py-4 transition-all duration-300">
         <button onClick={toggleSidebar} className="text-gray-400 hover:text-gray-600 p-2">
            <SidebarIcon size={20} />
         </button>
         <button 
            onClick={() => createSession()}
            className="mt-4 w-10 h-10 bg-purple-600 hover:bg-purple-700 text-white rounded-full flex items-center justify-center shadow-lg shadow-purple-200"
         >
             <MessageSquarePlus size={18} />
         </button>
      </div>
    );
  }

  return (
    <div className="w-64 bg-white/50 h-full flex flex-col border-r border-white/40 backdrop-blur-xl transition-all duration-300">
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-2 font-semibold text-purple-700">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center text-white">
            🤖
          </div>
          <span className="truncate text-sm">湖畔小学 · 教研大模型</span>
        </div>
        <button onClick={toggleSidebar} className="text-gray-400 hover:text-gray-600">
          <SidebarIcon size={20} />
        </button>
      </div>

      {/* New Chat Button */}
      <div className="px-4 pb-4">
        <button 
          onClick={() => createSession()}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-full py-2.5 px-4 flex items-center justify-center gap-2 transition-colors shadow-lg shadow-purple-200"
        >
          <MessageSquarePlus size={18} />
          <span>开始对话</span>
        </button>
      </div>

      {/* History List */}
      <div className="flex-1 overflow-y-auto px-2 py-2">
        {sessions.length > 0 ? (
          <>
            <div className="text-xs font-medium text-gray-400 px-2 mb-2">历史记录</div>
            {sessions.map((session) => (
              <div 
                key={session.id}
                onClick={() => selectSession(session.id)}
                className={cn(
                  "group flex items-center gap-3 px-3 py-2 text-sm rounded-lg cursor-pointer transition-colors mb-1",
                  currentSessionId === session.id 
                    ? "bg-white/80 text-purple-700 shadow-sm" 
                    : "text-gray-700 hover:bg-white/60"
                )}
              >
                <MessageSquare size={16} className={currentSessionId === session.id ? "text-purple-600" : "text-gray-400"} />
                <span className="truncate flex-1">{session.title}</span>
                <button className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600">
                  <MoreHorizontal size={16} />
                </button>
              </div>
            ))}
          </>
        ) : (
          <div className="px-4 text-center text-sm text-gray-400 mt-10">
            暂无历史记录
          </div>
        )}
      </div>

      {/* User & Search */}
      <div className="p-4 border-t border-white/40 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input 
            type="text" 
            placeholder="搜索..." 
            className="w-full bg-white/60 border border-white/40 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-200 placeholder-gray-400"
          />
        </div>
        <div className="flex items-center gap-3 pt-1">
          <div className="w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center text-purple-700">
            <User size={16} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-gray-700 truncate">User</div>
          </div>
        </div>
      </div>
    </div>
  );
};
