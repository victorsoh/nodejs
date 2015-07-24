var express = require("express");
var app = express();
var port = 8080;
 
app.get("/", function(req, res){
    res.send("It works!!");
});
 
var io = require('socket.io').listen(app.listen(port));
io.sockets.on('connection', function (socket) {

	console.log("sending welcome message to client");
	socket.emit("message_to_client",{ name : 'server', message: 'welcome to Victor\'s chat room' });

	socket.on('message_to_server', function(data) {
		console.log("received data from client: name = " + data.name);
		console.log("received data from client: message = " + data.message);
		console.log("echo data back to client");
		socket.emit("message_to_client",{ name : data.name, message: data.message });
	});
});
console.log("Listening on port " + port);
