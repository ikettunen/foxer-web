import courseData from '../data/pp1_course.json';
import './DayPage.css';

export default function DayPage({ onSelectDay, onBack }) {
  const { course, days } = courseData;

  return (
    <div className="day-page">
      <button className="btn-back" onClick={onBack}>← Takaisin</button>
      <h2>{course.title}</h2>
      <p className="day-page-subtitle">{course.description}</p>
      <div className="day-grid">
        {days.map((day, index) => {
          const locked = index > 0;
          return (
            <div
              key={day.day}
              className={`day-card ${locked ? 'locked' : ''}`}
              onClick={() => !locked && onSelectDay(day.day)}
            >
              <div className="day-card-header">
                <span className="day-number">Päivä {day.day}</span>
                {locked && <span className="lock-icon">🔒</span>}
                {!locked && <span className="unlock-icon">✅</span>}
              </div>
              <h3>{day.title}</h3>
              <p>{day.description}</p>
              {!locked && (
                <button className="btn-primary" onClick={() => onSelectDay(day.day)}>
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
