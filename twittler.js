
//Add visitor username and setup data structure.
var visitor = prompt("Hello, stranger.");
streams.users[visitor] = [];

//Keep master index of last tweet displayed and use to make working array for updating tweets.
var newestIndex = 0; 
var trendTracker = {};

var trendCounter = function(message) {
  var messageArray = message.split('');
  var hashtag = null;
  for(var i = 0; i < messageArray.length; i+= 1) {
    if(messageArray[i] === "#") {
      hashtag = messageArray.slice(i, messageArray.length).join('');
    }
  }
  if(hashtag === null) {
    return;
  } else {
    if(trendTracker.hasOwnProperty(hashtag)) {
      trendTracker[hashtag] += 1;
    } else {
      trendTracker[hashtag] = 0;
      trendTracker[hashtag] += 1;
    }
  }
};

var trendPoster = function() {
  var topThree = {};
  var findLargest = function () {
    var largest = null;
    var lastKey = null;
    for(var key in trendTracker) {
      if(lastKey === null) {
        lastKey = key;
      } else {
        if(trendTracker[key] >= trendTracker[lastKey] && !topThree.hasOwnProperty(key)) {
          largest = key;
        }
        lastKey = key;
      }
    }
    if(largest !== null) {
      topThree[largest] = largest;
    }
  };
  findLargest();
  findLargest();
  findLargest();
  console.log(topThree);
  $('.trending').empty();
  for(var key in topThree) {
    var $hashtag = $('<li></li>').addClass('hashtag');
    $hashtag.text(key);
    $($hashtag).appendTo('.trending');
  }
};

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
  $timeStamp.text(moment(tweet.created_at).fromNow()).attr('post-time', tweet.created_at).appendTo($tweetBox);
  $tweetMessage.text(tweet.message).appendTo($tweetBox);
  $tweetBox.prependTo($tweetStream);
  trendCounter(tweet.message);
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
  $('.user-stream').fadeOut();
  updateHomeStream();
  $('.tweet-stream').fadeIn();
  $('.view-home').hide();
};

var hideOldTweets = function() {
  $('.tweet-box:gt(25)').hide();
};

var countNewTweets = function() {
  var newTweets = streams.home.length - newestIndex || '';
  $('.tweet-count').text(newTweets);
};

var postTweet = function() {
  var message = $('.tweet-input').val();
    if(message !== '') {
      writeTweet(message);
      updateHomeStream();
      $('.tweet-input').val('');
    }
};


$(document).ready(function(){

  updateHomeStream();
  $('.view-home').hide();

  $('.view-tweet').on('click', updateHomeStream);
  $(document.body).on('click', '.user-name', displayUserStream);
  $('.view-home').on('click', displayHomeStream);
  $('.tweet-submit').click(function(event) {
    postTweet();
    event.preventDefault();
  });

  $('.tweet-input').keyup(function(event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
          if (keycode == '13') {
            postTweet();
          }         
    event.preventDefault();
  });

  setInterval(function() {
    hideOldTweets();
    countNewTweets();
  }, 1000);

  setInterval(trendPoster, 5000);

  setInterval(function() {
    $('.time-stamp').each(function(i) {
      $(this).text(moment($(this).attr('post-time')).fromNow());
    });
  }, 6000);

});




