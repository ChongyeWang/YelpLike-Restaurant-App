//import the require dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var mysql = require('mysql');

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

// app.use(bodyParser.urlencoded({
//     extended: true
//   }));
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

  var Users = [{
      username : "admin",
      password : "admin",
      email : "admin@gmail.com"
  }]


let connection = mysql.createConnection({
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


//Route to handle Post Request Call
app.post('/login',function(req,res){
    
    // Object.keys(req.body).forEach(function(key){
    //     req.body = JSON.parse(key);
    // });
    // var username = req.body.username;
    // var password = req.body.password;
    console.log("Inside Login Post Request");
    //console.log("Req Body : ", username + "password : ",password);
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


app.post('/register',function(req,res){


    var username = req.body.username;
    var password =  req.body.password;
    var email = req.body.email;
    
    connection.query("SELECT * FROM customer WHERE username = " + "'" + username + "'", function (err, result) {
        console.log(result);
        if (result.length === 0) {
            connection.query("INSERT INTO customer (username, password, email) VALUES (" + "'" + username + "'" + "," + "'" + password + "'" + "," + "'" + email + "'" + ")", function (err, result) {
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
    
    connection.query("SELECT * FROM restaurant WHERE username = " + "'" + username + "'", function (err, result) {
        console.log(result);
        if (result.length === 0) {
            connection.query("INSERT INTO restaurant (username, password, email, name, location) VALUES (" + "'" + 
                username + "'" + "," + "'" + password + "'" + "," + "'" + email + "'" + "," + "'" + 
                name + "'" + "," + "'" + location + "'" + ")", function (err, result) {
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

            res.cookie('cookie',resUser + " " + resEmail,{maxAge: 900000, httpOnly: false, path : '/'});
            
            req.session.user = resUser;
            req.session.restaurant = true;
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
    res.writeHead(200,{
        'Content-Type' : 'application/json'
    });

    res.end("home");
    
});



app.get('/profile', function(req,res){
    console.log(111111);    
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

    });

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

        res.writeHead(200,{
            'Content-Type' : 'text/plain'
        })
        res.end(JSON.stringify(data));

    });

    
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


//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");