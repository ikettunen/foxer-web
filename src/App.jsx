import { useState } from 'react'
import './App.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'foxer2024') {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Invalid credentials');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="login-container">
        <div style={{marginBottom: '20px', textAlign: 'center'}}>
          <img src="/foxer-web/logo.webp" alt="Logo" style={{width: '80px', borderRadius: '12px'}} />
          <h2 style={{fontWeight: 800, marginTop: '10px'}}>Foxer WebApp</h2>
        </div>
        <form onSubmit={handleLogin} className="login-form">
          <div style={{display: 'flex', flexDirection: 'column', gap: '5px'}}>
            <label style={{fontSize: '0.9rem', fontWeight: 600, color: '#374151'}}>Username</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div style={{display: 'flex', flexDirection: 'column', gap: '5px'}}>
            <label style={{fontSize: '0.9rem', fontWeight: 600, color: '#374151'}}>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" style={{marginTop: '10px'}}>Kirjaudu sisään</button>
          {error && <p style={{color: '#dc2626', fontSize: '0.9rem', textAlign: 'center', margin: 0}}>{error}</p>}
        </form>
        <p style={{color: '#6b7280', fontSize: '0.8rem', marginTop: '20px'}}><em>Hint: admin / foxer2024</em></p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <header className="navbar">
        <div className="navbar-brand">
          <img src="/foxer-web/logo.webp" alt="Logo" />
          <h1>Foxer Paragliding</h1>
        </div>
        <button className="navbar-logout" onClick={() => setIsLoggedIn(false)}>Kirjaudu ulos</button>
      </header>
      <div className="content">
        <aside className="sidebar">
          <ul>
            <li style={{backgroundColor: '#f3f4f6', color: '#000'}}>Dashboard</li>
            <li>Kurssit</li>
            <li>Tuotteet</li>
            <li>Käyttäjät</li>
            <li>Asetukset</li>
          </ul>
        </aside>
        <main className="main-panel">
          <h2>Tervetuloa hallintapaneeliin</h2>
          <p style={{color: '#4b5563'}}>Tämä on Coursera-henkinen käyttöliittymä, joka käyttää Varjoliitokaupan musta-valkoista brändäystä. Täältä voidaan myöhemmin hallita varjoliitokursseja ja kaupan tuotteita.</p>
        </main>
      </div>
    </div>
  )
}

export default App;
