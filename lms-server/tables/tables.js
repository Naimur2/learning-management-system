const { createTable } = require("../lib/create-table");
const userSchema = require("../schema/user.schema");
const coursesSchema = require("../schema/courses.schema");
const cartSchema = require("../schema/cart.schema");
const mycourseSchema = require("../schema/mycourse.schema");
const wishlistSchema = require("../schema/wishlist.schema");

const tables = {};

tables.create = () => {
    createTable("user", userSchema, (err, res) => {
        console.log(err, res);
    });

    createTable("courses", coursesSchema, (err, res) => {
        console.log(err, res);
    });

    createTable("cart", cartSchema, (err, res) => {
        console.log(err, res);
    });

    createTable("mycourse", mycourseSchema, (err, res) => {
        console.log(err, res);
    });

    createTable("wishlist", wishlistSchema, (err, res) => {
        console.log(err, res);
    });
};

module.exports = tables;
