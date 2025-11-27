export interface Agent {
  id: string;
  name: string;
  description: string;
  icon: string;
  gradient: string;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface Session {
  id: string;
  title: string;
  messages: Message[];
  agentId: string;
  updatedAt: number;
}
