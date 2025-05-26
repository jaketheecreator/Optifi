import { useEffect, useState } from 'react';
import Head from 'next/head';

export default function Portfolio() {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [currentMode, setCurrentMode] = useState('simple');

  useEffect(() => {
    // Initialize sidebar state from localStorage
    const isExpanded = localStorage.getItem('sidebarExpanded') === 'true';
    setSidebarExpanded(isExpanded);
    
    // Initialize chart after component mounts
    setTimeout(() => {
      initializeChart();
      animateChart();
    }, 100);
  }, []);

  const toggleSidebar = () => {
    const newExpanded = !sidebarExpanded;
    setSidebarExpanded(newExpanded);
    localStorage.setItem('sidebarExpanded', newExpanded);
  };

  const setMode = (mode) => {
    setCurrentMode(mode);
    const body = document.body;
    if (mode === 'pro') {
      body.classList.remove('simple-mode');
      body.classList.add('pro-mode');
    } else {
      body.classList.remove('pro-mode');
      body.classList.add('simple-mode');
    }
    
    // Re-animate chart after mode change
    setTimeout(() => {
      animateChart();
    }, 300);
  };

  const navigateTo = (page) => {
    window.location.href = page;
  };

  const initializeChart = () => {
    const chartPoints = document.querySelectorAll('.chart-point');
    const tooltip = document.getElementById('chartTooltip');
    
    if (!tooltip) return;
    
    chartPoints.forEach(point => {
      point.addEventListener('mouseenter', (e) => {
        const date = e.target.getAttribute('data-date');
        const value = e.target.getAttribute('data-value');
        
        tooltip.querySelector('.tooltip-date').textContent = date;
        tooltip.querySelector('.tooltip-value').textContent = value;
        
        const rect = e.target.getBoundingClientRect();
        const containerRect = e.target.closest('.chart-container').getBoundingClientRect();
        
        tooltip.style.left = (rect.left - containerRect.left + 10) + 'px';
        tooltip.style.top = (rect.top - containerRect.top - 50) + 'px';
        tooltip.classList.add('show');
        
        e.target.style.filter = 'drop-shadow(0 0 15px rgba(139, 92, 246, 1))';
      });
      
      point.addEventListener('mouseleave', (e) => {
        tooltip.classList.remove('show');
        e.target.style.filter = 'drop-shadow(0 0 6px rgba(139, 92, 246, 0.8))';
      });
    });
  };

  const animateChart = () => {
    const chartLine = document.querySelector('.chart-line');
    const chartArea = document.querySelector('.chart-area');
    const chartPoints = document.querySelectorAll('.chart-point');
    
    if (!chartLine) return;
    
    // Reset animations
    chartLine.style.strokeDasharray = '1000';
    chartLine.style.strokeDashoffset = '1000';
    chartArea.style.opacity = '0';
    
    chartPoints.forEach((point, index) => {
      point.style.opacity = '0';
      point.style.transform = 'scale(0)';
    });
    
    // Animate line
    setTimeout(() => {
      chartLine.style.transition = 'stroke-dashoffset 2s ease-out';
      chartLine.style.strokeDashoffset = '0';
    }, 100);
    
    // Animate area
    setTimeout(() => {
      chartArea.style.transition = 'opacity 1s ease-out';
      chartArea.style.opacity = '0.8';
    }, 500);
    
    // Animate points
    chartPoints.forEach((point, index) => {
      setTimeout(() => {
        point.style.transition = 'all 0.5s ease-out';
        point.style.opacity = '1';
        point.style.transform = 'scale(1)';
      }, 800 + (index * 200));
    });
  };

  return (
    <>
      <Head>
        <title>Optifi - Portfolio Dashboard</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </Head>
      
      <div className={`portfolio-container ${currentMode}-mode`}>
        {/* SIDEBAR */}
        <aside className={`sidebar ${sidebarExpanded ? 'expanded' : ''}`} id="sidebar">
          <div className="sidebar-header">
            <div className="logo">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white"/>
                <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" fill="none"/>
                <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" fill="none"/>
              </svg>
            </div>
            <div className="logo-text">Optifi</div>
            
            <button className="collapse-btn" onClick={toggleSidebar}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
          </div>
          
          <nav className="nav-menu">
            <div className="nav-item active">
              <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
              </svg>
              <span className="nav-text">Portfolio</span>
            </div>
            
            <div className="nav-item" onClick={() => navigateTo('/swap')}>
              <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="17 1 21 5 17 9"></polyline>
                <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
                <polyline points="7 23 3 19 7 15"></polyline>
                <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
              </svg>
              <span className="nav-text">Swap</span>
            </div>
            
            <div className="nav-item" onClick={() => navigateTo('/trading')}>
              <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="22,6 13.5,14.5 8.5,9.5 2,16"></polyline>
                <polyline points="16,6 22,6 22,12"></polyline>
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" fill="none"></rect>
              </svg>
              <span className="nav-text">Trading</span>
            </div>
            
            <div className="nav-item">
              <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                <polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline>
                <polyline points="7.5 19.79 7.5 14.6 3 12"></polyline>
                <polyline points="21 12 16.5 14.6 16.5 19.79"></polyline>
              </svg>
              <span className="nav-text">Bridge</span>
            </div>
          </nav>
        </aside>
        
        {/* MAIN CONTENT */}
        <main className="main-content">
          {/* TOP NAVIGATION */}
          <header className="top-nav">
            <div className="page-title">
              <h1>Portfolio</h1>
              <div className="page-subtitle">Your Portfolio Overview</div>
            </div>
            
            <div className="top-nav-actions">
              <div className="mode-switcher" id="modeSwitcher">
                <button 
                  className={`mode-btn ${currentMode === 'simple' ? 'active' : ''}`} 
                  onClick={() => setMode('simple')}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                  </svg>
                  Easy
                </button>
                <button 
                  className={`mode-btn ${currentMode === 'pro' ? 'active' : ''}`} 
                  onClick={() => setMode('pro')}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                  </svg>
                  Pro
                </button>
              </div>
              
              <button className="connect-btn">
                Connect
              </button>
            </div>
          </header>
          
          {/* CONTENT */}
          <div className="content">
            {/* STATS GRID */}
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-value">$82,345.67</div>
                <div className="stat-label">Vaults Value</div>
              </div>
              
              <div className="stat-card">
                <div className="stat-value">$1,345.67</div>
                <div className="stat-label">
                  Return on Investment
                  <span className="stat-change">+5.45%</span>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-value">$145.67</div>
                <div className="stat-label">
                  This Week
                  <span className="stat-change">+1.45%</span>
                </div>
              </div>
              
              <div className="stat-card pro-feature">
                <div className="stat-value">$2,456.89</div>
                <div className="stat-label">
                  Monthly Yield
                  <span className="stat-change">+12.3%</span>
                </div>
              </div>
            </div>
            
            {/* DASHBOARD GRID */}
            <div className="dashboard-grid">
              <div className="performance-card">
                <div className="performance-header">
                  <div>
                    <div className="performance-title">Portfolio Performance</div>
                    <div className="performance-value">$2,974.12</div>
                    <div className="performance-change">+$234.56 (8.56%) today</div>
                  </div>
                  
                  <div className="timeframe-tabs">
                    <button className="timeframe-tab active">1D</button>
                    <button className="timeframe-tab">1W</button>
                    <button className="timeframe-tab">1M</button>
                    <button className="timeframe-tab">1Y</button>
                  </div>
                </div>
                
                <div className="chart-container">
                  <svg className="chart-svg" viewBox="0 0 400 200">
                    <defs>
                      <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#8B5CF6" />
                        <stop offset="50%" stopColor="#3B82F6" />
                        <stop offset="100%" stopColor="#10B981" />
                      </linearGradient>
                      <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="rgba(139, 92, 246, 0.3)" />
                        <stop offset="100%" stopColor="rgba(139, 92, 246, 0.05)" />
                      </linearGradient>
                    </defs>
                    
                    <path className="chart-area" d="M20,150 L60,120 L100,140 L140,100 L180,110 L220,80 L260,90 L300,60 L340,70 L380,50 L380,180 L20,180 Z" />
                    <path className="chart-line" d="M20,150 L60,120 L100,140 L140,100 L180,110 L220,80 L260,90 L300,60 L340,70 L380,50" />
                    
                    <circle className="chart-point" cx="20" cy="150" r="4" data-date="Jan 1" data-value="$2,456" />
                    <circle className="chart-point" cx="60" cy="120" r="4" data-date="Jan 8" data-value="$2,678" />
                    <circle className="chart-point" cx="100" cy="140" r="4" data-date="Jan 15" data-value="$2,534" />
                    <circle className="chart-point" cx="140" cy="100" r="4" data-date="Jan 22" data-value="$2,789" />
                    <circle className="chart-point" cx="180" cy="110" r="4" data-date="Jan 29" data-value="$2,723" />
                    <circle className="chart-point" cx="220" cy="80" r="4" data-date="Feb 5" data-value="$2,856" />
                    <circle className="chart-point" cx="260" cy="90" r="4" data-date="Feb 12" data-value="$2,812" />
                    <circle className="chart-point" cx="300" cy="60" r="4" data-date="Feb 19" data-value="$2,934" />
                    <circle className="chart-point" cx="340" cy="70" r="4" data-date="Feb 26" data-value="$2,889" />
                    <circle className="chart-point" cx="380" cy="50" r="4" data-date="Today" data-value="$2,974" />
                  </svg>
                  
                  <div className="chart-tooltip" id="chartTooltip">
                    <div className="tooltip-date"></div>
                    <div className="tooltip-value"></div>
                  </div>
                </div>
              </div>
              
              <div className="holdings-card">
                <div className="holdings-header">
                  <div className="holdings-title">Holdings</div>
                  <div className="holdings-count">4 assets</div>
                </div>
                
                <div className="holding-item">
                  <div className="holding-info">
                    <div className="token-icon" style={{background: 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)'}}>O</div>
                    <div className="token-details">
                      <div className="token-name">Optifi</div>
                      <div className="token-network">
                        <span className="network-badge">Solana</span>
                        DeFi Protocol
                      </div>
                    </div>
                  </div>
                  <div className="holding-value">
                    <div className="value-amount">$1,234.56</div>
                    <div className="value-positions">
                      <span className="position-indicator"></span>
                      3 positions
                    </div>
                  </div>
                </div>
                
                <div className="holding-item">
                  <div className="holding-info">
                    <div className="token-icon" style={{background: 'linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)'}}>C</div>
                    <div className="token-details">
                      <div className="token-name">CROCO</div>
                      <div className="token-network">
                        <span className="network-badge">Solana</span>
                        NFT Project
                      </div>
                    </div>
                  </div>
                  <div className="holding-value">
                    <div className="value-amount">$987.65</div>
                    <div className="value-positions">
                      <span className="position-indicator"></span>
                      12 NFTs
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        
        <style jsx global>{`
          :root {
            --primary: #8B5CF6;
            --primary-light: #A78BFA;
            --accent: #F59E0B;
            --bg-primary: #0A0A0B;
            --bg-secondary: #111111;
            --bg-tertiary: #1A1A1B;
            --card-bg: #161618;
            --border: rgba(255, 255, 255, 0.06);
            --text-primary: #FFFFFF;
            --text-secondary: rgba(255, 255, 255, 0.7);
            --text-tertiary: rgba(255, 255, 255, 0.4);
            --green: #10B981;
            --red: #EF4444;
            --blue: #3B82F6;
            --yellow: #F59E0B;
            --sidebar-bg: #1e1e1e;
            --nav-hover: #2d2d2d;
            --nav-active: #8B5CF6;
            --nav-border: #333333;
          }
          
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: 'Red Hat Display', sans-serif;
            background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
            color: var(--text-primary);
            min-height: 100vh;
            overflow-x: hidden;
          }
          
          .sidebar {
            position: fixed;
            top: 0;
            left: 0;
            height: 100vh;
            width: 80px;
            background: var(--sidebar-bg);
            border-right: 1px solid var(--nav-border);
            transition: width 0.3s ease;
            z-index: 1000;
            display: flex;
            flex-direction: column;
          }
          
          .sidebar.expanded {
            width: 240px;
          }
          
          .sidebar-header {
            height: 80px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-bottom: 1px solid var(--nav-border);
            position: relative;
          }
          
          .sidebar.expanded .sidebar-header {
            justify-content: flex-start;
            padding-left: 24px;
          }
          
          .logo {
            width: 40px;
            height: 40px;
            background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
          }
          
          .logo-text {
            margin-left: 16px;
            font-size: 20px;
            font-weight: 700;
            opacity: 0;
            transition: opacity 0.3s ease;
            white-space: nowrap;
          }
          
          .sidebar.expanded .logo-text {
            opacity: 1;
          }
          
          .collapse-btn {
            position: absolute;
            top: 50%;
            right: -12px;
            transform: translateY(-50%);
            width: 24px;
            height: 24px;
            background: var(--bg-secondary);
            border: 1px solid var(--nav-border);
            border-radius: 50%;
            color: var(--text-secondary);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
          }
          
          .collapse-btn:hover {
            background: var(--nav-hover);
            color: var(--text-primary);
          }
          
          .nav-menu {
            flex: 1;
            padding: 24px 0;
          }
          
          .nav-item {
            height: 56px;
            margin: 4px 12px 4px 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
            width: 48px;
          }
          
          .sidebar.expanded .nav-item {
            justify-content: flex-start;
            padding-left: 20px;
            width: auto;
            margin: 4px 16px;
          }
          
          .nav-item:hover {
            background: var(--nav-hover);
          }
          
          .nav-item.active {
            background: var(--nav-active);
          }
          
          .nav-icon {
            width: 24px;
            height: 24px;
            color: var(--text-secondary);
            flex-shrink: 0;
            transition: color 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          .nav-item:hover .nav-icon,
          .nav-item.active .nav-icon {
            color: var(--text-primary);
          }
          
          .nav-text {
            margin-left: 16px;
            font-weight: 500;
            opacity: 0;
            transition: opacity 0.3s ease;
            white-space: nowrap;
            overflow: hidden;
          }
          
          .sidebar.expanded .nav-text {
            opacity: 1;
          }
          
          .main-content {
            margin-left: 80px;
            transition: margin-left 0.3s ease;
            min-height: 100vh;
          }
          
          .sidebar.expanded + .main-content {
            margin-left: 240px;
          }
          
          .top-nav {
            height: 80px;
            background: rgba(22, 22, 24, 0.8);
            backdrop-filter: blur(20px);
            border-bottom: 1px solid var(--border);
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 32px;
            position: sticky;
            top: 0;
            z-index: 100;
          }
          
          .page-title h1 {
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 4px;
          }
          
          .page-subtitle {
            color: var(--text-secondary);
            font-size: 14px;
          }
          
          .top-nav-actions {
            display: flex;
            align-items: center;
            gap: 16px;
          }
          
          .mode-switcher {
            display: flex;
            background: var(--bg-tertiary);
            border-radius: 12px;
            padding: 4px;
            border: 1px solid var(--border);
          }
          
          .mode-btn {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 8px 16px;
            border: none;
            background: transparent;
            color: var(--text-secondary);
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 14px;
            font-weight: 500;
          }
          
          .mode-btn.active {
            background: var(--primary);
            color: white;
          }
          
          .connect-btn {
            background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 12px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
          }
          
          .connect-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(139, 92, 246, 0.3);
          }
          
          .content {
            padding: 32px;
          }
          
          .simple-mode .pro-feature {
            display: none;
          }
          
          .pro-mode .simple-only {
            display: none;
          }
          
          .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 20px;
            margin-bottom: 32px;
            transition: all 0.3s ease;
          }
          
          .stat-card {
            background: linear-gradient(135deg, var(--card-bg) 0%, var(--bg-tertiary) 100%);
            border-radius: 16px;
            padding: 24px;
            transition: transform 0.3s ease;
            position: relative;
            overflow: hidden;
          }
          
          .stat-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: linear-gradient(90deg, var(--blue) 0%, var(--green) 25%, var(--yellow) 50%, var(--primary) 75%, var(--red) 100%);
          }
          
          .stat-card:hover {
            transform: translateY(-4px);
          }
          
          .stat-value {
            font-size: 24px;
            font-weight: 800;
            margin-bottom: 8px;
          }
          
          .stat-label {
            color: var(--text-secondary);
            font-size: 14px;
            display: flex;
            align-items: center;
            gap: 8px;
          }
          
          .stat-change {
            color: var(--green);
            font-weight: 600;
          }
          
          .dashboard-grid {
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 24px;
            transition: all 0.3s ease;
          }
          
          .performance-card, .holdings-card {
            background: linear-gradient(135deg, var(--card-bg) 0%, var(--bg-tertiary) 100%);
            border-radius: 16px;
            padding: 24px;
          }
          
          .performance-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 24px;
          }
          
          .performance-title {
            font-size: 18px;
            font-weight: 700;
          }
          
          .performance-value {
            font-size: 28px;
            font-weight: 800;
            margin-bottom: 4px;
          }
          
          .performance-change {
            color: var(--green);
            font-size: 14px;
            font-weight: 600;
          }
          
          .timeframe-tabs {
            display: flex;
            background: var(--bg-tertiary);
            border-radius: 8px;
            padding: 4px;
          }
          
          .timeframe-tab {
            padding: 6px 12px;
            border: none;
            background: transparent;
            color: var(--text-secondary);
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 12px;
            font-weight: 500;
          }
          
          .timeframe-tab.active {
            background: var(--primary);
            color: white;
          }
          
          .chart-container {
            height: 240px;
            margin-top: 16px;
            position: relative;
            width: 100%;
            background: linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, rgba(59, 130, 246, 0.05) 100%);
            border-radius: 12px;
            overflow: hidden;
          }
          
          .chart-svg {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }
          
          .chart-line {
            fill: none;
            stroke: url(#lineGradient);
            stroke-width: 3;
            stroke-linecap: round;
            stroke-linejoin: round;
            filter: drop-shadow(0 0 8px rgba(139, 92, 246, 0.6));
          }
          
          .chart-area {
            fill: url(#areaGradient);
            opacity: 0.8;
          }
          
          .chart-point {
            fill: #8B5CF6;
            stroke: white;
            stroke-width: 2;
            filter: drop-shadow(0 0 6px rgba(139, 92, 246, 0.8));
            cursor: pointer;
            transition: all 0.3s ease;
          }
          
          .chart-point:hover {
            r: 6;
            fill: #A78BFA;
            filter: drop-shadow(0 0 12px rgba(139, 92, 246, 1));
          }
          
          .chart-tooltip {
            position: absolute;
            background: rgba(22, 22, 24, 0.95);
            border: 1px solid rgba(139, 92, 246, 0.3);
            border-radius: 8px;
            padding: 8px 12px;
            font-size: 12px;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.3s ease;
            z-index: 10;
          }
          
          .chart-tooltip.show {
            opacity: 1;
          }
          
          .holdings-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
          }
          
          .holdings-title {
            font-size: 18px;
            font-weight: 700;
          }
          
          .holdings-count {
            color: var(--text-secondary);
            font-size: 14px;
          }
          
          .holding-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 16px 0;
            border-bottom: 1px solid var(--border);
          }
          
          .holding-item:last-child {
            border-bottom: none;
          }
          
          .holding-info {
            display: flex;
            align-items: center;
            gap: 12px;
          }
          
          .token-icon {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            color: white;
          }
          
          .token-name {
            font-weight: 600;
            margin-bottom: 4px;
          }
          
          .token-network {
            font-size: 12px;
            color: var(--text-secondary);
            display: flex;
            align-items: center;
            gap: 8px;
          }
          
          .network-badge {
            background: var(--primary);
            color: white;
            padding: 2px 6px;
            border-radius: 4px;
            font-size: 10px;
            font-weight: 600;
          }
          
          .holding-value {
            text-align: right;
          }
          
          .value-amount {
            font-weight: 600;
            margin-bottom: 4px;
          }
          
          .value-positions {
            font-size: 12px;
            color: var(--text-secondary);
            display: flex;
            align-items: center;
            gap: 4px;
          }
          
          .position-indicator {
            width: 6px;
            height: 6px;
            background: var(--green);
            border-radius: 50%;
          }
          
          @media (max-width: 768px) {
            .sidebar {
              width: 16px;
            }
            
            .sidebar.expanded {
              width: 240px;
            }
            
            .main-content {
              margin-left: 16px;
            }
            
            .sidebar.expanded + .main-content {
              margin-left: 240px;
            }
            
            .dashboard-grid {
              grid-template-columns: 1fr;
            }
            
            .content {
              padding: 16px;
            }
            
            .mode-switcher {
              display: none;
            }
          }
        `}</style>
      </div>
    </>
  );
} 