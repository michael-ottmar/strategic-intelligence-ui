import React from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { useStore } from '../store/useStore';
import { 
  Target, 
  TrendingUp, 
  DollarSign, 
  Users,
  ArrowRight,
  Filter,
  Star
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, FunnelChart, Funnel, LabelList } from 'recharts';

export const GrowthStrategy: React.FC = () => {
  const { goals, clients } = useStore();

  const pipelineData = [
    { name: 'Leads', value: 125, fill: '#3B82F6' },
    { name: 'Qualified', value: 87, fill: '#2563EB' },
    { name: 'Proposals', value: 45, fill: '#1D4ED8' },
    { name: 'Negotiations', value: 28, fill: '#1E40AF' },
    { name: 'Closed Won', value: 12, fill: '#1E3A8A' }
  ];

  const leadSources = [
    { name: 'Referrals', value: 35, color: '#3B82F6' },
    { name: 'Outbound', value: 28, color: '#10B981' },
    { name: 'Inbound', value: 22, color: '#F59E0B' },
    { name: 'Events', value: 15, color: '#8B5CF6' }
  ];

  const nicheOpportunities = [
    {
      id: '1',
      market: 'Healthcare AI',
      potential: 4500000,
      competition: 'low',
      fit: 95,
      timeToMarket: '3 months',
      requiredInvestment: 250000,
      description: 'AI-powered diagnostics and patient care optimization'
    },
    {
      id: '2',
      market: 'FinTech Security',
      potential: 3800000,
      competition: 'medium',
      fit: 88,
      timeToMarket: '4 months',
      requiredInvestment: 180000,
      description: 'Advanced security solutions for digital banking'
    },
    {
      id: '3',
      market: 'Supply Chain Optimization',
      potential: 3200000,
      competition: 'low',
      fit: 82,
      timeToMarket: '6 months',
      requiredInvestment: 300000,
      description: 'Real-time supply chain visibility and optimization'
    },
    {
      id: '4',
      market: 'EdTech Analytics',
      potential: 2800000,
      competition: 'low',
      fit: 78,
      timeToMarket: '2 months',
      requiredInvestment: 150000,
      description: 'Learning analytics and personalized education'
    }
  ];

  const getGoalStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-50';
      case 'on-track': return 'text-blue-600 bg-blue-50';
      case 'at-risk': return 'text-amber-600 bg-amber-50';
      case 'behind': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getCompetitionColor = (level: string) => {
    switch (level) {
      case 'low': return 'bg-green-100 text-green-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'high': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div>
      <PageHeader 
        title="Growth Strategy" 
        description="Sales pipeline, market opportunities, and business goals"
        action={
          <button className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm font-medium">
            <Target className="w-4 h-4 mr-2" />
            Set New Goal
          </button>
        }
      />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Sales Pipeline</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <FunnelChart>
                <Tooltip />
                <Funnel
                  dataKey="value"
                  data={pipelineData}
                  isAnimationActive
                >
                  <LabelList position="center" fill="#fff" fontSize={14} />
                </Funnel>
              </FunnelChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Conversion Rate</p>
              <p className="text-xl font-bold text-gray-900">9.6%</p>
            </div>
            <div>
              <p className="text-gray-600">Avg Deal Size</p>
              <p className="text-xl font-bold text-gray-900">$875K</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Lead Sources</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={leadSources}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {leadSources.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {leadSources.map((source) => (
              <div key={source.name} className="flex items-center space-x-2 text-sm">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: source.color }} />
                <span className="text-gray-600">{source.name}</span>
                <span className="font-semibold text-gray-900">{source.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Niche Market Opportunities</h2>
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
            <option>Sort by Potential</option>
            <option>Sort by Fit Score</option>
            <option>Sort by Time to Market</option>
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {nicheOpportunities.map((opp) => (
            <div key={opp.id} className="border border-gray-200 rounded-lg p-4 hover:border-primary transition-colors">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-900">{opp.market}</h3>
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-semibold">{opp.fit}% fit</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-3">{opp.description}</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-gray-500">Potential</p>
                  <p className="font-semibold text-green-600">${(opp.potential / 1000000).toFixed(1)}M</p>
                </div>
                <div>
                  <p className="text-gray-500">Competition</p>
                  <span className={`inline-block px-2 py-0.5 rounded text-xs ${getCompetitionColor(opp.competition)}`}>
                    {opp.competition}
                  </span>
                </div>
                <div>
                  <p className="text-gray-500">Time to Market</p>
                  <p className="font-medium">{opp.timeToMarket}</p>
                </div>
                <div>
                  <p className="text-gray-500">Investment</p>
                  <p className="font-medium">${(opp.requiredInvestment / 1000).toFixed(0)}K</p>
                </div>
              </div>
              <button className="mt-3 w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-sm font-medium transition-colors flex items-center justify-center">
                Explore Opportunity
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Business Goals Tracker</h2>
        <div className="space-y-4">
          {goals.map((goal) => {
            const progress = (goal.current / goal.target) * 100;
            const Icon = goal.category === 'revenue' ? DollarSign :
                        goal.category === 'client-acquisition' ? Users :
                        goal.category === 'team-growth' ? UserCheck :
                        TrendingUp;
            
            return (
              <div key={goal.id} className="border-b border-gray-200 pb-4 last:border-0">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <Icon className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{goal.title}</h3>
                      <p className="text-sm text-gray-600">
                        Target: {goal.category === 'revenue' 
                          ? `$${(goal.target / 1000000).toFixed(1)}M` 
                          : goal.target}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getGoalStatusColor(goal.status)}`}>
                      {goal.status.replace('-', ' ')}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">Due: {new Date(goal.deadline).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium">
                      {goal.category === 'revenue' 
                        ? `$${(goal.current / 1000000).toFixed(1)}M / $${(goal.target / 1000000).toFixed(1)}M`
                        : `${goal.current} / ${goal.target}`}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        goal.status === 'completed' ? 'bg-green-500' :
                        goal.status === 'on-track' ? 'bg-blue-500' :
                        goal.status === 'at-risk' ? 'bg-amber-500' :
                        'bg-red-500'
                      }`}
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const UserCheck = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);