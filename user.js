exports.write = function(response){
    this.send(response, 'write');
};

exports.update = function(response){
    this.send(response, 'update');

};

exports.delete = function(response){
    this.send(response, 'remove');
};

exports.read = function(response){
    this.send(response, 'read');
};

exports.send = function(response, msg){
    response.writeHead(200, {'Content-Type' : 'text/html'});
    response.end(msg);
}