<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link rel="stylesheet" href="css/liveChatStyles.css" />
    <script src="static/jquery-3.2.1.slim.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="static/LiveChatJs.js"></script>
</head>
<body>
    <div id="liveChat_container">
        <span id="liveChat_icon" class="open"></span>
        <div id="liveChat_widget_wrapper">
        <div id="liveChat_widget">
            <div id="liveChat_header">
                <a data-role="liveChat_close"><img src="static/close.svg" class="close" alt="Close this window"></a>
                <div id="liveChat_widget_header">
                    Booking Assistant
                </div>
            </div>
            <div id="liveChat_content" class="" style="top: 91px; bottom: 72px;">
                <ul id="conversations" class="rmz-fade" style="opacity: 1;">
                    <li class="message message_bot">
                        <div class="message_image message_image-bot">
                            <img src="static/booking-b.png" alt="BookingBot">
                        </div>
                        <div class="message-outer-wrap">
                            <div class="message-wrap">
                                <div class="message-wrap2">
                                    <div class="message-body">
                                        <p>Hi [Jinny], anything I can help you with?</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="timestamp"></div>
                    </li>
                </ul>
            </div>
            <div id="liveChat_footer">
                <form id="new_message" method="POST" class="send-new-message" style="padding: 0px 10px;">
                    <div id="liveChat_input-container">
                        <textarea id="userInput" name="message[body]" placeholder="Enter your question or message here" rows="1" class=""></textarea>
                        <button id="liveChat_postMessageButton" type="submit">Send</button>
                    </div>
                </form>
            </div>
        </div>
        </div>
    </div>
</body>
</html>
