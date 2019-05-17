const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');//접속한 클라이언트의 쿠키 정보에 접근하기 위한 모듈
const logger = require('morgan');//클라이언트의 HTTP 요청 정보를 로깅하기 위한 모듈
const bodyParser = require('body-parser');
const mongoose    = require('mongoose');

let app = express();


// [CONFIGURE APP TO USE bodyParser]
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// DEFINE MODEL
let Book = require('./models/book');

// [CONFIGURE ROUTER]
var router = require('./routes')(app, Book);

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');



// [ CONFIGURE mongoose ]

// CONNECT TO MONGODB SERVER
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongod server");
});

//mongoose.connect('mongodb://localhost/mongodb_tutorial');


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://user:g9WiWkybBBw9a6V7@bsdb-vsnj9.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});




// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
