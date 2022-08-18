import React, { Fragment } from "react";
import { connect } from "react-redux";
import { fetchCart, exchangeToken, logout } from "./store";
import { Link, Route, Switch } from "react-router-dom";
import SignIn from "./SignIn";
import Cart from "./Cart";
import Nav from "./Nav";
import Home from "./Home";
import Genres from "./Genres";
import Categories from "./Categories";
import Account from "./Account";

class App extends React.Component {
  componentDidMount() {
    this.props.exchangeToken();
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
        <Route component={Nav} />
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
  };
};
const mapStateToProps = (state) => {
  return state;
};
export default connect(mapStateToProps, mapDispatch)(App);
