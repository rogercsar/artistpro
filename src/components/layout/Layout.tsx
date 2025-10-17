import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { useTheme } from '../../hooks/useTheme';

interface LayoutProps {
  children: React.ReactNode;
  showFooter?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ children, showFooter = true }) => {
  const { theme } = useTheme();
  
  return (
    <div className={`min-h-screen flex flex-col ${theme} w-full max-w-full overflow-x-hidden`}>
      <Header />
      <main className="flex-1 bg-theme-primary w-full max-w-full">
        <div className="w-full max-w-full px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
      {showFooter && <Footer />}
    </div>
  );
};


