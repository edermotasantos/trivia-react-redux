import React from 'react';
import PropTypes from 'prop-types'; // 2
import './Login.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import logo from '../trivia.png';
import { changePlayerInfo, validateLogin } from '../actions'; // 2
import * as api from '../services/api'; // 2

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      isDisable: true,
      token: '', // 2
      gravatar: '', // 2
    };
    this.handleChange = this.handleChange.bind(this);
    this.verifyLogin = this.verifyLogin.bind(this);
    this.getToken = this.getToken.bind(this); // 2
    this.validateLogin = this.validateLogin.bind(this); // 2
  }

  componentDidUpdate(prevProps, prevState) {
    const { email, name } = this.state;
    if (email !== prevState.email || name !== prevState.name) {
      this.verifyLogin();
    }
  }

  async getToken() { // 2
    const { name, email } = this.state;
    const { player: { assertions, score }, changePlayerInfoHandler } = this.props;

    const tokenRequest = await api.getToken();
    const gravatarRequest = api.getGravatar(email);

    console.log(tokenRequest.token);
    console.log(gravatarRequest);

    changePlayerInfoHandler({
      name,
      gravatarEmail: gravatarRequest,
    });

    this.setState({
      token: tokenRequest.token,
      gravatar: gravatarRequest,
    });

    localStorage.setItem('state', JSON.stringify({
      player: {
        name,
        assertions,
        score,
        gravatarEmail: gravatarRequest,
      },
    }));
    localStorage.setItem('token', tokenRequest.token);
  }

  verifyLogin() {
    const { name, email } = this.state;
    const regex = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/g;
    if (regex.test(email) && name.length > 0) {
      this.setState({ isDisable: false });
    } else {
      this.setState({ isDisable: true });
    }
  }

  handleChange({ target: { name, value } }) {
    this.setState((prevState) => ({ ...prevState, [name]: value }));
  }

  async validateLogin() { // 2
    const { token } = this.state;
    const { validateLoginHandler } = this.props;

    this.getToken();

    const questions = await api.getQuestions(token);
    console.log(questions.results);

    const playerDataStorage = JSON.parse(localStorage.getItem('state'));
    const tokenDataStorage = (localStorage.getItem('token'));

    console.log(`O nome do jogador é: ${playerDataStorage.player.name}`);
    console.log(`Token: ${tokenDataStorage}`);

    validateLoginHandler();
  }

  render() {
    const { name, email, isDisable } = this.state;
    return (
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <p>SUA VEZ</p>
        <form className="login">
          <label htmlFor="input-text">
            <input
              value={ name }
              name="name"
              type="text"
              placeholder="Digite seu Nome"
              data-testid="input-player-name"
              id="input-text"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="input-email">
            <input
              value={ email }
              name="email"
              type="email"
              data-testid="input-gravatar-email"
              placeholder="Digite seu Email"
              id="input-email"
              onChange={ this.handleChange }
            />
          </label>
          <button
            onClick={ this.validateLogin } // 2
            disabled={ isDisable }
            type="button"
            data-testid="btn-play"
          >
            Jogar
          </button>
          <Link to="/Settings">
            <button data-testid="btn-settings" type="button">
              Configurações
            </button>
          </Link>
        </form>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  player: state.player,
});

const mapDispatchToProps = (dispatch) => ({ // 2
  changePlayerInfoHandler: (playerInfo) => dispatch(changePlayerInfo(playerInfo)), // 2
  validateLoginHandler: () => dispatch(validateLogin()), // 2
});

Login.propTypes = {
  player: PropTypes.shape({
    name: PropTypes.string,
    assertions: PropTypes.number,
    score: PropTypes.number,
    gravatarEmail: PropTypes.string,
  }).isRequired,
  changePlayerInfoHandler: PropTypes.func.isRequired,
  validateLoginHandler: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
