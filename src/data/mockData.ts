import { Client, TeamMember, ValueMetric, Activity, Goal, ResourceGap, Problem, Solution } from '../types';

const industries = ['Technology', 'Healthcare', 'Finance', 'Retail', 'Manufacturing', 'Energy', 'Education'];
const problemCategories = ['technical', 'process', 'strategic', 'operational', 'financial'] as const;

function generateProblems(clientId: string, count: number): Problem[] {
  const problems: Problem[] = [];
  const baseDate = new Date();
  
  for (let i = 0; i < count; i++) {
    const problem: Problem = {
      id: `problem-${clientId}-${i}`,
      clientId,
      category: problemCategories[Math.floor(Math.random() * problemCategories.length)],
      description: [
        'Legacy system integration issues',
        'Inefficient workflow processes',
        'Lack of strategic alignment',
        'Data silos preventing insights',
        'Scalability challenges',
        'Security vulnerabilities',
        'Customer experience gaps',
        'Revenue optimization opportunities'
      ][Math.floor(Math.random() * 8)],
      severity: ['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)] as any,
      status: Math.random() > 0.3 ? 'resolved' : Math.random() > 0.5 ? 'in-progress' : 'identified',
      identifiedDate: new Date(baseDate.getTime() - Math.random() * 180 * 24 * 60 * 60 * 1000).toISOString(),
    };
    
    if (problem.status === 'resolved') {
      problem.resolvedDate = new Date(baseDate.getTime() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString();
      problem.solution = {
        id: `solution-${i}`,
        problemId: problem.id,
        description: 'Implemented automated solution with AI-powered optimization',
        implementedDate: problem.resolvedDate,
        successRate: 70 + Math.random() * 30,
        valueGenerated: Math.floor(50000 + Math.random() * 450000),
        resources: ['Senior Developer', 'Data Scientist', 'Project Manager']
      };
    }
    
    problems.push(problem);
  }
  
  return problems;
}

export const mockClients: Client[] = [
  {
    id: 'client-1',
    name: 'TechCorp Solutions',
    industry: 'Technology',
    contactName: 'Sarah Johnson',
    contactTitle: 'CTO',
    contactEmail: 'sarah.johnson@techcorp.com',
    status: 'active',
    totalValue: 1250000,
    joinedDate: '2023-01-15',
    lastContact: '2024-07-28',
    problems: generateProblems('client-1', 5),
    relationships: []
  },
  {
    id: 'client-2',
    name: 'HealthFirst Medical',
    industry: 'Healthcare',
    contactName: 'Dr. Michael Chen',
    contactTitle: 'VP of Operations',
    contactEmail: 'mchen@healthfirst.com',
    status: 'active',
    totalValue: 980000,
    joinedDate: '2023-03-22',
    lastContact: '2024-07-25',
    problems: generateProblems('client-2', 4),
    relationships: []
  },
  {
    id: 'client-3',
    name: 'Global Finance Partners',
    industry: 'Finance',
    contactName: 'Robert Williams',
    contactTitle: 'Director of Innovation',
    contactEmail: 'rwilliams@gfp.com',
    status: 'active',
    totalValue: 2100000,
    joinedDate: '2022-11-08',
    lastContact: '2024-07-29',
    problems: generateProblems('client-3', 6),
    relationships: []
  },
  {
    id: 'client-4',
    name: 'RetailMax',
    industry: 'Retail',
    contactName: 'Emily Davis',
    contactTitle: 'CEO',
    contactEmail: 'emily.davis@retailmax.com',
    status: 'prospect',
    totalValue: 0,
    joinedDate: '2024-07-01',
    lastContact: '2024-07-20',
    problems: generateProblems('client-4', 2),
    relationships: []
  },
  {
    id: 'client-5',
    name: 'Manufacturing Pro',
    industry: 'Manufacturing',
    contactName: 'James Miller',
    contactTitle: 'Head of Digital Transformation',
    contactEmail: 'jmiller@mfgpro.com',
    status: 'active',
    totalValue: 750000,
    joinedDate: '2023-06-15',
    lastContact: '2024-07-27',
    problems: generateProblems('client-5', 4),
    relationships: []
  },
  {
    id: 'client-6',
    name: 'EnergyNow Corp',
    industry: 'Energy',
    contactName: 'Lisa Thompson',
    contactTitle: 'VP Technology',
    contactEmail: 'lthompson@energynow.com',
    status: 'active',
    totalValue: 1500000,
    joinedDate: '2023-02-01',
    lastContact: '2024-07-26',
    problems: generateProblems('client-6', 5),
    relationships: []
  },
  {
    id: 'client-7',
    name: 'EduTech Solutions',
    industry: 'Education',
    contactName: 'Prof. David Brown',
    contactTitle: 'Chief Innovation Officer',
    contactEmail: 'dbrown@edutech.com',
    status: 'active',
    totalValue: 620000,
    joinedDate: '2023-09-10',
    lastContact: '2024-07-24',
    problems: generateProblems('client-7', 3),
    relationships: []
  },
  {
    id: 'client-8',
    name: 'NextGen Analytics',
    industry: 'Technology',
    contactName: 'Alexandra Kim',
    contactTitle: 'Product Director',
    contactEmail: 'akim@nextgen.com',
    status: 'active',
    totalValue: 890000,
    joinedDate: '2023-04-20',
    lastContact: '2024-07-30',
    problems: generateProblems('client-8', 4),
    relationships: []
  },
  {
    id: 'client-9',
    name: 'SecureBank International',
    industry: 'Finance',
    contactName: 'Thomas Anderson',
    contactTitle: 'CISO',
    contactEmail: 'tanderson@securebank.com',
    status: 'active',
    totalValue: 1750000,
    joinedDate: '2022-12-05',
    lastContact: '2024-07-29',
    problems: generateProblems('client-9', 6),
    relationships: []
  },
  {
    id: 'client-10',
    name: 'SmartHealth Systems',
    industry: 'Healthcare',
    contactName: 'Dr. Patricia Martinez',
    contactTitle: 'Director of Digital Health',
    contactEmail: 'pmartinez@smarthealth.com',
    status: 'prospect',
    totalValue: 0,
    joinedDate: '2024-06-15',
    lastContact: '2024-07-22',
    problems: generateProblems('client-10', 2),
    relationships: []
  }
];

export const mockTeamMembers: TeamMember[] = [
  {
    id: 'team-1',
    name: 'John Smith',
    role: 'Solutions Architect',
    skills: [
      { name: 'Cloud Architecture', level: 'expert', category: 'Technical' },
      { name: 'System Design', level: 'expert', category: 'Technical' },
      { name: 'Leadership', level: 'advanced', category: 'Soft Skills' }
    ],
    availability: 85
  },
  {
    id: 'team-2',
    name: 'Maria Garcia',
    role: 'Data Scientist',
    skills: [
      { name: 'Machine Learning', level: 'expert', category: 'Technical' },
      { name: 'Data Analysis', level: 'expert', category: 'Technical' },
      { name: 'Python', level: 'expert', category: 'Programming' }
    ],
    availability: 90
  },
  {
    id: 'team-3',
    name: 'David Lee',
    role: 'Project Manager',
    skills: [
      { name: 'Agile/Scrum', level: 'expert', category: 'Methodology' },
      { name: 'Stakeholder Management', level: 'advanced', category: 'Soft Skills' },
      { name: 'Risk Management', level: 'advanced', category: 'Management' }
    ],
    availability: 75
  },
  {
    id: 'team-4',
    name: 'Emma Wilson',
    role: 'UX Designer',
    skills: [
      { name: 'UI/UX Design', level: 'expert', category: 'Design' },
      { name: 'User Research', level: 'advanced', category: 'Research' },
      { name: 'Prototyping', level: 'expert', category: 'Design' }
    ],
    availability: 95
  },
  {
    id: 'team-5',
    name: 'Carlos Rodriguez',
    role: 'Security Specialist',
    skills: [
      { name: 'Cybersecurity', level: 'expert', category: 'Security' },
      { name: 'Penetration Testing', level: 'advanced', category: 'Security' },
      { name: 'Compliance', level: 'advanced', category: 'Governance' }
    ],
    availability: 80
  },
  {
    id: 'team-6',
    name: 'Sophie Chen',
    role: 'Business Analyst',
    skills: [
      { name: 'Requirements Analysis', level: 'expert', category: 'Analysis' },
      { name: 'Process Modeling', level: 'advanced', category: 'Analysis' },
      { name: 'Data Visualization', level: 'advanced', category: 'Technical' }
    ],
    availability: 88
  },
  {
    id: 'team-7',
    name: 'Michael Brown',
    role: 'DevOps Engineer',
    skills: [
      { name: 'CI/CD', level: 'expert', category: 'DevOps' },
      { name: 'Kubernetes', level: 'advanced', category: 'Infrastructure' },
      { name: 'AWS', level: 'expert', category: 'Cloud' }
    ],
    availability: 70
  },
  {
    id: 'team-8',
    name: 'Rachel Green',
    role: 'Product Manager',
    skills: [
      { name: 'Product Strategy', level: 'expert', category: 'Product' },
      { name: 'Market Analysis', level: 'advanced', category: 'Business' },
      { name: 'Customer Success', level: 'advanced', category: 'Business' }
    ],
    availability: 82
  }
];

export const mockValueMetrics: ValueMetric[] = Array.from({ length: 6 }, (_, i) => {
  const date = new Date();
  date.setMonth(date.getMonth() - (5 - i));
  const internal = 200000 + Math.random() * 300000;
  const external = 400000 + Math.random() * 600000;
  
  return {
    date: date.toISOString().split('T')[0],
    internalValue: Math.floor(internal),
    externalValue: Math.floor(external),
    totalValue: Math.floor(internal + external)
  };
});

export const mockActivities: Activity[] = [
  {
    id: 'act-1',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    type: 'problem-solved',
    title: 'Resolved critical security vulnerability',
    description: 'Implemented enhanced security measures for SecureBank International',
    clientId: 'client-9'
  },
  {
    id: 'act-2',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    type: 'client-added',
    title: 'New prospect: SmartHealth Systems',
    description: 'Initial consultation scheduled for digital health transformation',
    clientId: 'client-10'
  },
  {
    id: 'act-3',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    type: 'milestone-reached',
    title: '$2M revenue milestone achieved',
    description: 'Q3 revenue targets exceeded by 15%'
  },
  {
    id: 'act-4',
    timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    type: 'team-update',
    title: 'New team member joined',
    description: 'Senior ML Engineer added to strengthen AI capabilities'
  },
  {
    id: 'act-5',
    timestamp: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
    type: 'problem-solved',
    title: 'Optimized data processing pipeline',
    description: 'Reduced processing time by 60% for TechCorp Solutions',
    clientId: 'client-1'
  }
];

export const mockGoals: Goal[] = [
  {
    id: 'goal-1',
    title: 'Annual Revenue Target',
    category: 'revenue',
    target: 10000000,
    current: 7500000,
    deadline: '2024-12-31',
    status: 'on-track'
  },
  {
    id: 'goal-2',
    title: 'Client Acquisition Q4',
    category: 'client-acquisition',
    target: 5,
    current: 2,
    deadline: '2024-12-31',
    status: 'at-risk'
  },
  {
    id: 'goal-3',
    title: 'Team Expansion',
    category: 'team-growth',
    target: 15,
    current: 8,
    deadline: '2024-09-30',
    status: 'behind'
  },
  {
    id: 'goal-4',
    title: 'Healthcare Market Penetration',
    category: 'market-expansion',
    target: 8,
    current: 4,
    deadline: '2024-12-31',
    status: 'on-track'
  }
];

export const mockResourceGaps: ResourceGap[] = [
  {
    pillar: 'Data & Analytics',
    required: 5,
    current: 2,
    priority: 'critical',
    skills: ['Data Engineering', 'ML/AI', 'Business Intelligence']
  },
  {
    pillar: 'Cloud Infrastructure',
    required: 4,
    current: 3,
    priority: 'medium',
    skills: ['AWS', 'Azure', 'DevOps']
  },
  {
    pillar: 'Security & Compliance',
    required: 3,
    current: 1,
    priority: 'high',
    skills: ['Security Architecture', 'Compliance', 'Risk Management']
  },
  {
    pillar: 'Product Management',
    required: 3,
    current: 2,
    priority: 'medium',
    skills: ['Product Strategy', 'Customer Research', 'Roadmap Planning']
  }
];

export const getClientsByIndustry = () => {
  const industryCount: Record<string, number> = {};
  mockClients.forEach(client => {
    industryCount[client.industry] = (industryCount[client.industry] || 0) + 1;
  });
  
  return Object.entries(industryCount).map(([industry, count]) => ({
    industry,
    count
  }));
};

export const getTotalStats = () => {
  const totalClients = mockClients.length;
  const activeProblems = mockClients.reduce((sum, client) => 
    sum + client.problems.filter(p => p.status !== 'resolved').length, 0
  );
  const solutionsDelivered = mockClients.reduce((sum, client) => 
    sum + client.problems.filter(p => p.status === 'resolved').length, 0
  );
  const totalValue = mockClients.reduce((sum, client) => sum + client.totalValue, 0);
  
  return {
    totalClients,
    activeProblems,
    solutionsDelivered,
    totalValue
  };
};