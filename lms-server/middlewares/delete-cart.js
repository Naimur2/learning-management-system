const dbconfig = require("../config/dbconfig");
const db = dbconfig.connect();

const deleteCart = async (req, res, next) => {
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

            req.body.cartStatus = "REMOVED";
            next();
        } else {
            req.body.cartStatus = "NOT_IN_CART";
            next();
        }
    });
};

module.exports = deleteCart;