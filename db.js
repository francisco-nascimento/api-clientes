const mysql = require('mysql');
const db = mysql.createConnection({
       host     : 'localhost',
       user     : 'admin',
       password : '1234',
       database : 'clientes'
});
db.connect((err) => {
   if (err){
       throw err;
   }
   console.log('Mysql connected ... ');
}); 
module.exports = db;