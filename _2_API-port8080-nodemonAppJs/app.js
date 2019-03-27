
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongo = require('mongodb');
const mongoose = require('mongoose');

const appRoutes = require('./routes/app.route');
const authRoutes = require('./routes/auth.route');
const bookRoute = require('./routes/book.route');
const bookListRoute = require('./routes/user.booklist.route');

//set environment variable by set DEPLOY=dev or DEPLOY=prod
const env = process.env.DEPLOY || "dev";
const conf = require('./config/' + env + ".json");

app.use(function (req, res, next) 
{ 
    res.setHeader('Access-Control-Allow-Origin', '*');//hey browser! allow this foreign url to access content from our url
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); 
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); 
    res.setHeader('Access-Control-Allow-Credentials', true); 
    next(); 
}); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// Create the database connection 
mongoose.connect(conf.dburl); 


//adding express middleware to serve static pages - e.g style.css
app.use("/public", express.static(__dirname+'/public'));

//set view engine to be ejs engine
app.set('view engine', 'ejs');

//allow 2 servers to be accessed simultaneously!!



app.use('/', appRoutes);
app.use('/auth', authRoutes);

app.use('/book', bookRoute);
app.use('/student',bookListRoute);


// if didn't match '/' then send index
app.use(function (req, res, next) {
    return res.render('index');
});

app.listen(conf.port);
console.log("app started on port ", conf.port);