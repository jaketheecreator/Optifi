import { useEffect, useState } from 'react';
import Head from 'next/head';

export default function Swap() {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [currentMode, setCurrentMode] = useState('simple');
  const [fromToken, setFromToken] = useState('SOL');
  const [toToken, setToToken] = useState('USDC');
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');

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

  const swapTokens = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  return (
    <>
      <Head>
        <title>Optifi - Swap</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </Head>
      
      <div className={`swap-page ${currentMode}-mode`}>
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
            
            <div className="nav-item active">
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
              <h1>Swap</h1>
              <div className="page-subtitle">Exchange tokens instantly</div>
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
          
          {/* SWAP CONTENT */}
          <div className="swap-container">
            <div className="swap-header">
              <h1 className="swap-title">Swap Tokens</h1>
              <p className="swap-subtitle">
                Trade tokens instantly with the best rates across Solana
              </p>
            </div>
            
            <div className="swap-widget">
              <div className="swap-form">
                <div className="token-input-group">
                  <div className="input-label">From</div>
                  <div className="token-input">
                    <div className="token-selector">
                      <div className="token-icon sol">S</div>
                      <span className="token-symbol">{fromToken}</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>
                    <input 
                      type="number" 
                      placeholder="0.00" 
                      className="amount-input"
                      value={fromAmount}
                      onChange={(e) => setFromAmount(e.target.value)}
                    />
                  </div>
                  <div className="balance-info">
                    Balance: 12.5 {fromToken}
                  </div>
                </div>
                
                <div className="swap-arrow-container">
                  <button className="swap-arrow" onClick={swapTokens}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="17 1 21 5 17 9"></polyline>
                      <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
                      <polyline points="7 23 3 19 7 15"></polyline>
                      <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
                    </svg>
                  </button>
                </div>
                
                <div className="token-input-group">
                  <div className="input-label">To</div>
                  <div className="token-input">
                    <div className="token-selector">
                      <div className="token-icon usdc">U</div>
                      <span className="token-symbol">{toToken}</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>
                    <input 
                      type="number" 
                      placeholder="0.00" 
                      className="amount-input"
                      value={toAmount}
                      onChange={(e) => setToAmount(e.target.value)}
                    />
                  </div>
                  <div className="balance-info">
                    Balance: 1,234.56 {toToken}
                  </div>
                </div>
                
                <div className="swap-details">
                  <div className="detail-row">
                    <span>Rate</span>
                    <span>1 SOL = 23.45 USDC</span>
                  </div>
                  <div className="detail-row">
                    <span>Price Impact</span>
                    <span className="positive">0.12%</span>
                  </div>
                  <div className="detail-row">
                    <span>Fee</span>
                    <span>0.3%</span>
                  </div>
                </div>
                
                <button className="swap-button">
                  <span>Swap Tokens</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
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
          
          .swap-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: calc(100vh - 80px);
            padding: 20px;
            position: relative;
          }
          
          .swap-header {
            text-align: center;
            margin-bottom: 40px;
          }
          
          .swap-title {
            font-size: 56px;
            font-weight: 800;
            margin-bottom: 8px;
            background: linear-gradient(135deg, var(--text-primary) 0%, var(--text-secondary) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            line-height: 1.1;
          }
          
          .swap-subtitle {
            font-size: 20px;
            color: var(--text-secondary);
            font-weight: 500;
            max-width: 600px;
            margin: 0 auto;
            line-height: 1.5;
          }
          
          .swap-widget {
            background: linear-gradient(135deg, var(--card-bg) 0%, var(--bg-tertiary) 100%);
            backdrop-filter: blur(20px);
            border-radius: 20px;
            padding: 24px;
            width: 100%;
            max-width: 420px;
            position: relative;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            overflow: hidden;
          }
          
          .swap-widget::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: linear-gradient(90deg, var(--blue) 0%, var(--green) 25%, var(--yellow) 50%, var(--primary) 75%, var(--red) 100%);
          }
          
          .token-input-group {
            margin-bottom: 16px;
          }
          
          .input-label {
            font-size: 14px;
            color: var(--text-secondary);
            margin-bottom: 8px;
            font-weight: 500;
          }
          
          .token-input {
            background: var(--bg-secondary);
            border: 1px solid var(--border);
            border-radius: 12px;
            padding: 16px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            transition: all 0.3s ease;
          }
          
          .token-input:focus-within {
            border-color: var(--primary);
            box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
          }
          
          .token-selector {
            display: flex;
            align-items: center;
            gap: 8px;
            cursor: pointer;
            padding: 8px 12px;
            border-radius: 8px;
            transition: all 0.3s ease;
          }
          
          .token-selector:hover {
            background: var(--bg-tertiary);
          }
          
          .token-icon {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            color: white;
            font-size: 14px;
          }
          
          .token-icon.sol {
            background: linear-gradient(135deg, #9945FF 0%, #14F195 100%);
          }
          
          .token-icon.usdc {
            background: linear-gradient(135deg, #2775CA 0%, #2775CA 100%);
          }
          
          .token-symbol {
            font-weight: 600;
            font-size: 16px;
          }
          
          .amount-input {
            background: transparent;
            border: none;
            color: var(--text-primary);
            font-size: 18px;
            font-weight: 600;
            text-align: right;
            outline: none;
            width: 150px;
          }
          
          .amount-input::placeholder {
            color: var(--text-tertiary);
          }
          
          .balance-info {
            font-size: 12px;
            color: var(--text-tertiary);
            margin-top: 8px;
            text-align: right;
          }
          
          .swap-arrow-container {
            display: flex;
            justify-content: center;
            margin: 16px 0;
          }
          
          .swap-arrow {
            width: 40px;
            height: 40px;
            background: var(--primary);
            border: none;
            border-radius: 50%;
            color: white;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
          }
          
          .swap-arrow:hover {
            transform: rotate(180deg) scale(1.1);
            box-shadow: 0 4px 12px rgba(139, 92, 246, 0.4);
          }
          
          .swap-details {
            background: var(--bg-secondary);
            border-radius: 12px;
            padding: 16px;
            margin: 20px 0;
          }
          
          .detail-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 8px;
            font-size: 14px;
          }
          
          .detail-row:last-child {
            margin-bottom: 0;
          }
          
          .detail-row span:first-child {
            color: var(--text-secondary);
          }
          
          .detail-row span:last-child {
            font-weight: 600;
          }
          
          .positive {
            color: var(--green);
          }
          
          .swap-button {
            width: 100%;
            background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
            border: none;
            border-radius: 12px;
            padding: 16px;
            color: white;
            font-weight: 600;
            font-size: 16px;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
          }
          
          .swap-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(139, 92, 246, 0.4);
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
            
            .swap-title {
              font-size: 36px;
            }
            
            .swap-subtitle {
              font-size: 16px;
            }
            
            .swap-widget {
              margin: 0 16px;
            }
          }
        `}</style>
      </div>
    </>
  );
} 