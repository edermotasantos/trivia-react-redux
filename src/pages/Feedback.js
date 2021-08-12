import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { resetScore, willPlayAgain, fetchQuestions } from '../actions';
import { Header, Mp3 } from '../components';
import { acertouPouco, foiBem } from '../audio';
import './Feedback.css';

class Feedback extends Component {
  constructor(props) {
    super(props);

    this.restartGame = this.restartGame.bind(this);
    this.rankingScreen = this.rankingScreen.bind(this);
    this.goHome = this.goHome.bind(this);
    this.renderButtons = this.renderButtons.bind(this);
    this.renderRestartButtons = this.renderRestartButtons.bind(this);
    this.renderRankingButtons = this.renderRankingButtons.bind(this);
    this.renderHomeButtons = this.renderHomeButtons.bind(this);
    this.resetScoreStorage = this.resetScoreStorage.bind(this);
    this.renderFeedback = this.renderFeedback.bind(this);

    this.state = { option: '' };
  }

  componentDidMount() {
    const { getCustomQuestionsHandler } = this.props;
    const { lastConfig } = sessionStorage;
    const { token } = localStorage;
    getCustomQuestionsHandler(lastConfig, token);
  }

  restartGame() {
    const { resetScoreHandler, willPlayAgainHandler } = this.props;
    resetScoreHandler();
    willPlayAgainHandler();
    this.resetScoreStorage();
    this.setState({ option: 'restart' });
  }

  rankingScreen() {
    const { resetScoreHandler } = this.props;
    resetScoreHandler();
    this.setState({ option: 'ranking' });
  }

  goHome() {
    this.setState({ option: 'home' });
  }

  resetScoreStorage() {
    const retrieve = JSON.parse(localStorage.getItem('state'));
    retrieve.player.assertions = 0;
    retrieve.player.score = 0;
    localStorage.state = JSON.stringify(retrieve);
  }

  storeDataToRanking(name, score, picture) {
    const TOKEN_ADJUST = 5;
    const token = picture.split('/', TOKEN_ADJUST)[4];
    const newData = { name, score, picture };
    if ('ranking' in localStorage) {
      const prevData = JSON.parse(localStorage.getItem('ranking'));
      prevData.forEach((data, index) => {
        const compareToken = data.picture.split('/', TOKEN_ADJUST)[4];
        if (token === compareToken) prevData.splice(index, 1);
      });
      localStorage.setItem('ranking', JSON.stringify([...prevData, newData]));
    } else {
      localStorage.setItem('ranking', JSON.stringify([newData]));
    }
  }

  renderRestartButtons() {
    return (
      <div className="play-again-container" data-testid="btn-play-again">
        <button
          type="button"
          className="play-again material-icons"
          onClick={ () => this.restartGame() }
        >
          replay_circle_filled
        </button>
        <button
          type="button"
          className="play-again-label"
          onClick={ () => this.restartGame() }
        >
          JOGAR NOVAMENTE
        </button>
        <button
          type="button"
          className="play-again material-icons"
          onClick={ () => this.restartGame() }
        >
          extension
        </button>
      </div>
    );
  }

  renderRankingButtons() {
    return (
      <div className="ranking-btn-container">
        <button
          type="button"
          className="btn-ranking material-icons"
          onClick={ () => this.rankingScreen() }
        >
          military_tech
        </button>
        <button
          type="button"
          className="btn-ranking-label"
          data-testid="btn-ranking"
          onClick={ () => this.rankingScreen() }
        >
          RANKING
        </button>
        <button
          type="button"
          className="btn-ranking material-icons"
          onClick={ () => this.rankingScreen() }
        >
          military_tech
        </button>
      </div>
    );
  }

  renderHomeButtons() {
    return (
      <div className="home-btn-container">
        <button
          type="button"
          className="btn-home material-icons"
          data-testid="btn-go-home"
          onClick={ () => this.goHome() }
        >
          home
        </button>
        <button
          type="button"
          className="btn-home-label"
          data-testid="btn-go-home"
          onClick={ () => this.goHome() }
        >
          HOME
        </button>
        <button
          type="button"
          className="btn-home material-icons"
          data-testid="btn-go-home"
          onClick={ () => this.goHome() }
        >
          home
        </button>
      </div>
    );
  }

  renderButtons() {
    return (
      <div className="options-container">
        { this.renderRestartButtons() }
        { this.renderRankingButtons() }
        { this.renderHomeButtons() }

      </div>
    );
  }

  renderFeedback() {
    const { player: { name, gravatarEmail, score, assertions } } = this.props;
    const AVERAGE = 3;

    this.storeDataToRanking(name, score, gravatarEmail);

    return (
      <div className="feedback-container">
        <Header
          name={ name }
          gravatar={ gravatarEmail }
          score={ score }
          assertions={ assertions }
          toRender="feedback"
        />
        <h1 className="feedback-message" data-testid="feedback-text">
          { assertions >= AVERAGE ? 'Mandou bem!' : 'Podia ser melhor...'}
        </h1>
        <div>
          { assertions >= AVERAGE ? (
            <Mp3 musicPath={ foiBem } />
          ) : (
            <Mp3 musicPath={ acertouPouco } />
          ) }
        </div>
        { this.renderButtons() }
      </div>
    );
  }

  render() {
    const { option } = this.state;
    switch (option) {
    case 'restart': return <Redirect to="/game" />;
    case 'ranking': return <Redirect to="ranking" />;
    case 'home': return <Redirect to="/" />;
    default: return this.renderFeedback();
    }
  }
}

const mapStateToProps = (state) => ({ player: state.player });

const mapDispatchToProps = (dispatch) => ({
  resetScoreHandler: () => dispatch(resetScore()),
  willPlayAgainHandler: () => dispatch(willPlayAgain()),
  getCustomQuestionsHandler: (config, token) => dispatch(fetchQuestions(config, token)),
});

Feedback.propTypes = {
  player: PropTypes.shape({
    name: PropTypes.string,
    gravatarEmail: PropTypes.string,
    score: PropTypes.number,
    assertions: PropTypes.number,
  }).isRequired,
  resetScoreHandler: PropTypes.func.isRequired,
  willPlayAgainHandler: PropTypes.func.isRequired,
  getCustomQuestionsHandler: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
