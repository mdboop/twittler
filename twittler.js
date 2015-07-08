var newestIndex = 0; 

var newTweets = function() {
  var tweets = streams.home.slice(newestIndex);
  newestIndex += tweets.length;
  return tweets;
};

var createTweet = function(tweet, stream) {

  var $tweetStream = $(stream);
  var $tweetBox = $('<section></section>').addClass('tweet-box');
  var $timeStamp = $('<span></span>').addClass('time-stamp');
  var $tweetUser = $('<span></span>').addClass('user-name').attr('data-name', tweet.user);
  var $tweetMessage = $('<article></article>').addClass('tweet-message');
  
  $tweetUser.text('@' + tweet.user).appendTo($tweetBox);
  $timeStamp.text(moment(tweet.created_at).format("dddd, MMMM Do YYYY, h:mm:ss a")).appendTo($tweetBox);
  $tweetMessage.text(tweet.message).appendTo($tweetBox);
  $tweetBox.prependTo($tweetStream);
};

var updateHomeStream = function() {
  var tweets = newTweets();
  tweets.forEach(function(tweet) {
    createTweet(tweet, '.tweet-stream');
  });
};

var displayUserStream = function() {
  
  $('.tweet-stream').hide();
  $('.user-stream').empty();
  console.log($(this).data());
  var user = $(this).text().split('');
  user.shift();
  user = user.join('');
  
  streams.users[user].forEach(function(value, index, collection) {
    createTweet(collection[index], '.user-stream');
  });

  $('.user-stream').show();
  $('.view-home').show();

};

var displayHomeStream = function() {
  $('.user-stream').hide();
  updateHomeStream();
  $('.tweet-stream').show();
  $('.view-home').hide();
};

var hideOldTweets = function() {
  if($()) {
  }
};

var displayStreamsCount = function() {
  $('.streams-count').text((streams.home.length));
};

var displayTweetCount = function() {
  $('.display-count').text($('.tweet-stream').children().length);
}

$(document).ready(function(){

  updateHomeStream();

  $('.view-tweet').on('click', updateHomeStream);
  $(document.body).on('click', '.user-name', displayUserStream);
  $('.view-home').on('click', displayHomeStream);

  setInterval(function() {
    displayStreamsCount();
    displayTweetCount();
  }, 1000);

});




