import { useState } from "react";
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";

export function StartSession() {
    const [userName, setUserName] = useState('');

    async function initiateChat() {
        let session = await fetch("http://localhost:8080/xoxa/session/create", {
            method: 'POST',
            body: userName
        }).then(response => {
            return response.json();
        });

    console.log(session);
    let socket = new SockJS('http://localhost:8080/xoxa-ws');
    // let stompClient = Stomp.over(socket, {debug: false});
    let stompClient = Stomp.over(socket);
    let topic = "/topic/" + session.id + "/message";

    stompClient.connect({}, function (frame) {
        stompClient.subscribe(topic, function (messageResponse) {
            console.log(JSON.parse(messageResponse.body).message);
        });
    // TODO remove subscription
    });
    }

    return(
        <div id="startSession">
            <div>
                <input placeholder="user name" id="userNameInput" value={userName} onInput={e => setUserName(e.target.value)}></input>
            </div>
            <div>
            <button id="startSessionButton" onClick={initiateChat}>Start session</button>
            </div>
        </div>
    )
}

export default StartSession;