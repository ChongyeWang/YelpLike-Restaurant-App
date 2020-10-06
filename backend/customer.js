//import the require dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var mysql = require('mysql');
var router = express.Router();


var config = require('./config.js');

var connection = config.connection;

router.get('/', function(req,res){
    console.log(222);
    connection.query("SELECT * FROM customer;", function (err, result) {
        console.log(result);
        let data = [];
        for (var i = 0; i < result.length; i++) {
            let ele = {
                'id': result[i].id,
                'name': result[i].username,
                'email': result[i].email,
            }
            data.push(ele);
        }

        console.log(JSON.stringify(data));

        res.writeHead(200,{
            'Content-Type' : 'text/plain'
        })
        res.end(JSON.stringify(data));

    });  
  
});



router.get('/:id', function(req,res){
    var id = req.params.id;
    console.log(id);
    
    var data = {};

    connection.query("SELECT * FROM customer WHERE id = " + "'" + id + "'", function (err, result) {

        var name = result[0].username;
        var email = result[0].email;

        data['name'] = name;
        data['email'] = email;

        res.writeHead(200,{
            'Content-Type' : 'text/plain'
        })
        res.end(JSON.stringify(data));

    });
  
});

router.post('/:id/edit', function(req,res){

    var id = req.params.id;
    
    var email = req.body.email;

    console.log(email);

    connection.query("UPDATE customer SET email = " + "'" + email + "'" + 
        " WHERE id = " + "'" + id + "'" + ";", function (err, result) {
    
        res.writeHead(200,{
            'Content-Type' : 'text/plain'
        })
        res.end("Success");
    });

});





console.log("Server Listening on port 3001");

module.exports = router;