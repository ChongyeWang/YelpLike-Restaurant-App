var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rootadmin',
    database: 'Yelp',
});

connection.connect(function(err) {
  if (err) {
    return console.error("Error:" + err.message);
  }
  console.log('Connected...')
})

module.exports ={
     connection : connection
} 