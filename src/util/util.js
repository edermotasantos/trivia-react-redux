const EASY = 1;
const MEDIUM = 2;
const HARD = 3;
const CORRECT = 'correct-answer';
const WRONG = 'wrong-answer';
const TIMER = '.timer-container';

function decodeHtmlEntities(textEncoded) {
  const textDecodeA = textEncoded.replaceAll('&aacute;', 'á').replaceAll('&Aacute;', 'Á')
    .replaceAll('&agrave;', 'à').replaceAll('&Agrave;', 'À')
    .replaceAll('&atilde;', 'ã')
    .replaceAll('&Atilde;', 'Ã')
    .replaceAll('&acirc;', 'â')
    .replaceAll('&Acirc;', 'Â');
  const textDecodeE = textDecodeA.replaceAll('&eacute;', 'é').replaceAll('&Eacute;', 'É')
    .replaceAll('&egrave;', 'è').replaceAll('&Egrave;', 'È')
    .replaceAll('&ecirc;', 'ê')
    .replaceAll('&Ecirc;', 'Ê');
  const textDecodeI = textDecodeE.replaceAll('&iacute;', 'í').replaceAll('&Iacute;', 'Í')
    .replaceAll('&igrave;', 'î').replaceAll('&Igrave;', 'Ì');
  const textDecodeO = textDecodeI.replaceAll('&oacute;', 'ó').replaceAll('&Oacute;', 'Ó')
    .replaceAll('&ograve;', 'ò').replaceAll('&Ograve;', 'Ò')
    .replaceAll('&otilde;', 'õ')
    .replaceAll('&Otilde;', 'Õ')
    .replaceAll('&ocirc;', 'ô')
    .replaceAll('&Ocirc;', 'Ô');
  const textDecodeU = textDecodeO.replaceAll('&uacute;', 'ú').replaceAll('&Uacute;', 'Ú')
    .replaceAll('&ugrave;', 'ù').replaceAll('&Ugrave;', 'Ù')
    .replaceAll('&ucirc;', 'û')
    .replaceAll('&Ucirc;', 'Û');
  const textDecodeUml = textDecodeU.replaceAll('&auml;', 'ä').replaceAll('&Auml;', 'Ä')
    .replaceAll('&euml;', 'ë').replaceAll('&Euml;', 'Ë')
    .replaceAll('&iuml;', 'ï')
    .replaceAll('&Iuml;', 'Ï')
    .replaceAll('&ouml;', 'ö')
    .replaceAll('&Ouml;', 'Ö')
    .replaceAll('&uuml;', 'ü')
    .replaceAll('&Uuml;', 'Ü');
  const textDecodeCons = textDecodeUml.replaceAll('&ccedil;', 'ç')
    .replaceAll('&Ccedil;', 'Ç').replaceAll('&ntilde;', 'ñ').replaceAll('&Ntilde;', 'Ñ');
  const textDecodeEsp = textDecodeCons.replaceAll('&amp;', '&').replaceAll('&copy;', '©')
    .replaceAll('&reg;', '®').replaceAll('&quot;', '"')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&#039;', '\'');
  const textDecoded = textDecodeEsp;
  return textDecoded;
}

function randomUniques(quantity) {
  const numbers = new Set();
  while (numbers.size < quantity) numbers.add(Math.floor(Math.random() * quantity));
  return numbers;
}

function shuffle(array, randomIndexes) {
  const shuffledArray = [];
  randomIndexes.forEach((index) => shuffledArray.push(array[index]));
  return shuffledArray;
}

export function formatQuestions(questions) {
  const formatAnswers = questions.map((answer) => [{
    correct: { value: decodeHtmlEntities(answer.correct_answer),
      id: CORRECT },
    incorrect: answer.incorrect_answers.map((incorrect, index) => (
      { value: decodeHtmlEntities(incorrect),
        id: `wrong-answer-${index}` }
    )),
  }]);
  const spreadAnswers = formatAnswers.map((answer) => [
    answer[0].correct, ...answer[0].incorrect,
  ]);
  const mixedAnswers = spreadAnswers
    .map((answer) => {
      const MAX_ANSWERS = 4;
      let shuffledAnswers;
      if (answer.length === MAX_ANSWERS) {
        shuffledAnswers = shuffle(answer, randomUniques(MAX_ANSWERS));
      }
      if (answer.length === 2) {
        shuffledAnswers = shuffle(answer, randomUniques(2));
      }
      return shuffledAnswers;
    });
  const formatedQuestions = questions.map((question, index) => {
    const decodeQuestion = decodeHtmlEntities(question.question);
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
    document.querySelector(TIMER).style.backgroundColor = 'transparent';
    document.querySelector(TIMER).style.borderStyle = 'none';
    document.querySelector(TIMER).style.boxShadow = 'none';
    const timerAdjust = 'background-color: white; border-radius: 5px; padding: 0.2em;';
    const timerContainer = document.querySelector('.timer');
    timerContainer.style.cssText = timerAdjust;
  } else {
    document.querySelector(TIMER).style.backgroundColor = '';
    document.querySelector(TIMER).style.borderStyle = '';
    document.querySelector(TIMER).style.boxShadow = '';
    const timerContainer = document.querySelector('.timer');
    timerContainer.style.cssText = '';
  }
}
