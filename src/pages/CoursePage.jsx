import courseData from '../data/pp1_course.json';
import './CoursePage.css';

export default function CoursePage({ onSelectCourse }) {
  const { course } = courseData;

  return (
    <div className="course-page">
      <h2 className="course-page-title">Kurssit</h2>
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
          <div className="course-card-footer">
            <button className="btn-primary">Aloita kurssi →</button>
          </div>
        </div>
      </div>
    </div>
  );
}
