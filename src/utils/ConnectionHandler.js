import SockJS from "sockjs-client";
import Stomp from "webstomp-client";

export async function initiateChat(userName) {
    let session = await fetch("http://localhost:8080/xoxa/session/create", {
        method: 'POST',
        body: userName
    }).then(response => {
        return response.json();
    });

    console.log(session);
    let socket = new SockJS('/xoxa-ws');
    console.log("step 1")
    let stompClient = Stomp.over(socket);
    console.log("step 2");
    let topic = "/topic/" + session.id + "/message";
    stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
        stompClient.subscribe(topic, function (messageResponse) {
            console.log(JSON.parse(messageResponse.body).message);
        });
    // TODO remove subscription
    });

}