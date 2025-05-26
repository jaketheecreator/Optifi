import { useEffect, useState } from 'react';
import Head from 'next/head';

export default function Trading() {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [currentMode, setCurrentMode] = useState('simple');
  const [selectedPair, setSelectedPair] = useState('SOL/USDC');
  const [orderType, setOrderType] = useState('market');
  const [orderSide, setOrderSide] = useState('buy');

  useEffect(() => {
    // Initialize sidebar state from localStorage
    const isExpanded = localStorage.getItem('sidebarExpanded') === 'true';
    setSidebarExpanded(isExpanded);
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
  };

  const navigateTo = (page) => {
    window.location.href = page;
  };

  return (
    <>
      <Head>
        <title>Optifi - Trading</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </Head>
      
      <div className={`trading-page ${currentMode}-mode`}>
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
            <div className="nav-item" onClick={() => navigateTo('/')}>
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
            
            <div className="nav-item active">
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
              <h1>Trading</h1>
              <div className="page-subtitle">Advanced trading interface</div>
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
          
          {/* TRADING CONTENT */}
          <div className="trading-container">
            {/* TRADING HEADER */}
            <div className="trading-header">
              <div className="pair-info">
                <div className="pair-selector">
                  <h2 className="pair-name">{selectedPair}</h2>
                  <div className="pair-price">$23.45</div>
                  <div className="pair-change positive">+2.34%</div>
                </div>
                
                <div className="pair-stats">
                  <div className="stat-item">
                    <span className="stat-label">24h High</span>
                    <span className="stat-value">$24.12</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">24h Low</span>
                    <span className="stat-value">$22.89</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Volume</span>
                    <span className="stat-value">1.2M</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* CHART AREA */}
            <div className="chart-area">
              <div className="chart-header">
                <div className="chart-tabs">
                  <button className="chart-tab active">Price</button>
                  <button className="chart-tab">Depth</button>
                  <button className="chart-tab">Trades</button>
                </div>
                
                <div className="timeframe-selector">
                  <button className="timeframe-btn">1m</button>
                  <button className="timeframe-btn">5m</button>
                  <button className="timeframe-btn active">1h</button>
                  <button className="timeframe-btn">4h</button>
                  <button className="timeframe-btn">1d</button>
                </div>
              </div>
              
              <div className="chart-container">
                <svg className="trading-chart" viewBox="0 0 800 400">
                  <defs>
                    <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="rgba(139, 92, 246, 0.3)" />
                      <stop offset="100%" stopColor="rgba(139, 92, 246, 0.05)" />
                    </linearGradient>
                  </defs>
                  
                  {/* Chart Grid */}
                  <g className="chart-grid">
                    {[...Array(10)].map((_, i) => (
                      <line key={i} x1="0" y1={i * 40} x2="800" y2={i * 40} stroke="rgba(255,255,255,0.05)" />
                    ))}
                    {[...Array(20)].map((_, i) => (
                      <line key={i} x1={i * 40} y1="0" x2={i * 40} y2="400" stroke="rgba(255,255,255,0.05)" />
                    ))}
                  </g>
                  
                  {/* Price Line */}
                  <path 
                    className="price-line" 
                    d="M0,300 L100,280 L200,320 L300,250 L400,270 L500,200 L600,220 L700,180 L800,160" 
                    fill="none" 
                    stroke="url(#chartGradient)" 
                    strokeWidth="3"
                  />
                  
                  {/* Area Fill */}
                  <path 
                    className="price-area" 
                    d="M0,300 L100,280 L200,320 L300,250 L400,270 L500,200 L600,220 L700,180 L800,160 L800,400 L0,400 Z" 
                    fill="url(#chartGradient)"
                  />
                </svg>
              </div>
            </div>
            
            {/* ORDER PANEL */}
            <div className="order-panel">
              <div className="order-tabs">
                <button 
                  className={`order-tab ${orderSide === 'buy' ? 'active buy' : ''}`}
                  onClick={() => setOrderSide('buy')}
                >
                  Buy
                </button>
                <button 
                  className={`order-tab ${orderSide === 'sell' ? 'active sell' : ''}`}
                  onClick={() => setOrderSide('sell')}
                >
                  Sell
                </button>
              </div>
              
              <div className="order-form">
                <div className="order-type-selector">
                  <button 
                    className={`type-btn ${orderType === 'market' ? 'active' : ''}`}
                    onClick={() => setOrderType('market')}
                  >
                    Market
                  </button>
                  <button 
                    className={`type-btn ${orderType === 'limit' ? 'active' : ''}`}
                    onClick={() => setOrderType('limit')}
                  >
                    Limit
                  </button>
                </div>
                
                <div className="input-group">
                  <label>Amount (SOL)</label>
                  <input type="number" placeholder="0.00" className="order-input" />
                  <div className="input-info">Available: 12.5 SOL</div>
                </div>
                
                {orderType === 'limit' && (
                  <div className="input-group">
                    <label>Price (USDC)</label>
                    <input type="number" placeholder="23.45" className="order-input" />
                  </div>
                )}
                
                <div className="input-group">
                  <label>Total (USDC)</label>
                  <input type="number" placeholder="0.00" className="order-input" />
                </div>
                
                <button className={`order-submit ${orderSide}`}>
                  {orderSide === 'buy' ? 'Buy SOL' : 'Sell SOL'}
                </button>
              </div>
              
              {/* ORDER BOOK */}
              <div className="order-book">
                <div className="book-header">
                  <h3>Order Book</h3>
                </div>
                
                <div className="book-content">
                  <div className="book-section">
                    <div className="book-header-row">
                      <span>Price</span>
                      <span>Amount</span>
                      <span>Total</span>
                    </div>
                    
                    {/* Sell Orders */}
                    <div className="sell-orders">
                      {[
                        { price: '23.47', amount: '12.5', total: '293.38' },
                        { price: '23.46', amount: '8.2', total: '192.37' },
                        { price: '23.45', amount: '15.7', total: '368.17' },
                      ].map((order, i) => (
                        <div key={i} className="book-row sell">
                          <span className="price">{order.price}</span>
                          <span className="amount">{order.amount}</span>
                          <span className="total">{order.total}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="spread">
                      <span>Spread: 0.02 (0.08%)</span>
                    </div>
                    
                    {/* Buy Orders */}
                    <div className="buy-orders">
                      {[
                        { price: '23.43', amount: '10.3', total: '241.33' },
                        { price: '23.42', amount: '7.8', total: '182.68' },
                        { price: '23.41', amount: '20.1', total: '470.54' },
                      ].map((order, i) => (
                        <div key={i} className="book-row buy">
                          <span className="price">{order.price}</span>
                          <span className="amount">{order.amount}</span>
                          <span className="total">{order.total}</span>
                        </div>
                      ))}
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
            --secondary-purple: #7C3AED;
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
            --pink: #EC4899;
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
            background: var(--bg-primary);
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
            position: relative;
            z-index: 1;
          }
          
          .sidebar.expanded + .main-content {
            margin-left: 240px;
          }
          
          .top-nav {
            height: 80px;
            background: var(--bg-primary);
            border-bottom: 1px solid var(--nav-border);
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 32px;
          }
          
          .page-title h1 {
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 4px;
          }
          
          .page-subtitle {
            font-size: 14px;
            color: var(--text-secondary);
          }
          
          .top-nav-actions {
            display: flex;
            align-items: center;
            gap: 16px;
          }
          
          .mode-switcher {
            display: flex;
            background: var(--bg-tertiary);
            border-radius: 50px;
            padding: 4px;
            border: 1px solid var(--border);
            position: relative;
          }
          
          .mode-switcher::before {
            content: '';
            position: absolute;
            top: 4px;
            left: 4px;
            width: calc(50% - 4px);
            height: calc(100% - 8px);
            background: white;
            border-radius: 50px;
            transition: all 0.3s ease;
            z-index: 1;
          }
          
          .mode-switcher.pro-active::before {
            transform: translateX(100%);
          }
          
          .mode-btn {
            padding: 8px 16px;
            border: none;
            background: transparent;
            color: var(--text-secondary);
            border-radius: 50px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: 600;
            font-size: 13px;
            display: flex;
            align-items: center;
            gap: 6px;
            position: relative;
            z-index: 2;
            min-width: 78px;
            justify-content: center;
          }
          
          .mode-btn.active {
            color: var(--bg-primary);
          }
          
          .connect-btn {
            padding: 12px 24px;
            background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
            border: none;
            border-radius: 50px;
            color: white;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
          }
          
          .connect-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(139, 92, 246, 0.4);
          }
          
          .trading-container {
            display: grid;
            grid-template-columns: 1fr 350px;
            grid-template-rows: auto 1fr;
            gap: 0;
            height: calc(100vh - 80px);
          }
          
          .simple-mode .trading-container {
            grid-template-columns: 1fr 380px;
            grid-template-rows: 1fr auto;
          }
          
          .trading-header {
            grid-column: 1 / -1;
            background: var(--bg-secondary);
            padding: 20px 24px;
            border-bottom: 1px solid var(--border);
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          
          .simple-mode .trading-header {
            display: none;
          }
          
          .pair-info {
            display: flex;
            align-items: center;
            gap: 24px;
          }
          
          .pair-name {
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 4px;
          }
          
          .pair-price {
            font-size: 20px;
            font-weight: 600;
          }
          
          .pair-change {
            font-size: 14px;
            font-weight: 600;
          }
          
          .pair-change.positive {
            color: var(--green);
          }
          
          .pair-change.negative {
            color: var(--red);
          }
          
          .pair-stats {
            display: flex;
            gap: 32px;
          }
          
          .stat-item {
            display: flex;
            flex-direction: column;
            gap: 4px;
          }
          
          .stat-label {
            font-size: 12px;
            color: var(--text-secondary);
          }
          
          .stat-value {
            font-size: 14px;
            font-weight: 600;
          }
          
          .chart-area {
            background: var(--bg-secondary);
            border-right: 1px solid var(--border);
            display: flex;
            flex-direction: column;
          }
          
          .chart-header {
            padding: 16px 24px;
            border-bottom: 1px solid var(--border);
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          
          .chart-tabs {
            display: flex;
            gap: 8px;
          }
          
          .chart-tab {
            padding: 8px 16px;
            background: transparent;
            border: none;
            color: var(--text-secondary);
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: 500;
          }
          
          .chart-tab.active {
            background: var(--primary);
            color: white;
          }
          
          .timeframe-selector {
            display: flex;
            gap: 4px;
          }
          
          .timeframe-btn {
            padding: 6px 12px;
            background: transparent;
            border: 1px solid var(--border);
            color: var(--text-secondary);
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 12px;
            font-weight: 500;
          }
          
          .timeframe-btn.active {
            background: var(--primary);
            border-color: var(--primary);
            color: white;
          }
          
          .chart-container {
            flex: 1;
            padding: 16px;
          }
          
          .trading-chart {
            width: 100%;
            height: 100%;
          }
          
          .price-line {
            stroke: var(--primary);
            stroke-width: 2;
          }
          
          .price-area {
            fill: url(#chartGradient);
          }
          
          .order-panel {
            background: var(--bg-secondary);
            display: flex;
            flex-direction: column;
          }
          
          .order-tabs {
            display: flex;
            border-bottom: 1px solid var(--border);
          }
          
          .order-tab {
            flex: 1;
            padding: 16px;
            background: transparent;
            border: none;
            color: var(--text-secondary);
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: 600;
            border-bottom: 2px solid transparent;
          }
          
          .order-tab.active.buy {
            color: var(--green);
            border-bottom-color: var(--green);
          }
          
          .order-tab.active.sell {
            color: var(--red);
            border-bottom-color: var(--red);
          }
          
          .order-form {
            padding: 24px;
            border-bottom: 1px solid var(--border);
          }
          
          .order-type-selector {
            display: flex;
            gap: 8px;
            margin-bottom: 20px;
          }
          
          .type-btn {
            flex: 1;
            padding: 8px 16px;
            background: var(--bg-tertiary);
            border: 1px solid var(--border);
            color: var(--text-secondary);
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: 500;
          }
          
          .type-btn.active {
            background: var(--primary);
            border-color: var(--primary);
            color: white;
          }
          
          .input-group {
            margin-bottom: 16px;
          }
          
          .input-group label {
            display: block;
            font-size: 14px;
            color: var(--text-secondary);
            margin-bottom: 8px;
            font-weight: 500;
          }
          
          .order-input {
            width: 100%;
            padding: 12px 16px;
            background: var(--bg-tertiary);
            border: 1px solid var(--border);
            border-radius: 8px;
            color: var(--text-primary);
            font-size: 16px;
            outline: none;
            transition: all 0.3s ease;
          }
          
          .order-input:focus {
            border-color: var(--primary);
            box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
          }
          
          .input-info {
            font-size: 12px;
            color: var(--text-tertiary);
            margin-top: 4px;
          }
          
          .order-submit {
            width: 100%;
            padding: 16px;
            border: none;
            border-radius: 8px;
            font-weight: 600;
            font-size: 16px;
            cursor: pointer;
            transition: all 0.3s ease;
          }
          
          .order-submit.buy {
            background: var(--green);
            color: white;
          }
          
          .order-submit.sell {
            background: var(--red);
            color: white;
          }
          
          .order-submit:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
          }
          
          .order-book {
            flex: 1;
            display: flex;
            flex-direction: column;
          }
          
          .book-header {
            padding: 16px 24px;
            border-bottom: 1px solid var(--border);
          }
          
          .book-header h3 {
            font-size: 16px;
            font-weight: 600;
          }
          
          .book-content {
            flex: 1;
            overflow-y: auto;
          }
          
          .book-header-row {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            padding: 8px 16px;
            font-size: 12px;
            color: var(--text-secondary);
            font-weight: 600;
            border-bottom: 1px solid var(--border);
          }
          
          .book-row {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            padding: 6px 16px;
            font-size: 12px;
            transition: all 0.3s ease;
            cursor: pointer;
          }
          
          .book-row:hover {
            background: var(--bg-tertiary);
          }
          
          .book-row.buy .price {
            color: var(--green);
          }
          
          .book-row.sell .price {
            color: var(--red);
          }
          
          .spread {
            padding: 8px 16px;
            text-align: center;
            font-size: 12px;
            color: var(--text-secondary);
            background: var(--bg-tertiary);
            border-top: 1px solid var(--border);
            border-bottom: 1px solid var(--border);
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
            
            .trading-container {
              grid-template-columns: 1fr;
              grid-template-rows: auto auto 1fr;
            }
            
            .order-panel {
              order: 2;
            }
            
            .chart-area {
              order: 3;
            }
          }
        `}</style>
      </div>
    </>
  );
} 