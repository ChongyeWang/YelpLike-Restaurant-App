//import the require dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var mysql = require('mysql');
var config = require('./config.js');

const path = require("path");
const multer = require("multer");


app.set('view engine', 'ejs');


//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

//use express session to maintain session data
app.use(session({
    secret              : 'cmpe273_kafka_passport_mongo',
    resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration      :  5 * 60 * 1000
}));

app.use(bodyParser.json());

//Allow Access Control
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });


var restaurant = require('./restaurant');
var customers = require('./customer');

app.use('/restaurant', restaurant);
app.use('/customers', customers);



var connection = config.connection;


app.post('/login',function(req,res){
    console.log("Inside Login Post Request");
    console.log("Req Body : ",req.body);

    var username = req.body.username;
    var password = req.body.password;

    connection.query("SELECT * FROM customer WHERE username = " + "'" + username + "'" + " and password = " + "'" + password + "'", function (err, result) {
        console.log(result);
        if (result.length !== 0) {
            let resUser = result[0].username;
            let resEmail = result[0].email;
            res.cookie('cookie',resUser + " " + resEmail,{maxAge: 900000, httpOnly: false, path : '/'});
            req.session.user = resUser;
            req.session.restaurant = false;
            req.session.customer = true;
            req.session.customerId = result[0].id;
            res.writeHead(200,{
                'Content-Type' : 'text/plain'
            })
            res.end("Successful Login");

        }
        else {
            res.writeHead(201,{
                'Content-Type' : 'text/plain'
            });
            res.end("Incorrect credentials.");
        }
       
    });

});




app.get('/logout',function(req,res){
    
    console.log("logout");
    req.session.destroy();
});


app.post('/register',function(req,res){


    var username = req.body.username;
    var password =  req.body.password;
    var email = req.body.email;
    var phone = req.body.phone;
    var web = req.body.web;
    var likes = req.body.like;
    
    connection.query("SELECT * FROM customer WHERE username = " + "'" + username + "'", function (err, result) {
        console.log(result);
        if (result.length === 0) {
            connection.query("INSERT INTO customer (username, password, email, phone, web, likes) VALUES (" + 
                "'" + username + "'" + "," + "'" + password + "'" + "," + "'" + email + "'" 
                + "," + "'" + phone + "'" + "," + "'" + web + "'" + "," + "'" + likes + "'" + ")", function (err, result) {
            if (err) throw (err);
            console.log(result);
            });
            res.writeHead(200,{
                'Content-Type' : 'text/plain'
            });
            res.end("Rigistered Successfully.");
        }
        else {
            res.writeHead(409,{
                'Content-Type' : 'text/plain'
            });
            res.end("Username Already Exists.");
        }
       
    });

});

app.post('/openrestaurant',function(req,res){
    var username = req.body.username;
    var password =  req.body.password;
    var email = req.body.email;
    var name = req.body.name;
    var location = req.body.location;
    var lat = req.body.lat;
    var lon = req.body.lon;
    
    connection.query("SELECT * FROM restaurant WHERE username = " + "'" + username + "'", function (err, result) {
        console.log(result);
        if (result.length === 0) {
            connection.query("INSERT INTO restaurant (username, password, email, name, location, lat, lon) VALUES (" + "'" + 
                username + "'" + "," + "'" + password + "'" + "," + "'" + email + "'" + "," + "'" + 
                name + "'" + "," + "'" + location + "'" + "," + "'" + lat + "'" + 
                "," + "'" + lon + "'" + ")", function (err, result) {
            if (err) throw (err);
            console.log(result);
            });
            res.writeHead(200,{
                'Content-Type' : 'text/plain'
            });
            res.end("Rigistered Successfully.");
        }
        else {
            res.writeHead(409,{
                'Content-Type' : 'text/plain'
            });
            res.end("Username Already Exists.");
        }
       
    });

});



