import React from 'react';
import { Agent } from '@/types';
import { AgentCard } from './AgentCard';
import { useAgentStore } from '@/store/useAgentStore';
import { MOCK_AGENTS } from '@/data/mockAgents';

export const AgentGrid = () => {
  const { selectedAgent, setSelectedAgent } = useAgentStore();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 max-w-6xl mx-auto w-full">
      {MOCK_AGENTS.map((agent) => (
        <AgentCard
          key={agent.id}
          agent={agent}
          isSelected={selectedAgent?.id === agent.id}
          onClick={() => setSelectedAgent(agent)}
        />
      ))}
    </div>
  );
};

