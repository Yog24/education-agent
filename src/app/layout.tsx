import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "湖畔小学·教研大模型",
  description: "智能体对话系统",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="font-sans">{children}</body>
    </html>
  );
}

