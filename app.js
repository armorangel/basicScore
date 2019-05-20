//node ./index.js --user=bob

const Express = require('express');
const BodyParser = require('body-parser');		//http 요청 데이터를 파싱하는 미들웨어
const cookieParser = require('cookie-parser');	//접속한 클라이언트의 쿠키 정보에 접근하기 위한 모듈
const logger = require('morgan');				//클라이언트의 HTTP 요청 정보를 로깅하기 위한 모듈
const mongoose    = require('mongoose');		//자바스크립트 객체를 MongoDB 객체로 매핑
const createError = require('http-errors');
const path = require('path');

const react = require('react');

const config = require(__dirname + '/src/config');		// CONFIGURATION

let app = Express();

// CONNECT TO MONGODB SERVER
mongoose.connect(config.dbUrl, (err) => { //MongoDB CONNECT
	if(err) console.error('mongodb connection error', err);
	
	console.log('mongodb conneced');
});

// [CONFIGURE APP TO USE bodyParser]
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

// DEFINE MODEL
let Book = require('./models/book');

// [CONFIGURE ROUTER]
var router = require('./routes')(app, Book);

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');


// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(Express.json());
app.use(Express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(Express.static(path.join(__dirname, 'public')));



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
