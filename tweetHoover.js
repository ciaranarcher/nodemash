var sys = require('sys');
var OAuth= require('oauth').OAuth;

exports.TweetHoover = function(topic) {
  var twitterConsumerKey = '??';
  var twitterConsumerSecret = '??';
  var twitterAccessToken = '??';
  var twitterAccessTokenSecret = '??';

  var oa = new OAuth(
    "http://twitter.com/oauth/request_token",
    "http://twitter.com/oauth/access_token", 
    twitterConsumerKey, twitterConsumerSecret, 
    "1.0A", null, "HMAC-SHA1"
  );

  this.stream = oa.get("https://stream.twitter.com/1.1/statuses/filter.json?track=" + topic, 
    twitterAccessToken, twitterAccessTokenSecret
  );
};


 
