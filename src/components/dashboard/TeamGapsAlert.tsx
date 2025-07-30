import React from 'react';
import { useStore } from '../../store/useStore';
import { AlertCircle, CheckCircle, XCircle } from 'lucide-react';

export const TeamGapsAlert: React.FC = () => {
  const resourceGaps = useStore(state => state.resourceGaps);

  const getStatusColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-600 bg-red-50';
      case 'high': return 'text-amber-600 bg-amber-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-green-600 bg-green-50';
    }
  };

  const getStatusIcon = (priority: string) => {
    switch (priority) {
      case 'critical': return <XCircle className="w-5 h-5" />;
      case 'high': return <AlertCircle className="w-5 h-5" />;
      default: return <CheckCircle className="w-5 h-5" />;
    }
  };

  const getProgressPercentage = (current: number, required: number) => {
    return Math.round((current / required) * 100);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Team Resource Gaps</h2>
      <div className="space-y-4">
        {resourceGaps.map((gap, index) => {
          const percentage = getProgressPercentage(gap.current, gap.required);
          const statusClass = getStatusColor(gap.priority);
          
          return (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className={`p-1 rounded ${statusClass}`}>
                    {getStatusIcon(gap.priority)}
                  </div>
                  <span className="font-medium text-gray-900">{gap.pillar}</span>
                </div>
                <span className="text-sm text-gray-600">
                  {gap.current}/{gap.required} resources
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    gap.priority === 'critical' ? 'bg-red-500' :
                    gap.priority === 'high' ? 'bg-amber-500' :
                    gap.priority === 'medium' ? 'bg-yellow-500' :
                    'bg-green-500'
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <div className="flex flex-wrap gap-1">
                {gap.skills.map((skill, skillIndex) => (
                  <span 
                    key={skillIndex} 
                    className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};