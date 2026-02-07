const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
    host: '150.95.85.40',
    user: 'kyaw',
    port: 3306,      
    password: 'kyaw123',     
    database: 'vps_db'
});

db.connect((err) => {
    if (err) throw err;
    console.log('MySQL Connected...');
});

module.exports = db;