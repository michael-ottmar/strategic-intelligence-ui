import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/layout/Navigation';
import { AiInsightsPanel } from './components/layout/AiInsightsPanel';
import { Dashboard } from './pages/Dashboard';
import { Clients } from './pages/Clients';
import { ProblemsMatrix } from './pages/ProblemsMatrix';
import { TeamGaps } from './pages/TeamGaps';
import { GrowthStrategy } from './pages/GrowthStrategy';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <AiInsightsPanel />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/problems" element={<ProblemsMatrix />} />
            <Route path="/team" element={<TeamGaps />} />
            <Route path="/growth" element={<GrowthStrategy />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;