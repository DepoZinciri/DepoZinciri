const mysql = require('mysql2')
const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'akys',
      })
      connection.connect()

     exports.query = async function (query) {
        return await connection.promise().query(query).then((data) => {
           return data;
        });
        
    }