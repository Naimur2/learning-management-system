const express = require("express");
const route = express.Router();
const dbconfig = require("../config/dbconfig");
const wishListController = require("../controllers/wishlist-controller");
const deleteCart = require("../middlewares/delete-cart");
const getCart = require("../middlewares/get-cart");
const getWishlist = require("../middlewares/get-wishlist");

route.post(
    "/add",
    deleteCart,
    getWishlist,
    getCart,
    wishListController.addToWishlist
);
route.post("/remove", wishListController.removeFromWishList);
route.post("/clear", wishListController.removeAllWishList);
route.get("/all/:customerId", wishListController.getWishlist);

module.exports = route;
