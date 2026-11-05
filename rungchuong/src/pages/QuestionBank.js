import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TOPICS, LEVELS } from '../data';

export const QuestionBank = ({ questions }) => {
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredQuestions = questions.filter((q) => {
    const matchTopic = selectedTopic === 'All' || q.topic === selectedTopic;
    const matchSearch = q.question.toLowerCase().includes(searchTerm.toLowerCase());
    return matchTopic && matchSearch;
  });

  return (
    <div className="question-bank">
      <h2>Ngân hàng câu hỏi</h2>
      <div className="filters">
        <label>
          Chủ đề:{' '}
          <select value={selectedTopic} onChange={(e) => setSelectedTopic(e.target.value)}>
            <option value="All">Tất cả</option>
            {TOPICS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
        <label style={{ marginLeft: '15px' }}>
          Tìm kiếm:{' '}
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Nhập nội dung câu hỏi..."
          />
        </label>
      </div>

      <p>Có {filteredQuestions.length} câu hỏi</p>

      <table className="question-table" border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>STT</th>
            <th>Chủ đề</th>
            <th>Mức độ</th>
            <th>Câu hỏi</th>
          </tr>
        </thead>
        <tbody>
          {filteredQuestions.map((q, index) => (
            <tr key={q.id}>
              <td>{index + 1}</td>
              <td>{q.topic}</td>
              <td>{LEVELS[q.level]}</td>
              <td>
                <Link to={`/questions/${q.id}`}>{q.question}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};