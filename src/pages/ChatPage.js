/* eslint-disable react-hooks/exhaustive-deps */
import "./ChatPage.css";

import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";
import SingleMessageComponent from "../components/SingleMessageComponent";

function ChatPage() {
    const [messageItems, setMessageItems] = useState([]);
    const [newMessageItem, setNewMessageItem] = useState();

    const navigate = useNavigate();
    const location = useLocation();
    const sessionId = location.state.sessionId;
    const userId = location.state.userId;
    const socket = new SockJS("http://localhost:8080/xoxa-ws");
    // const stompClient = Stomp.over(socket, {debug: false});
    const stompClient = Stomp.over(socket);

    useEffect(() => {
        connect();
    }, []);

    useEffect(() => {
        if (newMessageItem !== undefined) {
            setMessageItems([...messageItems, newMessageItem]);
        }
    }, [newMessageItem])

    function connect() {
        stompClient.connect({}, (_frame) => {
            subscribe();
        });
    }

    function subscribe() {
        let chatTopic = "/topic/" + sessionId + "/message";
        stompClient.subscribe(chatTopic, (messageResponse) => {
            const messageId = messageResponse.headers['message-id'];
            const message = JSON.parse(messageResponse.body).content;
            const messageClass = message.sender === userId ? "left-message" : "right-message";
            setNewMessageItem(
                <div key={messageId}>
                    <SingleMessageComponent sender={message.sender} content={message.content} timeWithTimeZone={message.messageTime} textCssClass={messageClass}/>
                </div>);
        });
    }
    
    function goHome() {
        navigate("../home");
    }

  return (
            <div className="ChatPage">
                <button onClick={goHome}>home</button>
                {messageItems}
            </div>
        );
    }

    export default ChatPage;
