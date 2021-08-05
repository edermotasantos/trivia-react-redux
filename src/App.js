import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Game from './pages/Game';
import Settings from './pages/Settings';

class App extends React.Component {
  render() {
    const { player: { loggedIn } } = this.props;
    return (
      <div className="App">
        <header className="App-header">
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route path="/game" component={ Game } />
            <Route path="/settings" component={ Settings } />
          </Switch>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ // 2
  player: state.player,
});

App.propTypes = { // 2
  player: PropTypes.shape({
    loggedIn: PropTypes.bool,
  }).isRequired,
};

export default connect(mapStateToProps, null)(App); // 2
