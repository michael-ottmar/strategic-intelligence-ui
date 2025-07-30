import React from 'react';
import { Search, Brain } from 'lucide-react';
import { useStore } from '../../store/useStore';

interface TopBarProps {
  sidebarCollapsed: boolean;
}

export const TopBar: React.FC<TopBarProps> = ({ sidebarCollapsed }) => {
  const { aiPanelOpen, toggleAiPanel } = useStore();

  return (
    <header className={`fixed top-0 right-0 left-0 h-16 bg-white border-b border-gray-200 z-30 transition-all duration-300 ${
      sidebarCollapsed ? 'lg:left-16' : 'lg:left-64'
    }`}>
      <div className="flex items-center justify-between h-full px-4 sm:px-6 lg:px-8">
        {/* Spacer for mobile menu button */}
        <div className="w-14 lg:hidden" />
        
        {/* Search bar */}
        <div className="flex-1 max-w-2xl mx-auto px-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search clients, problems, or solutions..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
        </div>

        {/* AI Insights button */}
        <button
          onClick={toggleAiPanel}
          className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ml-4 ${
            aiPanelOpen
              ? 'text-white bg-primary hover:bg-primary-dark'
              : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
          }`}
        >
          <Brain className="w-5 h-5 mr-2" />
          <span className="hidden sm:inline">AI Insights</span>
        </button>
      </div>
    </header>
  );
};