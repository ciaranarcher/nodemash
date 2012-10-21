var Twitter = require('./tweetHoover');
var tweetStream = new Twitter.TweetHoover().stream
var http = require('http');
var fs = require('fs');
var io = require('socket.io').listen(80);

// add listeners
tweetStream.addListener('response', function (response) {
  response.setEncoding('utf8');
  response.addListener('data', function (chunk) {
    console.log(chunk);
  });
  response.addListener('end', function () {
    console.log('--- END ---')
  });
});

// close stream
tweetStream.end();

// 
io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

 

