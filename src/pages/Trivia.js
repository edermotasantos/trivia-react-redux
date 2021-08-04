// Requisito 2
import React, { Component } from 'react'; // 2
import { connect } from 'react-redux';
import PropTypes from 'prop-types'; // 2

class Trivia extends Component { // 2
  render() { // 2
    const { player: { player } } = this.props;
    return ( // 2
      <div>{ player.assertions }</div> // 2
    );
  }
}

const mapStateToProps = (state) => ({ // 2
  player: state.player,
});

Trivia.propTypes = { // 2
  player: PropTypes.shape({
    player: PropTypes.shape({
      assertions: PropTypes.number,
    }),
  }).isRequired,
};

export default connect(mapStateToProps, null)(Trivia); // 2
