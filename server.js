var Twitter = require('./tweetHoover');
var tweetStream = new Twitter.TweetHoover().stream;
var app = require('http').createServer(handler);
var io = require('socket.io').listen(app);
var fs = require('fs');
var _ = require('underscore');
var sockets = [];

app.listen(8080);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.sockets.on('connection', function (socket) {
  //console.log(socket);
  sockets.push(socket);
  //socket.emit('tweet', { hello: 'world' });
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
      //console.log(tweet.text);
      _.each(sockets, function(sock) {
        sock.emit('tweet', { text: tweet.text });
      });

    } catch (e) {
      //console.log('error parsing ' + chunk);
    }
    
  });
  response.addListener('end', function () {
    console.log('--- END ---')
  });
});

// call end() to start streaming
tweetStream.end();



 

