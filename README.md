# node.js 기본 개념

### node.js 란

![](https://t1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/naw/image/sz_k40ok5fLChUw8KoVuiI0B18I.png)

>  웹브라우져 안에서만 사용하던 JavaScript 언어를 브라우져 밖에서도 사용하자는 js 개발자들의 운동이 일어났고, 그로 인해 Node.js라는 플랫폼이 만들어졌다. 주로 web server 개발에 사용되지만 실상 node.js를 통해 할 수 있는 일들은 매우 다양하다. 



### 1. node.js의 전역 객체

- 웹 브라우저에서 동작하는 자바스크립트의 최상위 객체는 window 객체이다. 이 window 객체는 웹 브라우저 자체와 관련된 속성과 메소드를 갖고 있다.
- 하지만 Node.js는 웹 브라우저에서 동작하기 않기 때문에 대신 `전역변수`와 `전역함수`를 갖는다.



##### 1.1. console 객체

- console 객체는 node.js 콘솔 화면과 관련된 기능을 다루는 객체이다.

```javascript
// === node.js 콘솔 화면에 출력한다. ===
console.log();

// === 시간 측정 시작 ===
console.time('timerName');

// === 시간 측정 종료 === 
console.timeEnd('timerName');
```



##### 1.2. exports 객체

- node.js는 `모듈`을 사용해 기능을 확장해 나가는데, 이 때 `모듈`은 '**기능을 쉽게 사용하고자 메서드와 속성을 미리 정의해 모아 놓은 일종의 라이브러리**'라고 이해하면 될 것 같다.

>예제 파일 1. module.js 

```javascript
// exports 객체를 통해 해당 .js 파일을 모듈화한다. 
exports.abs = function (num){
    if(0 < num){
        return num;
    } else {
        return -num;
    }
};

exports.circleArea = function (radius){
    return radius*radius*Math.PI;
};
```

>예제 파일 2. main.js (실제 `terminal`에서 `node main` 명령어 작성 하는 부분)

```javascript
// require 객체를 통해 module을 꺼낸다.
					// 같은 경로에 있다면 [./module.js] 처럼 작성하면 된다.
					// 경로가 다르다면 절대 경로를 써주는 것이 혼돈이 덜 하다.
var module = require('./module.js');

// 꺼낸 module.js 를 참조하여 작업을 실행시킨다. 
console.log('abs(-3) = %d : ', module.abs(-3));
console.log('circleArea(30) = %d', module.circleArea(30));
```



##### 1.3. url 모듈

```javs
// 내장 객체 활용
var http = require('http')
```



### 2. 이벤트

- node.js의 가장 큰 특징 중 하나의 **'이벤트 기반 비동기 프로그래밍'**이 가능하다는 점이다.
- 자바스크립트는 다른 프로그래밍 언어와 비교했을 때, 함수 생성과 이벤트 연결이 굉장히 쉬워 이벤트 기반의 프로그래밍을 하기 좋다. (이는 자바를 생각해보면 알 수 있다...)
- 자세한 부분은 추후에 공부하도록 하자. (서버 개발하는데 있어서는 비중이 큰 부분은 아니다.)
- [Asyn callback에 관하여...](http://proinlab.com/archives/1811)


------

## 2. node.js로 웹 서버 구축하기 

- 웹서버는 `요청`과 `응답`의 연속으로 동작한다.
- 아래 그림을 보면 이해가 쉬울 것이다.

![](http://colanut.com/photo3/etc/myserver_story/myserver004.gif)

### 3. Http 모듈

> Http(HyperText Transfer Protocol)은 TCP/IP를 기반에 둔 프로토콜이다. node.js로 만들게 될 웹 서버 뿐만 아니라 모든 웹 서버들은 Http 프로토콜을 통해 통신한다.



##### 3.1. Server 객체

> http 모듈에서 가장 중요한 객체는 server 객체이다. http 모듈의 `createServer();` 메서드를 사용하여 server 객체를 생성할 수 있다. 

- node.js는 HTTP 웹 서버 객성과 관련된 모든 기능을 http 모듈(node.js 내장 모듈)에 담아 놓았다.
  [내장 모듈 자세히 보기](https://nodejs.org/api/modules.html)


```javascript
// 1. http 모듈을 import한다.
var http = require('http')

// 2. 웹 서버를 만든다.
var server = http.createServer();

// 3. 웹 서버를 실행한다.
server.listen(3307, function(){
  // 3.1. '3307' 포트 실행 후, 콜백 함수 내용을 실행한다.
  // 3.2. cmd 창에 아래 로그가 찍힐 것이다.
  console.log('server is running...!');
});

// 4. 웹 서버를 종료한다.
server.close();
```

##### 3.2. request 객체

>server 객체의 request 이벤트가 발생할 때, 이벤트 리스너의 첫 번째 매개변수에는 request 객체가 들어간다. 



### 4. 페이지 구분하기

##### 4.1. url 속성을 사용한 페이지 구분

```javascript
exports.parser = function(request, response){
    console.log('in router.js parser');
    // url parsing
    var path = splitQueryString(request.url);
    /* 현업에서는 "/"를 기준으로 url을 전부 split 처리하여 배열에 담아서 쓴다. */
    // 1. url을 분석
    if(path == '/bbs'){
        // bbs.js 처리
        parseMethod(bbs, request, response);
    } else if(path == '/user'){
        // user.js 처리
         parseMethod(user, request, response);
    } else {
        error.send(response, 404);
}};

// method parsing
function parseMethod(obj, request, response){
    console.log('in router.js parseMethod');
    if(request.method == "POST"){
        obj.write(request, response);

    } else if(request.method == "GET"){
         obj.read(response);

    } else if(request.method == "DELETE"){
        obj.remove(response);

    } else if(request.method == "PUT"){
         obj.update(response);
    }
};


```



------



# SQL Query Syntax

> node.js 웹서버와 MySql DB를 다루기 위해 sql query 문법을 익혀두자

### 1. select

- 특정 DB안의 특정 테이블에 접근하는 명령문이다.

```sql
// 1. 특정 컬럼 접근하기
SELECT column1, column2, ... FROM table_name;

// 2. 'table_name'에 해당되는 모든 데이터 조회하기 
SELECT * FROM table_name;
```



### 2. insert

- 테이블에 데이터 추가(삽입) 쿼리 명령문
- 쿼리 명령문의 대소문자는 구분할 필요없다.

```sql
// 방법 1. 
INSERT INTO table_name(column1, column2, column3, ...) VALUES (value1, value2, value3, ...);

// 방법 2.
INSERT INTO table_name VALUES (value1, value2, value3, ...);
```



### 3. update

- table의 데이터를 갱신한다.
- 데이터가 overwrite된다.

```sql
// update 쿼리문 형식
UPDATE table_name SET column1 = value1, column2 = value2, ... WHERE condition;

// 예시
UPDATE Customers SET ContactName = 'Alfred Schmidt', City= 'Frankfurt' WHERE CustomerID = 1;
```



### 4. delete

- 특정 조건에 해당 되는 데이터를 테이블에서 삭제한다.

```sql
DELETE FROM table_name WHERE condition;
```

