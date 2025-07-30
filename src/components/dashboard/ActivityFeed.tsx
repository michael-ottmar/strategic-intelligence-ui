import React from 'react';
import { useStore } from '../../store/useStore';
import { CheckCircle, UserPlus, TrendingUp, Users } from 'lucide-react';

const iconMap = {
  'problem-solved': <CheckCircle className="w-5 h-5 text-green-600" />,
  'client-added': <UserPlus className="w-5 h-5 text-blue-600" />,
  'milestone-reached': <TrendingUp className="w-5 h-5 text-purple-600" />,
  'team-update': <Users className="w-5 h-5 text-orange-600" />
};

export const ActivityFeed: React.FC = () => {
  const activities = useStore(state => state.activities);

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    if (hours < 48) return 'Yesterday';
    return date.toLocaleDateString();
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {activities.slice(0, 8).map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3">
            <div className="flex-shrink-0 mt-0.5">
              {iconMap[activity.type]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">{activity.title}</p>
              <p className="text-sm text-gray-600 mt-0.5">{activity.description}</p>
              <p className="text-xs text-gray-500 mt-1">{formatTime(activity.timestamp)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};