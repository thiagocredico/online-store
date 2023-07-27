import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import ButtonCart from '../components/ButtonCart';
import Header from '../components/Header';

export default class ShopCart extends Component {
  state = {
    // listcart: [],
    cart: JSON.parse(localStorage.getItem('cart')) || [],
  };

  // componentDidMount() {
  //   const isEmpty = localStorage.getItem('cart');
  //   if (isEmpty) {
  //     const data = JSON.parse(localStorage.getItem('cart'));
  //     this.setState({ cart: data });
  //   }
  // }

  updateCartQuantity = () => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    const totalQuantity = cart.reduce((acc, curr) => acc + curr.quantity, 0);
    localStorage.setItem('cartQuantity', JSON.stringify(totalQuantity));
  };

  addCart = (product) => {
    const { cart } = this.state;
    const itens = cart.find((item) => item.id === product.id);
    const availabeQuantity = itens.available_quantity;
    // console.log(availabeQuantity);
    if (itens.quantity >= availabeQuantity) {
      itens.quantity = availabeQuantity;
    } else if (itens) {
      itens.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    this.setState({ cart });
    this.updateCartQuantity();
  };

  decreaseCart = (product) => {
    const { cart } = this.state;
    const itens = cart.find((item) => item.id === product.id);
    if (itens.quantity <= 1) {
      itens.quantity = 1;
    } else if (itens) {
      itens.quantity -= 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    this.setState({ cart });
    this.updateCartQuantity();
  };

  removeCart = (product) => {
    const { cart } = this.state;
    const itens = cart.filter((item) => item.id !== product.id);
    console.log(itens);
    // if (itens) {
    //   itens.quantity = 0;
    // } else {
    //   cart.push({ ...product, quantity: 1 });
    // }
    localStorage.setItem('cart', JSON.stringify(itens));
    this.setState({ cart: itens });
    this.updateCartQuantity();
  };

  render() {
    const { cart } = this.state;
    // console.log(cart);
    return (
      <>
        <Header />
        <section className="flex flex-col items-center">
          {cart.length === 0
            ? <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
            : (
              cart.map((product) => (
                <div
                  className="card card-side bg-base-100 shadow-xl m-4 min-w-full "
                  key={ product.id }
                  data-testid="product"
                >
                  <img
                    className="content-center object-cover p-4 w-40"
                    src={ product.thumbnail.replace(/\w\.jpg/gi, 'W.jpg') }
                    alt={ product.title }
                  />
                  <div className="card-body ">
                    <p
                      data-testid="shopping-cart-product-name"
                      className="card-title"
                    >
                      {product.title}
                    </p>
                    <p>{`R$${(product.price * product.quantity).toFixed(2)}`}</p>
                    <Link
                      data-testid="product-detail-link"
                      to={ `/product/${product.id}` }
                    >
                      Detalhes

                    </Link>
                    <div className="card-actions justify-end ">
                      <div className="join">
                        <button
                          className="btn join-item"
                          type="button"
                          data-testid="product-increase-quantity"
                          onClick={ () => this.addCart(product) }
                        >
                          +
                        </button>
                        <p
                          data-testid="shopping-cart-product-quantity"
                          className="join-item btn bg-white pointer-events-none"
                        >
                          {product.quantity}
                        </p>
                        <button
                          className="btn join-item"
                          type="button"
                          data-testid="product-decrease-quantity"
                          onClick={ () => this.decreaseCart(product) }
                        >
                          -
                        </button>
                        <button
                          className="btn btn-error"
                          type="button"
                          data-testid="remove-product"
                          onClick={ () => this.removeCart(product) }
                        >
                          {/* <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" /></svg> */}
                          X
                        </button>
                      </div>
                    </div>
                  </div>
                </div>)))}
          {/* <ButtonCart /> */}
          <button
            type="button"
            className="btn"

          >
            <Link
              data-testid="checkout-products"
              to="/checkout"
            >
              Finalizar
            </Link>

          </button>

        </section>
      </>
    );
  }
}

ShopCart.propTypes = {
  cart: PropTypes.arrayOf(),
}.isRequired;
