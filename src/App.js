import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import { Login, Game, Settings, Feedback } from './pages';
import Ranking from './pages/Ranking';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route path="/game" component={ Game } />
            <Route path="/settings" component={ Settings } />
            <Route path="/feedback" component={ Feedback } />
            <Route path="/ranking" component={ Ranking } />
          </Switch>
        </header>
      </div>
    );
  }
}

export default App;
