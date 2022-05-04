const dbconfig = require("../config/dbconfig");
const db = dbconfig.connect();

const addWishList = async (req, res, next) => {
    const { productId, customerId, datetime } = req.body;
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
                        req.body.wishListStatus = "REMOVED";
                        next();
                    }
                });
            } else {
                await db.query(query, async (err, result) => {
                    if (err) {
                        res.status(500).json({
                            message: err.message,
                        });
                    } else {
                        req.body.wishListStatus = "ADDED";
                        next();
                    }
                });
            }
        }
    });
};


module.exports = addWishList;