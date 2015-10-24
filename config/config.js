/**
 * Created by Administrator on 2015/10/24 0024.
 */
var mysql = require('mysql');

module.exports = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database:'test',
    port: 3306
});