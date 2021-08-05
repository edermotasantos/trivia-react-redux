import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'; // 2
import PropTypes from 'prop-types'; // 2
import './App.css';
import Login from './pages/Login';
import Trivia from './pages/Trivia'; // 2
import Settings from './pages/Settings';

class App extends React.Component {
  render() {
    const { player: { loggedIn } } = this.props;
    return (
      <div className="App">
        <Switch>
          <Route exact path="/">
            {loggedIn ? <Redirect to="/play" /> : <Login />}
          </Route>
          <Route exact path="/settings" component={ Settings } />
          <Route path="/play" component={ Trivia } />
        </Switch>
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