app.post('/restaurantlogin',function(req,res){

    var username = req.body.username;
    var password = req.body.password;

    connection.query("SELECT * FROM restaurant WHERE username = " + "'" + username + "'" + " and password = " + "'" + password + "'", function (err, result) {
        console.log(result);
        if (result.length !== 0) {
            let resUser = result[0].username;
            let resEmail = result[0].email;
            let resId = result[0].id;

            res.cookie('cookie',resUser + " " + resEmail,{maxAge: 900000, httpOnly: false, path : '/'});
            
            req.session.user = resUser;
            req.session.restaurantId = resId;
            req.session.restaurant = true;
            req.session.customer = false;
            res.writeHead(200,{
                'Content-Type' : 'text/plain'
            })
            res.end("Successful Login");

        }
        else {
            res.writeHead(201,{
                'Content-Type' : 'text/plain'
            });
            res.end("Incorrect credentials.");
            }
       
    });

});




//Route to get All Books when user visits the Home Page
app.get('/home', function(req,res){
    console.log("Inside Home Login");
    console.log(req.session)    
    res.writeHead(200,{
        'Content-Type' : 'application/json'
    });

    res.end("home");
    
});



app.get('/profile', function(req,res){
    if (req.session.restaurant === undefined || req.session.restaurant === false) {
        res.writeHead(401,{
            'Content-Type' : 'text/plain'
        });
        res.end("Login First")
    }
    else {   
        var username = req.session.user;  

        var resName;
        var resEmail;
        var resLocation;

        var data = {};

        connection.query("SELECT * FROM restaurant WHERE username = " + "'" + username + "'", function (err, result) {
            console.log(result);

            resName = result[0].name;
            resEmail = result[0].email;
            resLocation = result[0].location;

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

                var id = req.session.restaurantId;
                console.log(id);
                connection.query("SELECT * FROM orders WHERE restaurantId = " + "'" + id + "'", function (err, result) {

                    let orderArray = [];
                    for (var i = 0; i < result.length; i++) {
                        let ele = {
                            'id': result[i].id,
                            'username': result[i].username,
                            'orders': result[i].items,
                            'delivery': result[i].delivery,
                            'date': result[i].date,
                            'status': result[i].status
                        }
                        orderArray.push(ele);
                    }
                    data['order'] = orderArray;

                    console.log(JSON.stringify(data));

                    res.writeHead(200,{
                        'Content-Type' : 'text/plain'
                    })
                    res.end(JSON.stringify(data));

                });
            });
        });
    }
});



app.post('/add_dish',function(req,res){

    var username = req.session.user;
    console.log(req.session.restaurant);
    if (req.session.restaurant === undefined || req.session.restaurant === false) {
        res.writeHead(401,{
            'Content-Type' : 'text/plain'
        });
        res.end("Login First")
    }
    else {
        var name = req.body.name;
        var price = req.body.price;
        var category = req.body.category;

        connection.query("INSERT INTO dish (username, name, price, category) VALUES (" + "'" + 
            username + "'" + "," + "'" + name + "'" + "," + "'" + price + "'" + "," + "'" + 
            category + "'" + ")", function (err, result) {
        if (err) throw (err);
        console.log(result);
        });
        res.writeHead(200,{
            'Content-Type' : 'text/plain'
        });
        res.end("Added Successfully.");
    } 

});



app.post('/add_event',function(req,res){

    if (req.session.restaurant === undefined || req.session.restaurant === false) {
        res.writeHead(401,{
            'Content-Type' : 'text/plain'
        });
        res.end("Login First")
    }
    else {
        var name = req.body.name;
        var restaurant = req.body.restaurant;
        var content = req.body.content;
        var date = req.body.date;
        var time = req.body.time;
        var location = req.body.location;

        console.log(1111);

        connection.query("INSERT INTO event (name, restaurant, content, date, time, location) VALUES (" + "'" + 
            name + "'" + "," + "'" + restaurant + "'" + "," + "'" + content + "'" + "," + "'" + 
            date + "'" + "," + "'" + time + "'" + "," + "'" + location + "'" + ")", function (err, result) {
            res.writeHead(200,{
                'Content-Type' : 'text/plain'
            });
            res.end("Added Successfully.");
        });
        
    } 

});




