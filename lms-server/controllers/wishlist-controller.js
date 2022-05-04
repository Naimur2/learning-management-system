const dbconfig = require("../config/dbconfig");
const db = dbconfig.connect();

const controller = {};

controller.addToWishlist = async (req, res) => {
    const { productId, customerId, datetime,cartStatus } = req.body;
    console.log("wishlist", req.body);

    const query = `INSERT INTO wishlist(productId,customerId,datetime) VALUES('${productId}','${customerId}',${datetime})`;
    const isInWishlist = `SELECT * FROM wishlist WHERE productId = '${productId}' and customerId = '${customerId}'`;
    const removeWhishList = `DELETE FROM wishlist WHERE productId = '${productId}' and customerId = '${customerId}'`;

    await db.query(isInWishlist, async (err, result) => {
        if (err) {
            res.status(500).json({
                message: err.message,
            });
        } else {
            if (result.length > 0) {
                await db.query(removeWhishList, async (err, result) => {
                    if (err) {
                        res.status(500).json({
                            message: err.message,
                        });
                    } else {
                        res.status(200).json({
                            wishListStatus: "REMOVED",
                            message: "Product removed from wishlist",
                            cartStatus,
                            
                        });
                    }
                });
            } else {
                await db.query(query, async (err, result) => {
                    if (err) {
                        res.status(500).json({
                            message: err.message,
                        });
                    } else {
                        res.status(200).json({
                            wishListStatus: "ADDED",
                            message: "Product added to wishlist",
                            data: result,
                            cartStatus
                        });
                    }
                });
            }
        }
    });
};

controller.removeFromWishList = async (req, res) => {
    const { productId, customerId } = req.body;
    console.log(req.body);

    const query = `DELETE FROM wishlist WHERE productId = '${productId}' and customerId = '${customerId}'`;
    const isInWishlist = `SELECT * FROM wishlist WHERE productId = '${productId}' and customerId = '${customerId}'`;
    await db.query(isInWishlist, async (err, result) => {
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
                message: "Product removed from wishlist",
                data: result[0],
            });
        } else {
            res.status(404).json({
                message: "Product not in wishlist",
            });
        }
    });
};

controller.getWishlist = async (req, res) => {
    const customerId = req.params.customerId;

    const query = `SELECT * FROM wishlist WHERE customerId = '${customerId}'`;
    await db.query(query, async (err, result) => {
        if (err) {
            res.status(500).json({
                message: err.message,
            });
        }

        if (result.length > 0) {
            res.status(200).json({
                message: "Successfully fetched wishlist",
                data: result,
            });
        } else {
            res.status(200).json({
                message: "Wishlist is empty",
                data: [],
            });
        }
    });
};

controller.removeAllWishList = async (req, res) => {
    const { customerId } = req.body;
    console.log(req.body);

    const query = `DELETE FROM wishlist WHERE customerId = '${customerId}'`;
    await db.query(query, async (err, result) => {
        if (err) {
            res.status(500).json({
                message: err.message,
            });
        }

        if (result.length > 0) {
            res.status(200).json({
                message: "Removed all products from wishlist",
                data: result,
            });
        } else {
            res.status(404).json({
                message: "Wishlist is empty",
            });
        }
    });
};

module.exports = controller;
