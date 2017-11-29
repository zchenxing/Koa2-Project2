const mysql = require('mysql')
const config = require('../config/default')

const pool = mysql.createPool({
    host    : config.database.HOST,
    user    : config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE
});


let query = function(sql, value) {

    return new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {
            if (err) {
                resolve(err)
            } else {
                connection.query(sql, value, (err, rows) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(JSON.parse(JSON.stringify(rows)))
                    }
                    connection.release()
                })
            }
        })
    })
}



module.exports = query;