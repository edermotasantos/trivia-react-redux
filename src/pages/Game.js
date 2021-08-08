import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setUpdateScore } from '../actions';
import { Header, Question } from '../components';
import * as api from '../services/api';
import * as util from '../util/util';
import './Game.css';

const TIMER = 30;
const MAX_QUESTIONS = 4;
const CORRECT = 'correct-answer';

class Game extends Component {
  constructor(props) {
    super(props);

    this.startTimer = this.startTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.prepareTrivia = this.prepareTrivia.bind(this);
    this.submitAnswer = this.submitAnswer.bind(this);
    this.renderGame = this.renderGame.bind(this);
    this.changeQuestion = this.changeQuestion.bind(this);

    this.state = {
      questions: [],
      question: 0,
      isTiming: false,
      isPlaying: false,
      timer: TIMER,
    };
  }

  componentDidMount() {
    api.fethApi().then((questions) => {
      this.setState({ questions });
      this.prepareTrivia();
    });
  }

  componentDidUpdate() {
    const { isPlaying, isTiming, timer } = this.state;

    if (isPlaying && isTiming) this.startTimer();
    if (timer === 0) {
      this.stopTimer();
      util.disableAnswers(true);
      util.changeColor(true);
    }
  }

  prepareTrivia() {
    const { questions } = this.state;
    const formatedQuestions = util.formatQuestions(questions);
    this.setState({
      questions: formatedQuestions,
      isTiming: true,
      isPlaying: true,
    });
  }

  startTimer() {
    const SECOND = 1000;
    this.setState({ isTiming: false, isPlaying: true });
    this.gameTimer = setInterval(() => {
      this.setState((prevState) => ({ timer: prevState.timer - 1 }));
    }, SECOND);
  }

  resetTimer() {
    const { question } = this.state;
    this.setState({ timer: TIMER });
    if (question < MAX_QUESTIONS) this.startTimer();
  }

  stopTimer() {
    clearInterval(this.gameTimer);
  }

  submitAnswer({ target: { className, id } }) {
    const { timer } = this.state;
    util.disableAnswers(true);
    util.changeColor(true);
    this.stopTimer();
    if (timer === 0) this.setState({ timer: 'Tempo ESGOTADO!' });
    if (className.split(' ', 2)[1] === CORRECT) {
      this.calculateScore(timer, id);
      this.setState({ timer: 'ACERTOU!' });
      util.adjustTimerStyle(true);
    } else {
      this.setState({ timer: 'ERROU!' });
      util.adjustTimerStyle(true);
    }
  }

  calculateScore(timer, difficultyLevel) {
    const { setUpdateScoreHandler } = this.props;
    const calculatedScore = util.calculateScore(timer, difficultyLevel);
    console.log(calculatedScore);
    setUpdateScoreHandler({ score: calculatedScore });
  }

  changeQuestion() {
    util.disableAnswers(false);
    util.changeColor(false);
    util.adjustTimerStyle(false);
    this.resetTimer();
    this.setState((prevState) => ({ question: prevState.question + 1 }));
  }

  renderGame() {
    const { questions, question, timer } = this.state;
    const { player: { name, gravatarEmail, score } } = this.props;

    return (
      <div className="game-container">
        <div className="game-header">
          <h1 className="title">TRIVIA</h1>
          <div className="next-container">
            <button
              data-testid="btn-next"
              type="button"
              className="next material-icons"
              onClick={ () => this.changeQuestion() }
            >
              arrow_forward_ios
            </button>
          </div>
        </div>
        <Header
          name={ name }
          gravatar={ gravatarEmail }
          score={ score }
          toRender="game"
        />
        <Question
          questions={ questions }
          question={ question }
          timer={ timer }
          submitAnswer={ this.submitAnswer }
        />
      </div>
    );
  }

  render() {
    const { isPlaying } = this.state;
    if (isPlaying) return this.renderGame();
    return (<> </>);
  }
}

const mapStateToProps = (state) => ({ player: state.player });

const mapDispatchToProps = (dispatch) => ({
  setUpdateScoreHandler: (scoreInfo) => dispatch(setUpdateScore(scoreInfo)),
});

Game.propTypes = {
  player: PropTypes.shape({
    name: PropTypes.string,
    gravatarEmail: PropTypes.string,
    score: PropTypes.number,
  }).isRequired,
  setUpdateScoreHandler: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
