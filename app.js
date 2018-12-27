//Простой сервер
// var app = require('express')();
// var http = require('http').Server(app);

// app.get('/', function(req, res) {//вызываем метод
// 	res.sendFile(__dirname + '/index.html');
// });

// http.listen(3000, function() {
// 	console.log('Server at localhost:3000');
// });

//2 хелло ворд + сокер.ио
// var app = require('express')();//подключаем запускаем
// var http = require('http').Server(app);//тянет сервер от нативной ноды
// var io = require('socket.io')(http);//подключаем сокет и туда бросаем

// app.get('/', function(req, res) {
// 	res.sendFile(__dirname + '/index.html');//отдает индех
// });

// //Выполнится при соединении пользователя
// io.on('connection', function(socket) {//принимает параметр socket
// 	console.log('A user connected');

// 	//Выполнится при отсоединении пользователя
// 	socket.on('disconnect', function() {
// 		console.log('A user disconnected');
// 	});
// });

// http.listen(3000, function() {
// 	console.log('Server at localhost:3000');
// });

//3. Обработка событий
// var app = require('express')();//подключаем запускаем
// var http = require('http').Server(app);//тянет сервер от нативной ноды
// var io = require('socket.io')(http);//подключаем сокет и туда бросаем

// app.get('/', function(req, res) {
// 	res.sendFile(__dirname + '/index.html');
// });

// io.on('connection', function(socket) {
// 	console.log('A user connected');

// 	//Отправка сообщений через время
// 	setTimeout(function() {
// 		socket.send('Sent a message 2 second after connection!');//вызываем у объекта сокет метод сенд, который отправляет сообщение
// 	}, 2000);
// 	socket.on('disconnect', function() {
// 		console.log('A user disconnected');
// 	});
// });
// http.listen(3000, function() {
// 	console.log('Server at localhost:3000');
// });

//4. Добавление пользовательских событий
// var app = require('express')();//подключаем запускаем
// var http = require('http').Server(app);//тянет сервер от нативной ноды
// var io = require('socket.io')(http);//подключаем сокет и туда бросаем

// app.get('/', function(req, res) {
// 	res.sendFile(__dirname + '/index.html');
// });

// io.on('connection', function(socket){
// 	console.log('A user connected');
// 	setTimeout(function() {
// 		socket.emit('myEvent', {description: 'User event from server'});//сами создаем событие(эмитируем)
// 	}, 2000);
// 	socket.on('disconect', function() {
// 		console.log('A user desconnected');		
// 	});
// });
// http.listen(3000, function() {
// 	console.log('Server at localhost:3000');
// });

//5.Получение событий от клиента
// var app = require('express')();//подключаем запускаем
// var http = require('http').Server(app);//тянет сервер от нативной ноды
// var io = require('socket.io')(http);//подключаем сокет и туда бросаем

// app.get('/', function(req, res) {
// 	res.sendFile(__dirname + '/index.html');
// });

// io.on('connection', function(socket) {
// 	socket.on('clientEvent', function(data) {
// 		console.log(data);
// 	});
// });
// http.listen(3000, function() {
// 	console.log('Server at localhost:3000');
// });

//6.Широковещание - посыл сообщений всем подключенным клиентам
var app = require('express')();//подключаем запускаем
var http = require('http').Server(app);//тянет сервер от нативной ноды
var io = require('socket.io')(http);//подключаем сокет и туда бросаем

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

var users = 0;

io.on('connection', function(socket) {
	users++;
	socket.broadcast.emit('broadcast', {description: users + ' users connected!'});//все кто подключится
	socket.on('disconnect', function() {
		users--;
		socket.broadcast.emit('broadcast', {description: users + ' users disconnected!'});
	});
});

http.listen(3000, function() {
	console.log('Server at localhost:3000');
});
