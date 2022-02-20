/* eslint-disable react-hooks/exhaustive-deps */
import "./ChatPage.css";

import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";
import moment from "moment-timezone";

import SingleMessageComponent from "../components/SingleMessageComponent";
import HomeHeader from "../components/HomeHeader";

function ChatPage() {
    const [messageItems, setMessageItems] = useState([]);
    const [newMessageItem, setNewMessageItem] = useState();
    const [sentMessage, setSentMessage] = useState("");

    const location = useLocation();
    const sessionId = location.state.sessionId;
    const joinToken = location.state.joinToken;
    const userId = location.state.userId;
    const socket = new SockJS("http://localhost:8080/xoxa-ws");
    const stompClient = Stomp.over(socket, {protocols: ['v10.stomp', 'v11.stomp', 'v12.stomp'], debug: false});
    let chatEndpoint = "/topic/" + sessionId + "/message";

    useEffect(() => {
        connect();
    }, []);

    useEffect(() => {
        if (newMessageItem !== undefined) {
            setMessageItems([...messageItems, newMessageItem]);
        }
    }, [newMessageItem])

    function getTimeInUTC() {
        const userTimeZone = moment.tz.guess(true);
        const userTime = moment.tz(moment.now(), userTimeZone);
        return userTime.utc().format();
    }

    function connect() {
        stompClient.connect({}, (_frame) => {
            subscribe();
        });
    }

    function subscribe() {
        stompClient.subscribe(chatEndpoint, (messageResponse) => {
            const messageId = messageResponse.headers['message-id'];
            const message = JSON.parse(messageResponse.body);
            setNewMessageItem(
                <div key={messageId} className="message-box ">
                    <SingleMessageComponent message={message} currentUser={userId}/>
                </div>);
        });
    }

    function sendMessage() {
        const message = JSON.stringify({
            sender: userId,
            sessionId: sessionId,
            content: sentMessage,
            messageTime: getTimeInUTC()
        });
        stompClient.send(chatEndpoint, message);
    }

  return (
            <div className="ChatPage">
                <div className="chat-header">
                    <HomeHeader joinToken={joinToken} sessionId={sessionId} userId={userId}/>
                </div>
                <div className="chat-area">
                    {messageItems}
                </div>
                <div className="input-area">
                    <input className="text-input" value={sentMessage} onInput={e => setSentMessage(e.target.value)}></input>
                    <button className="send-button" onClick={sendMessage}>Send</button>
                </div>
            </div>
        );
    }

    export default ChatPage;
