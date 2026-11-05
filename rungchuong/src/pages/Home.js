import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Home = ({ playerName, setPlayerName }) => {
  const [nameInput, setNameInput] = useState(playerName);
  const navigate = useNavigate();

  const handleStart = (e) => {
    e.preventDefault();
    if (nameInput.trim()) {
      setPlayerName(nameInput.trim());
      navigate('/play');
    }
  };

  return (
    <div>
      <h2>Rung chuông vàng – Phiên bản Lập trình Web</h2>
      <p>Trò chơi trắc nghiệm loại trực tiếp gồm 15 câu hỏi về HTML, CSS, JavaScript và React.</p>
      <ul>
        <li>Mỗi câu trả lời đúng nhận điểm tương ứng (Dễ: 10, Trung bình: 20, Khó: 30).</li>
        <li>Sai hoặc hết giờ sẽ bị loại ngay lập tức.</li>
        <li>Vượt qua 15 câu đạt danh hiệu Rung chuông vàng (300 điểm).</li>
      </ul>
      <form onSubmit={handleStart} style={{ marginTop: '20px' }}>
        <input
          type="text"
          placeholder="Nhập tên người chơi..."
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          style={{ padding: '8px', fontSize: '16px', marginRight: '10px' }}
        />
        <button
          type="submit"
          disabled={!nameInput.trim()}
          style={{ padding: '8px 16px', fontSize: '16px' }}
        >
          Vào thi
        </button>
      </form>
    </div>
  );
};