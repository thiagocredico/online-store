import React, { Component } from 'react';
import ButtonCart from './ButtonCart';

export default class Home extends Component {
//   state = {
//     cart: JSON.parse(localStorage.getItem('cart')) || [],
//     //     inputValue: '',
//   };

  //   componentDidMount() {
  //     const data = JSON.parse(localStorage.getItem('cart'));
  //     this.setState({ cart: data });
  //   }

  //   handleChange = ({ target }) => {
  //     const { name, value } = target;
  //     this.setState({ [name]: value }, () => {
  //       if (name === 'inputRadio') {
  //         this.handleInputRadio();
  //       }
  //     });
  //   };

  render() {
    // const { inputValue } = this.state;
    return (
      <section>
        <div>
          {/* <input
            data-testid="query-input"
            value={ inputValue }
            name="inputValue"
            onChange={ this.handleChange }
          />
          <button
            type="button"
            data-testid="query-button"
            onClick={ this.handleGetProducts }
          >
            Pesquisar
          </button> */}
          <div
            className="bg-yellow-300 flex justify-center flex-wrap min-w-screen"
          >
            <img src="" alt="" />
            {/* <p>FRONT-END</p>
            <p>online store</p> */}
            <ButtonCart />
          </div>
        </div>
      </section>
    );
  }
}
