const express = require("express");
const app = express.Router();
const { isLoggedIn } = require("./middleware");
const { Order, User } = require("../db");

module.exports = app;

app.post("/", isLoggedIn, async (req, res, next) => {
  try {
    res.send(await req.user.createOrderFromCart());
  } catch (ex) {
    next(ex);
  }
});

app.put("/cart", isLoggedIn, async (req, res, next) => {
  try {
    console.log(req.body);
    res.send(await req.user.addToCart(req.body));
  } catch (ex) {
    next(ex);
  }
});

app.get("/cart", isLoggedIn, async (req, res, next) => {
  try {
    res.send(await req.user.getCart());
  } catch (ex) {
    next(ex);
  }
});

app.get("/", isLoggedIn, async (req, res, next) => {
  try {
    console.log(req.user);
    res.send(await req.user.getOrders());
  } catch (ex) {
    next(ex);
  }
});
