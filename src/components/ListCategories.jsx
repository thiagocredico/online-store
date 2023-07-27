import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getCategories } from '../services/api';

export default class ListCategories extends Component {
  state = {
    categories: [],
  };

  componentDidMount() {
    this.handleGetCategories();
  }

  handleGetCategories = async () => {
    const getCategory = await getCategories();
    this.setState({ categories: getCategory });
  };

  render() {
    const { categories } = this.state;
    const { handleChange, inputRadio } = this.props;
    return (
      <div
        name="inputRadio"
        onChange={ handleChange }
        value={ inputRadio }
        className="w-48 flex flex-col join join-vertical text-xs"
      >
        {categories.map((category) => (
          <input
            key={ category.id }
            data-testid="category"
            name="inputRadio"
            value={ category.id }
            type="radio"
            id={ category.id }
            className="join-item btn text-xs"
            aria-label={ `${category.name}` }
          />
        ))}
      </div>
    );
  }
}

ListCategories.propTypes = {
  handleChange: PropTypes.func.isRequired,
  inputRadio: PropTypes.string.isRequired,
};
