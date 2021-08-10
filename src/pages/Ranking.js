import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Ranking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRedirecting: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      isRedirecting: true,
    });
  }

  rankingList() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    return (
      <tbody>
        { ranking ? ranking.sort((a, b) => b.score - a.score)
          .map(({ name, score, picture }, index) => (
            <tr key={ index }>
              <td><img src={ picture } alt="profile" /></td>
              <td data-testid={ `player-name-${index}` }>{name}</td>
              <td data-testid={ `player-score-${index}` }>{score}</td>
            </tr>
          )) : null }
      </tbody>          
    );
  }

  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const { isRedirecting } = this.state;
    return (
      <>
        <h1 data-testid="ranking-title">Ranking</h1>
        <div>{ this.rankingList() }</div>
        <div>
          { (isRedirecting) ? <Redirect to="/" /> : (
            <button type="button" 
              data-testid="btn-go-home" 
              onClick={ this.handleClick }
            >
              home
            </button>
          )}
        </div>
    </>
    );
  }
}

export default Ranking;
