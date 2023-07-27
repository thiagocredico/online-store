import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class Card extends Component {
  state = {
    cart: JSON.parse(localStorage.getItem('cart')) || [],
  };

  // criar um estado para o carrinho;
  // passar essa informação pros componentes necessários
  // criar uma lógica no click que add determinado produto no stado do carrinho
  // fazer uma regra de negócio que vai verificar se aquele item ja existe no carrinho
  // salvar a informação do estado no localStorage

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
    this.updateCartQuantity();
    this.setState({ cart });
  };

  render() {
    const { products } = this.props;
    return (
      <section>
        {products.length === 0 ? <p>Nenhum produto foi encontrado</p>
          : (
            products.map((product) => (
              <div
                key={ product.id }
                // title={ product.title }
                // thumbnail={ product.thumbnail}
                // price={ product.price }
                data-testid="product"
              >
                <p>{product.title}</p>
                <img
                  src={ product.thumbnail }
                  alt={ product.title }
                />
                <p>{`R$${product.price}`}</p>
                <Link
                  data-testid="product-detail-link"
                  to={ `/product/${product.id}` }
                >
                  Detalhes

                </Link>
                <button
                  type="button"
                  data-testid="product-add-to-cart"
                  onClick={ () => this.addCart(product) }
                >
                  Adicionar ao Carrinho
                </button>
              </div>)))}
      </section>

    );
  }
}

Card.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    thumbnail: PropTypes.string,
    id: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.number,
  })).isRequired,
};
