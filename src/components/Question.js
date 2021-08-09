import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

class Question extends Component {
  render() {
    const { questions, question, timer, submitAnswer } = this.props;
    const ADJUST = -2;
    const MAX_QUESTIONS = 4;
    const CORRECT = 'correct-answer';

    if (question > MAX_QUESTIONS) return <Redirect to="/feedback" />;

    return (
      <>
        <div className="question-container">
          <div className="question-category-timer">
            <p className="question-category" data-testid="question-category">
              {questions[question].category}
            </p>
            <div className="timer-container">
              <span className="timer">{ timer }</span>
            </div>
          </div>
          <p className="question-text" data-testid="question-text">
            {questions[question].question}
          </p>
        </div>
        <div className="answers-container">
          {questions[question].answers.map((answer, index) => (
            <button
              key={ index }
              id={ questions[question].difficulty }
              className={ ((answer.id === CORRECT)
                ? (`btn ${answer.id}`)
                : `btn ${answer.id.slice(0, ADJUST)}`) }
              type="button"
              data-testid={ answer.id }
              onClick={ submitAnswer }
            >
              { answer.value }
            </button>
          ))}
        </div>
      </>
    );
  }
}

Question.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({
    answers: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      value: PropTypes.string,
    })),
    category: PropTypes.string,
    difficulty: PropTypes.string,
    question: PropTypes.string,
    type: PropTypes.string,
  })).isRequired,
  question: PropTypes.number.isRequired,
  timer: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  submitAnswer: PropTypes.func.isRequired,
};

export default Question;
