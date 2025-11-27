"use client";

import { useState, useCallback } from 'react';
import { useAgentStore } from '@/store/useAgentStore';
import getAgentService from '@/services/agent';
import { Message } from '@/types';

export const useChat = () => {
  const { 
    selectedAgent, 
    addMessage, 
    messages, 
    setLoading, 
    isLoading,
    createSession,
    updateSessionTitle,
    currentSessionId,
    sessions
  } = useAgentStore();
  
  // Get service instance lazily/dynamically
  const service = getAgentService();

  const sendMessage = useCallback(async (content: string) => {
    if (!selectedAgent || !content.trim()) return;

    let activeSessionId = currentSessionId;
    if (!activeSessionId) {
        return;
    }

    const currentSession = sessions.find(s => s.id === activeSessionId);
    const isFirstMessage = currentSession ? currentSession.messages.length === 0 : true;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: Date.now(),
    };

    addMessage(userMsg);
    setLoading(true);

    if (isFirstMessage) {
        service.generateTitle(content).then(title => {
            if (activeSessionId) updateSessionTitle(activeSessionId, title);
        }).catch(err => console.warn("Title gen failed", err));
    }

    try {
      const responseContent = await service.sendMessage(selectedAgent.id, content, messages);
      
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseContent,
        timestamp: Date.now(),
      };

      addMessage(aiMsg);
    } catch (error) {
      console.error("Failed to send message:", error);
      addMessage({
        id: Date.now().toString(),
        role: 'assistant',
        content: "抱歉，系统暂时无法处理您的请求。",
        timestamp: Date.now(),
      });
    } finally {
      setLoading(false);
    }
  }, [selectedAgent, messages, addMessage, setLoading, service, currentSessionId, sessions, updateSessionTitle]);

  return {
    sendMessage,
    isLoading
  };
};
