var express = require('express');
var router = express.Router();


/* GET home page.
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
 */
module.exports = router;

//라우팅 설정
router.get('/', function(req,res){//웹 서버 기본주소로 접속 할 경우 실행.
	fs.readFile('index.html', function(error, data){//test.html 파일 로드.
		if(error){
			console.log(error);
		} else {
			res.writeHead(200,{'Content-Type':'text/html'});//Head Type설정.
			res.end(data);//파일 로드 html response.
		}
	}); 
});
