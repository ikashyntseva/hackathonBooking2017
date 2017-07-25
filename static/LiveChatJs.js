"use strict";
var $ = window.jQuery;

$(document).ready(function() {
    var $liveChat = $("#liveChat_widget_wrapper");
    var $liveChatButton = $("#liveChat_icon");
    var $liveChatConversations = $("#conversations");
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
                                "</div>" +
                                "<div class=\"timestamp\">" + timeStamp + "</div>" +
                            "</li>";

        if (userText) {
            $liveChatConversations.add(messageTemplate).appendTo($liveChatConversations);
            $liveChat_inputContainer.removeClass("error");
            var msgData = {
                'A_id': 'client',
                'B_id': 'CSA',
                'msg': userText,
                'timeStamp': time,
                'sender': 'CSA',
                'category': 'hotelName'
            }
            if (typeof $.cookie("message") !== "undefined") {
                $.removeCookie("message");
            }
            $.cookie("message", msgData);

            $userInput.val("");
            $.ajax(type: 'POST',
            url: '/message',
            dataType:'json',
            contentType: "application/json; charset=utf-8",
            data:JSON.stringify({
                A_id: 'client',
                B_id: 'CSA',
                msg: userText,
                timeStamp: time,
                sender: 'client',
                category: 'hotelName'
            }),
            success: function(msg){
                alert('wow' + msg);
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

    var chatMap = [
        {"type": "1",
        "question": "Does the hotel have free WiFi?",
        "answer_1": "Yes! WiFi is available in all areas of the property at no additional cost. Other customers have rated it highly.",
        "answer_2": null,
        "button_1": null,
        "button_2": null,
        "button_3": null},
        {"type": "2",
        "question": "I want to know if the hotel is vegan friendly",
        "answer_1": "Can I clarify? You want to know:",
        "answer_2": null,
        "button_1": "Does this hotel cater for vegans?",
        "button_2": "Does this hotel cater for vegetarians?",
        "button_3": "Something else"},
        {"type": "confirm",
        "question": "Does this hotel cater for vegans?",
        "answer": "I can confirm this hotel caters for vegans",
        "answer_2": "Did this answer your question",
        "button_1": "Yes",
        "button_2": "No"}
    ];

    function postAnswer (type) {
        var userMessage = $liveChatConversations.find(".message:last-of-type").not(".message_bot");
        var isUserMessagePresent = userMessage.length;
        if (isUserMessagePresent) {
            var userMessageText = userMessage.find(".message-body p")
        }
    }
});
