var Twitter = require('./tweetHoover');
var tweetStream = new Twitter.TweetHoover().stream

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

