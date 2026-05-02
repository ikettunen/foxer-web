import { useState, useRef } from 'react';
import courseData from '../data/pp1_course.json';
import './ReadingPage.css';

const STORAGE_KEY = 'foxer_content_overrides';

function getOverrides() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
}

function saveOverride(readingId, sectionIndex, field, value) {
  const overrides = getOverrides();
  const key = `${readingId}.sections.${sectionIndex}.${field}`;
  overrides[key] = value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
}

function applyOverrides(reading) {
  const overrides = getOverrides();
  // Deep clone
  const result = JSON.parse(JSON.stringify(reading));
  for (const [key, value] of Object.entries(overrides)) {
    const prefix = `${reading.id}.sections.`;
    if (key.startsWith(prefix)) {
      const rest = key.slice(prefix.length);
      const dotIdx = rest.indexOf('.');
      if (dotIdx !== -1) {
        const idx = parseInt(rest.slice(0, dotIdx), 10);
        const field = rest.slice(dotIdx + 1);
        if (!isNaN(idx) && result.sections[idx]) {
          result.sections[idx][field] = value;
        }
      }
    }
  }
  return result;
}

function EditableSection({ section, sectionIndex, readingId }) {
  const [editingHeading, setEditingHeading] = useState(false);
  const [editingBody, setEditingBody] = useState(false);
  const [heading, setHeading] = useState(section.heading);
  const [body, setBody] = useState(section.body);
  const headingRef = useRef(null);
  const bodyRef = useRef(null);

  const saveHeading = () => {
    setEditingHeading(false);
    saveOverride(readingId, sectionIndex, 'heading', heading);
  };
  const saveBody = () => {
    setEditingBody(false);
    saveOverride(readingId, sectionIndex, 'body', body);
  };

  // Render markdown-ish bold
  const renderBody = (text) =>
    text.split(/(\*\*[^*]+\*\*)/).map((part, i) =>
      part.startsWith('**') && part.endsWith('**')
        ? <strong key={i}>{part.slice(2, -2)}</strong>
        : part
    );

  return (
    <div className={`reading-section ${section.safetyFlag ? 'safety' : ''}`}>
      {section.safetyFlag && <div className="safety-banner">⚠️ Turvallisuushuomio</div>}

      {editingHeading ? (
        <div className="edit-field">
          <input
            ref={headingRef}
            value={heading}
            onChange={e => setHeading(e.target.value)}
            onBlur={saveHeading}
            onKeyDown={e => e.key === 'Enter' && saveHeading()}
            autoFocus
          />
          <button className="btn-save" onClick={saveHeading}>Tallenna</button>
        </div>
      ) : (
        <h4 className="section-heading editable" onClick={() => setEditingHeading(true)} title="Klikkaa muokataksesi">
          {heading}
          <span className="edit-hint">✏️</span>
        </h4>
      )}

      {editingBody ? (
        <div className="edit-field">
          <textarea
            ref={bodyRef}
            value={body}
            onChange={e => setBody(e.target.value)}
            onBlur={saveBody}
            rows={6}
            autoFocus
          />
          <button className="btn-save" onClick={saveBody}>Tallenna</button>
        </div>
      ) : (
        <div className="section-body editable" onClick={() => setEditingBody(true)} title="Klikkaa muokataksesi">
          {body.split('\n').map((line, i) => (
            <p key={i}>{renderBody(line)}</p>
          ))}
          <span className="edit-hint-body">✏️ Klikkaa muokataksesi</span>
        </div>
      )}
    </div>
  );
}

export default function ReadingPage({ dayNumber, onBack, onStartQuiz }) {
  const dayData = courseData.days.find(d => d.day === dayNumber);
  if (!dayData) return <div>Päivää ei löydy.</div>;

  const reading = applyOverrides(dayData.preReading);

  return (
    <div className="reading-page">
      <button className="btn-back" onClick={onBack}>← Takaisin</button>
      <div className="reading-header">
        <span className="reading-badge">Päivä {dayNumber} · Ennakkolukeminen</span>
        <h2>{reading.title}</h2>
        <span className="reading-meta">⏱ ~{reading.estimatedReadMinutes} min</span>
      </div>

      <div className="reading-content">
        {reading.sections.length === 0 && (
          <p className="empty-note">Sisältö tulossa pian.</p>
        )}
        {reading.sections.map((section, i) => (
          <EditableSection
            key={i}
            section={section}
            sectionIndex={i}
            readingId={reading.id}
          />
        ))}
      </div>

      {reading.keyPoints.length > 0 && (
        <div className="key-points">
          <h4>🔑 Tärkeimmät asiat</h4>
          <ul>
            {reading.keyPoints.map((kp, i) => <li key={i}>{kp}</li>)}
          </ul>
        </div>
      )}

      <div className="reading-footer">
        <button className="btn-primary" onClick={onStartQuiz}>
          Siirry tenttiin →
        </button>
      </div>
    </div>
  );
}
