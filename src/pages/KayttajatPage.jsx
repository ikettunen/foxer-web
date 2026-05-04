const MOCK_USERS = [
  {
    id: 1,
    name: 'Mikael Lindström',
    email: 'mikael.lindstrom@gmail.com',
    course: 'PP1 — Varjoliitokurssi',
    progress: '67%',
    joined: '2025-03-12',
    status: 'Aktiivinen',
  },
  {
    id: 2,
    name: 'Sanna Mäkinen',
    email: 'sanna.makinen@hotmail.com',
    course: 'PP1 — Varjoliitokurssi',
    progress: '33%',
    joined: '2025-04-01',
    status: 'Aktiivinen',
  },
  {
    id: 3,
    name: 'Toni Virtanen',
    email: 'toni.virtanen@outlook.com',
    course: 'PP1 — Varjoliitokurssi',
    progress: '100%',
    joined: '2025-01-20',
    status: 'Valmis',
  },
  {
    id: 4,
    name: 'Emilia Korhonen',
    email: 'emilia.k@foxerparagliding.fi',
    course: 'PP2 — Jatkokurssi',
    progress: '0%',
    joined: '2025-04-28',
    status: 'Odottaa',
  },
  {
    id: 5,
    name: 'Juhani Heikkinen',
    email: 'juhani.heikkinen@gmail.com',
    course: 'PP1 — Varjoliitokurssi',
    progress: '100%',
    joined: '2024-11-05',
    status: 'Valmis',
  },
];

const STATUS_COLORS = {
  Aktiivinen: '#16a34a',
  Valmis: '#2563eb',
  Odottaa: '#d97706',
};

export default function KayttajatPage() {
  return (
    <div style={{ maxWidth: 950 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <h2 style={{ margin: 0 }}>Käyttäjät</h2>
        <button className="btn-primary" onClick={() => alert('Kutsu käyttäjä — tulossa!')}>+ Kutsu käyttäjä</button>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #e5e7eb', textAlign: 'left', background: '#f9f9f9' }}>
            <th style={{ padding: '0.6rem 0.75rem' }}>Nimi</th>
            <th style={{ padding: '0.6rem 0.75rem' }}>Sähköposti</th>
            <th style={{ padding: '0.6rem 0.75rem' }}>Kurssi</th>
            <th style={{ padding: '0.6rem 0.75rem' }}>Edistyminen</th>
            <th style={{ padding: '0.6rem 0.75rem' }}>Liittynyt</th>
            <th style={{ padding: '0.6rem 0.75rem' }}>Tila</th>
            <th style={{ padding: '0.6rem 0.75rem' }}></th>
          </tr>
        </thead>
        <tbody>
          {MOCK_USERS.map(u => (
            <tr key={u.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
              <td style={{ padding: '0.6rem 0.75rem', fontWeight: 500 }}>{u.name}</td>
              <td style={{ padding: '0.6rem 0.75rem', color: '#6b7280', fontSize: '0.85rem' }}>{u.email}</td>
              <td style={{ padding: '0.6rem 0.75rem', color: '#374151' }}>{u.course}</td>
              <td style={{ padding: '0.6rem 0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{
                    height: '6px', width: '80px', background: '#e5e7eb', borderRadius: '3px', overflow: 'hidden'
                  }}>
                    <div style={{
                      height: '100%',
                      width: u.progress,
                      background: u.progress === '100%' ? '#2563eb' : '#16a34a',
                      borderRadius: '3px'
                    }} />
                  </div>
                  <span style={{ fontSize: '0.8rem', color: '#6b7280' }}>{u.progress}</span>
                </div>
              </td>
              <td style={{ padding: '0.6rem 0.75rem', color: '#6b7280', fontSize: '0.85rem' }}>{u.joined}</td>
              <td style={{ padding: '0.6rem 0.75rem' }}>
                <span style={{
                  color: STATUS_COLORS[u.status] || '#374151',
                  fontWeight: 600,
                  fontSize: '0.82rem'
                }}>{u.status}</span>
              </td>
              <td style={{ padding: '0.6rem 0.75rem' }}>
                <button style={{
                  background: 'none', border: '1px solid #e5e7eb', borderRadius: '4px',
                  cursor: 'pointer', padding: '0.2rem 0.5rem', fontSize: '0.8rem'
                }}>👤 Näytä</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p style={{ color: '#9ca3af', fontSize: '0.8rem', marginTop: '1rem' }}>
        {MOCK_USERS.length} käyttäjää — mockdata
      </p>
    </div>
  );
}
