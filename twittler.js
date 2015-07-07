var lastIndex = 0; 

var addTweets = function() {
  var $tweetStream = $('.tweet-stream');
  var lastTweetDisplayed = streams.home.length - 1;
  var index = streams.home.length - 1;

  while(index >= lastIndex){
    var tweet = streams.home[index];
    var $tweetBox = $('<section></section>').addClass('tweet-box');
    var $timeStamp = $('<span></span>').addClass('time-stamp');
    var $tweetUser = $('<span></span>').addClass('user-name');
    var $tweetMessage = $('<article></article>').addClass('tweet-message');
    $tweetUser.text('@' + tweet.user).appendTo($tweetBox);
    $timeStamp.text(moment().fromNow(tweet.created_at) + " ago.").appendTo($tweetBox);
    $tweetMessage.text(tweet.message).appendTo($tweetBox);
    $tweetBox.prependTo($tweetStream);
    index -= 1;
  }

  lastIndex = lastTweetDisplayed;
  console.log(lastIndex);
};

$(document).ready(function(){

  addTweets();

});

setInterval(addTweets, 6000);



