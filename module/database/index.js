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
	var con = mysql.createConnection(conInfo);
	con.connect();
	con.query(query, function(err, items, fields){
		if(err){
			console.log("Error Message = " + err);
		} else {
            callback(items);
		}
		this.end(); // <- 필수 안하면 계속 스트림이 흐르는 상태, 연결해제 하는 역할 
	});
};

// 쿼리를 싱행만 하는 함수 
exports.execute = function(query, callback){
	var con = mysql.createConnection(conInfo);
	con.connect();
	con.query(query, function(err, items, fields){
		if(err){
			console.log("Error Message = " + err);
		} else {
            callback();
		}
		this.end(); // <- 필수 안하면 계속 스트림이 흐르는 상태, 연결해제 하는 역할 
	});
};

exports.executeMulti = function(query, values, callback){
	console.log('in database/index.js : executeMulti');
	var con = mysql.createConnection(conInfo);
	con.connect();
	con.query(query, [values], function(err, items, fields){
		if(err){
			console.log("Error Message = " + err);
		} else {
            callback();
		}
		this.end(); // <- 필수 안하면 계속 스트림이 흐르는 상태, 연결해제 하는 역할 
	});
};

