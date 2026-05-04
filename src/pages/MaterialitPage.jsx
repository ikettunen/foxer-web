import { useState } from 'react';

const MOCK_MATERIALS = [
  { id: 1, type: 'Tuote', name: 'PHI SOLA GT', category: 'Varjoliitimet', price: '2 600 €', status: 'Alennettu' },
  { id: 2, type: 'Tuote', name: 'ADVANCE TAU DLS', category: 'Varjoliitimet', price: '6 390 €', status: 'Saatavilla' },
  { id: 3, type: 'Esite', name: 'PP1 Kurssiesite (FI)', category: 'Markkinointi', price: '—', status: 'Julkaistu' },
  { id: 4, type: 'Esite', name: 'PP1 Course Brochure (EN)', category: 'Markkinointi', price: '—', status: 'Julkaistu' },
  { id: 5, type: 'Mainos', name: 'Facebook — Kesäkurssi 2025', category: 'Some', price: '—', status: 'Luonnos' },
  { id: 6, type: 'Mainos', name: 'Instagram — Foxer Spring', category: 'Some', price: '—', status: 'Luonnos' },
];

const TYPE_COLORS = {
  Tuote: '#dbeafe',
  Esite: '#dcfce7',
  Mainos: '#fef9c3',
};

export default function MaterialitPage() {
  const [filter, setFilter] = useState('Kaikki');
  const types = ['Kaikki', 'Tuote', 'Esite', 'Mainos'];

  const filtered = filter === 'Kaikki' ? MOCK_MATERIALS : MOCK_MATERIALS.filter(m => m.type === filter);

  return (
    <div style={{ maxWidth: 900 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <h2 style={{ margin: 0 }}>Materiaalit</h2>
        <button className="btn-primary" onClick={() => alert('Lisää materiaali — tulossa!')}>+ Lisää materiaali</button>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
        {types.map(t => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            style={{
              padding: '0.3rem 0.85rem',
              borderRadius: '20px',
              border: '1px solid #d1d5db',
              background: filter === t ? '#000' : '#fff',
              color: filter === t ? '#fff' : '#374151',
              cursor: 'pointer',
              fontSize: '0.85rem',
              fontWeight: filter === t ? 600 : 400,
            }}
          >{t}</button>
        ))}
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #e5e7eb', textAlign: 'left' }}>
            <th style={{ padding: '0.6rem 0.75rem' }}>Tyyppi</th>
            <th style={{ padding: '0.6rem 0.75rem' }}>Nimi</th>
            <th style={{ padding: '0.6rem 0.75rem' }}>Kategoria</th>
            <th style={{ padding: '0.6rem 0.75rem' }}>Hinta</th>
            <th style={{ padding: '0.6rem 0.75rem' }}>Tila</th>
            <th style={{ padding: '0.6rem 0.75rem' }}></th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(m => (
            <tr key={m.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
              <td style={{ padding: '0.6rem 0.75rem' }}>
                <span style={{
                  background: TYPE_COLORS[m.type] || '#f3f4f6',
                  borderRadius: '4px', padding: '0.15rem 0.5rem',
                  fontSize: '0.78rem', fontWeight: 600
                }}>{m.type}</span>
              </td>
              <td style={{ padding: '0.6rem 0.75rem', fontWeight: 500 }}>{m.name}</td>
              <td style={{ padding: '0.6rem 0.75rem', color: '#6b7280' }}>{m.category}</td>
              <td style={{ padding: '0.6rem 0.75rem' }}>{m.price}</td>
              <td style={{ padding: '0.6rem 0.75rem', color: m.status === 'Luonnos' ? '#d97706' : m.status === 'Alennettu' ? '#dc2626' : '#16a34a' }}>
                {m.status}
              </td>
              <td style={{ padding: '0.6rem 0.75rem' }}>
                <button style={{ background: 'none', border: '1px solid #e5e7eb', borderRadius: '4px', cursor: 'pointer', padding: '0.2rem 0.5rem', fontSize: '0.8rem' }}>
                  ✏️ Muokkaa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p style={{ color: '#9ca3af', fontSize: '0.8rem', marginTop: '1rem' }}>
        Näytetään {filtered.length}/{MOCK_MATERIALS.length} materiaalia — tuotekatalogi: tuotteet.csv (185 tuotetta)
      </p>
    </div>
  );
}
