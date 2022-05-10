
const mysql = require("mysql");
const dotenv = require("dotenv").config();

const lib={}

lib.createDB=(cb) => {
    const cfg = {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    };
    try {
        const connection = mysql.createConnection(cfg);
        const dbQuery = `SHOW DATABASES LIKE '${process.env.DB_DATABASE}'`;
        const dbCreate = `CREATE DATABASE ${process.env.DB_DATABASE}`;

        connection.connect((error, response) => {
            if (error) cb(error, null);
            else {
                connection.query(dbQuery, (err, res) => {
                    if (err) cb(err, null);
                    else {
                        if (res.length > 0) {
                            cb(null,{ message: "Database already exists" });
                        } else {
                            connection.query(dbCreate, (er, result) => {
                                if (er) cb(er, null);
                                else {
                                    cb(null, result);
                                }
                            });
                        }
                    }
                });
            }
        });
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = lib;