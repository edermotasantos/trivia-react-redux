import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCategories, fetchQuestions, fetchToken } from '../actions';
import './Settings.css';

class Settings extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.applyConfiguration = this.applyConfiguration.bind(this);
    this.renderCategoryConfig = this.renderCategoryConfig.bind(this);
    this.renderDifficultyConfig = this.renderDifficultyConfig.bind(this);
    this.renderTypeConfig = this.renderTypeConfig.bind(this);

    this.state = {
      category: '',
      difficulty: '',
      type: '',
      redirect: false,
    };
  }

  componentDidMount() {
    const { getCategoriesHandler } = this.props;
    getCategoriesHandler();
    sessionStorage.customError = false;
  }

  handleChange({ target: { name, value } }) {
    this.setState((prevState) => ({ ...prevState, [name]: value }));
  }

  async applyConfiguration() {
    const { getTokenHandler, getCustomQuestionsHandler } = this.props;
    const { category, difficulty, type } = this.state;
    if (category !== '' || difficulty !== '' || type !== '') {
      const config = `${category}${difficulty}${type}`;
      if (localStorage.getItem('token') !== null) {
        const { token } = localStorage;
        await getCustomQuestionsHandler(config, token);
      } else {
        await getTokenHandler();
        const { token } = localStorage;
        await getCustomQuestionsHandler(config, token);
      }
    }
    const { customError } = sessionStorage;
    if (!JSON.parse(customError)) this.setState({ redirect: true });
  }

  renderCategoryConfig() {
    const { game: { categories } } = this.props;
    const { category } = this.state;

    return (
      <select
        className="configuration-options"
        name="category"
        value={ category }
        onChange={ this.handleChange }
      >
        Categoria
        <option value="">Any Category</option>
        { categories.map((categorie, index) => (
          <option key={ index } value={ `&category=${categorie.id}` }>
            { categorie.name }
          </option>
        )) }
      </select>
    );
  }

  renderDifficultyConfig() {
    const { difficulty } = this.state;
    return (
      <select
        className="configuration-options"
        name="difficulty"
        value={ difficulty }
        onChange={ this.handleChange }
      >
        Dificuldade
        <option value="">Any Difficulty</option>
        <option value="&difficulty=easy">Easy</option>
        <option value="&difficulty=medium">Medium</option>
        <option value="&difficulty=hard">Hard</option>
      </select>
    );
  }

  renderTypeConfig() {
    const { type } = this.state;
    return (
      <select
        className="configuration-options"
        name="type"
        value={ type }
        onChange={ this.handleChange }
      >
        Type
        <option value="">Any Type</option>
        <option value="&type=multiple">Multiple Choice</option>
        <option value="&type=boolean">True / False</option>
      </select>
    );
  }

  render() {
    const { redirect } = this.state;
    switch (redirect) {
    case true: return <Redirect to="/" />;
    case false:
      return (
        <div>
          <h1
            className="text-config"
            data-testid="settings-title"
          >
            Configurações
          </h1>
          <div className="configuration-menu">
            { this.renderCategoryConfig() }
            { this.renderDifficultyConfig() }
            { this.renderTypeConfig() }
            <button
              type="submit"
              className="configuration-button"
              onClick={ () => this.applyConfiguration() }
            >
              Aplicar
            </button>
          </div>
        </div>
      );
    default:
    }
  }
}

const mapStateToProps = (state) => ({ game: state.game });

const mapDispatchToProps = (dispatch) => ({
  getCategoriesHandler: () => dispatch(fetchCategories()),
  getCustomQuestionsHandler: (config, token) => dispatch(fetchQuestions(config, token)),
  getTokenHandler: () => dispatch(fetchToken()),
});

Settings.propTypes = {
  game: PropTypes.shape({
    categories: PropTypes.arrayOf(PropTypes.shape()),
    token: PropTypes.string,
  }).isRequired,
  getCategoriesHandler: PropTypes.func.isRequired,
  getCustomQuestionsHandler: PropTypes.func.isRequired,
  getTokenHandler: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
