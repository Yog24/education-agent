import { Agent, Message } from '@/types';

export interface AgentService {
  sendMessage(agentId: string, content: string, history: Message[]): Promise<string>;
  getHistory(agentId: string): Promise<Message[]>;
  generateTitle(content: string): Promise<string>;
}

// Mock Service Implementation
export class MockAgentService implements AgentService {
  async sendMessage(agentId: string, content: string, history: Message[]): Promise<string> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const responses: Record<string, string[]> = {
      keqian: [
        "根据您提供的学情数据，建议在备课中增加针对基础薄弱学生的互动环节。",
        "分析显示，班级整体在几何概念理解上存在难点，建议引入实物演示。"
      ],
      kezhong: [
        "检测到当前课堂互动频率较低，建议抛出一个开放性问题来激活课堂氛围。",
        "刚才的提问方式非常有效，引发了学生的深度思考。"
      ],
      kehou: [
        "本节课的教学目标达成率为 85%，建议在作业中加强对知识点的巩固。",
        "根据课后反馈，学生对第二个案例的讨论非常感兴趣，下次可以多安排类似活动。"
      ],
      default: [`收到消息：${content}。我是教研智能助手，请问有什么可以帮您？`]
    };

    const agentResponses = responses[agentId] || responses['default'];
    const randomResponse = agentResponses[Math.floor(Math.random() * agentResponses.length)];
    
    return `${randomResponse} (来自: ${agentId})`;
  }

  async getHistory(agentId: string): Promise<Message[]> {
    return [];
  }

  async generateTitle(content: string): Promise<string> {
      await new Promise(resolve => setTimeout(resolve, 500));
      return content.slice(0, 10) + (content.length > 10 ? "..." : "");
  }
}

// Real API Service Implementation (DeepSeek via Next.js Proxy)
export class ApiAgentService implements AgentService {
  
  async sendMessage(agentId: string, content: string, history: Message[]): Promise<string> {
    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ agentId, content, history })
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        const data = await response.json();
        return data.content;
    } catch (error) {
        console.error("API Service Error:", error);
        throw error;
    }
  }

  async getHistory(agentId: string): Promise<Message[]> {
    return [];
  }
  
  async generateTitle(content: string): Promise<string> {
      try {
        const response = await fetch('/api/title', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content })
        });

        if (!response.ok) return "新对话"; // Fallback

        const data = await response.json();
        return data.title || "新对话";
    } catch (error) {
        console.error("Title API Error:", error);
        return "新对话";
    }
  }
}

// Singleton accessor
let instance: AgentService | null = null;

export default function getAgentService(): AgentService {
  if (!instance) {
    const useMock = process.env.NEXT_PUBLIC_USE_MOCK_SERVICE === 'true'; 
    instance = useMock ? new MockAgentService() : new ApiAgentService();
  }
  return instance;
}

