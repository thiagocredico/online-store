import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import ShopCart from './pages/ShopCart';
import Home from './pages/Home';
import Product from './pages/Product';
import Checkout from './pages/Checkout';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/product/:id" component={ Product } />
        <Route exact path="/checkout" component={ Checkout } />
        <Route exact path="/shopCart" component={ ShopCart } />
        <Route exact path="/" component={ Home } />
      </Switch>
    );
  }
}

export default App;
