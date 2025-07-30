import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/layout/Sidebar';
import { TopBar } from './components/layout/TopBar';
import { AiInsightsPanel } from './components/layout/AiInsightsPanel';
import { Dashboard } from './pages/Dashboard';
import { Clients } from './pages/Clients';
import { ProblemsMatrix } from './pages/ProblemsMatrix';
import { TeamGaps } from './pages/TeamGaps';
import { GrowthStrategy } from './pages/GrowthStrategy';

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Sidebar isCollapsed={sidebarCollapsed} setIsCollapsed={setSidebarCollapsed} />
        <TopBar sidebarCollapsed={sidebarCollapsed} />
        <AiInsightsPanel />
        
        <main className={`
          pt-16 transition-all duration-300
          ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}
        `}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="/problems" element={<ProblemsMatrix />} />
              <Route path="/team" element={<TeamGaps />} />
              <Route path="/growth" element={<GrowthStrategy />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;