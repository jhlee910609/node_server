# node.js로 CRUD 서버 구축하기

- node.js를 활용해 CRUD를 구현한 기본적인 서버를 구축한다.

- 실습 시, node.js 웹 서버 구조는 다음과 같다. 

  ![](https://ws2.sinaimg.cn/large/006tKfTcgy1fhvql44zfwj30sg0lc0uw.jpg)

## 1. 사용 모듈

### 1.1. http 모듈

##### 1.1.1. server 객체

- http 모듈의 `createServer()` 메서드를 사용하면 server 객체를 생성할 수 있다.

```javascript
// 1. http 모듈과 필요한 모듈을 import 한다. 
var http = require('http');
var router = require('./a_router/router');

// 2. 웹서버를 생성한다. 
                                 // 콜백 function <- 사용자 요청이 있을 때, 호출된다.
var server = http.createServer(function(request, response){
     // request <- node.js가 사용자의 요청정보를 담아서 넘겨준다.
    router.parser(request, response);
});

// 3. 서버 실행
// listen(); 메소드는 서버를 실행하는 메소드이다.
                    // 콜백 func <- 서버 start 후에 호출 : server가 정상적으로 시작되었는지 console.log();
server.listen(1111, function(){
    console.log("server's running...."); 
});

```

##### 1.1.2. response 객체

- 클라이언트에게 웹 페이지를 제공하기 위해서는 응답 메시지를 작성하여 보내줘야 한다.
- 응답 메시지를 작성할 때, request 이벤트 리스너의 두 번째 매개변수로 전달되는 request 객체를 사용한다.
- response의 객체는 다음과 같다. 

```javascript
// 응답 헤더를 작성하는 writeHead(); 메소드
response.writeHead(statusCode[, statusMessage][, headres]);
// 예시)
response.writeHead(200, {'Content-Type' : 'application/json'});

// 응답 본문을 작성하는 end(); 메소드
response.end([data][, encoding][, callback]);
// 예시) 직접 html 태그를 사용할 수도 있다. 
response.end('<h1>hello node.js</h1>');
```

### 1.1.3. request 객체

- request 객체의 속성을 사용하여 사용자가 요청한 페이지를 적절하게 제공할 수 있고, 또한 요청 방식에 따라 페이지를 구분할 수 있다. 

###### 1) url 속성을 사용하여 페이지 구분하기

```javascript
var error = require("../error");
var bbs = require("../bbs");
var user = require("../user");
// request 를 분석해서 요청 url에 대한 연결
// url 을 분석
exports.parse = function (request, response){
    console.log("in router parse");
    var path = removeQuerystring(request.url);
    if(path == "/bbs"){
        //---> 주소로 요청된 모듈.js 로 보낸다. 요청주소가 /bbs 라면 bbs.js
        parseMethod(bbs, request, response);
    } else if(path == "/user"){
        parseMethod(user, request, response);
    } else {
        error.send(response, 404);
    }
};
```



###### 2) method 속성을 사용하여 페이지 구분하기

- 사용자가 요청한 `url` 뿐만 아니라 `GET, POST, PUT, DELETE`등 method도 함께 `request`에 담겨와야 그에 맞는 `response`를 할 수 있다. 

```javascript
function parseMethod(module, request, response){
    console.log("in router parseMethod");
    if(request.method == "POST"){
        module.write(request, response);
    }else if(request.method == "GET"){
        module.read(getQuerystring(request.url), response);
    }else if(request.method == "PUT"){
        module.update(request, response);
    }else if(request.method == "DELETE"){
        module.delete(request, response);
    }
}
```



### 1.2. querystring 모듈

- URL 객체의 쿼리와 관련된 모듈이다.
- querystring 모듈의 사용법은 다음과 같다.


```javascript
// 모듈을 import 한다.
var querystring = require('querystring');

// 쿼리 문자열을 쿼리 객체로 변환해 리턴한다.
var parsedQs = queryString.parse(qs, '&', '=');

// 쿼리 객체를 쿼리 문자열로 변환해 리턴한다. 
var parsedQs = queryString.stringify(qs, '&', '=');
```

[사용 코드 전체보기](https://github.com/jhlee910609/nodejs_basic_mysql/blob/master/b_controller/bbs.js)

