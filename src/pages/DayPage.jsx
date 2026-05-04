import { useState } from 'react';
import courseData from '../data/pp1_course.json';
import './DayPage.css';

export default function DayPage({ onSelectDay, onBack }) {
  const { course, days } = courseData;
  const [editingDay, setEditingDay] = useState(null); // day number being edited
  const [editTitle, setEditTitle] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [showAddDay, setShowAddDay] = useState(false);
  const [newDay, setNewDay] = useState({ title: '', description: '' });

  const startEdit = (day, e) => {
    e.stopPropagation();
    setEditingDay(day.day);
    setEditTitle(day.title);
    setEditDesc(day.description);
  };

  return (
    <div className="day-page">
      <button className="btn-back" onClick={onBack}>← Takaisin</button>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
        <h2 style={{ margin: 0 }}>{course.title}</h2>
        <button className="btn-primary" style={{ fontSize: '0.85rem' }} onClick={() => setShowAddDay(p => !p)}>
          {showAddDay ? '✕ Peruuta' : '+ Lisää päivä'}
        </button>
      </div>
      <p className="day-page-subtitle">{course.description}</p>

      {showAddDay && (
        <div style={{
          background: '#f9f9f9', border: '1px solid #e5e7eb', borderRadius: '10px',
          padding: '1.25rem', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem'
        }}>
          <h4 style={{ margin: 0 }}>Uusi päivä</h4>
          <input
            placeholder="Otsikko (esim. Lennot)"
            value={newDay.title}
            onChange={e => setNewDay(p => ({ ...p, title: e.target.value }))}
            style={{ padding: '0.5rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.9rem' }}
          />
          <textarea
            placeholder="Kuvaus"
            value={newDay.description}
            onChange={e => setNewDay(p => ({ ...p, description: e.target.value }))}
            rows={2}
            style={{ padding: '0.5rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.9rem', resize: 'vertical' }}
          />
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
            <button className="btn-secondary" onClick={() => setShowAddDay(false)}>Peruuta</button>
            <button className="btn-primary" onClick={() => { alert('Päivä lisätty! (demo)'); setShowAddDay(false); setNewDay({ title: '', description: '' }); }}>Lisää päivä</button>
          </div>
        </div>
      )}

      <div className="day-grid">
        {days.map((day, index) => {
          const locked = index > 0;
          const isEditing = editingDay === day.day;

          if (isEditing) {
            return (
              <div key={day.day} className="day-card" style={{ borderColor: '#000' }}>
                <div className="day-card-header">
                  <span className="day-number">Päivä {day.day}</span>
                  <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>Muokkaus</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <input
                    value={editTitle}
                    onChange={e => setEditTitle(e.target.value)}
                    style={{ padding: '0.4rem 0.6rem', border: '1px solid #d1d5db', borderRadius: '5px', fontSize: '0.9rem', fontWeight: 600 }}
                  />
                  <textarea
                    value={editDesc}
                    onChange={e => setEditDesc(e.target.value)}
                    rows={2}
                    style={{ padding: '0.4rem 0.6rem', border: '1px solid #d1d5db', borderRadius: '5px', fontSize: '0.85rem', resize: 'vertical' }}
                  />
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button className="btn-secondary" onClick={() => setEditingDay(null)}>Peruuta</button>
                  <button className="btn-primary" onClick={() => { alert('Tallennettu! (demo)'); setEditingDay(null); }}>Tallenna</button>
                </div>
              </div>
            );
          }

          return (
            <div
              key={day.day}
              className={`day-card ${locked ? 'locked' : ''}`}
              onClick={() => !locked && onSelectDay(day.day)}
            >
              <div className="day-card-header">
                <span className="day-number">Päivä {day.day}</span>
                <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                  {locked && <span className="lock-icon">🔒</span>}
                  {!locked && <span className="unlock-icon">✅</span>}
                  <button
                    className="btn-edit"
                    title="Muokkaa"
                    onClick={(e) => startEdit(day, e)}
                    style={{
                      background: 'none', border: '1px solid #d1d5db', borderRadius: '4px',
                      cursor: 'pointer', fontSize: '0.75rem', padding: '0.1rem 0.4rem', color: '#374151'
                    }}
                  >✏️</button>
                </div>
              </div>
              <h3>{day.title}</h3>
              <p>{day.description}</p>
              {!locked && (
                <button className="btn-primary" onClick={(e) => { e.stopPropagation(); onSelectDay(day.day); }}>
                  Aloita päivä →
                </button>
              )}
              {locked && <span className="locked-label">Lukittu</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
