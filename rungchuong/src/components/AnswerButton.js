import React from 'react';
import { LETTERS } from '../data';

export const AnswerButton = ({ index, text, selectedAnswer, correctAnswer, status, onSelect }) => {
  let bgColor = '#fff';
  if (status === 'locked' && selectedAnswer === index) {
    bgColor = '#ffc107'; // Vàng
  } else if (status === 'revealed') {
    if (index === correctAnswer) {
      bgColor = '#28a745'; // Xanh lá
    } else if (selectedAnswer === index) {
      bgColor = '#dc3545'; // Đỏ
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