import React from 'react';
import { Users, AlertTriangle, CheckCircle, DollarSign } from 'lucide-react';
import { getTotalStats } from '../../data/mockData';

interface StatCard {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color: string;
}

export const StatsCards: React.FC = () => {
  const stats = getTotalStats();
  
  const cards: StatCard[] = [
    {
      title: 'Total Clients',
      value: stats.totalClients,
      icon: <Users className="w-6 h-6" />,
      color: 'bg-blue-500',
      trend: { value: 12, isPositive: true }
    },
    {
      title: 'Active Problems',
      value: stats.activeProblems,
      icon: <AlertTriangle className="w-6 h-6" />,
      color: 'bg-amber-500',
      trend: { value: 5, isPositive: false }
    },
    {
      title: 'Solutions Delivered',
      value: stats.solutionsDelivered,
      icon: <CheckCircle className="w-6 h-6" />,
      color: 'bg-green-500',
      trend: { value: 23, isPositive: true }
    },
    {
      title: 'Total Value Generated',
      value: `$${(stats.totalValue / 1000000).toFixed(1)}M`,
      icon: <DollarSign className="w-6 h-6" />,
      color: 'bg-purple-500',
      trend: { value: 18, isPositive: true }
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => (
        <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className={`${card.color} text-white p-3 rounded-lg`}>
              {card.icon}
            </div>
            {card.trend && (
              <div className={`flex items-center text-sm ${card.trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                <span>{card.trend.isPositive ? '+' : '-'}{card.trend.value}%</span>
                <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d={card.trend.isPositive 
                      ? "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" 
                      : "M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                    } 
                  />
                </svg>
              </div>
            )}
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">{card.title}</h3>
          <p className="text-2xl font-bold text-gray-900">{card.value}</p>
        </div>
      ))}
    </div>
  );
};