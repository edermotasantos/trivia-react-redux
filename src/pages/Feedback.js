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

    this.state = ({
      redirect: false,
      ranking: false,
    });
  }

  restartGame() {
    const { resetScoreHandler, willPlayAgainHandler } = this.props;
    resetScoreHandler();
    willPlayAgainHandler();
    this.setState((prevState) => ({
      ...prevState,
      redirect: true,
    }));
  }

  rankingScreen() {
    this.setState((prevState) => ({
      ...prevState,
      ranking: true,
    }));
  }

  storeDataToRanking(name, score, picture) {
    const token = picture.split('/', 5)[4];
    const newData = { name, score, picture };
    if ( 'ranking' in localStorage) {
    const prevData = JSON.parse(localStorage.getItem('ranking'));
    prevData.forEach((data, index)=>{
      const compareToken = data.picture.split('/', 5)[4];
      if (token === compareToken) {
        prevData.splice(index, 1);
        console.log(prevData);
      }
    })
    localStorage.setItem('ranking', JSON.stringify(
      [...prevData, newData],
    ));
    } 
    else {
      localStorage.setItem('ranking', JSON.stringify([newData]));
    }
  }

  renderButtons() {
    return (
      <div>
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
        <div>
          <button
            type="button"
            data-testid="btn-ranking"
            onClick={ () => this.rankingScreen() }
          >
            Ver Ranking
          </button>
        </div>
      </div>
    );
  }

  renderFeedback() {
    const { player: { name, gravatarEmail, score, assertions } } = this.props;
    this.storeDataToRanking(name, score, gravatarEmail);
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
        { this.renderButtons() }
      </div>
    );
  }

  render() {
    const { redirect, ranking } = this.state;

    // if (redirect) return <Redirect to="/game" />;
    if (ranking) return <Redirect to="/ranking" />;

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
