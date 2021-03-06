var express = require('express');
var socket = require('socket.io');

//App setup

var app = express();

var server = app.listen(4000,function(){

    console.log("Listening to requests on port 4000");
});

// Static Files
app.use(express.static('public')); 

//Scoket setup
var io = socket(server);

io.on('connection', function(socket){
    console.log('made socket connection: Id:' + socket.id);
    socket.on('chat',function (data) {
       console.log(data); 
       io.sockets.emit('chat',data);
    });

    socket.on('typing',function (data) {
        socket.broadcast.emit('typing',data);
    });
});

