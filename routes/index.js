var express = require('express');
var router = express.Router();


/* GET home page.
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
*/

module.exports = function(app, Book){
	//라우팅 설정
	app.get('/', function(req, res, next){//웹 서버 기본주소로 접속 할 경우 실행.
		
		console.log('home page');
		res.render('index.html', {
			info : 'victory',
			len : 5
		});
		/*
		fs.readFile('index.html', function(error, data){//test.html 파일 로드.
			if(error){
				console.log(error);
			} else {
				res.writeHead(200,{'Content-Type':'text/html'});//Head Type설정.
				res.end(data);//파일 로드 html response.
			}
		}); 
		*/
	});
	
	// GET ALL BOOKS
    app.get('/api/books', function(req,res){
        //res.end();
		
		Book.find(function(err, books){
			if(err) return res.status(500).send({error: 'database failure'});
			res.json(books);
		});
    });

    // GET SINGLE BOOK
    app.get('/api/books/:book_id', function(req, res){
        res.end();
    });

    // GET BOOK BY AUTHOR
    app.get('/api/books/author/:author', function(req, res){
        res.end();
    });

    // CREATE BOOK
    app.post('/api/books', function(req, res){
		
        var book = new Book();
		book.title = req.body.name;
		book.author = req.body.author;
		book.published_date = new Date(req.body.published_date);

		book.save(function(err){
			if(err){
				console.error(err);
				res.json({result: 0});
				return;
			}

			res.json({result: 1});

		});
    });

    // UPDATE THE BOOK
    app.put('/api/books/:book_id', function(req, res){
        res.end();
    });

    // DELETE BOOK
    app.delete('/api/books/:book_id', function(req, res){
        res.end();
    });
};


