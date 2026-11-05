export const calcScore = (answers) => {
  // Hàm tính điểm dựa trên danh sách câu trả lời của bạn
  return answers.reduce((total, ans) => total + (ans.isCorrect ? 10 : 0), 0);
};

export const getRank = (score) => {
  return "Tốt";
};