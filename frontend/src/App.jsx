import React, { useState } from 'react';
import DashboardOverview from './components/DashboardOverview';
import DiseasePredictor from './components/DiseasePredictor';
import RouteOptimizer from './components/RouteOptimizer';
import HarvestQueue from './components/HarvestQueue';
import AgriShare from './components/AgriShare';
import MarketHeatmap from './components/MarketHeatmap';
import './index.css';

function App() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="app-layout">
      {/* Sidebar */}
      <div className="sidebar glass-card">
        <h2 style={{ color: 'var(--primary)', marginBottom: '2rem', textAlign: 'center' }}>
          AgriRoute
        </h2>
        
        <ul className="sidebar-menu">
          <li 
            className={activeTab === 'home' ? 'active' : ''} 
            onClick={() => setActiveTab('home')}
          >
            🏠 Dashboard
          </li>
          <li 
            className={activeTab === 'agrishare' ? 'active' : ''} 
            onClick={() => setActiveTab('agrishare')}
          >
            🚜 AgriShare Hub
          </li>
          <li 
            className={activeTab === 'heatmap' ? 'active' : ''} 
            onClick={() => setActiveTab('heatmap')}
          >
            📈 Market Trends
          </li>
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="main-content">
        <div className="header" style={{ textAlign: 'left', marginBottom: '2rem' }}>
          <h1>
            {activeTab === 'home' && 'AgriRoute & SmartAgri Platform'}
            {activeTab === 'agrishare' && 'AgriShare Hub'}
            {activeTab === 'heatmap' && 'Market Trend Heatmap'}
          </h1>
          <p>
            {activeTab === 'home' && 'The digital nervous system for Sri Lankan farmers.'}
            {activeTab === 'agrishare' && 'Rent and share farming equipment with your community.'}
            {activeTab === 'heatmap' && 'Analyze live prices to prevent market flooding.'}
          </p>
        </div>

        <div className="dashboard-container">
          {activeTab === 'home' && (
            <>
              <DashboardOverview />
              <HarvestQueue />
              <RouteOptimizer />
              <DiseasePredictor />
            </>
          )}

          {activeTab === 'agrishare' && <AgriShare />}
          
          {activeTab === 'heatmap' && <MarketHeatmap />}
        </div>
      </div>
    </div>
  );
}

export default App;
