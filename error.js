// 객체 만들어서 사용 
exports.send = function(response, code){
    response.writeHead(code, {'Content-Type' : 'text/html'});
    if(code == 300){
        // 웹브라우저일 경우만 처리하면 될듯...
    } else if(code == 404){
        response.end(code + "page not found");
    } else if(code == 500){
        response.end(code + "interal server problem");
    }
}