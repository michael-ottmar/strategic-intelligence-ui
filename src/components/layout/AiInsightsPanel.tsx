import React from 'react';
import { X, Send, Sparkles, FileText, TrendingUp, AlertCircle } from 'lucide-react';
import { useStore } from '../../store/useStore';

export const AiInsightsPanel: React.FC = () => {
  const { aiPanelOpen, toggleAiPanel } = useStore();
  const [query, setQuery] = React.useState('');

  const sampleInsights = [
    {
      icon: <TrendingUp className="w-5 h-5 text-green-600" />,
      title: 'Growth Opportunity',
      content: 'Healthcare sector shows 40% higher conversion rate. Consider increasing focus on medical device companies.'
    },
    {
      icon: <AlertCircle className="w-5 h-5 text-amber-600" />,
      title: 'Resource Alert',
      content: 'Current team capacity at 82%. Hiring 2 data engineers could unlock $2M in additional revenue.'
    },
    {
      icon: <Sparkles className="w-5 h-5 text-primary" />,
      title: 'Pattern Detected',
      content: 'Clients with regular quarterly reviews show 65% higher retention rates.'
    }
  ];

  if (!aiPanelOpen) return null;

  return (
    <div className="fixed right-0 top-16 h-[calc(100vh-4rem)] w-96 bg-white border-l border-gray-200 shadow-xl z-40 flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center">
          <Brain className="w-6 h-6 text-primary mr-2" />
          <h2 className="text-lg font-semibold text-gray-900">AI Insights</h2>
        </div>
        <button
          onClick={toggleAiPanel}
          className="p-1 rounded-md hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {sampleInsights.map((insight, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-start">
                <div className="flex-shrink-0">{insight.icon}</div>
                <div className="ml-3">
                  <h3 className="text-sm font-semibold text-gray-900">{insight.title}</h3>
                  <p className="mt-1 text-sm text-gray-600">{insight.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center text-blue-800">
            <FileText className="w-5 h-5 mr-2" />
            <span className="text-sm font-medium">Generate Report</span>
          </div>
          <p className="mt-2 text-sm text-blue-700">
            Create a comprehensive analysis report for Q3 2024
          </p>
          <button className="mt-3 w-full py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors text-sm font-medium">
            Generate Report
          </button>
        </div>
      </div>

      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask Claude about your data..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <button
            className="p-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            disabled={!query.trim()}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <p className="mt-2 text-xs text-gray-500">
          AI insights powered by Claude API (integration pending)
        </p>
      </div>
    </div>
  );
};

const Brain = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.5 3a6.5 6.5 0 0 1 6.5 6.5c0 1.166-.308 2.26-.848 3.208a8.478 8.478 0 0 1 2.348 5.792V21h-3v-2.5a5.5 5.5 0 0 0-11 0V21h-3v-2.5a8.478 8.478 0 0 1 2.348-5.792A6.478 6.478 0 0 1 3 9.5 6.5 6.5 0 0 1 9.5 3z" />
  </svg>
);