import React from 'react';
import { Agent } from '@/types';
import { AgentCard } from './AgentCard';
import { useAgentStore } from '@/store/useAgentStore';
import { MOCK_AGENTS } from '@/data/mockAgents';

export const AgentGrid = () => {
  const { selectedAgent, setSelectedAgent } = useAgentStore();

  return (
    <div className="h-full flex items-center justify-center p-8 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto w-full">
        {MOCK_AGENTS.map((agent) => (
          <AgentCard
            key={agent.id}
            agent={agent}
            isSelected={selectedAgent?.id === agent.id}
            onClick={() => setSelectedAgent(agent)}
          />
        ))}
      </div>
    </div>
  );
};



