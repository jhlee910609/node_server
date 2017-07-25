var error = require("../error");
var bbs = require("../b_controller/bbs");
var user = require("../b_controller/user");

// request를 분석해서 요청 url에 대한 연결
/* http://localhost/bbs <- 목록 */
/* http://localhost/bbs (method : POST) <- 목록 */
// url 분석
exports.parser = function(request, response){
    console.log('in router.js : parser');
    var path = removeQueryString(request.url);
    /* 실제로는 "/"를 기준으로 url을 전부 split 처리하여 배열에 담아서 쓴다. */
    // 1. url을 분석
    if(path == '/bbs'){
        // bbs.js 처리
        parseMethod(bbs, request, response);
    } else if(path == '/user'){
         parseMethod(user, request, response);
    } else {
        error.send(response, 404);
}};

// http 메소드 파싱
function parseMethod(obj, request, response){
    console.log('in router.js parseMethod');
    if(request.method == "POST"){
        obj.write(request, response);

    } else if(request.method == "GET"){
         obj.read(getQueryString(request.url), response);

    } else if(request.method == "DELETE"){
        obj.delete(request, response);

    } else if(request.method == "PUT"){
        console.log('in router : update');
         obj.update(request, response);
    }
};

// [ http://localhost/bbs  ] <- url     [ ?title=서초 ] <- queryString
function removeQueryString(fullUrl){
    console.log('in router.js splitQueryString');
    var position = fullUrl.indexOf('?');
    if(position == -1){
        return fullUrl;
    } else {
        return fullUrl.substring(0, position);
    }
};

function getQueryString(fullUrl){
    console.log('in router.js getQueryString');
    var position = fullUrl.indexOf('?');
    if(position == -1){
        return "";
    } else {
        return fullUrl.substring(position + 1);
    }
};

