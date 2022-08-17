const express = require("express");
const app = express.Router();
const { isLoggedIn } = require("./middleware");
const { Order } = require("../db");

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

app.get('/orders', async(req, res, next)=> {
  try {
    res.send(await Order.findAll());
  }
  catch(ex){
    next(ex);
  }
});

app.get('/orders/:id', async(req, res, next)=> {
  try {
    const id = req.params.id;
    if (isNaN(id)) {
        res.sendStatus(400)
        return;
    }
    res.send(await Order.findOne({ where: { id } })); 
  }
  catch(ex){
    next(ex);
  }
});
