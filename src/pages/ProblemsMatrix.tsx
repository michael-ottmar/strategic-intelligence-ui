import React from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { DataTable } from '../components/shared/DataTable';
import type { Column } from '../components/shared/DataTable';
import { useStore } from '../store/useStore';
import type { Problem } from '../types';
import { Plus, Download, Filter, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

interface ProblemRow extends Problem {
  clientName: string;
  solutionSuccess?: number;
  valueGenerated?: number;
}

export const ProblemsMatrix: React.FC = () => {
  const clients = useStore(state => state.clients);
  const [selectedProblem, setSelectedProblem] = React.useState<ProblemRow | null>(null);
  const [filterStatus, setFilterStatus] = React.useState<string>('all');
  const [filterSeverity, setFilterSeverity] = React.useState<string>('all');

  const problemRows: ProblemRow[] = React.useMemo(() => {
    const rows: ProblemRow[] = [];
    clients.forEach(client => {
      client.problems.forEach(problem => {
        rows.push({
          ...problem,
          clientName: client.name,
          solutionSuccess: problem.solution?.successRate,
          valueGenerated: problem.solution?.valueGenerated
        });
      });
    });
    return rows;
  }, [clients]);

  const filteredProblems = problemRows.filter(problem => {
    const matchesStatus = filterStatus === 'all' || problem.status === filterStatus;
    const matchesSeverity = filterSeverity === 'all' || problem.severity === filterSeverity;
    return matchesStatus && matchesSeverity;
  });

  const columns: Column<ProblemRow>[] = [
    {
      key: 'clientName',
      header: 'Client',
      sortable: true,
      width: '200px'
    },
    {
      key: 'category',
      header: 'Category',
      sortable: true,
      render: (value) => (
        <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
          {value}
        </span>
      )
    },
    {
      key: 'severity',
      header: 'Severity',
      sortable: true,
      render: (value) => (
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          value === 'critical' ? 'bg-red-100 text-red-700' :
          value === 'high' ? 'bg-amber-100 text-amber-700' :
          value === 'medium' ? 'bg-yellow-100 text-yellow-700' :
          'bg-gray-100 text-gray-700'
        }`}>
          {value}
        </span>
      )
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (value) => (
        <div className="flex items-center space-x-1">
          {value === 'resolved' ? (
            <CheckCircle className="w-4 h-4 text-green-600" />
          ) : value === 'in-progress' ? (
            <Clock className="w-4 h-4 text-blue-600" />
          ) : (
            <AlertTriangle className="w-4 h-4 text-amber-600" />
          )}
          <span className="text-sm capitalize">{value.replace('-', ' ')}</span>
        </div>
      )
    },
    {
      key: 'description',
      header: 'Problem',
      width: '300px'
    },
    {
      key: 'solutionSuccess',
      header: 'Success Rate',
      sortable: true,
      render: (value) => value ? (
        <div className="flex items-center space-x-2">
          <div className="w-16 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full"
              style={{ width: `${value}%` }}
            />
          </div>
          <span className="text-sm text-gray-600">{Math.round(value)}%</span>
        </div>
      ) : <span className="text-sm text-gray-400">—</span>
    },
    {
      key: 'valueGenerated',
      header: 'Value Generated',
      sortable: true,
      render: (value) => value ? (
        <span className="font-semibold text-green-600">
          ${(value / 1000).toFixed(0)}K
        </span>
      ) : <span className="text-sm text-gray-400">—</span>
    }
  ];

  return (
    <div>
      <PageHeader 
        title="Problems & Solutions Matrix" 
        description="Track and analyze all client problems and their solutions"
        action={
          <div className="flex items-center space-x-3">
            <button className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </button>
            <button className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm font-medium">
              <Plus className="w-4 h-4 mr-2" />
              Add Problem
            </button>
          </div>
        }
      />

      <div className="mb-6 flex flex-wrap gap-4">
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="identified">Identified</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={filterSeverity}
            onChange={(e) => setFilterSeverity(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">All Severities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      <DataTable 
        data={filteredProblems}
        columns={columns}
        onRowClick={setSelectedProblem}
        selectedRow={selectedProblem || undefined}
        emptyMessage="No problems found matching the selected filters"
      />

      {selectedProblem && (
        <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Problem Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium text-gray-600 mb-2">Problem Information</h4>
              <dl className="space-y-2">
                <div>
                  <dt className="text-sm text-gray-500">Client</dt>
                  <dd className="text-sm font-medium text-gray-900">{selectedProblem.clientName}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Description</dt>
                  <dd className="text-sm font-medium text-gray-900">{selectedProblem.description}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Identified Date</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {new Date(selectedProblem.identifiedDate).toLocaleDateString()}
                  </dd>
                </div>
                {selectedProblem.resolvedDate && (
                  <div>
                    <dt className="text-sm text-gray-500">Resolved Date</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      {new Date(selectedProblem.resolvedDate).toLocaleDateString()}
                    </dd>
                  </div>
                )}
              </dl>
            </div>
            {selectedProblem.solution && (
              <div>
                <h4 className="text-sm font-medium text-gray-600 mb-2">Solution Details</h4>
                <dl className="space-y-2">
                  <div>
                    <dt className="text-sm text-gray-500">Solution</dt>
                    <dd className="text-sm font-medium text-gray-900">{selectedProblem.solution.description}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Success Rate</dt>
                    <dd className="text-sm font-medium text-gray-900">{selectedProblem.solution.successRate.toFixed(0)}%</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Value Generated</dt>
                    <dd className="text-sm font-medium text-green-600">
                      ${selectedProblem.solution.valueGenerated.toLocaleString()}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Resources Used</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      {selectedProblem.solution.resources.join(', ')}
                    </dd>
                  </div>
                </dl>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};