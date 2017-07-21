var dao = require("./bbsDao");

exports.write = function(request, response){
    console.log("in bbs.js : write");
    var postdata = "";
    request.on('data', function(data){ // 데이터를 읽을 수 있을 떄 호출
        postdata = postdata + data;
    });
    request.on('end', function(){ // 데이터를 다 읽었을 떄 호출 
        var dataObj = JSON.parse(postdata);
         dao.insert(dataObj, function(){
         this.send(response, 'write is successful!');
    });
    });
};

exports.update = function(response){
    this.send(response, 'update');
};

exports.delete = function(response){
    this.send(response, 'delete');
};

exports.read = function(response){
    this.send(response, 'read');
};

exports. send = function(response, msg){
    response.writeHead(200, {'Content-Type' : 'text/html'});
    response.end(msg);
};