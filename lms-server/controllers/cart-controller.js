const dbconfig = require("../config/dbconfig");
const db = dbconfig.connect();

const controller = {};

controller.addTocart = async (req, res) => {
    const { productId, quantity, customerId, datetime,wishListStatus } = req.body;
    console.log(req.body);

    const query = `INSERT INTO cart(productId,customerId,quantity,datetime) VALUES('${productId}','${customerId}','${quantity}',${datetime})`;
    const isInCart = `SELECT * FROM cart WHERE productId = '${productId}' and customerId = '${customerId}'`;
    
    await db.query(isInCart, async (err, result) => {
        if (err) {
            res.status(500).json({
                message: err.message,
            });
        }

        if (result.length > 0) {
            res.status(200).json({
                wishListStatus,
                cartStatus: "ALREADY_EXIST",
                message: "Product already in cart",
            });
        } else {
            await db.query(query, (err, result) => {
                if (err) {
                    res.status(500).json({
                        message: err.message,
                    });
                }
            });

            res.status(200).json({
                wishListStatus,
                cartStatus: "ADDED",
                message: "Product added to cart",
                data: result[0],
            });
        }
    });
};

controller.removeFromCart = async (req, res) => {
    const { productId, customerId } = req.body;
    console.log(req.body);

    const query = `DELETE FROM cart WHERE productId = '${productId}' and customerId = '${customerId}'`;
    const isInCart = `SELECT * FROM cart WHERE productId = '${productId}' and customerId = '${customerId}'`;
    await db.query(isInCart, async (err, result) => {
        if (err) {
            res.status(500).json({
                message: err.message,
            });
        }

        if (result.length > 0) {
            await db.query(query, (err, result) => {
                if (err) {
                    res.status(500).json({
                        message: err.message,
                    });
                }
            });

            res.status(200).json({
                message: "Product removed from cart",
                data: result[0],
            });
        } else {
            res.status(404).json({
                message: "Product not in cart",
            });
        }
    });
};

controller.getCart = async (req, res) => {
    const customerId = req.params.customerId;


    const query = `SELECT * FROM cart WHERE customerId = '${customerId}'`;
    console.log(customerId);
    await db.query(query, async (err, result) => {
        if (err) {
            res.status(500).json({
                message: err.message,
            });
        }

        

        if (result.length > 0) {
            res.status(200).json({
                message: "Successfully fetched cart",
                data: result,
            });
        } else {
            res.status(200).json({
                message: "Cart is empty",
                data: [],
            });
        }
    });
};

controller.removeAllCart = async (req, res) => {
    const { customerId } = req.body;
    console.log(req.body);

    const query = `DELETE FROM cart WHERE customerId = '${customerId}'`;
    const isInCart = `SELECT * FROM cart WHERE customerId = '${customerId}'`;
    await db.query(isInCart, async (err, result) => {
        if (err) {
            res.status(500).json({
                message: err.message,
            });
        }

        if (result.length > 0) {
            await db.query(query, (err, result) => {
                if (err) {
                    res.status(500).json({
                        message: err.message,
                    });
                }
            });

            res.status(200).json({
                message: "All product removed from cart",
                data: result[0],
            });
        } else {
            res.status(404).json({
                message: "Cart is empty",
            });
        }
    });
};

module.exports = controller;
