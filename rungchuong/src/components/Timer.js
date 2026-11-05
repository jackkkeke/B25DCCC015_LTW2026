import React from 'react';

export const Timer = ({ timeLeft }) => {
  const isRed = timeLeft <= 5;
  return (
    <div style={{ fontSize: '18px', fontWeight: 'bold', color: isRed ? 'red' : 'black', margin: '15px 0' }}>
      Còn {timeLeft} giây
    </div>
  );
};