// 객체 만들어서 사용 

exports.send = function(response, code, err){
    response.writeHead(code, {'Content-Type' : 'application/json'});
    if(code == 300){
        // 웹브라우저일 경우만 처리하면 될듯...
    } else if(code == 404){
        var errorObj = {
             result : "404 Page not found",
             msg : "",
        }
        response.end(JSON.stringify(errorObj));

    } else if(code == 500){
        var errorObj = {
             result : "500 Page not found",
             msg : "",
        }
        response.end(JSON.stringify(errorObj));
    }
}