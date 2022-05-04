const dbconfig = require("../config/dbconfig");
const db = dbconfig.connect();

const addTocart = async (req, res, next) => {
    const { productId, quantity, customerId, datetime } =
        req.body;
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
            req.body.cartStatus = "ALREADY_EXIST";
            next();
        } else {
            await db.query(query, (err, result) => {
                if (err) {
                    res.status(500).json({
                        message: err.message,
                    });
                }
            });

            req.body.cartStatus = "ADDED";
            next();
        }
    });
};

module.exports = addTocart;