const mysql = require("mysql");
const dotenv = require("dotenv").config();
const lib = require("../lib/create-db");

const config = {};



config.init = () => {
    return {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
    };
};

config.connect = () => {
    return mysql.createConnection(config.init());
};

module.exports = config;