app.get('/events', function(req,res){
    
    connection.query("SELECT * FROM event;", function (err, result) {

        var data = {};
        let data1 = [];
        for (var i = 0; i < result.length; i++) {
            let ele = {
                'id': result[i].id,
                'name': result[i].name,
                'restaurant': result[i].restaurant,
                'content': result[i].content,
                'date': result[i].date,
                'time': result[i].time,
                'location': result[i].location,
            }
            data1.push(ele);
        }

        connection.query("SELECT * FROM event_customer;", function (err, result) {

            let data2 = [];
            for (var i = 0; i < result.length; i++) {
                let ele = {
                    'id': result[i].id,
                    'user': result[i].username,
                    'userId': result[i].userId
                }
                data2.push(ele);
            }

            data['data1'] = data1;
            data['data2'] = data2;

            console.log(JSON.stringify(data));

            res.writeHead(200,{
                'Content-Type' : 'text/plain'
            })
            res.end(JSON.stringify(data));

        }); 

    });  
  
});



app.post('/events-search', function(req,res){

    var keyword = req.body.keyword;
    console.log(keyword);

    data = [];

    // if(id !== undefined && id.length > 0) {
    connection.query("SELECT * FROM event", function (err, result) {

        for (var i = 0; i < result.length; i++) {
            if (result[i].name.includes(keyword)) {
                let ele = {
                    'id': result[i].id,
                    'name': result[i].name,
                    'restaurant': result[i].restaurant,
                    'content': result[i].content,
                    'date': result[i].date,
                    'time': result[i].time,
                    'location': result[i].location,
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


app.post('/events/register', function(req,res){

    if (req.session.customer === undefined || req.session.customer === false) {
        res.writeHead(401,{
            'Content-Type' : 'text/plain'
        });
        res.end("Login First")
    }
    else {
        var id = req.body.id;
        var userId = req.session.customerId;
        var user = req.session.user;
        console.log(111);
        console.log(id);
        console.log(userId);

        connection.query("INSERT INTO event_customer (id, userId, username) VALUES (" + "'" + 
            id + "'" + "," + "'" + userId + "'" + "," + "'" + user + "'" + ")", function (err, result) {
            res.writeHead(200,{
                'Content-Type' : 'text/plain'
            });
            res.end("Added Successfully.");
        });
    }
  
});



const upload = multer({
   storage: multer.diskStorage({
       destination: "../frontend/src/public/uploads/",
       filename: function(req, file, cb){
          cb(null, "IMAGE-" + file.originalname);
       }
    }),
   limits:{fileSize: 1000000},
}).single("myImage");


app.post('/upload-customer', function(req,res){
    upload(req, res, (err) => {
      console.log("Request ---", req.body);
      console.log("Request file ---", req.file);
      if(!err)
         return res.send(200).end();
   });
  
});


app.post('/upload-restaurant', function(req,res){
    upload(req, res, (err) => {
      console.log("Request ---", req.body);
      console.log("Request file ---", req.file);
      if(!err)
         return res.send(200).end();
   });
  
});



app.post('/order-update', function(req,res){
    
    var id = req.body.id;
    var status = "delivered";

    console.log(id);

    connection.query("UPDATE orders SET status = " + "'" + status + "'" + 
        " WHERE id = " + "'" + id + "'" + ";", function (err, result) {
    
        res.writeHead(200,{
            'Content-Type' : 'text/plain'
        })
        res.end("Success");
    });

});


app.post('/order-search', function(req,res){

    var keyword = req.body.keyword;
    console.log(keyword);

    data = [];

    // if(id !== undefined && id.length > 0) {
    connection.query("SELECT * FROM orders", function (err, result) {

        for (var i = 0; i < result.length; i++) {
            if (result[i].status.includes(keyword)) {
                let ele = {
                    'id': result[i].id,
                    'username': result[i].username,
                    'orders': result[i].items,
                    'delivery': result[i].delivery,
                    'date': result[i].date,
                    'status': result[i].status
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



app.get('/customers-setting', function(req,res){
    console.log(req.session.customer);
    if (req.session.customer === undefined || req.session.customer === false) {
        console.log("Login First");
        res.writeHead(401,{
            'Content-Type' : 'text/plain'
        });
        res.end("Login First");
    }
    else {
        console.log(2222);
        var id = req.session.customerId;
        var data = {};

        connection.query("SELECT * FROM customer WHERE id = " + "'" + id + "'", function (err, result) {

            var name = result[0].username;
            var email = result[0].email;

            data['id'] = id;
            data['name'] = name;
            data['email'] = email;

            res.writeHead(200,{
                'Content-Type' : 'text/plain'
            })
            res.end(JSON.stringify(data));

        });

    }
  
});

//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");