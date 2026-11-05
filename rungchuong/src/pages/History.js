import React from 'react';

export const History = ({ history, onClearHistory }) => {
  const sortedHistory = [...history].sort((a, b) => b.score - a.score);
  const totalGames = history.length;
  const highestScore = totalGames > 0 ? sortedHistory[0].score : 0;
  const avgScore = totalGames > 0 ? Math.round(history.reduce((sum, h) => sum + h.score, 0) / totalGames) : 0;

  return (
    <div>
      <h2>Lịch sử các lượt chơi</h2>
      {totalGames === 0 ? (
        <p>Chưa có lượt chơi nào.</p>
      ) : (
        <div>
          <div style={{ marginBottom: '15px' }}>
            <p><strong>Số lượt chơi:</strong> {totalGames}</p>
            <p><strong>Điểm cao nhất:</strong> {highestScore}</p>
            <p><strong>Điểm trung bình:</strong> {avgScore}</p>
            <button onClick={onClearHistory} style={{ padding: '5px 10px', background: '#dc3545', color: '#fff', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>
              Xóa lịch sử
            </button>
          </div>
          <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th>Người chơi</th>
                <th>Số câu đúng</th>
                <th>Điểm</th>
                <th>Danh hiệu</th>
                <th>Thời gian</th>
              </tr>
            </thead>
            <tbody>
              {sortedHistory.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.correctCount}/15</td>
                  <td>{item.score}</td>
                  <td>{item.rank}</td>
                  <td>{item.playedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};