exports.write = function(response){
    send(response, 'write');
};

exports.update = function(response){
    send(response, 'update');

};

exports.delete = function(response){
    send(response, 'remove');
};

exports.read = function(response){
    send(response, 'read');
};

send = function(response, msg){
    response.writeHead(200, {'Content-Type' : 'text/html'});
    response.end(msg);
}