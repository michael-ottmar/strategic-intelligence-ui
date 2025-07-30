import React from 'react';
import { useStore } from '../../store/useStore';
import { Search, Filter } from 'lucide-react';

export const ClientList: React.FC = () => {
  const { clients, selectedClientId, setSelectedClientId } = useStore();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filterIndustry, setFilterIndustry] = React.useState('all');

  const industries = ['all', ...new Set(clients.map(c => c.industry))];

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.contactName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = filterIndustry === 'all' || client.industry === filterIndustry;
    return matchesSearch && matchesIndustry;
  });

  return (
    <div className="w-full lg:w-80 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="space-y-4 mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search clients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        </div>
        
        <div className="relative">
          <select
            value={filterIndustry}
            onChange={(e) => setFilterIndustry(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none"
          >
            {industries.map(industry => (
              <option key={industry} value={industry}>
                {industry === 'all' ? 'All Industries' : industry}
              </option>
            ))}
          </select>
          <Filter className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        </div>
      </div>

      <div className="space-y-2 max-h-[calc(100vh-300px)] overflow-y-auto">
        {filteredClients.map(client => (
          <button
            key={client.id}
            onClick={() => setSelectedClientId(client.id)}
            className={`w-full text-left p-3 rounded-lg transition-colors ${
              selectedClientId === client.id
                ? 'bg-primary text-white'
                : 'bg-gray-50 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className={`font-medium ${
                  selectedClientId === client.id ? 'text-white' : 'text-gray-900'
                }`}>
                  {client.name}
                </h3>
                <p className={`text-sm ${
                  selectedClientId === client.id ? 'text-blue-100' : 'text-gray-600'
                }`}>
                  {client.contactName} • {client.industry}
                </p>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${
                client.status === 'active' 
                  ? selectedClientId === client.id 
                    ? 'bg-white/20 text-white' 
                    : 'bg-green-100 text-green-700'
                  : selectedClientId === client.id
                    ? 'bg-white/20 text-white'
                    : 'bg-gray-200 text-gray-600'
              }`}>
                {client.status}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};