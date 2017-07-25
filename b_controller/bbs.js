var dao = require("../c_dao/bbsDao");
var error = require('../error.js');
var queryString = require("querystring");

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
 
exports.read = function(qs, response){
    if(qs == ""){
        console.log("in bbs.js : read");
        dao.select(function(data){ // dao를 통해 db를 읽고난 후, 결과셋을 처리하는 코드
            console.log("in bbs.js : response.on('end')");
            var jsonString = JSON.stringify(data);
            send(response, jsonString);
         });
    } else { // 검색을 위한 쿼리스트링이 있다면 쿼리스트링을 분해해서 처리한다.
            var parsedQs = queryString.parse(qs, '&', '=');
            // ===== parse하게 되면 아래와 같은 js 객체가 만들어진다..
            // parsedQs = {
            //     title : "this is title.",
            //     author : "JunHee",
            // }
            dao.search(parsedQs, function(data){
                var jsonString = JSON.stringify(data);
                send(response, jsonString);
            });
        
    }
};

// update는 write와 동작 방식이 유사하다. 
exports.update = function(request, response){
    // 요청한 데이터를 담을 변수를 선언
    var postdata = "";
    request.on('data', function(data){ // 데이터가 버퍼에 가득차면 자동으로 호출
        postdata = postdata + data;
    });
    request.on('end', function(){ // 데이터를 다 읽었을 때 호출
        var dataObj = JSON.parse(postdata);
        // 아래와 같은 형식의 js 객체를 생성해준다.
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

exports.delete = function(request, response){
    var postdata = "";
    request.on('data', function(data){ // 데이터가 버퍼에 가득차면 자동으로 호출
        postdata = postdata + data;
    });
    request.on('end', function(){ // 데이터를 다 읽었을 때 호출
        var dataObj = JSON.parse(postdata);
        dao.delete(dataObj, function(err){
            if(err){
                error.send(response, 500, err);
            }else{
                send(response, '{"result":"ok"}');
            }
        });
    });
};

send = function(response, result){
    response.writeHead(200, {'Content-Type' : 'application/json'});
    response.end(result);
    console.log('in bbsDao.js : complete!!!');
};