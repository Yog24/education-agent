import React from 'react';
import { Agent } from '@/types';
import { cn } from '@/lib/utils';
import { BookOpen, Activity, ClipboardCheck, Table } from 'lucide-react';

// Map icon strings to components
const ICON_MAP: Record<string, any> = {
  "book-open": BookOpen,
  "activity": Activity,
  "clipboard-check": ClipboardCheck,
  "table": Table
};

interface AgentCardProps {
  agent: Agent;
  isSelected: boolean;
  onClick: () => void;
}

export const AgentCard = ({ agent, isSelected, onClick }: AgentCardProps) => {
  // Fallback icon
  const IconComponent = ICON_MAP[agent.icon] || Table;

  return (
    <div 
      onClick={onClick}
      className={cn(
        "relative p-6 rounded-2xl border transition-all cursor-pointer group overflow-hidden flex flex-col h-[220px]",
        isSelected 
          ? "bg-white border-purple-400 shadow-md ring-1 ring-purple-200" 
          : "bg-white/40 border-white/50 hover:bg-white/60 hover:border-purple-200 hover:shadow-lg hover:-translate-y-1"
      )}
    >
      <div className={cn(
        "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-gradient-to-br",
        agent.gradient
      )} />
      
      <div className="flex items-center gap-4 mb-3 relative z-10">
        <div className={cn(
          "p-3 rounded-xl bg-gradient-to-br shadow-sm text-gray-700",
          agent.gradient
        )}>
          <IconComponent size={24} className="text-gray-800/80" />
        </div>
        <h3 className="font-semibold text-lg text-gray-800">{agent.name}</h3>
      </div>
      
      <div className="relative z-10 flex-1">
          <p className="text-sm text-gray-600 leading-relaxed">
              {agent.description}
          </p>
      </div>
    </div>
  );
};
