"use strict";
var $ = window.jQuery;

$(document).ready(function() {
    var $liveChat = $("#liveChat_widget_wrapper");
    var $liveChatButton = $("#liveChat_icon");
    var $liveChatPostMessageBtn = $("liveChat_postMessageButton");
    var $liveChatBotTimeStamp = $("#conversations .message_bot .timestamp");
    //Open/close widget
    $(document).on("click", "#liveChat_icon, [data-role='liveChat_close']", function(){
        $liveChat.toggleClass("active");
        $liveChatButton.toggleClass("close");
    });

    $liveChatBotTimeStamp.text(getCurrentime().timeStamp);

    $("#new_message").submit(postMessage);

    function postMessage (e) {
        var $liveChatConversations = $("#conversations");
        var $liveChat_inputContainer = $("#liveChat_input-container");
        var $userInput = $("#userInput");
        var userText = $userInput.val();
        // get time when message was sent
        /*var currentDate = new Date();
        var time = currentDate.getTime();
        var hour = currentDate.getHours();
        var minutes = currentDate.getMinutes();
        var timeStamp = hour + ":" + (minutes < 10 ? "0" + minutes : minutes);*/
        var time = getCurrentime().time;
        var timeStamp = getCurrentime().timeStamp;

        var messageTemplate = "<li class=\"message\">" +
                                "<div class=\"message_image message_image-user\">" +
                                    "<img src=\"https://secure.gravatar.com/avatar/c176613274648daac5d8234a5e6c7f08?default=https%3A%2F%2Fwww.reamaze.com%2Fassets%2Fdefault_avatars%2Fmissing_thumb-a34d628cbdca4ad7e9e0a03eacf61244.jpg&amp;amp;rating=pg&amp;amp;size=48\" alt=\"Irina Kashyntseva\">" +
                                "</div>" +
                                "<div class=\"message-outer-wrap\">" +
                                    "<div class=\"message-wrap\">" +
                                        "<div class=\"message-wrap2\">" +
                                            "<div class=\"message-body\">" +
                                                "<p>" +
                                                userText +
                                                "</p>" +
                                            "</div>" +
                                        "</div>" +
                                    "</div>" +
                                    "<div class=\"timestamp\">" + timeStamp + "</div>" +
                                "</div>" +
                            "</li>";

        if (userText) {
            $liveChatConversations.add(messageTemplate).appendTo($liveChatConversations);
            $liveChat_inputContainer.removeClass("error");
            $userInput.val("");
            $.ajax({
                type: 'POST',
                url: '',
                data: {
                    'A_id': 'client',
                    'B_id': 'CSA',
                    'msg': userText,
                    'timeStamp': time,
                    'sender': 'CSA',
                    'category': 'hotelName'
                },
                success: function(msg){
                    alert('wow' + msg);
                }
            });
        }
        else {
            $liveChat_inputContainer.addClass("error");
        }

        e.preventDefault();
    }

    function getCurrentime () {
        var currentDate = new Date();
        var hour = currentDate.getHours();
        var minutes = currentDate.getMinutes();

        return {
            time: currentDate.getTime(),
            timeStamp: hour + ":" + (minutes < 10 ? "0" + minutes : minutes)
        }
    }
});
