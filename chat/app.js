var app = require('express')();//подключаем запускаем
var http = require('http').Server(app);//тянет сервер от нативной ноды
var io = require('socket.io')(http);//подключаем сокет и туда бросаем

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

var users = [];
io.on('connection', function(socket) {
	console.log('A user connected');
	socket.on('setUserName', function(data) {
		console.log(data);
		if (users.indexOf(data) > -1) {
			console.log(data);
			socket.emit('userExists', '<p class"bg-primary"> Пользователь ' + 
										'<b>' + data + '</b>' + 
										' уже существует, выбери другое имя!</p>');
		} else {
			users.push(data);
			socket.emit('userSet', {userName: data});
		}
	});

	socket.on('message', function(data) {
		io.sockets.emit('newMessage', data);
	})
});

http.listen(3000, 'localhost', function() {
	console.log('Go to chat at http://localhost:3000');
});