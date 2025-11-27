import { NextResponse } from 'next/server';
import { Message } from '@/types';

const DEEPSEEK_API_URL = "https://api.deepseek.com/chat/completions";
const API_KEY = process.env.DEEPSEEK_API_KEY;

export async function POST(request: Request) {
  if (!API_KEY) {
    return NextResponse.json({ error: "DeepSeek API Key not configured" }, { status: 500 });
  }

  try {
    const body = await request.json();
    const { content, history, agentId } = body;

    // Construct system prompt based on agentId
    let systemPrompt = "你是湖畔小学教研大模型，一个专业的教育科研辅助助手。";
    
    switch (agentId) {
        case 'keqian':
            systemPrompt += "你的专长是课前循证。请重点从学情数据分析、课标分析、教材分析、教学目标制定、备课策略优化等方面提供建议。";
            break;
        case 'kezhong':
            systemPrompt += "你的专长是课中循证。请重点关注课堂观察、师生互动分析、教学行为记录等方面。";
            break;
        case 'kehou':
            systemPrompt += "你的专长是课后循证。请重点进行学生结果性评价和过程评价分析。";
            break;
        case 'data_analysis':
            systemPrompt += "你负责协助处理教研数据。";
            break;
        default:
            systemPrompt += "请提供专业的教研咨询服务。";
    }

    // Convert history to DeepSeek format
    const messages = [
        { role: "system", content: systemPrompt },
        ...history.map((msg: Message) => ({
            role: msg.role,
            content: msg.content
        })),
        { role: "user", content: content }
    ];

    const response = await fetch(DEEPSEEK_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: messages,
        temperature: 0.7,
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("DeepSeek API Error:", errorText);
      return NextResponse.json({ error: `DeepSeek API Error: ${response.statusText}` }, { status: response.status });
    }

    const data = await response.json();
    const reply = data.choices[0]?.message?.content || "抱歉，我没有理解您的意思。";

    return NextResponse.json({ content: reply });

  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}



