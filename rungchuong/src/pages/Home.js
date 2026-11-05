import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Home = ({
  playerName = '',
  setPlayerName = () => {},
  history = [],
}) => {
  const [nameInput, setNameInput] = useState(playerName);
  const navigate = useNavigate();

  const handleStart = (e) => {
    e.preventDefault();
    const name = nameInput.trim();

    if (name) {
      setPlayerName(name);
      navigate('/play');
    }
  };

  const bestRecord =
    history.length > 0
      ? [...history].sort((a, b) => b.score - a.score)[0]
      : null;

  return (
    <div>
      <h2>Rung chuông vàng – Phiên bản Lập trình Web</h2>

      {bestRecord && (
        <div style={{ background: '#e2f0d9', padding: 10, marginBottom: 15, borderRadius: 5 }}>
          <strong>Kỷ lục:</strong> {bestRecord.score} điểm – {bestRecord.name}
        </div>
      )}

      <p>Trò chơi trắc nghiệm loại trực tiếp gồm 15 câu hỏi về HTML, CSS, JavaScript và React.</p>
      <ul>
        <li>Mỗi câu đúng nhận điểm theo mức độ: Dễ 10, Trung bình 20, Khó 30.</li>
        <li>Trả lời sai hoặc hết giờ sẽ bị loại.</li>
        <li>Vượt qua 15 câu đạt 300 điểm và rung chuông vàng.</li>
      </ul>

      <form onSubmit={handleStart} style={{ marginTop: 20 }}>
        <input
          type="text"
          placeholder="Nhập tên người chơi..."
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
        />
        <button type="submit" disabled={!nameInput.trim()}>
          Vào thi
        </button>
      </form>
    </div>
  );
};