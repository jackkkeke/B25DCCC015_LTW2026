import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LEVELS, LETTERS } from '../data';

export const QuestionDetail = ({ questions }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const questionId = Number(id);
  const q = questions.find((item) => item.id === questionId);

  if (!q) {
    return (
      <div>
        <h2>Không tìm thấy câu hỏi</h2>
        <button onClick={() => navigate(-1)}>Quay lại</button>
      </div>
    );
  }

  return (
    <div className="question-detail">
      <h2>
        Câu hỏi số {q.id} – {q.topic} ({LEVELS[q.level]}, {q.level === 1 ? 10 : q.level === 2 ? 20 : 30} điểm)
      </h2>
      <p style={{ fontWeight: 'bold' }}>{q.question}</p>
      <ul>
        {q.options.map((opt, idx) => {
          const isCorrect = idx === q.answer;
          return (
            <li
              key={idx}
              style={{
                backgroundColor: isCorrect ? '#d4edda' : 'transparent',
                padding: '5px',
                margin: '3px 0'
              }}
            >
              {LETTERS[idx]}. {opt} {isCorrect && <strong style={{ color: 'green' }}>(Đáp án đúng)</strong>}
            </li>
          );
        })}
      </ul>
      <button onClick={() => navigate(-1)}>Quay lại</button>
    </div>
  );
};