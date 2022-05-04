const dbconfig = require("../config/dbconfig");
const db = dbconfig.connect();

const deleteWishList = async (req, res, next) => {
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

            req.body.wishListStatus = "REMOVED";
            next();
        } else {
            req.body.wishListStatus = "NOT_IN_WISHLIST";
            next();
        }
    });
};

module.exports = deleteWishList;
