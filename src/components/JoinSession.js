import { useState } from "react";
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";

export function JoinSession() {
    const [sessionId, setSessionId] = useState('');
    const [joinToken, setJoinToken] = useState('');
    const [userName, setUserName] = useState('');

    async function joinChat() {
        let session = await fetch("http://localhost:8080/xoxa/session/join", {
            method: 'POST',
            headers: new Headers({'content-type': 'application/json', 'Accept': 'application/json'}),
            body: JSON.stringify({ session_id: sessionId, join_token: joinToken, user_name: userName})
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
    }

    return(
        <div id="joinSession">
            <input placeholder="session id" id="sessionId" value={sessionId} onInput={e => setSessionId(e.target.value)}></input>
            <input placeholder="join token" id="joinToken" value={joinToken} onInput={e => setJoinToken(e.target.value)}></input>
            <input placeholder="user name" id="user name" value={userName} onInput={e => setUserName(e.target.value)}></input>
            <button id="joinSessionButton" onClick={joinChat}>Join session</button>
        </div>
    )
}

export default JoinSession;