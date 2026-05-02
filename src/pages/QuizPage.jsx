import { useState } from 'react';
import courseData from '../data/pp1_course.json';
import './QuizPage.css';

export default function QuizPage({ dayNumber, onBack, onFinish }) {
  const dayData = courseData.days.find(d => d.day === dayNumber);
  const quiz = dayData?.quiz;

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [answers, setAnswers] = useState([]);

  if (!quiz) return <div>Tenttiä ei löydy.</div>;

  const questions = quiz.questions;

  if (questions.length === 0) {
    return (
      <div className="quiz-page">
        <button className="btn-back" onClick={onBack}>← Takaisin</button>
        <div className="quiz-empty">
          <h3>Tentti tulossa pian</h3>
          <p>Päivän {dayNumber} tentti ei ole vielä saatavilla.</p>
          <button className="btn-primary" onClick={onBack}>← Takaisin</button>
        </div>
      </div>
    );
  }

  const q = questions[current];

  const handleSelect = (optId) => {
    if (answered) return;
    setSelected(optId);
    const correct = optId === q.correctAnswer;
    if (correct) setScore(s => s + 1);
    setAnswers(prev => [...prev, { questionId: q.id, selected: optId, correct }]);
    setAnswered(true);
  };

  const handleNext = () => {
    if (current + 1 >= questions.length) {
      setDone(true);
    } else {
      setCurrent(c => c + 1);
      setSelected(null);
      setAnswered(false);
    }
  };

  const passed = score >= quiz.passMark;

  if (done) {
    return (
      <div className="quiz-page">
        <div className="quiz-summary">
          <div className={`summary-icon ${passed ? 'pass' : 'fail'}`}>
            {passed ? '🎉' : '📚'}
          </div>
          <h2>{passed ? 'Hyväksytty!' : 'Ei läpäissyt'}</h2>
          <div className="score-display">
            <span className="score-num">{score}</span>
            <span className="score-denom">/ {questions.length}</span>
          </div>
          <p className="score-label">
            {passed
              ? `Loistavaa! Pääsit läpi vaadituilla ${quiz.passMark}/${questions.length} pisteellä.`
              : `Tarvitset ${quiz.passMark}/${questions.length} pistettä läpäisyyn. Yritä uudelleen!`}
          </p>
          <div className="summary-breakdown">
            {answers.map((a, i) => (
              <div key={i} className={`answer-row ${a.correct ? 'correct' : 'wrong'}`}>
                <span>{a.correct ? '✅' : '❌'}</span>
                <span>Kysymys {i + 1}</span>
              </div>
            ))}
          </div>
          <div className="summary-actions">
            <button className="btn-secondary" onClick={onBack}>← Takaisin lukemiseen</button>
            <button className="btn-primary" onClick={onFinish}>Valmis ✓</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-page">
      <button className="btn-back" onClick={onBack}>← Takaisin lukemiseen</button>
      <div className="quiz-header">
        <span className="quiz-badge">Päivä {dayNumber} · Tentti</span>
        <div className="quiz-progress">
          <div
            className="quiz-progress-bar"
            style={{ width: `${((current) / questions.length) * 100}%` }}
          />
        </div>
        <span className="quiz-counter">{current + 1} / {questions.length}</span>
      </div>

      <div className="quiz-card">
        <p className="quiz-question">{q.question}</p>
        <div className="quiz-options">
          {q.options.map(opt => {
            let cls = 'quiz-option';
            if (answered) {
              if (opt.id === q.correctAnswer) cls += ' correct';
              else if (opt.id === selected) cls += ' wrong';
            } else if (opt.id === selected) {
              cls += ' selected';
            }
            return (
              <button
                key={opt.id}
                className={cls}
                onClick={() => handleSelect(opt.id)}
                disabled={answered}
              >
                <span className="option-letter">{opt.id.toUpperCase()}</span>
                <span>{opt.text}</span>
              </button>
            );
          })}
        </div>

        {answered && (
          <div className={`explanation ${selected === q.correctAnswer ? 'correct' : 'wrong'}`}>
            <strong>{selected === q.correctAnswer ? '✅ Oikein!' : '❌ Väärin.'}</strong>
            <p>{q.explanation}</p>
          </div>
        )}
      </div>

      {answered && (
        <div className="quiz-nav">
          <button className="btn-primary" onClick={handleNext}>
            {current + 1 >= questions.length ? 'Katso tulokset →' : 'Seuraava →'}
          </button>
        </div>
      )}
    </div>
  );
}
