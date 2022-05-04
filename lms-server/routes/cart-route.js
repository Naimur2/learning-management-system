const express = require("express");
const route = express.Router();
const dbconfig = require("../config/dbconfig");
const cartController = require("../controllers/cart-controller");
const deleteWishList = require("../middlewares/delete-wishlist");
const getCart = require("../middlewares/get-cart");
const getWishlist = require("../middlewares/get-wishlist");

route.post(
    "/add",
    deleteWishList,
    getCart,
    getWishlist,
    cartController.addTocart
);
route.post("/remove", cartController.removeFromCart);
route.post("/clear", cartController.removeAllCart);
route.get("/all/:customerId", cartController.getCart);

module.exports = route;
