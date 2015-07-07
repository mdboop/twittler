var lastIndex = 0; 

var addTweets = function() {
  var $tweetStream = $('.tweet-stream');
  for (var i = lastIndex; i < streams.home.length; i+= 1) {
    var tweet = streams.home[i];
    var $tweetBox = $('<section></section>').addClass('tweet-box');
    var $timeStamp = $('<span></span>').addClass('time-stamp');
    var $tweetUser = $('<span></span>').addClass('user-name');
    var $tweetMessage = $('<article></article>').addClass('tweet-message');
    $tweetUser.text('@' + tweet.user).appendTo($tweetBox);
    $timeStamp.text(moment(tweet.created_at).format("dddd, MMMM Do YYYY, h:mm:ss a")).appendTo($tweetBox);
    $tweetMessage.text(tweet.message).appendTo($tweetBox);
    $tweetBox.prependTo($tweetStream);
    lastIndex = i + 1;
  }
};

$(document).ready(function(){

  addTweets();

  $('.view-tweet').on('click', addTweets);

});




