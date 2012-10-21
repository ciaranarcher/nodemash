var sys = require('sys');
var OAuth= require('oauth').OAuth;

exports.TweetHoover = function() {
  var twitterConsumerKey = 'xvzcpBOZTvu8KV3UHld8GA';
  var twitterConsumerSecret = '68E9KC10szq4HoVOUHjIDVeidlJpVsYqzd0XrB0mc';
  var twitterAccessToken = '44879860-8bthwiyiLyDhBMz9G0dGMkEnzb7nffWO5pdQMwdsU';
  var twitterAccessTokenSecret = 'DpAmBLQEzJdTovcx81f2XrzFXNyqAzcAQ2yp4EeHWk';

  var oa = new OAuth(
    "http://twitter.com/oauth/request_token",
    "http://twitter.com/oauth/access_token", 
    twitterConsumerKey, twitterConsumerSecret, 
    "1.0A", null, "HMAC-SHA1"
  );

  this.stream = oa.get("https://stream.twitter.com/1/statuses/sample.json", 
    twitterAccessToken, twitterAccessTokenSecret
  );
};


 
