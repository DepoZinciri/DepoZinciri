const mysql = require('mysql2')
const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'akys',
      })
      connection.connect()

      exports.query = function (query, callback) {
         connection.query(query, function (error, results, fields) {
             if (error) throw error;
            callback(results);
         });
     }
    exports.postquery = async function (query) {
         return await connection.promise().query(query).then
         ((data) => {
            return data;
         });
       }