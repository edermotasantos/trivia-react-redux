import React, { Component } from 'react';
import fethApi from '../services/api';

export default class extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      isloading: true,
    };
  }

  componentDidMount() {
    fethApi().then((questions) => {
      this.setState({
        questions,
        isloading: false,
      });
    });
  }

  render() {
    const { isloading, questions } = this.state;
    return (
      <header>
        <div>
          <h4>Tela de jogo</h4>
          <div>
            {questions.length === 0 ? (
              isloading
            ) : (
              <>
                <div>
                  <p data-testid="question-category">{questions[0].category}</p>
                  <p data-testid="question-text">{questions[0].question}</p>
                </div>
                <div>
                  <button type="button" data-testid="correct-answer">
                    {questions[0].correct_answer}
                  </button>
                  {questions[0].incorrect_answers.map((item, index) => (
                    <button
                      key={ item.id }
                      type="button"
                      data-testid={ `wrong-answer-${index}` }
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </header>
    );
  }
}
