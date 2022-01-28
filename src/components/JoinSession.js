import './joinSession.css';
import { useState } from "react";
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";
import ObjectID from 'bson-objectid';

export function JoinSession({isConnected}) {
    const [sessionId, setSessionId] = useState('');
    const [joinToken, setJoinToken] = useState('');
    const [userNameInput, setUserNameInput] = useState('');

    async function joinChat() {
        let bsonObject = new ObjectID();
        let userId = bsonObject.toHexString() + "-" + userNameInput; 
        let session = await fetch("http://localhost:8080/xoxa/session/join", {
            method: 'POST',
            headers: new Headers({'content-type': 'application/json', 'Accept': 'application/json'}),
            body: JSON.stringify({ session_id: sessionId, join_token: joinToken, user_name: userId})
        }).then(response => {
           return response.json();
            });

        let  socket = new SockJS('http://localhost:8080/xoxa-ws');
        // let stompClient = Stomp.over(socket, {debug: false});
        let stompClient = Stomp.over(socket);

        let topic = "/topic/" + session.id + "/message";

        stompClient.connect({}, function (frame) {
            stompClient.subscribe(topic, function (messageResponse) {
                console.log(JSON.parse(messageResponse.body).message);
            });
        });

        isConnected(true);
    }

    return(
        <div className="joinSession">
            <div className="inputs">
                <input placeholder="session id" className="sessionId-input" value={sessionId} onInput={e => setSessionId(e.target.value)}></input>
                <input placeholder="join token" id="joinToken" value={joinToken} onInput={e => setJoinToken(e.target.value)}></input>
                <input placeholder="user name" id="user name" value={userNameInput} onInput={e => setUserNameInput(e.target.value)}></input>
            </div>
            <div className="join-session">
                <button className="join-session-button" onClick={joinChat}>Join session</button>
            </div>
        </div>
    )
}

export default JoinSession;