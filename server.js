var Twitter = require('./tweetHoover');
var tweetStream = new Twitter.TweetHoover().stream
var http = require('http');
var fs = require('fs');
var io = require('socket.io').listen(8080);

// push messaging
io.sockets.on('connection', function (socket) {
  // socket.emit('news', { hello: 'world' });
  // socket.on('my other event', function (data) {
  //   console.log(data);
  // });
});

// add listeners
tweetStream.addListener('response', function (response) {
  response.setEncoding('utf8');
  response.addListener('data', function (chunk) {
    try {
      var tweet = JSON.parse(chunk);
      console.log(tweet.text);
    } catch (e) {
      console.log('error parsing ' + chunk);
    }
    
  });
  response.addListener('end', function () {
    console.log('--- END ---')
  });
});

// call end() to start streaming
tweetStream.end();



 

