import { create } from 'zustand';
import { Agent, Message, Session } from '@/types';
import { MOCK_AGENTS } from '@/data/mockAgents';

interface AgentState {
  // UI State
  isSidebarOpen: boolean;
  toggleSidebar: () => void;

  // Session State
  sessions: Session[];
  currentSessionId: string | null;
  
  // Active State (Derived/Synced for convenience)
  selectedAgent: Agent | null;
  messages: Message[];
  isLoading: boolean;

  // Actions
  createSession: (agent?: Agent) => void;
  selectSession: (sessionId: string) => void;
  setLoading: (loading: boolean) => void;
  addMessage: (message: Message) => void;
  updateSessionTitle: (sessionId: string, title: string) => void;
  setSelectedAgent: (agent: Agent | null) => void; // Allow null
}

export const useAgentStore = create<AgentState>((set, get) => ({
  isSidebarOpen: true,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

  sessions: [],
  currentSessionId: null,
  
  selectedAgent: null,
  messages: [],
  isLoading: false,

  createSession: (agent) => {
    const newSession: Session = {
      id: Date.now().toString(),
      title: '新对话',
      messages: [],
      agentId: agent?.id || '', 
      updatedAt: Date.now(),
    };
    
    set((state) => ({
      sessions: [newSession, ...state.sessions],
      currentSessionId: newSession.id,
      selectedAgent: agent || null,
      messages: [],
    }));
  },

  selectSession: (sessionId) => {
    const state = get();
    const session = state.sessions.find(s => s.id === sessionId);
    if (session) {
      const agent = MOCK_AGENTS.find(a => a.id === session.agentId) || null;
      set({
        currentSessionId: sessionId,
        messages: session.messages,
        selectedAgent: agent
      });
    }
  },

  setSelectedAgent: (agent) => {
    // Handle deselect (null) - typically for returning to grid
    if (agent === null) {
        set({ selectedAgent: null });
        return;
    }

    const state = get();
    const currentSession = state.sessions.find(s => s.id === state.currentSessionId);
    
    if (!state.currentSessionId || (currentSession && currentSession.messages.length > 0)) {
       // Create new session immediately
       state.createSession(agent);
    } else {
       // Just update current empty session
       set((state) => {
         const updatedSessions = state.sessions.map(s => 
           s.id === state.currentSessionId ? { ...s, agentId: agent.id } : s
         );
         return { selectedAgent: agent, sessions: updatedSessions };
       });
    }
  },

  addMessage: (message) => set((state) => {
    const { currentSessionId, sessions } = state;
    if (!currentSessionId) return state;

    const updatedSessions = sessions.map(s => {
      if (s.id === currentSessionId) {
        return {
          ...s,
          messages: [...s.messages, message],
          updatedAt: Date.now()
        };
      }
      return s;
    });

    return {
      sessions: updatedSessions,
      messages: [...state.messages, message]
    };
  }),

  setLoading: (loading) => set({ isLoading: loading }),
  
  updateSessionTitle: (sessionId, title) => set((state) => ({
    sessions: state.sessions.map(s => 
      s.id === sessionId ? { ...s, title } : s
    )
  })),
}));
