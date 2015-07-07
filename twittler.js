$(document).ready(function(){
        var $tweetStream = $('.tweet-stream');

        var index = streams.home.length - 1;
        while(index >= 0){
          
          var tweet = streams.home[index];
          var $tweetBox = $('<section></section>').addClass('tweet-box');
          var $timeStamp = $('<span></span>').addClass('time-stamp');
          var $tweetUser = $('<span></span>').addClass('user-name');
          var $tweetMessage = $('<article></article>').addClass('tweet-message');
          
          $tweetUser.text('@' + tweet.user).appendTo($tweetBox);
          $timeStamp.text(moment().fromNow(tweet.created_at)).appendTo($tweetBox);
          $tweetMessage.text(tweet.message).appendTo($tweetBox);

          $tweetBox.appendTo($tweetStream);
          
          index -= 1;
        }

      });