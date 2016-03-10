
var express = require('express');
var app = express();
var http = require('http').Server(app);
var path = require('path');

// Register socket namespaces
var io = require('socket.io')(http);
var displaySocket = io.of('/display');
var clientSocket = io.of('/client');

var allowConnection = true;


// Register assets directories
app.use(express.static(__dirname + '/../client'));
app.use(express.static(__dirname + '/../display'));

// Register routes
app.get('/', function(req, res){
    res.sendfile(path.join(__dirname, '../client', 'index.html'));
});

app.get('/display', function(req, res){
    if (allowConnection) {
        allowConnection = false;
        res.sendfile(path.join(__dirname, '../display/canvas.html'));
    } else{
        res.sendfile(path.join(__dirname, '../display/display_in_use.html'));

    }
});



//Listen to the display namespace
displaySocket.on('connection', function(socket){
    console.log('connection to display!');
    displaySocket.emit ('updateGrid', 'grid');


    socket.on('disconnect', function(){
        allowConnection = true;
    });
    socket.on('playerColor', function(color){
        console.log(color);
        clientSocket.emit('playerColor', color);

    });
});



// Connection Event
clientSocket.on('connection', function(socket){
    socket.on('changeDirection', function(direction){
        var chosenDirection;
        switch(direction){
            case "Up":
                chosenDirection = 0;
                console.log("Going up");
                break;
            case "Right":
                chosenDirection = 1;
                console.log("Going right");
                break;
            case "Down":
                chosenDirection = 2;
                console.log("Going down");
                break;
            case "Left":
                chosenDirection = 3;
                console.log("Going left");
                break;
            case "UpLeft" :
                //TODO: IMPLEMENT
                break;
            case "Upright":
                //TODO IMPLEMENT
                break;
            case "Downright":
                //TODO IMPLEMENT
                break;
            case "Downleft":
                //TODO IMPLEMENT
                break;
        }

        console.log("hello from controller update");
        var user={
            id : socket.id,
            direction : chosenDirection
        };
        displaySocket.emit('changeDirection',user)
    });



    socket.on('registerUser', function(){
        displaySocket.emit('addUser',socket.id)
    });

    socket.on('disconnect', function(){
        displaySocket.emit('disconnect',socket.id);
    });
});



http.listen(3000, function(){
    console.log('listening on *:3000');
});

