import { POINTS, RANKS } from './data';

export const calcScore = (answers) =>
  answers
    .filter((answer) => answer.correct)
    .reduce((total, answer) => total + POINTS[answer.level], 0);

export const getRank = (score) =>
  RANKS.find((rank) => score >= rank.min)?.title ?? 'Cần cố gắng';