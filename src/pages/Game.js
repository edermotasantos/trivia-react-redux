import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import fethApi from '../services/api';

export default class extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      isloading: true,
      btn: true,
    };
    this.color = this.color.bind(this);
    this.next = this.next.bind(this);
  }

  componentDidMount() {
    fethApi().then((questions) => {
      this.setState({
        questions,
        isloading: false,
      });
    });
  }

  color() {
    const correct = document.querySelector('.correct-answer');
    const wrong = document.querySelectorAll('.wrong-answer');
    wrong.forEach((element) => {
      element.style.border = ' 3px solid rgb(255, 0, 0)';
    });
    correct.style.border = ' 3px solid rgb(6, 240, 15)';
    this.setState({
      btn: false,
    });
  }

  next() {
    const { questions } = this.state;
    questions.map((pergunta, index) => pergunta.question[index]);
    console.log(questions);
    console.log(questions[0].question);
  }

  render() {
    const { isloading, questions, btn } = this.state;
    return (
      <header>
        {questions.length === 0 ? (
          isloading
        ) : (
          <>
            <div>
              <p data-testid="question-category">{questions[0].category}</p>
              <p data-testid="question-text">{questions[0].question}</p>
            </div>
            <button
              className="btn correct-answer"
              onClick={ this.color }
              type="button"
              data-testid="correct-answer"
            >
              {questions[0].correct_answer}
            </button>
            {questions[0].incorrect_answers.map((item, index) => (
              <button
                className="btn wrong-answer"
                onClick={ this.color }
                key={ index }
                type="button"
                data-testid={ `wrong-answer-${index}` }
              >
                {item}
              </button>
            ))}
            <button onClick={ this.next } type="button" disabled={ btn }>
              Poxima
            </button>
          </>
        )}
      </header>
    );
  }
}
