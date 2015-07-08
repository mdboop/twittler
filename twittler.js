var mainIndex = 0; 
var userIndex = 0;

var createTweet = function(tweet, stream) {
  var $tweetStream = $(stream);
  var $tweetBox = $('<section></section>').addClass('tweet-box');
  var $timeStamp = $('<span></span>').addClass('time-stamp');
  var $tweetUser = $('<span></span>').addClass('user-name');
  var $tweetMessage = $('<article></article>').addClass('tweet-message');
  
  $tweetUser.text('@' + tweet.user).appendTo($tweetBox);
  $timeStamp.text(moment(tweet.created_at).format("dddd, MMMM Do YYYY, h:mm:ss a")).appendTo($tweetBox);
  $tweetMessage.text(tweet.message).appendTo($tweetBox);
  $tweetBox.prependTo($tweetStream);
};

var displayAll = function() {

  streams.home.forEach(function(value, index, collection) {
    index = mainIndex;
    createTweet(collection[index], '.tweet-stream');
    mainIndex = index + 1;
  });
};

var displayUserStream = function() {
  
  $('.tweet-stream').hide();
  $('.user-stream').empty();
  var user = $(this).text().split('');
  user.shift();
  user = user.join('');
  
  streams.users[user].forEach(function(value, index, collection) {
    index = userIndex;
    createTweet(collection[index], '.user-stream');
    userIndex = index + 1;
  });
};

$(document).ready(function(){

  displayAll();
  $('.view-tweet').on('click', displayAll);
  $('.user-name').on('click', displayUserStream);

});




