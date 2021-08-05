import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fethApi from '../services/api';
import { Header } from '../components'; 

class Game extends Component {
  constructor(props) {
    super(props);
    
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
    const { player: { name, gravatarEmail, score } } = this.props;
    return (
      <header>
        <div>
          <h4>Tela de jogo</h4>
          <div>
            {questions.length === 0 ? (
              isloading
            ) : (
              <>
                <Header name={ name } gravatar={ gravatarEmail } score={ score } />
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

const mapStateToProps = (state) => ({
  player: state.player,
});

Game.propTypes = {
  player: PropTypes.shape({
    name: PropTypes.string,
    gravatarEmail: PropTypes.string,
    score: PropTypes.number,
  }).isRequired,
};

export default connect(mapStateToProps, null)(Game);
