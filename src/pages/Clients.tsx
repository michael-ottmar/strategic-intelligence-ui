import React from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { ClientList } from '../components/clients/ClientList';
import { ClientDetail } from '../components/clients/ClientDetail';
import { Plus } from 'lucide-react';

export const Clients: React.FC = () => {
  return (
    <div>
      <PageHeader 
        title="Clients" 
        description="Manage client relationships and track engagement"
        action={
          <button className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm font-medium">
            <Plus className="w-4 h-4 mr-2" />
            Add Client
          </button>
        }
      />
      
      <div className="flex flex-col lg:flex-row gap-6">
        <ClientList />
        <ClientDetail />
      </div>
    </div>
  );
};