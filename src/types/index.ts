export interface Agent {
  id: string;
  name: string;
  description: string;
  icon: string;
  gradient: string;
}

export interface Attachment {
  id: string;
  name: string;
  type: 'image' | 'file';
  url: string;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  attachments?: Attachment[]; // New field for attachments
}

export interface Session {
  id: string;
  title: string;
  messages: Message[];
  agentId: string;
  updatedAt: number;
}
