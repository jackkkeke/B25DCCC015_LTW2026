import React from 'react';

export const ScoreBoard = ({ currentScore, currentIndex, answers }) => {
  return (
    <div style={{ margin: '20px 0' }}>
      <div><strong>Điểm: {currentScore}</strong></div>
      <div style={{ display: 'flex', gap: '5px', marginTop: '10px', flexWrap: 'wrap' }}>
        {Array.from({ length: 15 }).map((_, idx) => {
          let bg = '#e0e0e0';
          let border = '1px solid #ccc';
          const ansRecord = answers.find(a => a.index === idx);

          if (ansRecord) {
            if (ansRecord.correct) bg = '#28a745';
            else if (ansRecord.usedLifejacket) bg = '#fd7e14'; // Màu cam cho phao cứu sinh
            else bg = '#dc3545';
          }
          if (idx === currentIndex) {
            border = '2px solid #000';
          }

          return (
            <div
              key={idx}
              style={{
                width: '30px',
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: bg,
                border: border,
                fontWeight: 'bold',
                fontSize: '14px',
                color: ansRecord ? '#fff' : '#000'
              }}
            >
              {idx + 1}
            </div>
          );
        })}
      </div>
    </div>
  );
};