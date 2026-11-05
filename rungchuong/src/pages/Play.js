import { useCallback, useEffect, useRef, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { QuestionCard } from '../components/QuestionCard';
import { Timer } from '../components/Timer';
import { ScoreBoard } from '../components/ScoreBoard';
import { Helpers } from '../components/Helpers';
import { calcScore, getRank } from '../utils';
import { EXTRA_TIME, TIME_PER_QUESTION } from '../data';

export const Play = ({ questions, playerName, onFinishGame }) => {
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [status, setStatus] = useState('answering');
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);
  const [hiddenOptions, setHiddenOptions] = useState([]);
  const [pendingAnswer, setPendingAnswer] = useState(null);

  const [helpers, setHelpers] = useState({
    removeWrong: false,
    addTime: false,
    lifejacket: false,
    lifejacketActive: false,
  });

  // Dùng ref để tránh kết thúc một lượt chơi nhiều lần.
  const hasFinishedRef = useRef(false);

  const currentQ = questions[currentIndex];
  const currentScore = calcScore(answers);

  const finishGame = useCallback(
    (finalAnswers, reason) => {
      if (hasFinishedRef.current) return;
      hasFinishedRef.current = true;

      const score = calcScore(finalAnswers);
      const rank = getRank(score);
      const correctCount = finalAnswers.filter((answer) => answer.correct).length;

      const record = {
        id: Date.now(),
        name: playerName,
        score,
        rank,
        correctCount,
        playedAt: new Date().toLocaleString('vi-VN'),
      };

      onFinishGame(record);

      navigate('/result', {
        replace: true,
        state: {
          playerName,
          score,
          rank,
          correctCount,
          reason,
        },
      });
    },
    [navigate, onFinishGame, playerName]
  );

  // Cập nhật tiêu đề tab trong lúc thi và khôi phục khi rời trang.
  useEffect(() => {
    document.title = `Câu ${currentIndex + 1}/15 – ${currentScore} điểm`;

    return () => {
      document.title = 'Rung chuông vàng';
    };
  }, [currentIndex, currentScore]);

  // Đồng hồ chỉ chạy khi người chơi đang trả lời.
  useEffect(() => {
    if (status !== 'answering') return undefined;

    const intervalId = setInterval(() => {
      setTimeLeft((previousTime) => {
        if (previousTime <= 1) {
          clearInterval(intervalId);
          setStatus('timeout');
          return 0;
        }

        return previousTime - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [status, currentIndex]);

  // Chốt câu trả lời: 2 giây sau lộ kết quả, rồi chờ thêm 1,5 giây.
  // Timeout được cleanup nếu component unmount hoặc status thay đổi.
  useEffect(() => {
    if (status !== 'locked' || !pendingAnswer) return undefined;

    const revealTimeout = setTimeout(() => {
      setStatus('revealed');
    }, 2000);

    return () => clearTimeout(revealTimeout);
  }, [status, pendingAnswer]);

  useEffect(() => {
    if (status !== 'revealed' && status !== 'timeout') {
      return undefined;
    }

    const transitionTimeout = setTimeout(() => {
      const finalAnswers = pendingAnswer
        ? [...answers, pendingAnswer]
        : answers;

      if (status === 'timeout') {
        if (helpers.lifejacketActive) {
          advanceToNextQuestion(finalAnswers);
        } else {
          finishGame(finalAnswers, 'Hết giờ!');
        }
        return;
      }

      const wasCorrect = pendingAnswer?.correct;
      const wasProtected = pendingAnswer?.usedLifejacket;

      if (wasCorrect) {
        advanceToNextQuestion(finalAnswers);
      } else if (wasProtected) {
        advanceToNextQuestion(finalAnswers);
      } else {
        finishGame(finalAnswers, 'Bạn đã bị loại');
      }
    }, 1500);

    return () => clearTimeout(transitionTimeout);

    function advanceToNextQuestion(finalAnswers) {
      if (currentIndex + 1 >= questions.length) {
        const correctCount = finalAnswers.filter(
          (answer) => answer.correct
        ).length;

        const reason =
          correctCount === questions.length
            ? 'Chúc mừng! Bạn đã rung chuông vàng'
            : 'Bạn đã hoàn thành 15 câu';

        finishGame(finalAnswers, reason);
        return;
      }

      setAnswers(finalAnswers);
      setCurrentIndex((index) => index + 1);
      setSelectedAnswer(null);
      setPendingAnswer(null);
      setHiddenOptions([]);
      setTimeLeft(TIME_PER_QUESTION);
      setHelpers((previous) => ({
        ...previous,
        lifejacketActive: false,
      }));
      setStatus('answering');
    }
  }, [
    status,
    pendingAnswer,
    answers,
    helpers.lifejacketActive,
    currentIndex,
    questions.length,
    finishGame,
  ]);

  const handleSelect = useCallback(
    (optionIndex) => {
      if (status !== 'answering') return;
      if (hiddenOptions.includes(optionIndex)) return;
      if (!currentQ) return;

      const isCorrect = optionIndex === currentQ.answer;
      const usedLifejacket = !isCorrect && helpers.lifejacketActive;

      setSelectedAnswer(optionIndex);
      setPendingAnswer({
        id: currentQ.id,
        level: currentQ.level,
        correct: isCorrect,
        usedLifejacket,
      });
      setStatus('locked');
    },
    [status, hiddenOptions, currentQ, helpers.lifejacketActive]
  );

  // Hết giờ: lộ đáp án đúng ngay.
  useEffect(() => {
    if (status !== 'timeout' || !currentQ) return undefined;

    const timeoutAnswer = {
      id: currentQ.id,
      level: currentQ.level,
      correct: false,
      usedLifejacket: helpers.lifejacketActive,
    };

    setPendingAnswer(timeoutAnswer);

    return undefined;
  }, [status, currentQ, helpers.lifejacketActive]);

  // Phím tắt 1–4.
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (status !== 'answering') return;

      const keyMap = {
        '1': 0,
        '2': 1,
        '3': 2,
        '4': 3,
      };

      const optionIndex = keyMap[event.key];

      if (
        optionIndex !== undefined &&
        !hiddenOptions.includes(optionIndex)
      ) {
        handleSelect(optionIndex);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [status, hiddenOptions, handleSelect]);

  const handleUseHelper = (type) => {
    if (status !== 'answering' || !currentQ) return;

    if (type === 'removeWrong' && !helpers.removeWrong) {
      const wrongOptions = currentQ.options
        .map((_, index) => index)
        .filter((index) => index !== currentQ.answer);

      const randomWrong =
        wrongOptions[Math.floor(Math.random() * wrongOptions.length)];

      setHiddenOptions([randomWrong]);
      setHelpers((previous) => ({
        ...previous,
        removeWrong: true,
      }));
    }

    if (type === 'addTime' && !helpers.addTime) {
      setTimeLeft((previousTime) => previousTime + EXTRA_TIME);
      setHelpers((previous) => ({
        ...previous,
        addTime: true,
      }));
    }

    if (type === 'lifejacket' && !helpers.lifejacket) {
      setHelpers((previous) => ({
        ...previous,
        lifejacket: true,
        lifejacketActive: true,
      }));
    }
  };

  // Tất cả Hook phải được gọi trước các return có điều kiện.
  if (!playerName) {
    return <Navigate to="/" replace />;
  }

  if (!questions?.length) {
    return <p>Đang tải câu hỏi...</p>;
  }

  if (!currentQ) {
    return null;
  }

  return (
    <div>
      <ScoreBoard
        currentScore={currentScore}
        currentIndex={currentIndex}
        answers={answers}
      />

      <Helpers
        helpers={helpers}
        onUseHelper={handleUseHelper}
        status={status}
      />

      <Timer timeLeft={timeLeft} />

      <QuestionCard
        question={currentQ}
        currentIndex={currentIndex}
        hiddenOptions={hiddenOptions}
        selectedAnswer={selectedAnswer}
        correctAnswer={currentQ.answer}
        status={status}
        onSelect={handleSelect}
      />
    </div>
  );
};