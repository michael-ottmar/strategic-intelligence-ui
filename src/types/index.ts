export interface Client {
  id: string;
  name: string;
  industry: string;
  contactName: string;
  contactTitle: string;
  contactEmail: string;
  contactPhoto?: string;
  status: 'active' | 'prospect' | 'inactive';
  totalValue: number;
  joinedDate: string;
  lastContact: string;
  problems: Problem[];
  relationships: Relationship[];
}

export interface Problem {
  id: string;
  clientId: string;
  category: 'technical' | 'process' | 'strategic' | 'operational' | 'financial';
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'identified' | 'in-progress' | 'resolved';
  identifiedDate: string;
  resolvedDate?: string;
  solution?: Solution;
}

export interface Solution {
  id: string;
  problemId: string;
  description: string;
  implementedDate: string;
  successRate: number;
  valueGenerated: number;
  resources: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  skills: Skill[];
  availability: number;
  photoUrl?: string;
}

export interface Skill {
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  category: string;
}

export interface Relationship {
  fromId: string;
  toId: string;
  type: 'reports-to' | 'collaborates-with' | 'stakeholder';
  strength: number;
}

export interface ValueMetric {
  date: string;
  internalValue: number;
  externalValue: number;
  totalValue: number;
}

export interface Activity {
  id: string;
  timestamp: string;
  type: 'client-added' | 'problem-solved' | 'milestone-reached' | 'team-update';
  title: string;
  description: string;
  clientId?: string;
}

export interface Goal {
  id: string;
  title: string;
  category: 'revenue' | 'client-acquisition' | 'team-growth' | 'market-expansion';
  target: number;
  current: number;
  deadline: string;
  status: 'on-track' | 'at-risk' | 'behind' | 'completed';
}

export interface ResourceGap {
  pillar: string;
  required: number;
  current: number;
  priority: 'low' | 'medium' | 'high' | 'critical';
  skills: string[];
}