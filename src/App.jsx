import { useState } from 'react'
import './App.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Hardcoded credentials for static demo
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
        <h2>Foxer WebApp Login</h2>
        <form onSubmit={handleLogin} className="login-form">
          <div>
            <label>Username: </label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div>
            <label>Password: </label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit">Log In</button>
          {error && <p style={{color: 'red'}}>{error}</p>}
        </form>
        <p><em>Hint: admin / foxer2024</em></p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <header className="navbar">
        <h1>Foxer Course Manager</h1>
        <button onClick={() => setIsLoggedIn(false)}>Log Out</button>
      </header>
      <div className="content">
        <aside className="sidebar">
          <ul>
            <li>Dashboard</li>
            <li>Courses</li>
            <li>Users</li>
            <li>Settings</li>
          </ul>
        </aside>
        <main className="main-panel">
          <h2>Welcome to the Admin Dashboard</h2>
          <p>This is the static demo inspired by Coursera's UI/UX. The web subagent can start building out the course management components here.</p>
        </main>
      </div>
    </div>
  )
}

export default App;
