import React from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { StatsCards } from '../components/dashboard/StatsCards';
import { ClientOverviewChart } from '../components/dashboard/ClientOverviewChart';
import { ValueMetricsChart } from '../components/dashboard/ValueMetricsChart';
import { ActivityFeed } from '../components/dashboard/ActivityFeed';
import { TeamGapsAlert } from '../components/dashboard/TeamGapsAlert';
import { Download } from 'lucide-react';

export const Dashboard: React.FC = () => {
  return (
    <div>
      <PageHeader 
        title="Dashboard" 
        description="Strategic Intelligence Platform Overview"
        action={
          <button className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
        }
      />
      
      <StatsCards />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ClientOverviewChart />
        <ValueMetricsChart />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActivityFeed />
        <TeamGapsAlert />
      </div>
    </div>
  );
};