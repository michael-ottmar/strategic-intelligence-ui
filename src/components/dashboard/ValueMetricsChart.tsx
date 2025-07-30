import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { mockValueMetrics } from '../../data/mockData';

export const ValueMetricsChart: React.FC = () => {
  const data = mockValueMetrics.map(metric => ({
    ...metric,
    month: new Date(metric.date).toLocaleDateString('en-US', { month: 'short' })
  }));

  const formatValue = (value: number) => `$${(value / 1000000).toFixed(1)}M`;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Value Metrics Over Time</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} tickFormatter={formatValue} />
            <Tooltip 
              formatter={formatValue}
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e5e7eb',
                borderRadius: '0.375rem'
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="externalValue" 
              stroke="#3B82F6" 
              strokeWidth={2}
              name="External Value"
              dot={{ r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="internalValue" 
              stroke="#10B981" 
              strokeWidth={2}
              name="Internal Value"
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
        <div className="text-center">
          <p className="text-gray-600">Total Value</p>
          <p className="font-semibold text-gray-900">
            {formatValue(data[data.length - 1].totalValue)}
          </p>
        </div>
        <div className="text-center">
          <p className="text-gray-600">External Value</p>
          <p className="font-semibold text-primary">
            {formatValue(data[data.length - 1].externalValue)}
          </p>
        </div>
        <div className="text-center">
          <p className="text-gray-600">Internal Value</p>
          <p className="font-semibold text-secondary">
            {formatValue(data[data.length - 1].internalValue)}
          </p>
        </div>
      </div>
    </div>
  );
};