var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongo = require('mongodb');


var index = require('./routes/index');
var tasks = require('./routes/tasks');
const authRoutes = require('./routes/auth.route');
var port = 3000;

var app = express();


// Database setup
let mongoose=require('mongoose');
let DB = require('./config/db');
//point Mongoose to the DB URI
mongoose.connect(DB.URI,{ useNewUrlParser: true });
mongoose.set('useCreateIndex', true);

let mongoDB= mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Connection Error:'));
mongoDB.once('open', ()=>{
  console.log("Connected to MongoDB...");
})

//allow 2 servers to be accessed simultaneously!!
app.use(function (req, res, next) 
{ 
    res.setHeader('Access-Control-Allow-Origin', '*');//hey browser! allow this foreign url to access content from our url
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); 
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); 
    res.setHeader('Access-Control-Allow-Credentials', true); 
    next(); 
}); 

//View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// Set Static Folder
app.use(express.static(path.join(__dirname, 'client')));
app.use(cookieParser());
// Body Parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', index);
app.use('/api', tasks);
app.use('/auth', authRoutes);

app.listen(port, function(){
    console.log('Server started on port '+port);
});