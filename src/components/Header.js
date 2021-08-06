import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { name, gravatar, score } = this.props;
    return (
      <header className="trivia-container">
        <h2 data-testid="header-player-name">{ name }</h2>
        <img
          data-testid="header-profile-picture"
          className="player-image"
          src={ gravatar }
          alt="Imagem do Player"
        />
        <h3 data-testid="header-score">{ score }</h3>
      </header>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  gravatar: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default Header;
