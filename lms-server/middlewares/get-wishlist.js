const dbconfig = require("../config/dbconfig");
const db = dbconfig.connect();


const getWishlist = async (req, res, next) => {
    const { customerId } = req.body;
    console.log(req.body);

    const query = `SELECT * FROM wishlist WHERE customerId = '${customerId}'`;
    await db.query(query, async (err, result) => {
        if (err) {
            res.status(500).json({
                message: err.message,
            });
        }
        req.body.wishlist = result;
        next();
    });
};

module.exports = getWishlist;