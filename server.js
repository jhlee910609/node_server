// 1. 서버모듈
var http = require('http');
var router = require('./module/router');

// 2. 서버 생성
                                 // 콜백 function <- 사용자 요청이 있을 때, 호출된다.
var server = http.createServer(function(request, response){
    // request <- node.js가 사용자 요청정보를 담아서 넘겨준다.
    // request <- node.js가 사용자에게 응답할 때 사용하라고 알아서 넘겨준다.
    console.log('in server.js : createServer');
    router.parser(request, response);
});

// 3. 서버 시작     
                    // 콜백 func <- 서버 start 후에 호출 : server가 정상적으로 시작되었는지 console.log();
server.listen(1111, function(){
    console.log("server's running...."); 
});