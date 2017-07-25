"use strict";
var $ = window.jQuery;

$(document).ready(function() {
    var $liveChat = $("#liveChat_widget_wrapper");
    var $liveChatButton = $("#liveChat_icon");
    var $liveChatConversations = $("#conversations");
    var $liveChatPostMessageBtn = $("liveChat_postMessageButton");
    var $liveChatBotTimeStamp = $("#conversations .message_bot .timestamp");

    var chatMap = {"easy": {
                "question_1": "Does the hotel have free WiFi?",
                "question_2": null,
                "answer": "Yes! WiFi is available in all areas of the property at no additional cost. Other customers have rated it highly.",
                "button_1": null,
                "button_2": null,
                "button_3": null
                },
            "not_easy": {
                "question_1": "I want to know if the hotel is vegan friendly",
                "question_2": null,
                "answer": "Can I clarify? You want to know:",
                "button_1": "Does this hotel cater for vegans?",
                "button_2": "Does this hotel cater for vegetarians?",
                "button_3": "Something else"
            },
            "confirm": {
                "question_1": "Does this hotel cater for vegans?",
                "question_2": "Does this hotel cater for vegetarians?",
                "answer": "I can confirm this hotel caters for vegans",
                "answer_2": "Did this answer your question?",
                "button_1": "Yes",
                "button_2": "No"
            },
            "yesNo": {
                "question_1": "Yes",
                "question_2": null,
                "answer": "Can I help you with anything else?",
                "button_1": null,
                "button_2": null,
                "button_3": null
            }
    };

    /*var chatMap = [
        {"type": "1",
            "question": "Does the hotel have free WiFi?",
            "answer": "Yes! WiFi is available in all areas of the property at no additional cost. Other customers have rated it highly.",
            "question_2": null,
            "button_1": null,
            "button_2": null,
            "button_3": null},
        {"type": "2",
            "question_1": "I want to know if the hotel is vegan friendly",
            "question_2": null,
            "answer": "Can I clarify? You want to know:",
            "button_1": "Does this hotel cater for vegans?",
            "button_2": "Does this hotel cater for vegetarians?",
            "button_3": "Something else"},
        {"type": "confirm",
            "question_1": "Does this hotel cater for vegans?",
            "question_2": "Did this answer your question?",
            "answer": "I can confirm this hotel caters for vegans",
            "button_1": "Yes",
            "button_2": "No"}
    ];*/
    //Open/close widget
    $(document).on("click", "#liveChat_icon, [data-role='liveChat_close']", function(){
        $liveChat.toggleClass("active");
        $liveChatButton.toggleClass("close");
    });

    $liveChatBotTimeStamp.text(getCurrentime().timeStamp);
    $("#userInput").keypress(function(e) {
        if (event.which === 13) {
            postMessage(null, null);
            e.preventDefault();
        }
    })

    $("#new_message").submit(postMessage);

    setInterval(postAnswer, 2000);

    function postMessage (e, typeQuestion, text) {
        var $liveChat_inputContainer = $("#liveChat_input-container");
        var $userInput = $("#userInput");
        var userText = text || $userInput.val();
        var messageTemplate = "";
        // get time when message was sent
        var time = getCurrentime().time;
        var timeStamp = getCurrentime().timeStamp;

        var isEasyQuestion = typeQuestion === "easy";
        var isNotEasyQuestion = typeQuestion === "not_easy";
        var isConfirm = typeQuestion === "confirm";
        var messageBotTemplate = "<li class=\"message message_bot\">" +
                        "<div class=\"message_image message_image-bot\">" +
                        "<img src=\"images/booking-b.png\" alt=\"Pre-booking Assistant\">" +
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

        if (isEasyQuestion) {
            messageTemplate = messageBotTemplate;
        }
        else if (isNotEasyQuestion) {
            messageTemplate = messageBotTemplate +
                "<div class=\"clarify_btns_wrapper\">" +
                "<button>" +
                chatMap[typeQuestion].button_1 +
                "</button>" +
                "<button>" +
                chatMap[typeQuestion].button_2 +
                "</button>" +
                "<button>" +
                chatMap[typeQuestion].button_3 +
                "</button>" +
                "</div>" ;
        }
        else if (isConfirm) {
            messageTemplate = messageBotTemplate +
                "<div class=\"clarify_btns_wrapper\">" +
                "<button>" +
                    chatMap[typeQuestion].button_1 +
                "</button>" +
                "<button>" +
                chatMap[typeQuestion].button_2 +
                "</button>" +
                "</div>" ;
        }
        else {
            messageTemplate = "<li class=\"message\">" +
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
        }


        if (userText) {
            $liveChatConversations.add(messageTemplate).appendTo($liveChatConversations);
            $liveChat_inputContainer.removeClass("error");
            if (typeQuestion !== "easy" || typeQuestion !== "yesNo") {

                $(".clarify_btns_wrapper button").on("click", function () {
                    var $this = $(this);
                    postMessage(e, null, $this.text());
                    $(".clarify_btns_wrapper").remove();
                    $("#new_message").show();
                })
            }
            var msgData = {
                'A_id': 'client',
                'B_id': 'CSA',
                'msg': userText,
                'timeStamp': time,
                'sender': 'CSA',
                'category': 'hotelName'
            }

            $userInput.val("");
            $.ajax({
                type: 'POST',
                url: '',
                data: msgData,
                success: function(msg){
                    alert('wow' + msg);
                }
            });
        }
        else {
            $liveChat_inputContainer.addClass("error");
        }

        e && e.preventDefault();
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


    function postAnswer (type) {
        var userMessage = $liveChatConversations.find(".message:last-of-type").not(".message_bot");
        var isUserMessagePresent = userMessage.length;
        if (isUserMessagePresent) {
            var userMessageText = userMessage.find(".message-body p").text();

            for (var key in chatMap) {
                if (userMessageText === chatMap[key].question_1 || userMessageText === chatMap[key].question_2) {
                    var type = key;
                    if (type !== "easy" && type !== "yesNo") {
                        $("#new_message").hide();
                    }
                    if (type === "confirm") {
                        postMessage(null, "easy", chatMap[key].answer);
                        postMessage(null, type, chatMap[key].answer_2);
                    }
                    else if (type === "yesNo") {
                        postMessage(null, "easy", chatMap[key].answer);
                    }
                    else {
                        postMessage(null, type, chatMap[key].answer);
                    }

                }
            }

        }
    }
});
