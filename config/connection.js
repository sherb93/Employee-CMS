const mysql = require("mysql2");
require("dotenv").config();

console.log(process.env.USER);

const connection = mysql.createConnection({
    host: "localhost",
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: "company_db"
});

module.exports = connection;