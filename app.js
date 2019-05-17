/*
var file = require('fs');  // 파일시스템 관련 기본 모듈
var util = require('util');  // 유틸리티 함수를 제공하는 기본 모듈
*/

const express = require('express');//웹 서버 사용.
const app = express();
const fs = require('fs');//파일 로드 사용

app.set('port', (process.env.PORT || 9001));//heroku posrt number||test port

console.log('port: ' + app.get('port'));
//포트 설정
app.listen(app.get('port'), function(){
 console.log('Server Start');
});


//라우팅 설정
app.get('/', function(req,res){//웹 서버 기본주소로 접속 할 경우 실행.
	fs.readFile('index.html', function(error, data){//test.html 파일 로드.
		if(error){
			console.log(error);
		} else {
			res.writeHead(200,{'Content-Type':'text/html'});//Head Type설정.
			res.end(data);//파일 로드 html response.
		}
	}); 
});
