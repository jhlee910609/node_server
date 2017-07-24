var database = require('./module/database/');
var tableName = "board";

exports.select = function(callback){
    console.log('in bbsDao.js : select');
    var query = " select * from " + tableName + "";
    var data = "";
    database.executeQuery(query, callback);
}

exports.insert = function(data, callback){
    console.log('in bbsDao.js : insert');
    // 쿼리는 붙혀 쓸 경우, 에러가 발생할 확률이 높기 때문에 최초 한 칸을 띄워준다...
    var query = " insert into" +  " " + tableName + "(title, content, author, `date`)";
        // 아래 쿼리문 데이터 대량 인서트 할 수 있도록 만들어짐 .. 
    query = query +  " VALUES ?";

    var values = [data.title, data.content, data.author, data.data];
    database.executeMulti(query, values, callback);
}

exports.update = function(data, callback){
    var query = " update " + tableName 
              + " set title   =?, " 
              + "     content =?, "
              + "     author  =?, "
              + "     date    =?  "
              + " where id=?"; 
    // -----------------------
    var now = new Date().toLocaleDateString();
    var values = [data.title, data.content, data.author, now, data.id];
    database.execute(query, values, function(error){
        callback(error);
    });
}

exports.delete = function(){
    var query = "delete from " + tableName + "  ";
}