import { useState } from 'react'
import './App.css'
import CoursePage from './pages/CoursePage'
import DayPage from './pages/DayPage'
import ReadingPage from './pages/ReadingPage'
import QuizPage from './pages/QuizPage'
import MaterialitPage from './pages/MaterialitPage'
import KayttajatPage from './pages/KayttajatPage'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Navigation state: { view: 'courses'|'days'|'reading'|'quiz', courseId, dayNumber }
  const [nav, setNav] = useState({ view: 'courses' });
  const [activeSection, setActiveSection] = useState('Kurssit');

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
        <div className="login-card">
          <div className="login-logo-wrap">
            <img src="/foxer-web/logo.webp" alt="Foxer Logo" className="login-logo" />
          </div>
          <h2 className="login-title">Foxer WebApp</h2>
          <form onSubmit={handleLogin} className="login-form">
            <div style={{display: 'flex', flexDirection: 'column', gap: '5px'}}>
              <label style={{fontSize: '0.9rem', fontWeight: 600, color: '#374151'}}>Käyttäjänimi</label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div style={{display: 'flex', flexDirection: 'column', gap: '5px'}}>
              <label style={{fontSize: '0.9rem', fontWeight: 600, color: '#374151'}}>Salasana</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit" style={{marginTop: '10px'}}>Kirjaudu sisään</button>
            {error && <p style={{color: '#dc2626', fontSize: '0.9rem', textAlign: 'center', margin: 0}}>{error}</p>}
          </form>
        </div>
      </div>
    );
  }

  const sidebarItems = ['Dashboard', 'Kurssit', 'Materiaalit', 'Käyttäjät', 'Asetukset'];

  const handleSidebarClick = (item) => {
    setActiveSection(item);
    if (item === 'Kurssit') setNav({ view: 'courses' });
    else setNav({ view: item.toLowerCase() });
  };

  const renderMain = () => {
    if (activeSection === 'Materiaalit') {
      return <main className="main-panel"><MaterialitPage /></main>;
    }
    if (activeSection === 'Käyttäjät') {
      return <main className="main-panel"><KayttajatPage /></main>;
    }
    if (activeSection === 'Dashboard') {
      return (
        <main className="main-panel">
          <h2>Tervetuloa hallintapaneeliin</h2>
          <p style={{color: '#4b5563'}}>Täältä hallitaan varjoliitokursseja, materiaaleja ja käyttäjiä.</p>
        </main>
      );
    }
    if (activeSection === 'Asetukset') {
      return (
        <main className="main-panel">
          <h2>Asetukset</h2>
          <p style={{color: '#4b5563'}}>Tulossa.</p>
        </main>
      );
    }
    if (activeSection !== 'Kurssit') {
      return (
        <main className="main-panel">
          <h2>{activeSection}</h2>
        </main>
      );
    }

    switch (nav.view) {
      case 'courses':
        return (
          <main className="main-panel">
            <CoursePage onSelectCourse={(courseId) => setNav({ view: 'days', courseId })} />
          </main>
        );
      case 'days':
        return (
          <main className="main-panel">
            <DayPage
              courseId={nav.courseId}
              onSelectDay={(dayNumber) => setNav({ view: 'reading', courseId: nav.courseId, dayNumber })}
              onBack={() => setNav({ view: 'courses' })}
            />
          </main>
        );
      case 'reading':
        return (
          <main className="main-panel">
            <ReadingPage
              dayNumber={nav.dayNumber}
              onBack={() => setNav({ view: 'days', courseId: nav.courseId })}
              onStartQuiz={() => setNav({ view: 'quiz', courseId: nav.courseId, dayNumber: nav.dayNumber })}
            />
          </main>
        );
      case 'quiz':
        return (
          <main className="main-panel">
            <QuizPage
              dayNumber={nav.dayNumber}
              onBack={() => setNav({ view: 'reading', courseId: nav.courseId, dayNumber: nav.dayNumber })}
              onFinish={() => setNav({ view: 'days', courseId: nav.courseId })}
            />
          </main>
        );
      default:
        return null;
    }
  };

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
            {sidebarItems.map(item => (
              <li
                key={item}
                style={activeSection === item ? {backgroundColor: '#f3f4f6', color: '#000'} : {}}
                onClick={() => handleSidebarClick(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        </aside>
        {renderMain()}
      </div>
    </div>
  );
}

export default App;
