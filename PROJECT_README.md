# Strategic Intelligence Platform UI

A comprehensive UI mockup for a Strategic Intelligence Platform that collects and visualizes client success data, team capabilities, and growth opportunities.

## Features

### 1. Dashboard
- Hero stats cards showing key metrics
- Client distribution by industry chart
- Value metrics over time (internal vs external)
- Recent activity feed
- Team resource gap alerts

### 2. Clients Management
- Searchable and filterable client list
- Detailed client profiles with contact info
- Problems & solutions timeline
- Value tracking and metrics

### 3. Problems & Solutions Matrix
- Comprehensive data grid with sorting
- Filter by status and severity
- Success rate visualization
- Value generated tracking
- Expandable detail view

### 4. Team Gap Analysis
- Skills heatmap showing expertise distribution
- Resource gaps by pillar with priority levels
- Documentation status tracker
- Hiring priorities with impact analysis

### 5. Growth Strategy
- Sales pipeline funnel visualization
- Lead source distribution
- Niche market opportunities with scoring
- Business goals tracker with progress bars

### 6. AI Insights Panel
- Sliding panel interface (placeholder)
- Sample insights with categorization
- "Ask Claude" input for future integration
- Report generation placeholder

## Tech Stack

- **React** + **TypeScript** + **Vite**
- **Tailwind CSS** for styling
- **Recharts** for data visualizations
- **Lucide React** for icons
- **Zustand** for state management
- **React Router** for navigation

## Getting Started

1. Navigate to the project directory:
   ```bash
   cd strategic-intelligence-ui
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open http://localhost:5173 in your browser

## Project Structure

```
src/
  components/
    layout/         # Navigation, PageHeader, AiInsightsPanel
    dashboard/      # Dashboard-specific components
    clients/        # Client management components
    shared/         # Reusable components (DataTable, Modal, Forms)
  pages/           # Main page components
  data/            # Mock data generation
  store/           # Zustand state management
  types/           # TypeScript interfaces
```

## Design Highlights

- **Clean, professional design** with blue primary color (#3B82F6)
- **Card-based layouts** for better organization
- **Responsive design** with mobile considerations
- **Interactive elements** with hover states and smooth transitions
- **Empty states** with clear CTAs
- **Loading skeletons** for async operations (ready to implement)

## Mock Data

The application includes comprehensive mock data for:
- 10 clients across different industries
- 8 team members with various skill sets
- Historical value metrics for 6 months
- Recent activities and milestones
- Business goals with progress tracking
- Resource gaps and hiring priorities

## Future Enhancements

### Supabase Integration Points (marked with comments)
- Client CRUD operations
- Problem/solution tracking
- Team member management
- Activity logging
- Metrics aggregation

### Claude API Integration Points
- AI-powered insights generation
- Natural language queries about data
- Automated report generation
- Pattern detection and recommendations

## Export Functionality

Export buttons are placed throughout the UI for:
- Dashboard reports (PDF)
- Client data (CSV)
- Problems matrix (CSV)
- Team analysis (PDF)

## Color Palette

- Primary: #3B82F6
- Primary Dark: #2563EB
- Secondary: #10B981
- Warning: #F59E0B
- Danger: #EF4444
- Gray scale from 50 to 900

## Notes for Stakeholders

This is a fully functional prototype demonstrating:
1. **Data Visualization** - Multiple chart types showing different metrics
2. **User Experience** - Intuitive navigation and interactions
3. **Scalability** - Component-based architecture ready for real data
4. **AI Readiness** - Placeholder for Claude integration
5. **Professional Design** - Enterprise-grade UI/UX

The application is production-ready in terms of UI/UX and can be easily connected to backend services.