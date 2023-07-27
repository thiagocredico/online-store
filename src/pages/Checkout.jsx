import React, { Component } from 'react';
import Header from '../components/Header';

class Checkout extends Component {
  state = {
    cart: JSON.parse(localStorage.getItem('cart')) || [],
    fullname: '',
    cpf: '',
    email: '',
    phone: '',
    cep: '',
    address: '',
    payment: '',
    isFormValid: false,
  };

  componentDidMount() {
    this.validateButton();
  }

  onChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.validateButton);
  };

  validateButton = () => {
    const {
      fullname, email, cpf, phone, cep, address, payment,
    } = this.state;

    const isFormValid = (
      fullname.length > 0
      && cpf.length > 0
      && phone.length > 0
      && cep.length > 0
      && address.length > 0
      && payment !== ''
      && (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g).test(email)
    );

    this.setState({ isFormValid });
  };

  clearCart = () => {
    localStorage.setItem('cart', JSON.stringify([]));
    this.setState({
      cart: [],
      fullname: '',
      cpf: '',
      email: '',
      phone: '',
      cep: '',
      address: '',
      payment: '',
      isFormValid: false,
    });
  };

  renderCartItems = () => {
    const { cart } = this.state;
    if (cart.length === 0) {
      return <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>;
    }

    const totalPrice = cart
      .reduce((acc, curr) => acc + (curr.price * curr.quantity), 0).toFixed(2);

    return (
      <div>
        {cart.map((product) => (
          <div
            className="card card-side bg-base-100 shadow-xl m-10"
            key={ product.id }
            data-testid="product"
          >
            <img
              src={ product.thumbnail }
              alt={ product.title }
              className="content-center object-none p-4 w-40"
            />
            <div className="card-body">
              <p data-testid="shopping-cart-product-name" className="card-title">
                {product.title}
              </p>
              <p>{`R$ ${(product.price * product.quantity).toFixed(2)}`}</p>
            </div>
          </div>
        ))}
        <p className="text-center text-3xl">{`Total: R$ ${totalPrice}`}</p>
      </div>
    );
  };

  render() {
    const {
      fullname, email, cpf, phone, cep, address, isFormValid, cart,
    } = this.state;

    return (
      <>
        <Header />
        <section className="flex flex-col justify-center items-center">
          <section>
            {this.renderCartItems()}
          </section>

          <section className="m-4 flex">
            <form className="form-control flex flex-wrap m-4">
              <p className="text-center font-bold">
                Informações do Comprador
              </p>
              <input
                id="fullname"
                className="input input-bordered w-full max-w-xs m-1"
                type="text"
                name="fullname"
                placeholder="Nome Completo"
                data-testid="checkout-fullname"
                value={ fullname }
                onChange={ this.onChange }
              />

              <input
                id="email"
                className="input input-bordered w-full max-w-xs m-1"
                type="email"
                name="email"
                placeholder="Email"
                value={ email }
                data-testid="checkout-email"
                onChange={ this.onChange }
              />

              <input
                id="cpf"
                className="input input-bordered w-full max-w-xs m-1"
                type="text"
                name="cpf"
                placeholder="CPF"
                value={ cpf }
                data-testid="checkout-cpf"
                onChange={ this.onChange }
              />

              <input
                id="phone"
                className="input input-bordered w-full max-w-xs m-1"
                type="text"
                name="phone"
                placeholder="Telefone"
                value={ phone }
                data-testid="checkout-phone"
                onChange={ this.onChange }
              />

              <input
                id="cep"
                className="input input-bordered w-full max-w-xs m-1"
                type="text"
                name="cep"
                placeholder="CEP"
                value={ cep }
                data-testid="checkout-cep"
                onChange={ this.onChange }
              />

              <input
                id="address"
                className="input input-bordered w-full max-w-xs m-1"
                type="text"
                name="address"
                placeholder="Endereço"
                value={ address }
                data-testid="checkout-address"
                onChange={ this.onChange }
              />
            </form>

            <section className="join join-vertical">
              <p className="font-bold m-4">
                Método de Pagamento
              </p>
              <input
                className="join-item btn"
                type="radio"
                name="payment"
                value="boleto"
                data-testid="ticket-payment"
                onChange={ this.onChange }
                aria-label="boleto"
              />
              <input
                className="join-item btn"
                type="radio"
                name="payment"
                value="visa"
                data-testid="visa-payment"
                onChange={ this.onChange }
                aria-label="visa"
              />
              <input
                className="join-item btn"
                type="radio"
                name="payment"
                value="mastercard"
                data-testid="master-payment"
                onChange={ this.onChange }
                aria-label="mastercard"
              />
              <input
                className="join-item btn"
                type="radio"
                name="payment"
                value="elo"
                data-testid="elo-payment"
                onChange={ this.onChange }
                aria-label="elo"
              />
              <button
                className="btn btn-primary m-10"
                data-testid="checkout-btn"
                onClick={ this.clearCart }
                disabled={ !isFormValid || cart.length === 0 }
              >
                Comprar
              </button>
              {!isFormValid && (
                <p data-testid="error-msg" className="text-red-500 text-center">
                  Campos inválidos
                </p>
              )}
            </section>
          </section>
        </section>
      </>
    );
  }
}

export default Checkout;
