const express = require('express');
const path = require('path');
const mongoose    = require('mongoose');		//자바스크립트 객체를 MongoDB 객체로 매핑

const fs = require('fs');
const generatePassword = require('password-generator');

const app = express();

// CONNECT TO MONGODB SERVER
// var dbUrl = 'mongodb+srv://user:QmTs5zvR8Phw4CUL@bsdb-vsnj9.mongodb.net/book?retryWrites=true&useNewUrlParser=true';


var dbUrl = 'mongodb+srv://user:AQgmEjEJFguMhUwq@basicscore-nyltz.mongodb.net/sample_airbnb?retryWrites=true&w=majority';

mongoose.connect(dbUrl, (err) => { //MongoDB CONNECT
	if(err) console.error('mongodb connection error', err);

	console.log('mongodb conneced');
});

// Serve static files from the React app
//app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.static(path.join(__dirname, 'client/public')));

/*
var ScoreSchema = mongoose.
///////////////////////
const Score = mongoose.model('Score', ScoreSchema);

// Statics model methods
app.get('/score/list', (req, res) => {
	Score.find({ }, function(err, score) {
		if(err) throw err;
		console.log(score);
	});

	// or

	Score.find({})
		.then(score => console.log(score))
		.catch(err => console.log(err))
});


*/

//////////////////////





// Put all API endpoints under '/api'
app.get('/api/passwords', (req, res) => {
	const count = 5;

	// Generate some passwords
	const passwords = Array.from(Array(count).keys()).map(i => generatePassword(12, false));

	// Return them as json
	res.json(passwords);

	console.log(`Sent ${count} passwords`);
});

// An api endpoint that returns a short list of items
app.get('/api/getList', (req,res) => {
    var list = ["item1", "item2", "item3"];
    res.json(list);
    console.log('Sent list of items');
});

app.get('/app', (req, res) => {
	res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
	//res.sendFile(path.join(__dirname + '/client/build/index.html'));
	
	var path = __dirname + '/client/public/exMidi.html';
	//var path = 'public/exMidi.html';
	//var path = 'exMidi.html';
	
	fs.readFile(path, function(err, data) {
		if(err) console.log(err);
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write(data);
		res.end();		
	});
	
	console.log('Start score');
});

const port = process.env.PORT || 9000;
app.listen(port);

console.log(`Password generator listening on ${port}`);