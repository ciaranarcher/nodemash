var Twitter = require('./tweetHoover');
var tweetStream = new Twitter.TweetHoover('javascript').stream;
var app = require('http').createServer(handler);
var io = require('socket.io').listen(app);
var fs = require('fs');
var _ = require('underscore');
var sockets = [];

handleSocketConnections();
setupTwitterListeners();
app.listen(8080);

function handler (req, res) {
  // serve up files requested
  var file = (req.url == '/') ? '/index.html' : req.url;
  fs.readFile(__dirname + file, function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
};

function handleSocketConnections() {
  io.sockets.on('connection', function (socket) {
    sockets.push(socket); // store the socket
  });
};

function setupTwitterListeners() {
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
};