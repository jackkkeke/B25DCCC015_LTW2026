import React from 'react';
import { LETTERS } from '../data';

export const AnswerButton = ({ index, text, hidden, selectedAnswer, correctAnswer, status, onSelect }) => {
  if (hidden) {
    return (
      <div style={{ padding: '15px', border: '1px dashed #ccc', borderRadius: '5px', visibility: 'hidden' }}>
        {LETTERS[index]}. {text}
      </div>
    );
  }

  let bgColor = '#fff';
  if (status === 'locked' && selectedAnswer === index) {
    bgColor = '#ffc107';
  } else if (status === 'revealed') {
    if (index === correctAnswer) {
      bgColor = '#28a745';
    } else if (selectedAnswer === index) {
      bgColor = '#dc3545';
    }
  }

  return (
    <button
      onClick={() => onSelect(index)}
      disabled={status !== 'answering'}
      style={{
        padding: '15px',
        fontSize: '16px',
        backgroundColor: bgColor,
        border: '1px solid #ccc',
        borderRadius: '5px',
        cursor: status === 'answering' ? 'pointer' : 'default',
        textAlign: 'left'
      }}
    >
      {LETTERS[index]}. {text}
    </button>
  );
};