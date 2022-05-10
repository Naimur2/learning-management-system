const dotenv = require("dotenv").config();

const dbconfig = require("../config/dbconfig");
const db = dbconfig.connect();

const lib = {};

lib.createTable = async (tableName,schema, cb) => {
    let query = `CREATE TABLE ${process.env.DB_DATABASE}.${tableName} (_id INT AUTO_INCREMENT ,`;
    schema.forEach(
        (element) =>
            (query += `${element.column} ${element.type} ${
                element.nullable ? `NULL` : `NOT NULL`
            } ${element.unique ? `UNIQUE` : ``},`)
    );

    query += `PRIMARY KEY (_id));`;

    const isAvailable = `select * from ${tableName}`;

    await db.query(isAvailable, (err, result) => {
        if (err) {
            db.query(query, (er, res) => {
                if (er) {
                    cb(er, null);
                } else {
                    cb(null, { message: "Table created successfully",res });
                }
            });
        } else {
            cb({ message: "Table alreeady exists",result }, null);
        }
    });
};

module.exports = lib;
