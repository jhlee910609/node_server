var dao = require("./bbsDao");
var error = require('./error.js');

exports.write = function(request, response){
    console.log("in bbs.js : write");
    var postdata = "";
    request.on('data', function(data){ // <- 데이터를 읽을 수 있을 떄 호출
        postdata = postdata + data;
    });
    
    request.on('end', function(){ // <- 데이터를 다 읽었을 떄 호출 
        var dataObj = JSON.parse(postdata);
        dao.insert(dataObj, function(){
            send(response, '{"reuslt" : "ok"}');
        });
    });
};

exports.read = function(request, response){
   console.log("in bbs.js : read");
    dao.select(function(items){ // dao를 통해 db를 읽고난 후, 결과셋을 처리하는 코드
        console.log("in bbs.js : response.on('end')");
        var jsonString = JSON.stringify(items);
        send(response, jsonString);
    });
};

 // update는 write와 동작 방식이 유사하다. 
// 업데이터는 write와 동작방식이 유사하다
exports.update = function(request, response){
    // 요청한 데이터를 담을 변수를 선언
    var postdata = "";
    request.on('data', function(data){ // 데이터가 버퍼에 가득차면 자동으로 호출
        postdata = postdata + data;
    });
    request.on('end', function(){ // 데이터를 다 읽었을 때 호출
        var dataObj = JSON.parse(postdata);
        // dataObj = {
        //     id : 10,
        //     title : "수정된 제목",
        //     content : "수정된 내용 내용 \n 내용내용내ㅛㅇㅇ",
        //     author : "펀치넬로",
        //     date : "2017-07-24"
        // }
        dao.update(dataObj, function(err){
            if(err){
                error.send(response, 500, err);
            }else{
                send(response, '{"result":"ok"}');
            }
        });
    });
}

exports.delete = function(response){
    console.log("in bbs.js : delete");
    send(response, 'delete');
};

send = function(response, result){
    response.writeHead(200, {'Content-Type' : 'application/json'});
    response.end(result);
    console.log('in bbsDao.js : complete!!!');
};