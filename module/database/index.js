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
			console.log('database/index.js :::: executeQuery query');
		if(err){
			console.log("Error Message = " + err);
		} else {
			console.log('database index.js :::: executeQuery22222');
        	callback(items);
		}
		this.end(); // <- 필수 호출하지 않으면 계속 스트림이 흐르는 상태, 연결해제 하는 역할 
	});
};

// 검색 조건을 알아서 처리해주는 함수 
exports.executeQueryValues = function(query, values, callback){
	console.log("in index.js :::: executeQueryValues");
	var con = mysql.createConnection(conInfo);
	con.connect();
	console.log('index.js ::: executeQueryValues query :' + query);
	con.query(query, values, function(err, items, fields){ // 데이터베이스에 쿼리 실행
		console.log("in database :::: executeQueryValues");
		if(err){
			console.log(err);
		}else{
			console.log('executeQueryValues ::: callback()');
			console.log(items);
			callback(items);
		}
		this.end();  // mysql 연결 해제
	});
}


// 쿼리를 실행만 하는 함수 
exports.execute = function(query, values, callback){
	console.log('database/index.js :::: executeQuery');
	var con = mysql.createConnection(conInfo);
	con.connect();
	con.query(query, values ,function(err, result){
		console.log("in database :::: execute query");
		if(err){
			callback(err); // <- 에러가 발생하면 callback에 에러를 넘겨준다.
		} else {
            callback();
		}
		this.end();  
	});
};
// 여러 인자를 받는 쿼리문 
exports.executeMulti = function(query, values, callback){
	console.log('database/index.js :::: executeMulti');
	var con = mysql.createConnection(conInfo);
	con.connect();
	con.query(query, [[values]], function(err, result){ // 데이터베이스에 쿼리 실행 
		console.log("in database :::: executeMulti query");
		if(err){
			console.log("Error Message = " + err);
		} else {
            callback();
		}
		this.end();
	});
};

