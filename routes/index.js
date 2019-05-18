var express = require('express');
var router = express.Router();

//router.use(bodyParser.urlencoded({ extended:true }));

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
		console.log('/api/books');
		//console.log(Book);
		Book.find(function(err, books){
			if(err) return res.status(500).send({error: 'database failure'});
			res.json(books);
		});
    });

    // GET SINGLE BOOK
    app.get('/api/books/:book_id', function(req, res){
        //res.end();
		Book.findOne({_id: req.params.book_id}, function(err, book){
       		 if(err) return res.status(500).json({error: err});
       		 if(!book) return res.status(404).json({error: 'book not found'});
       		 res.json(book);
    	});
    });

    // GET BOOK BY AUTHOR
    app.get('/api/books/author/:author', function(req, res){
        //res.end();
		
		 Book.find({author: req.params.author}, {_id: 0, title: 1, published_date: 1},  function(err, books){
			if(err) return res.status(500).json({error: err});
			if(books.length === 0) return res.status(404).json({error: 'book not found'});
			res.json(books);
    	});
    });

    // CREATE BOOK
    app.post('/api/books', function(req, res){
		console.log('/api/books post');
        var book = new Book();
		book.title = req.body.title;
		book.author = req.body.author;
		book.published_date = new Date(req.body.published_date);
		console.log(book);
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
        //res.end();
		
		Book.findById(req.params.book_id, function(err, book){
			if(err) return res.status(500).json({ error: 'database failure' });
			if(!book) return res.status(404).json({ error: 'book not found' });

			if(req.body.title) book.title = req.body.title;
			if(req.body.author) book.author = req.body.author;
			if(req.body.published_date) book.published_date = req.body.published_date;

			book.save(function(err){
				if(err) res.status(500).json({error: 'failed to update'});
				res.json({message: 'book updated'});
			});
		});
		
		/*
		// UPDATE THE BOOK (ALTERNATIVE)
		Book.update({ _id: req.params.book_id }, { $set: req.body }, function(err, output){
			if(err) res.status(500).json({ error: 'database failure' });
			console.log(output);
			if(!output.n) return res.status(404).json({ error: 'book not found' });
			res.json( { message: 'book updated' } );
		});
		*/
    });

    // DELETE BOOK
    app.delete('/api/books/:book_id', function(req, res){
        //res.end();
		
		 Book.remove({ _id: req.params.book_id }, function(err, output){
			if(err) return res.status(500).json({ error: "database failure" });

			/* ( SINCE DELETE OPERATION IS IDEMPOTENT, NO NEED TO SPECIFY )
			if(!output.result.n) return res.status(404).json({ error: "book not found" });
			res.json({ message: "book deleted" });
			*/

			res.status(204).end();
		});
    });
};


