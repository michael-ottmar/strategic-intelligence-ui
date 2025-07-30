import React from 'react';
import type { Client } from '../../../types';
import { useStore } from '../../../store/useStore';

interface ClientFormProps {
  onClose: () => void;
  client?: Client;
}

export const ClientForm: React.FC<ClientFormProps> = ({ onClose, client }) => {
  const { addClient, updateClient } = useStore();
  const [formData, setFormData] = React.useState({
    name: client?.name || '',
    industry: client?.industry || '',
    contactName: client?.contactName || '',
    contactTitle: client?.contactTitle || '',
    contactEmail: client?.contactEmail || '',
    status: client?.status || 'prospect'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (client) {
      updateClient(client.id, formData);
    } else {
      const newClient: Client = {
        id: `client-${Date.now()}`,
        ...formData,
        totalValue: 0,
        joinedDate: new Date().toISOString(),
        lastContact: new Date().toISOString(),
        problems: [],
        relationships: []
      };
      addClient(newClient);
    }
    
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Company Name
        </label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Industry
        </label>
        <select
          required
          value={formData.industry}
          onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="">Select Industry</option>
          <option value="Technology">Technology</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Finance">Finance</option>
          <option value="Retail">Retail</option>
          <option value="Manufacturing">Manufacturing</option>
          <option value="Energy">Energy</option>
          <option value="Education">Education</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Contact Name
        </label>
        <input
          type="text"
          required
          value={formData.contactName}
          onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Contact Title
        </label>
        <input
          type="text"
          required
          value={formData.contactTitle}
          onChange={(e) => setFormData({ ...formData, contactTitle: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Contact Email
        </label>
        <input
          type="email"
          required
          value={formData.contactEmail}
          onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Status
        </label>
        <select
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="prospect">Prospect</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-primary rounded-lg hover:bg-primary-dark transition-colors font-medium"
        >
          {client ? 'Update' : 'Add'} Client
        </button>
      </div>
    </form>
  );
};