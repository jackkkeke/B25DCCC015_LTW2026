import React from 'react';
import { LEVELS } from '../data';
import { AnswerButton } from './AnswerButton';

export const QuestionCard = ({ question, currentIndex, selectedAnswer, correctAnswer, status, onSelect }) => {
  return (
    <div className="question-card">
      <h3>
        Câu {currentIndex + 1}/15 – {question.topic} ({LEVELS[question.level]}, {question.level === 1 ? 10 : question.level === 2 ? 20 : 30} điểm)
      </h3>
      <p className="question-text" style={{ fontSize: '18px', fontWeight: 'bold' }}>{question.question}</p>
      <div className="options-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '15px' }}>
        {question.options.map((opt, idx) => (
          <AnswerButton
            key={idx}
            index={idx}
            text={opt}
            selectedAnswer={selectedAnswer}
            correctAnswer={correctAnswer}
            status={status}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
};