import { Agent } from "@/types";

export const MOCK_AGENTS: Agent[] = [
  {
    id: "keqian",
    name: "课前循证智能体",
    description: "基于数据驱动的备课助手。分析学情数据，提供针对性教学策略建议，协助制定精准的教学目标与方案。",
    icon: "book-open",
    gradient: "from-blue-100 to-cyan-100"
  },
  {
    id: "kezhong",
    name: "课中循证智能体",
    description: "实时课堂教学观察员。记录关键教学行为，分析师生互动模式，为课堂调控提供即时反馈与建议。",
    icon: "activity",
    gradient: "from-purple-100 to-pink-100"
  },
  {
    id: "kehou",
    name: "课后循证智能体",
    description: "深度教学反思伙伴。整合课堂数据，生成多维度评价报告，追踪学生学习成效，优化后续教学设计。",
    icon: "clipboard-check",
    gradient: "from-amber-100 to-orange-100"
  },
  {
    id: "data_analysis",
    name: "数据汇析模块",
    description: "专业的教研数据处理中心。支持多维数据录入、自动化图表生成与Excel导出，让教研数据分析更高效。",
    icon: "table",
    gradient: "from-emerald-100 to-green-100"
  }
];
