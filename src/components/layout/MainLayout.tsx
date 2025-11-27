import React from 'react';
import { Sidebar } from './Sidebar';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <Sidebar />
      <main className="flex-1 flex flex-col h-full overflow-hidden relative transition-all">
        {children}
      </main>
    </div>
  );
};
