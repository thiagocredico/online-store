import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import ListCategories from '../components/ListCategories';
import { getProductsFromCategoryAndQuery } from '../services/api';

export default class Home extends Component {
  state = {
    cart: JSON.parse(localStorage.getItem('cart')) || [],
    inputRadio: '',
    products: [],
    inputValue: '',
    search: '',
    clickBtn: false,
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
    this.updateCartQuantity();
    this.setState({ cart });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      if (name === 'inputRadio') {
        this.handleInputRadio();
      }
    });
  };

  handleGetProducts = async () => {
    const { inputValue, inputRadio } = this.state;
    this.setState({ search: inputValue });
    const getProducts = await getProductsFromCategoryAndQuery(inputRadio, inputValue);
    this.setState({
      products: getProducts.results,
      inputValue: '',
      clickBtn: true,
    });
  };

  handleInputRadio = async () => {
    const { search, inputRadio } = this.state;
    const getProducts = await getProductsFromCategoryAndQuery(inputRadio, search);
    this.setState({
      products: getProducts.results,
      clickBtn: true,
    });
  };

  render() {
    const { products, inputRadio, inputValue, clickBtn } = this.state;
    // const { products } = this.props;
    return (
      <>
        <div
          className="flex flex-row-reverse bg-yellow-300
          justify-around items-center min-w-full"
        >
          <Header />
          <div className="flex flex-col items-center m-2">
            <div className="join items-center">
              <input
                className="input input-bordered join-item w-96"
                data-testid="query-input"
                value={ inputValue }
                name="inputValue"
                onChange={ this.handleChange }
              />
              <button
                className="btn join-item"
                type="button"
                data-testid="query-button"
                onClick={ this.handleGetProducts }
              >
                Pesquisar
              </button>
            </div>
            {!clickBtn
          && (
            <p
              data-testid="home-initial-message"
            >
              Digite algum termo de pesquisa ou escolha uma categoria.
            </p>) }
          </div>
        </div>
        <section className="flex flex-row h-screen">
          <ListCategories
            inputRadio={ inputRadio }
            handleChange={ this.handleChange }
          />
          {/* <ButtonCart /> */}
          <div
            className="flex flex-col items-center  text-center w-full"
          >
            {/* <Card products={ products } /> */}
            <section className="flex flex-wrap justify-around">
              {products.length === 0 ? <p>Nenhum produto foi encontrado</p>
                : (
                  products.map((product) => (
                    <div
                      className="card w-72 bg-base-200 shadow-xl m-4 indicator"
                      key={ product.id }
                      // title={ product.title }
                      // thumbnail={ product.thumbnail}
                      // price={ product.price }
                      data-testid="product"
                    >
                      {
                        product.shipping.free_shipping
                          && (
                            <div className=" ">
                              <p
                                className="indicator-item badge badge-secondary"
                                data-testid="free-shipping"
                              >
                                Frete Gátis
                              </p>
                            </div>
                          )
                      }
                      <img
                        className="content-center object-fit px-10 pt-10"
                        src={ product.thumbnail.replace(/\w\.jpg/gi, 'W.jpg') }
                        alt={ product.title }
                      />
                      <div className="card-body ">

                        <p className="card-title">{product.title}</p>
                        <p>{`R$${product.price}`}</p>

                        <Link
                          data-testid="product-detail-link"
                          className="badge badge-warning "
                          to={ `/product/${product.id}` }
                        >
                          Detalhes

                        </Link>
                        <div className="card-actions justify-end">
                          <button
                            className="btn btn-primary"
                            type="button"
                            data-testid="product-add-to-cart"
                            onClick={ () => this.addCart(product) }
                          >
                            Adicionar ao Carrinho
                          </button>
                        </div>

                      </div>
                    </div>)))}
            </section>
          </div>
        </section>
      </>
    );
  }
}
