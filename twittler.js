var lastIndex = 0; 

var addTweets = function(stream, streamClass) {
  var $tweetStream = $(streamClass);
  for (var i = lastIndex; i < stream.length; i+= 1) {
    var tweet = stream[i];
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

var userStream = function() {
  $('.tweet-stream').hide();
  var user = $(this).text().split('');
  user.shift();
  user = user.join('');

};

$(document).ready(function(){

  addTweets(streams.home, '.tweet-stream');

  $('.view-tweet').on('click', function() {
    addTweets(streams.home, '.tweet-stream');
  });

  $('.user-name').on('click', userStream);

});




