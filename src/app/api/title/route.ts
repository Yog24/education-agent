import { NextResponse } from 'next/server';

const DEEPSEEK_API_URL = "https://api.deepseek.com/chat/completions";
const API_KEY = process.env.DEEPSEEK_API_KEY;

export async function POST(request: Request) {
  if (!API_KEY) {
    return NextResponse.json({ error: "DeepSeek API Key not configured" }, { status: 500 });
  }

  try {
    const body = await request.json();
    const { content } = body;

    const response = await fetch(DEEPSEEK_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
            { role: "system", content: "你是一个助手，负责给用户的对话生成一个简短的标题（10个字以内）。直接返回标题，不要加任何引号或解释。" },
            { role: "user", content: `请根据这句话生成一个标题：${content}` }
        ],
        temperature: 0.7,
        max_tokens: 20
      })
    });

    if (!response.ok) {
        return NextResponse.json({ title: "新对话" }); // Fallback gracefully
    }

    const data = await response.json();
    let title = data.choices[0]?.message?.content || "新对话";
    title = title.replace(/["《》]/g, ''); // Clean up

    return NextResponse.json({ title });

  } catch (error) {
    console.error("Title Gen Error:", error);
    return NextResponse.json({ title: "新对话" });
  }
}



