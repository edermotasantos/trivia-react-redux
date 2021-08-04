// Requisito 2
import React, { Component } from 'react'; // 2
import { connect } from 'react-redux'; // 2
import PropTypes from 'prop-types'; // 2
import './Trivia.css';

class Trivia extends Component { // 2
  render() { // 2
    const { player: { name, gravatarEmail, score } } = this.props;
    return ( // 2
      <header className="trivia-container">
        <h2 data-testid="header-player-name">{ name }</h2>
        <img
          data-testid="header-profile-picture"
          className="player-image"
          src={ gravatarEmail }
          alt="Imagem do Player"
        />
        <h2 data-testid="header-score">{ score }</h2>
      </header> // 2
    );
  }
}

const mapStateToProps = (state) => ({ // 2
  player: state.player,
});

Trivia.propTypes = { // 2
  player: PropTypes.shape({
    name: PropTypes.string,
    gravatarEmail: PropTypes.string,
    score: PropTypes.number,
  }).isRequired,
};

export default connect(mapStateToProps, null)(Trivia); // 2
