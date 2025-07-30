import { create } from 'zustand';
import { Client, TeamMember, Activity, Goal, ResourceGap } from '../types';
import { mockClients, mockTeamMembers, mockActivities, mockGoals, mockResourceGaps } from '../data/mockData';

interface StoreState {
  clients: Client[];
  teamMembers: TeamMember[];
  activities: Activity[];
  goals: Goal[];
  resourceGaps: ResourceGap[];
  selectedClientId: string | null;
  aiPanelOpen: boolean;
  
  setSelectedClientId: (id: string | null) => void;
  toggleAiPanel: () => void;
  addClient: (client: Client) => void;
  updateClient: (id: string, updates: Partial<Client>) => void;
  addActivity: (activity: Activity) => void;
}

export const useStore = create<StoreState>((set) => ({
  clients: mockClients,
  teamMembers: mockTeamMembers,
  activities: mockActivities,
  goals: mockGoals,
  resourceGaps: mockResourceGaps,
  selectedClientId: null,
  aiPanelOpen: false,
  
  setSelectedClientId: (id) => set({ selectedClientId: id }),
  toggleAiPanel: () => set((state) => ({ aiPanelOpen: !state.aiPanelOpen })),
  
  addClient: (client) => set((state) => ({ 
    clients: [...state.clients, client],
    activities: [{
      id: `act-${Date.now()}`,
      timestamp: new Date().toISOString(),
      type: 'client-added',
      title: `New client: ${client.name}`,
      description: `Added ${client.contactName} from ${client.industry}`,
      clientId: client.id
    }, ...state.activities]
  })),
  
  updateClient: (id, updates) => set((state) => ({
    clients: state.clients.map(client => 
      client.id === id ? { ...client, ...updates } : client
    )
  })),
  
  addActivity: (activity) => set((state) => ({
    activities: [activity, ...state.activities]
  }))
}));