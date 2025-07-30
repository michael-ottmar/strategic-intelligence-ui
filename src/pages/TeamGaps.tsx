import React from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { useStore } from '../store/useStore';
import { UserPlus, FileText, TrendingUp, Users } from 'lucide-react';

export const TeamGaps: React.FC = () => {
  const { teamMembers, resourceGaps } = useStore();

  
  const skillMatrix = React.useMemo(() => {
    const matrix: Record<string, Record<string, string>> = {};
    
    teamMembers.forEach(member => {
      member.skills.forEach(skill => {
        if (!matrix[skill.name]) {
          matrix[skill.name] = {};
        }
        matrix[skill.name][member.name] = skill.level;
      });
    });
    
    return matrix;
  }, [teamMembers]);

  const getLevelColor = (level?: string) => {
    switch (level) {
      case 'expert': return 'bg-green-500';
      case 'advanced': return 'bg-blue-500';
      case 'intermediate': return 'bg-yellow-500';
      case 'beginner': return 'bg-orange-500';
      default: return 'bg-gray-200';
    }
  };

  const getLevelText = (level?: string) => {
    switch (level) {
      case 'expert': return 'E';
      case 'advanced': return 'A';
      case 'intermediate': return 'I';
      case 'beginner': return 'B';
      default: return '—';
    }
  };

  const getGapPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-amber-500';
      case 'medium': return 'bg-yellow-500';
      default: return 'bg-green-500';
    }
  };

  const documentationStatus = [
    { name: 'API Documentation', status: 'complete', progress: 100 },
    { name: 'Onboarding Guides', status: 'in-progress', progress: 65 },
    { name: 'Best Practices', status: 'in-progress', progress: 45 },
    { name: 'Architecture Docs', status: 'planned', progress: 15 },
    { name: 'Security Protocols', status: 'complete', progress: 100 },
    { name: 'Client Playbooks', status: 'in-progress', progress: 80 }
  ];

  const hiringPriorities = [
    { role: 'Senior Data Engineer', priority: 'critical', skills: ['Python', 'SQL', 'ETL', 'Cloud'], impact: 'Unlock $2M in AI opportunities' },
    { role: 'Security Architect', priority: 'high', skills: ['Security', 'Compliance', 'Architecture'], impact: 'Enable enterprise client acquisition' },
    { role: 'ML Engineer', priority: 'high', skills: ['Machine Learning', 'Python', 'MLOps'], impact: 'Accelerate AI solution delivery' },
    { role: 'Product Manager', priority: 'medium', skills: ['Product Strategy', 'Analytics', 'UX'], impact: 'Improve client satisfaction by 30%' }
  ];

  return (
    <div>
      <PageHeader 
        title="Team Gap Analysis" 
        description="Identify skill gaps and resource needs across the organization"
        action={
          <button className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm font-medium">
            <UserPlus className="w-4 h-4 mr-2" />
            Add Team Member
          </button>
        }
      />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Skills Heatmap</h2>
          <div className="overflow-x-auto">
            <div className="min-w-max">
              <div className="grid grid-cols-[200px_repeat(8,80px)] gap-1 text-xs">
                <div className="font-medium text-gray-600 p-2">Skill / Team Member</div>
                {teamMembers.map(member => (
                  <div key={member.id} className="font-medium text-gray-600 p-2 text-center truncate" title={member.name}>
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                ))}
                
                {Object.entries(skillMatrix).map(([skill, members]) => (
                  <React.Fragment key={skill}>
                    <div className="font-medium text-gray-900 p-2 truncate" title={skill}>
                      {skill}
                    </div>
                    {teamMembers.map(member => {
                      const level = members[member.name];
                      return (
                        <div
                          key={`${skill}-${member.id}`}
                          className={`${getLevelColor(level)} text-white flex items-center justify-center p-2 rounded font-semibold`}
                          title={`${member.name}: ${level || 'No skill'}`}
                        >
                          {getLevelText(level)}
                        </div>
                      );
                    })}
                  </React.Fragment>
                ))}
              </div>
              
              <div className="mt-4 flex items-center space-x-4 text-xs">
                <span className="text-gray-600">Skill Levels:</span>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-green-500 rounded"></div>
                  <span>Expert</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-blue-500 rounded"></div>
                  <span>Advanced</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-yellow-500 rounded"></div>
                  <span>Intermediate</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-orange-500 rounded"></div>
                  <span>Beginner</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Missing Resources by Pillar</h2>
          <div className="space-y-4">
            {resourceGaps.map((gap, index) => {
              const percentage = (gap.current / gap.required) * 100;
              return (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">{gap.pillar}</span>
                    <span className={`text-sm px-2 py-0.5 rounded-full text-white ${getGapPriorityColor(gap.priority)}`}>
                      {gap.priority}
                    </span>
                  </div>
                  <div className="relative w-full bg-gray-200 rounded-full h-8">
                    <div 
                      className={`absolute top-0 left-0 h-full rounded-full ${getGapPriorityColor(gap.priority)} transition-all duration-300`}
                      style={{ width: `${percentage}%` }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center text-sm font-medium">
                      {gap.current} / {gap.required} resources
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {gap.skills.map((skill, skillIndex) => (
                      <span key={skillIndex} className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Documentation Status</h2>
            <FileText className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            {documentationStatus.map((doc, index) => (
              <div key={index} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">{doc.name}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    doc.status === 'complete' ? 'bg-green-100 text-green-700' :
                    doc.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {doc.status.replace('-', ' ')}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      doc.progress === 100 ? 'bg-green-500' :
                      doc.progress >= 50 ? 'bg-blue-500' :
                      'bg-gray-400'
                    }`}
                    style={{ width: `${doc.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Hiring Priorities</h2>
            <Users className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            {hiringPriorities.map((priority, index) => (
              <div key={index} className="border-l-4 border-gray-200 pl-4 py-2 hover:border-primary transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900">{priority.role}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full text-white ${getGapPriorityColor(priority.priority)}`}>
                        {priority.priority}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{priority.impact}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {priority.skills.map((skill, skillIndex) => (
                        <span key={skillIndex} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <TrendingUp className="w-4 h-4 text-gray-400 flex-shrink-0 ml-2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};