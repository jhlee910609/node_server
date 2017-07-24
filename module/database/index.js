var mysql = require('mysql');
var conInfo = {
	host : '127.0.0.1', // 데이터베이스 아이피 또는 url
	user : 'root',	  // 사용자 id
	password : 'mysql', // pw
	port : 3306,	  // port
	database : 'bbs'	  // db
};

// 쿼리 후에 결과값을 리턴해주는 함수 
exports.executeQuery = function(query, callback){
	console.log('database/index.js :::: executeQuery');
	var con = mysql.createConnection(conInfo);
	con.connect();
	con.query(query, function(err, items, fields){
		if(err){
			console.log("Error Message = " + err);
		} else {
			console.log('database index.js :::: executeQuery22222');
        	callback(items);
		}
		this.end(); // <- 필수 호출하지 않으면 계속 스트림이 흐르는 상태, 연결해제 하는 역할 
	});
};

// 쿼리를 실행만 하는 함수 
exports.execute = function(query, values, callback){
	console.log('database/index.js :::: executeQuery');
	var con = mysql.createConnection(conInfo);
	con.connect();
	con.query(query, values ,function(err, result){
		if(err){
			callback(err); // <- 에러가 발생하면 callback에 에러를 넘겨준다.
		} else {
            callback();
		}
		this.end();  
	});
};
// 여러 인자르 랍는 쿼리문 ㄴ
exports.executeMulti = function(query, values, callback){
	console.log('database/index.js :::: executeMulti');
	var con = mysql.createConnection(conInfo);
	con.connect();
	con.query(query, [[values]], function(err, items, fields){
		if(err){
			console.log("Error Message = " + err);
		} else {
            callback();
		}
		this.end();
	});
};

