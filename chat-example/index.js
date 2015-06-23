var redis = require('redis');
var rclient = redis.createClient(); //port, host



var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {

    res.sendFile(__dirname + '/index.html');

    //res.send('<h1>Hello World</h1>');
});

io.on('connection', function(socket) {
    console.log('a user connected');
    rclient.on('connect', function() {
        console.log('redis connected...');
    });


    socket.on('disconnect', function() {
        console.log('a user disconnected');
    });

    socket.on('chat message', function(message) {
        console.log(message);
        rclient.set('framework', message, function(err, reply) {
            console.log(reply);


            rclient.get('framework', function(err, reply) {

                console.log(reply);
                io.emit('chat message', reply);

            });
        });


    });


});



http.listen(3000, function() {
    console.log('listening on *:3000');
});