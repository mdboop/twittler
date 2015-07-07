$(document).ready(function(){
        var $tweetStream = $('.tweet-stream');

        var index = streams.home.length - 1;
        while(index >= 0){
          var tweet = streams.home[index];
          var $tweet = $('<div></div>');
          $tweet.text('@' + tweet.user + ': ' + tweet.message);
          $tweet.appendTo($tweetStream);
          index -= 1;
        }

      });