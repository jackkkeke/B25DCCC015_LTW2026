import { useState, useEffect, useCallback } from 'react';
import { Navigate } from 'react-router-dom';
import { QuestionCard } from '../components/QuestionCard';
import { ScoreBoard } from '../components/ScoreBoard';
import { calcScore } from '../utils';

export const Play = ({ questions, playerName }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [status, setStatus] = useState('answering'); // 'answering', 'locked', 'revealed'
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(20);

  const handleTimeout = useCallback(() => {
    setStatus('revealed');
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (status !== 'answering') return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [status, currentIndex, handleTimeout]);

  if (!playerName) {
    return <Navigate to="/" replace />;
  }

  const currentQ = questions[currentIndex];
  const currentScore = calcScore(answers);

  // Hàm xử lý khi người dùng chọn đáp án
  const handleSelectAnswer = (index) => {
    if (status !== 'answering') return;
    
    setSelectedAnswer(index);
    setStatus('locked');

    const isCorrect = index === currentQ.correct;
    const newAnswer = { index: currentIndex, answer: index, correct: isCorrect };
    
    setAnswers(prev => [...prev.filter(a => a.index !== currentIndex), newAnswer]);
  };

  return (
    <div className="play-container">
      <ScoreBoard 
        currentScore={currentScore} 
        currentIndex={currentIndex} 
        answers={answers} 
      />
      {currentQ && (
        <QuestionCard 
          question={currentQ} 
          currentIndex={currentIndex} 
          selectedAnswer={selectedAnswer}
          correctAnswer={currentQ.correct}
          status={status}
          onSelect={handleSelectAnswer}
        />
      )}
    </div>
  );
};

export default Play;