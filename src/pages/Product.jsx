import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { logDOM } from '@testing-library/react';
import { getProductById } from '../services/api';
// import ButtonCart from '../components/ButtonCart';
import Header from '../components/Header';

export default class Product extends Component {
  state = {
    product: [],
    cart: JSON.parse(localStorage.getItem('cart')) || [],
    email: '',
    text: '',
    buttonDisabled: true,
    rating: '',
    evaluations: [],
    freeShipping: false,
  };

  componentDidMount() {
    this.handleGetProductId();
    const { match: { params: { id } } } = this.props;
    if (!JSON.parse(localStorage.getItem(id))) {
      localStorage.setItem(id, JSON.stringify([]));
    }
    const getEvaluations = JSON.parse(localStorage.getItem(id));
    this.setState({ evaluations: getEvaluations });
  }

  onChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.validateButton);
  };

  updateCartQuantity = () => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    const totalQuantity = cart.reduce((acc, curr) => acc + curr.quantity, 0);
    localStorage.setItem('cartQuantity', JSON.stringify(totalQuantity));
  };

  addCart = (product) => {
    const { cart } = this.state;
    const itens = cart.find((item) => item.id === product.id);
    if (itens) {
      itens.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    this.setState({ cart });
    this.updateCartQuantity();
  };

  handleGetProductId = async () => {
    const { match: { params: { id } } } = this.props;
    const data = await getProductById(id);
    const freeShipping = data.shipping.free_shipping;
    // const b = product.shipping.free_shipping;
    this.setState({ product: data, freeShipping });
  };

  validateButton = () => {
    const { email, rating } = this.state;
    const validation = (rating !== ''
      && (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g).test(email));
    this.setState({ buttonDisabled: !validation });
  };

  submitReview = () => {
    const { email, rating, text, product } = this.state;
    let localStoraged = JSON.parse(localStorage.getItem(`${product.id}`));
    const reviews = {
      email,
      text,
      rating,
    };
    localStoraged = [...localStoraged, reviews];
    localStorage.setItem(`${product.id}`, JSON.stringify(localStoraged));
    this.setState({
      evaluations: [...localStoraged],
      email: '',
      text: '',
      rating: '',
    });
  };

  render() {
    const { product, email, text,
      buttonDisabled, evaluations, freeShipping } = this.state;
    return (
      <>
        <Header />
        <section>
          <p data-testid="product-detail-name">{product.title}</p>
          <img
            data-testid="product-detail-image"
            src={ product.thumbnail }
            alt={ product.title }
          />
          <p data-testid="product-detail-price">{`R$${product.price}`}</p>
          { freeShipping
                    && <p data-testid="free-shipping">Frete Gátis</p> }
          {/* <ButtonCart /> */}
          <button
            type="button"
            data-testid="product-detail-add-to-cart"
            onClick={ () => this.addCart(product) }
          >
            Adiciona ao Carrinho
          </button>

          <form action="" method="get">
            <label htmlFor="">
              <input
                type="email"
                data-testid="product-detail-email"
                name="email"
                value={ email }
                placeholder="seu_nome@email.com.br"
                onChange={ this.onChange }
              />
              <p>Nota</p>
              <label htmlFor="1">1</label>
              <input
                type="radio"
                name="rating"
                value="1"
                id="1"
                data-testid="1-rating"
                onChange={ this.onChange }
              />
              <label htmlFor="2">2</label>
              <input
                type="radio"
                name="rating"
                value="2"
                // id="iRate"
                data-testid="2-rating"
                onChange={ this.onChange }
              />
              <label htmlFor="3">3</label>
              <input
                type="radio"
                name="rating"
                value="3"
                // id="iRate"
                data-testid="3-rating"
                onChange={ this.onChange }
              />
              <label htmlFor="4">4</label>
              <input
                type="radio"
                name="rating"
                value="4"
                // id="iRate"
                data-testid="4-rating"
                onChange={ this.onChange }
              />
              <label htmlFor="5">5</label>
              <input
                type="radio"
                name="rating"
                value="5"
                // id="iRate"
                data-testid="5-rating"
                onChange={ this.onChange }
              />
              <p>Avaliação</p>
              <textarea
                name="text"
                value={ text }
                id=""
                cols="20"
                rows="8"
                data-testid="product-detail-evaluation"
                onChange={ this.onChange }
                placeholder="Mensagem (opcional)"
              >
                Avaliação
              </textarea>
            </label>
            <button
              type="button"
              data-testid="submit-review-btn"
              onClick={ this.submitReview }
              disabled={ buttonDisabled }
            >
              Avaliar
            </button>
            {buttonDisabled && <p data-testid="error-msg">Campos inválidos</p> }

          </form>
          <section>
            {evaluations && evaluations.map((review, index) => (
              <section key={ index }>
                <p data-testid="review-card-email">{review.email}</p>
                <p data-testid="review-card-rating">{`Nota ${review.rating}`}</p>
                <p data-testid="review-card-evaluation">{review.text}</p>
              </section>))}
          </section>
        </section>
      </>
    );
  }
}

Product.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
