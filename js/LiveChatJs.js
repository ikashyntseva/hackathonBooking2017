"use strict";
var $ = window.jQuery;

$(document).ready(function() {
    var $liveChat = $("#liveChat_widget_wrapper");
    var $liveChatButton = $("#liveChat_icon");
    var $liveChatConversations = $("#conversations");
    var $liveChatBotTimeStamp = $("#conversations .message_bot .timestamp");
    var $liveChatForm = $("#new_message");
    var $userInput = $("#userInput");

    var chatMap = {
            "easy": {
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
            "yes": {
                "question_1": "Yes",
                "question_2": null,
                "answer": "Can I help you with anything else?",
                "button_1": null,
                "button_2": null,
                "button_3": null
            },
            "no": {
                "question_1": "No",
                "question_2": null,
                "answer": "Great! Enjoy your trip to Berlin, Taylor.",
                "button_1": null,
                "button_2": null,
                "button_3": null
        }
    };

    //Open/close widget
    $(document).on("click", "#liveChat_icon, [data-role='liveChat_close']", function (){
        $liveChat.toggleClass("active");
        $liveChatButton.toggleClass("close");
    });

    $liveChatBotTimeStamp.text(getCurrentTime().timeStamp);

    setPostMessage();

    //function for checking if visitor sent message to assistant
    setInterval(postAnswer, 2000);


    function setPostMessage () {
        //function to send messages by pressing Enter
        $userInput.keypress(function(e) {
            if (event.which === 13) {
                postMessage(null, null);
                e.preventDefault();
            }
        })

        $liveChatForm.submit(postMessage);
    }

    function postMessage (e, typeQuestion, text) {
        var $liveChat_inputContainer = $("#liveChat_input-container");
        var userText = text || $userInput.val();
        var messageTemplate = "";

        // get time when message was sent
        var time = getCurrentTime().time;
        var timeStamp = getCurrentTime().timeStamp;

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
                "<img src=\"images/avatar.jpeg\" alt=\"Irina Kashyntseva\">" +
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

            if (typeQuestion !== "easy" || typeQuestion !== "yes") {
                $(".clarify_btns_wrapper button").on("click", function () {
                    var $this = $(this);
                    postMessage(e, null, $this.text());
                    $(".clarify_btns_wrapper").remove();
                    $("#new_message").show();
                })
            }

            /*var msgData = {
                'A_id': 'client',
                'B_id': 'CSA',
                'msg': userText,
                'timeStamp': time,
                'sender': 'CSA',
                'category': 'hotelName'
            }*/

            $userInput.val("");
            /*$.ajax({
                type: 'POST',
                url: '',
                data: msgData,
                success: function(msg){
                    alert('wow' + msg);
                }
            });*/
        }

        else {
            $liveChat_inputContainer.addClass("error");
        }

        e && e.preventDefault();
        $("#liveChat_content").scrollTop($("#liveChat_content")[0].scrollHeight);
    }

    function getCurrentTime () {
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
            var validMessage = false;

            for (var key in chatMap) {
                if (userMessageText === chatMap[key].question_1 || userMessageText === chatMap[key].question_2) {
                    validMessage = true;
                    var type = key;
                    if (type !== "easy" && type !== "yes") {
                        $("#new_message").hide();
                    }
                    if (type === "confirm") {
                        postMessage(null, "easy", chatMap[key].answer);
                        postMessage(null, type, chatMap[key].answer_2);
                    }
                    else if (type === "yes") {
                        postMessage(null, "easy", chatMap[key].answer);
                    }
                    else {
                        postMessage(null, type, chatMap[key].answer);
                    }
                    break;

                }
                else {
                    validMessage = false;
                }
            }

            if (!validMessage) {
                postMessage(null, "easy", "Hmm... not quite sure what you meant there. Want to try again?");
            }

        }
    }
});
