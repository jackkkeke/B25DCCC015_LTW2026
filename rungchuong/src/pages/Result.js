import React from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';

export const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();

  if (!location.state) {
    return <Navigate to="/" replace />;
  }

  const { playerName, score, rank, correctCount, reason } = location.state;

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>{reason}</h2>
      <p><strong>Người chơi:</strong> {playerName}</p>
      <p><strong>Số câu trả lời đúng:</strong> {correctCount}/15</p>
      <p><strong>Điểm:</strong> {score}</p>
      <p><strong>Danh hiệu:</strong> {rank}</p>

      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '15px' }}>
        <button onClick={() => navigate('/play')} style={{ padding: '10px 20px' }}>Chơi lại</button>
        <button onClick={() => navigate('/')} style={{ padding: '10px 20px' }}>Về trang chủ</button>
      </div>
    </div>
  );
};