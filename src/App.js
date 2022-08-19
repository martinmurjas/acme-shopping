import React, { Fragment } from "react";
import { connect } from "react-redux";
import {
  fetchCart,
  exchangeToken,
  logout,
  fetchCategories,
  fetchGenres,
  fetchProducts,
} from "./store";
import { Link, Route, Switch } from "react-router-dom";
import SignIn from "./SignIn";
import Cart from "./Cart";
import Nav from "./Nav";
import Home from "./Home";
import Genres from "./Genres";
import Categories from "./Categories";
import Products from "./Products";
import Account from "./Account";

class App extends React.Component {
  componentDidMount() {
    this.props.exchangeToken();
    this.props.loadCategories();
    this.props.loadGenres();
    this.props.loadProducts();
  }
  componentDidUpdate(prevProps) {
    if (!prevProps.session.auth.id && this.props.session.auth.id) {
      this.props.fetchCart();
    }
  }
  render() {
    const { session, logout, cart } = this.props;
    return (
      <main>
        <Route path="/:view?" component={Nav} />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/genres" exact>
            <Genres />
          </Route>
          <Route path="/products/genre/:id" component={Products}></Route>
          <Route path="/categories" exact>
            <Categories />
          </Route>
          <Route path="/products/category/:id" component={Products}></Route>
          <Route path="/account" component={Account} />
        </Switch>
        {session.auth.id ? (
          <Link to="/cart">Cart ({cart.lineItems.length})</Link>
        ) : null}
        {session.auth.id ? (
          <Fragment>
            <Route path="/cart" component={Cart} />
          </Fragment>
        ) : null}
      </main>
    );
  }
}
const mapDispatch = (dispatch) => {
  return {
    exchangeToken: () => dispatch(exchangeToken()),
    logout: () => dispatch(logout()),
    fetchCart: () => dispatch(fetchCart()),
    loadCategories: () => dispatch(fetchCategories()),
    loadGenres: () => dispatch(fetchGenres()),
    loadProducts: () => dispatch(fetchProducts()),
  };
};
const mapStateToProps = (state) => {
  return state;
};
export default connect(mapStateToProps, mapDispatch)(App);
