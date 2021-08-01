const mysql = require("mysql");

const pool = mysql.createPool({
    connectionLimit: 10,
    user: "root",
    password: "",
    database: "CryptoData",
    host: "localhost",
    port: "3306"
});

let db = {};

db.all = () => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM updatetest2", (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

db.update = (rows) => {
    return new Promise((resolve, reject) => {
        pool.query("INSERT INTO updatetest2 VALUES ?",[rows.map(obj => Object.values(obj))],(err, results) => {
            if (err) {
                return reject(err);
            }
            console.log("Insert Success");
            return resolve(results);
        });
    });
    // var q = pool.query("INSERT INTO test VALUES ?",[rows.map(obj => Object.values(obj))],(err, results) => {
    //     if (err) {
    //         throw err;
    //     }
    // });
    // console.log(q.sql);
}


module.exports = db;