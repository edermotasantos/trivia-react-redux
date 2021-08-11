const EASY = 1;
const MEDIUM = 2;
const HARD = 3;
const RAND = 0.7;
const CORRECT = 'correct-answer';
const WRONG = 'wrong-answer';

export function formatQuestions(questions) {
  const formatAnswers = questions.map((answer) => [{
    correct: { value: answer.correct_answer.replaceAll('&amp;', '&')
      .replaceAll('&quot;', '"').replaceAll('&#039;', '\'').replaceAll('&lt;', '<')
      .replaceAll('&gt;', '>'),
    id: CORRECT },
    incorrect: answer.incorrect_answers.map((incorrect, index) => (
      { value: incorrect.replaceAll('&amp;', '&').replaceAll('&quot;', '"')
        .replaceAll('&#039;', '\'').replaceAll('&lt;', '<')
        .replaceAll('&gt;', '>'),
      id: `wrong-answer-${index}` }
    )),
  }]);
  const spreadAnswers = formatAnswers.map((answer) => [
    answer[0].correct, ...answer[0].incorrect,
  ]);
  const mixedAnswers = spreadAnswers
    .map((answer) => answer.sort(() => Math.random() - RAND));
  const formatedQuestions = questions.map((question, index) => {
    const decodeQuestion = question.question.replaceAll('&amp;', '&')
      .replaceAll('&quot;', '"').replaceAll('&#039;', '\'').replaceAll('&lt;', '<')
      .replaceAll('&gt;', '>');
    const formatObject = {
      category: question.category,
      type: question.category,
      difficulty: question.difficulty,
      question: decodeQuestion,
      answers: mixedAnswers[index],
    }; return formatObject;
  });
  return formatedQuestions;
}

export function identifyDifficulty(difficultyLevel) {
  switch (difficultyLevel) {
  case 'easy': return EASY;
  case 'medium': return MEDIUM;
  case 'hard': return HARD;
  default: return 0;
  }
}

export function calculateScore(timer, difficultyLevel) {
  const CONST = 10;
  const difficulty = identifyDifficulty(difficultyLevel);
  const addToScore = parseInt(`${CONST + (timer * difficulty)}`, 10);
  // console.log(`${CONST} + (${timer} * ${difficulty}) = ${addToScore}`);
  const retrievePlayer = JSON.parse(localStorage.getItem('state'));
  const currentScore = parseInt(retrievePlayer.player.score, 10);
  // console.log(`${currentScore} + ${addToScore} = ${currentScore + addToScore}`);
  retrievePlayer.player.score = currentScore + addToScore;
  retrievePlayer.player.assertions += 1;
  localStorage.setItem('state', JSON.stringify(retrievePlayer));
  return addToScore;
}

export function disableAnswers(isDisable) {
  const answers = document.querySelectorAll('.btn');
  const next = document.querySelector('.next-container');
  if (isDisable) {
    answers.forEach((answer) => { answer.disabled = true; });
    next.style.display = 'flex';
  } else {
    answers.forEach((answer) => { answer.disabled = false; });
    next.style.display = '';
  }
}

export function changeColor(isChange) {
  const correct = document.querySelector(`.${CORRECT}`);
  const wrongs = document.querySelectorAll(`.${WRONG}`);
  if (isChange) {
    correct.style.border = '3px solid rgb(6, 240, 15)';
    wrongs.forEach((wrong) => { wrong.style.border = '3px solid rgb(255, 0, 0)'; });
  } else {
    correct.style.border = '';
    wrongs.forEach((wrong) => { wrong.style.border = ''; });
  }
}

export function adjustTimerStyle(isAdjust) {
  if (isAdjust) {
    document.querySelector('.timer-container').style.backgroundColor = 'transparent';
    const timerAdjust = 'background-color: white; border-radius: 5px; padding: 0.2em;';
    const timerContainer = document.querySelector('.timer');
    timerContainer.style.cssText = timerAdjust;
  } else {
    document.querySelector('.timer-container').style.backgroundColor = '';
    const timerContainer = document.querySelector('.timer');
    timerContainer.style.cssText = '';
  }
}
