const dbconfig = require("../config/dbconfig");
const db = dbconfig.connect();

const getCart = async (req, res, next) => {
    const { customerId } = req.body;
    console.log(req.body);

    const query = `SELECT * FROM cart WHERE customerId = '${customerId}'`;
    await db.query(query, async (err, result) => {
        if (err) {
            res.status(500).json({
                message: err.message,
            });
        }
        req.body.cart = result;
        next();
    });
};

module.exports = getCart;