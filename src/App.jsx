import React, { useState, useEffect } from 'react';
import './App.css';
import SensitiveData from './components/SensitiveData';
import PermissionGate from './components/PermissionGate';
import { useGyroscope } from './hooks/useGyroscope';
import { useAuth, AuthProvider } from './context/AuthContext';
import { fetchProtectedData } from './api/api';

const Dashboard = () => {
  const { permissionGranted, requestPermission, privacyLevel, isSupported, setPrivacyLevelManual } = useGyroscope();
  const { logout, token } = useAuth();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (token) {
      fetchProtectedData(token).then(res => setData(res.data)).catch(console.error);
    }
  }, [token]);

  return (
    <PermissionGate
      permissionGranted={permissionGranted}
      requestPermission={requestPermission}
      isSupported={isSupported}
    >
      <div className="dashboard">
        <header className="dashboard-header">
          <h2>GyroPrivacy Vault</h2>
          <button className="logout-btn" onClick={logout}>Sign Out</button>
        </header>

        <div className="demo-controls">
          <label>Simulation Override (Desktop):</label>
          <input
            type="range"
            className="slider"
            min="0" max="1" step="0.01"
            value={privacyLevel}
            onChange={(e) => setPrivacyLevelManual(parseFloat(e.target.value))}
          />
          <span>{(privacyLevel * 100).toFixed(0)}% Obscured</span>
        </div>

        <main className="dashboard-grid">
          <div className="glass-card balance-card">
            <h3>Total Balance</h3>
            <h1 className="balance-amount">
              <SensitiveData privacyLevel={privacyLevel} block>
                <span className="balance-amount-text">$1,459,230.00</span>
              </SensitiveData>
            </h1>
            <p className="account-number">
              <SensitiveData privacyLevel={privacyLevel} block>
                •••• •••• •••• 8374
              </SensitiveData>
            </p>

            <div style={{ marginTop: '30px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', color: '#94a3b8' }}>
                <span>Recent Transfer</span>
                <span>
                  <SensitiveData privacyLevel={privacyLevel}>
                    -$4,200.00
                  </SensitiveData>
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8' }}>
                <span>Direct Deposit</span>
                <span style={{ color: '#4ade80' }}>
                  <SensitiveData privacyLevel={privacyLevel}>
                    +$12,500.00
                  </SensitiveData>
                </span>
              </div>
            </div>
          </div>

          <div className="glass-card secrets-card">
            <h3>Confidential Briefings</h3>
            {data ? (
              <ul className="secrets-list">
                {data.map(item => (
                  <li key={item.id} className="secret-item">
                    <h4>
                      <SensitiveData privacyLevel={privacyLevel} block>
                        {item.title}
                      </SensitiveData>
                    </h4>
                    <p>
                      <SensitiveData privacyLevel={privacyLevel} block>
                        {item.content}
                      </SensitiveData>
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <div style={{ marginTop: '20px', color: '#94a3b8' }}>Loading encrypted data...</div>
            )}
          </div>
        </main>
      </div>
    </PermissionGate>
  );
};

const LoginScreen = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState('demo');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    const res = await login(username, password);
    if (!res.success) {
      setError(res.error);
    }
    setIsLoading(false);
  };

  return (
    <div className="login-container">
      <div className="glass-card login-card">
        <div className="login-header">
          <div className="logo-placeholder">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#6366f1', marginBottom: '16px' }}>
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </div>
          <h2>Secure Login</h2>
          <p>Sign in to access the GyroPrivacy Vault.</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label>Username</label>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} required />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="login-btn" disabled={isLoading}>
            {isLoading ? 'Authenticating...' : 'Access Vault'}
          </button>
        </form>
        <p className="hint">Hint: use <strong>demo / password123</strong></p>
      </div>
    </div>
  );
};

const AppContent = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Dashboard /> : <LoginScreen />;
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;