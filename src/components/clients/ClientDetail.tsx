import React from 'react';
import { useStore } from '../../store/useStore';
import { 
  Mail, 
  Phone, 
  Calendar, 
  DollarSign, 
  Building, 
  User,
  Clock,
  ChevronRight,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

export const ClientDetail: React.FC = () => {
  const { clients, selectedClientId } = useStore();
  const client = clients.find(c => c.id === selectedClientId);

  if (!client) {
    return (
      <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="text-center text-gray-500">
          <User className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <p>Select a client to view details</p>
        </div>
      </div>
    );
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{client.name}</h2>
            <p className="text-gray-600 mt-1">{client.industry}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            client.status === 'active' 
              ? 'bg-green-100 text-green-700'
              : client.status === 'prospect'
              ? 'bg-blue-100 text-blue-700'
              : 'bg-gray-100 text-gray-700'
          }`}>
            {client.status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-semibold">
                {client.contactName.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <p className="font-medium text-gray-900">{client.contactName}</p>
                <p className="text-sm text-gray-600">{client.contactTitle}</p>
              </div>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Mail className="w-4 h-4 mr-2" />
              {client.contactEmail}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Building className="w-4 h-4 mr-2" />
              {client.name}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Key Metrics</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center text-gray-600 mb-1">
                <DollarSign className="w-4 h-4 mr-1" />
                <span className="text-sm">Total Value</span>
              </div>
              <p className="text-xl font-bold text-gray-900">
                {formatCurrency(client.totalValue)}
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center text-gray-600 mb-1">
                <Calendar className="w-4 h-4 mr-1" />
                <span className="text-sm">Client Since</span>
              </div>
              <p className="text-xl font-bold text-gray-900">
                {formatDate(client.joinedDate)}
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center text-gray-600 mb-1">
                <Clock className="w-4 h-4 mr-1" />
                <span className="text-sm">Last Contact</span>
              </div>
              <p className="text-xl font-bold text-gray-900">
                {formatDate(client.lastContact)}
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center text-gray-600 mb-1">
                <AlertTriangle className="w-4 h-4 mr-1" />
                <span className="text-sm">Active Issues</span>
              </div>
              <p className="text-xl font-bold text-gray-900">
                {client.problems.filter(p => p.status !== 'resolved').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Problems & Solutions Timeline</h3>
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {client.problems.map((problem) => (
            <div key={problem.id} className="border-l-4 border-gray-200 pl-4 py-2 hover:border-primary transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    {problem.status === 'resolved' ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : problem.status === 'in-progress' ? (
                      <Clock className="w-4 h-4 text-blue-600" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                    )}
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      problem.severity === 'critical' ? 'bg-red-100 text-red-700' :
                      problem.severity === 'high' ? 'bg-amber-100 text-amber-700' :
                      problem.severity === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {problem.severity}
                    </span>
                    <span className="text-xs text-gray-500">{problem.category}</span>
                  </div>
                  <p className="text-sm font-medium text-gray-900 mt-1">{problem.description}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Identified: {formatDate(problem.identifiedDate)}
                    {problem.resolvedDate && ` • Resolved: ${formatDate(problem.resolvedDate)}`}
                  </p>
                  {problem.solution && (
                    <div className="mt-2 p-2 bg-green-50 rounded text-xs">
                      <p className="text-green-700">
                        Solution: {problem.solution.description}
                      </p>
                      <p className="text-green-600 mt-1">
                        Success Rate: {problem.solution.successRate.toFixed(0)}% • 
                        Value Generated: {formatCurrency(problem.solution.valueGenerated)}
                      </p>
                    </div>
                  )}
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex space-x-3">
        <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm font-medium">
          Schedule Meeting
        </button>
        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
          View Full History
        </button>
      </div>
    </div>
  );
};