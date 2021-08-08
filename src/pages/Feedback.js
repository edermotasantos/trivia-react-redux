import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { resetScore, willPlayAgain } from '../actions';
import { Header } from '../components';
import './Feedback.css';

class Feedback extends Component {
  constructor(props) {
    super(props);

    this.restartGame = this.restartGame.bind(this);
    this.renderFeedback = this.renderFeedback.bind(this);

    this.state = ({ redirect: false });
  }

  restartGame() {
    const { resetScoreHandler, willPlayAgainHandler } = this.props;
    resetScoreHandler();
    willPlayAgainHandler();
    this.setState({ redirect: true });
  }

  renderFeedback() {
    const { player: { name, gravatarEmail, score, assertions } } = this.props;
    const AVERAGE = 3;

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
      </div>
    );
  }

  render() {
    const { redirect } = this.state;

    if (redirect) return <Redirect to="/game" />;

    return (this.renderFeedback());
  }
}

const mapStateToProps = (state) => ({ player: state.player });

const mapDispatchToProps = (dispatch) => ({
  resetScoreHandler: () => dispatch(resetScore()),
  willPlayAgainHandler: () => dispatch(willPlayAgain()),
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
