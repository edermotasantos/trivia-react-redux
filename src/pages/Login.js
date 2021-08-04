import React from 'react';
import './Login.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      isDisable: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.verifyLogin = this.verifyLogin.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const { email, name } = this.state;
    if (email !== prevState.email || name !== prevState.name) {
      this.verifyLogin();
    }
  }

  handleChange({ target: { name, value } }) {
    this.setState((prevState) => ({ ...prevState, [name]: value }));
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

  render() {
    const { name, email, isDisable } = this.state;
    return (
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

        <button disabled={ isDisable } type="submit" data-testid="btn-play">
          Jogar
        </button>
        <Link to="/Settings">
          <button data-testid="btn-settings" type="button">
            Configurações
          </button>
        </Link>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  player: state.player,
});

export default connect(mapStateToProps, null)(Login);
