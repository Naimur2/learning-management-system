const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const lib = require("./lib/create-db");
const tables = require('./tables/tables');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

lib.createDB((err, res) => {
    if (err) {
        throw new err();
    } else {
        tables.create();
    }
});

app.use("/auth", require("./routes/auth-route"));
app.use("/course", require("./routes/course-route"));
app.use("/cart", require("./routes/cart-route"));
app.use("/wishlist", require("./routes/wishlist-route"));

const errorHandler = (err, res, next) => {
    if (err.headerSent) {
        return next(err);
    }
    res.status(500).json({
        message: err.message,
    });
};

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
