import React from 'react';

const Header = ({ activeSection, setActiveSection }) => {
  const currentTime = new Date().toLocaleString();

  const navItems = [
    { id: 'crypto', label: '📈 Crypto', icon: '₿' },
    { id: 'stocks', label: '📊 Stocks', icon: '📈' },
    { id: 'currency', label: '💱 Currency', icon: '💱' }
  ];

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">💰 Finance Dashboard</div>
        
        <nav className="nav-bar">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => setActiveSection(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </nav>
        
        <div className="last-updated">
          Last updated: {currentTime}
        </div>
      </div>
    </header>
  );
};

export default Header;
