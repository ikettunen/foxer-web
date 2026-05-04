import { useState } from 'react';
import courseData from '../data/pp1_course.json';
import './CoursePage.css';

const SECTION_TYPES = ['home', 'on-site', 'flights', 'theory', 'quiz', 'other'];

export default function CoursePage({ onSelectCourse }) {
  const { course } = courseData;
  const [showNewCourse, setShowNewCourse] = useState(false);
  const [newCourse, setNewCourse] = useState({ title: '', description: '', sections: [] });

  const addSection = () => {
    setNewCourse(prev => ({
      ...prev,
      sections: [...prev.sections, { type: 'home', title: '' }]
    }));
  };

  const updateSection = (i, field, value) => {
    setNewCourse(prev => {
      const sections = [...prev.sections];
      sections[i] = { ...sections[i], [field]: value };
      return { ...prev, sections };
    });
  };

  const removeSection = (i) => {
    setNewCourse(prev => ({
      ...prev,
      sections: prev.sections.filter((_, idx) => idx !== i)
    }));
  };

  return (
    <div className="course-page">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <h2 className="course-page-title" style={{ margin: 0 }}>Kurssit</h2>
        <button className="btn-primary" onClick={() => setShowNewCourse(!showNewCourse)}>
          {showNewCourse ? '✕ Peruuta' : '+ Uusi kurssi'}
        </button>
      </div>

      {showNewCourse && (
        <div className="new-course-form" style={{
          background: '#f9f9f9',
          border: '1px solid #e5e7eb',
          borderRadius: '10px',
          padding: '1.5rem',
          marginBottom: '2rem'
        }}>
          <h3 style={{ marginTop: 0 }}>Julkaise uusi kurssi</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1rem' }}>
            <input
              placeholder="Kurssin nimi"
              value={newCourse.title}
              onChange={e => setNewCourse(p => ({ ...p, title: e.target.value }))}
              style={{ padding: '0.5rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.95rem' }}
            />
            <textarea
              placeholder="Kuvaus"
              value={newCourse.description}
              onChange={e => setNewCourse(p => ({ ...p, description: e.target.value }))}
              rows={2}
              style={{ padding: '0.5rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.95rem', resize: 'vertical' }}
            />
          </div>

          <div style={{ marginBottom: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <strong style={{ fontSize: '0.9rem' }}>Osiot</strong>
              <button
                className="btn-secondary"
                style={{ fontSize: '0.8rem', padding: '0.3rem 0.75rem' }}
                onClick={addSection}
              >+ Lisää osio</button>
            </div>
            {newCourse.sections.length === 0 && (
              <p style={{ color: '#9ca3af', fontSize: '0.85rem', margin: 0 }}>Ei osioita. Lisää ensimmäinen osio.</p>
            )}
            {newCourse.sections.map((sec, i) => (
              <div key={i} style={{
                display: 'flex', gap: '0.5rem', alignItems: 'center',
                background: '#fff', border: '1px solid #e5e7eb', borderRadius: '6px',
                padding: '0.5rem 0.75rem', marginBottom: '0.5rem'
              }}>
                <select
                  value={sec.type}
                  onChange={e => updateSection(i, 'type', e.target.value)}
                  style={{ border: '1px solid #d1d5db', borderRadius: '4px', padding: '0.3rem 0.5rem', fontSize: '0.85rem' }}
                >
                  {SECTION_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                <input
                  placeholder="Osion otsikko"
                  value={sec.title}
                  onChange={e => updateSection(i, 'title', e.target.value)}
                  style={{ flex: 1, border: '1px solid #d1d5db', borderRadius: '4px', padding: '0.3rem 0.5rem', fontSize: '0.85rem' }}
                />
                <button
                  onClick={() => removeSection(i)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', fontSize: '1rem', padding: '0 0.25rem' }}
                >✕</button>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
            <button className="btn-secondary" onClick={() => setShowNewCourse(false)}>Peruuta</button>
            <button className="btn-primary" onClick={() => {
              alert('Kurssi tallennettu! (demo)');
              setShowNewCourse(false);
              setNewCourse({ title: '', description: '', sections: [] });
            }}>Julkaise kurssi</button>
          </div>
        </div>
      )}

      <div className="course-grid">
        <div className="course-card" onClick={() => onSelectCourse(course.id)}>
          <div className="course-card-badge">PP1</div>
          <div className="course-card-body">
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <div className="course-card-meta">
              <span>📅 {course.days} päivää</span>
              <span>⏱ {course.hoursPerDay}h/päivä</span>
            </div>
          </div>
          <div className="course-card-footer" style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="btn-primary" onClick={(e) => { e.stopPropagation(); onSelectCourse(course.id); }}>Avaa kurssi →</button>
            <button className="btn-secondary" onClick={(e) => { e.stopPropagation(); alert('Muokkaus tulossa!'); }}>✏️ Muokkaa</button>
          </div>
        </div>
      </div>
    </div>
  );
}
