exports.send = function(response, code, err){
    response.writeHead(code, {'Content-Type' : 'application/json'});
    if(code == 300){
        // 웹브라우저 사용 시에만 처리하면 된다.
    } else if(code == 404){
        // 에러 객체를 만들어서 사용하는 방법이 편하다. 
        var errorObj = {
             result : "404 Page not found",
             msg : "",
        }
        response.end(JSON.stringify(errorObj));

    } else if(code == 500){
        var errorObj = {
             result : "500 Page not found",
             msg : err,
        }
        response.end(JSON.stringify(errorObj));
    }
}