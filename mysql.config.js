const mysql = require("mysql");

var pool = mysql.createPool({
    "host"      : "localhost",
    "user"      : "root" ,
    "password"  : "",
    "database"  : "albumdb",
    "port"      : 3306

});

exports.pool = pool;