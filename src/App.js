import React, { Fragment } from "react";
import { connect } from "react-redux";
import {
  fetchCart,
  exchangeToken,
  logout,
  fetchCategories,
  fetchGenres,
} from "./store";
import { Link, Route, Switch } from "react-router-dom";
import SignIn from "./SignIn";
import Cart from "./Cart";
import Nav from "./Nav";
import Home from "./Home";
import Genres from "./Genres";
import Categories from "./Categories";

class App extends React.Component {
  componentDidMount() {
    this.props.exchangeToken();
    this.props.loadCategories();
    this.props.loadGenres();
  }
  componentDidUpdate(prevProps) {
    if (!prevProps.auth.id && this.props.auth.id) {
      this.props.fetchCart();
    }
  }
  render() {
    const { auth, logout, cart } = this.props;
    return (
      <main>
        <Nav />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/genres" exact>
            <Genres />
          </Route>
          <Route path="/categories" exact>
            <Categories />
          </Route>
        </Switch>

        {auth.id ? (
          <button onClick={logout}>Logout {auth.username}</button>
        ) : (
          <SignIn />
        )}
        {auth.id ? (
          <Link to="/cart">Cart ({cart.lineItems.length})</Link>
        ) : null}
        {auth.id ? (
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
  };
};
const mapStateToProps = (state) => {
  return state;
};
export default connect(mapStateToProps, mapDispatch)(App);
