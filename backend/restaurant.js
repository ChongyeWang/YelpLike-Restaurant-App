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
    
    connection.query("SELECT * FROM restaurant;", function (err, result) {
        console.log(result);

        let data = [];
        for (var i = 0; i < result.length; i++) {
            let ele = {
                'id': result[i].id,
                'name': result[i].name,
                'email': result[i].email,
                'location': result[i].location
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

    connection.query("SELECT * FROM restaurant WHERE id = " + "'" + id + "'", function (err, result) {

        var resName = result[0].name;
        var resEmail = result[0].email;
        var resLocation = result[0].location;
        var username = result[0].username;

        data['user'] = resName;
        data['email'] = resEmail;
        data['location'] = resLocation;


        connection.query("SELECT * FROM dish WHERE username = " + "'" + username + "'", function (err, result) {

            let dishArray = [];
            for (var i = 0; i < result.length; i++) {
                let ele = {
                    'name': result[i].name,
                    'price': result[i].price,
                    'category': result[i].category,
                }
                dishArray.push(ele);
            }
            data['dish'] = dishArray;

            console.log(JSON.stringify(data));

            connection.query("SELECT * FROM review WHERE resid = " + "'" + id + "'" + "ORDER BY date", function (err, result) {

                let reviewArray = [];
                for (var i = 0; i < result.length; i++) {
                    let ele = {
                        'date': result[i].date,
                        'content': result[i].content,
                    }
                    reviewArray.push(ele);
                }
                data['review'] = reviewArray;

                console.log(JSON.stringify(data));

                res.writeHead(200,{
                    'Content-Type' : 'text/plain'
                })
                res.end(JSON.stringify(data));

            });

        });

    });
  
});




router.post('/:id/review', function(req,res){
    var id = req.params.id;
    
    var content = req.body.content;

    console.log(content);

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    var date = today.toString();

    connection.query("INSERT INTO review (resid, date, content) VALUES (" + "'" + 
        id + "'" + "," + "'" + date + "'" + "," + "'" + content + "'" + ")", function (err, result) {
    
        res.writeHead(200,{
            'Content-Type' : 'text/plain'
        })
        res.end("Success");
    });

});




router.post('/:id/edit', function(req,res){

    var id = req.params.id;
    
    var name = req.body.name;
    var email = req.body.email;
    var location = req.body.location;

    console.log(112233455);
    console.log(name);
    console.log(email);
    console.log(location);

    connection.query("UPDATE restaurant SET name = " + "'" + name + "'" + "," +
        "email = " + "'" + email + "'" + "," + "location = " + "'" + location + "'" + 
        " WHERE id = " + "'" + id + "'" + ";", function (err, result) {
    
        res.writeHead(200,{
            'Content-Type' : 'text/plain'
        })
        res.end("Success");
    });

});



router.post('/:id/place_order',function(req,res){

    if (req.session.customer === undefined || req.session.customer === false) {
        res.writeHead(401,{
            'Content-Type' : 'text/plain'
        });
        res.end("Login First")
    }
    else {
        var id = req.params.id;
        var customer = req.session.customerId;
        var delivery = "";
        if (req.body.delivery === true) {
            delivery = "delivery";
        }
        else {
            delivery = "pickup";
        }
        var order = req.body.selectItems.toString();

        var date = new Date().toLocaleString();

        connection.query("INSERT INTO orders (username, restaurantId, delivery, items, date) VALUES (" + "'" + 
            customer + "'" + "," + "'" + id + "'" + "," + "'" + delivery + "'" + "," + "'" + 
            order + "'" + "," + "'" + date + "'" + ")", function (err, result) {
            
        });
        res.writeHead(200,{
            'Content-Type' : 'text/plain'
        });
        res.end("Added Successfully.");
        
    } 

});



router.post('/search', function(req,res){

    var keyword = req.body.keyword;
    console.log(keyword);

    data = [];

    // if(id !== undefined && id.length > 0) {
    connection.query("SELECT * FROM restaurant", function (err, result) {

        for (var i = 0; i < result.length; i++) {
            if (result[i].name.includes(keyword) || result[i].location.includes(keyword)) {
                let ele = {
                    'id': result[i].id,
                    'name': result[i].name,
                    'location': result[i].location,
                    'email': result[i].email
                }
                data.push(ele);
            }

        }

        console.log(JSON.stringify(data));

        res.writeHead(200,{
            'Content-Type' : 'text/plain'
        })
        res.end(JSON.stringify(data));

    }); 
  
});


console.log("Server Listening on port 3001");

module.exports = router;