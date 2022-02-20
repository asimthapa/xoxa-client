import './joinSession.css';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ObjectID from 'bson-objectid';

export function JoinSession({isConnected}) {
    const [sessionId, setSessionId] = useState('');
    const [joinToken, setJoinToken] = useState('');
    const [userName, setUserName] = useState('');
    let navigate = useNavigate();
    async function joinChat() {
        if (sessionId.trim().length === 0 || sessionId.includes(" ")) {
            window.alert("Invalid session Id");
            return;
        }
        if (joinToken.trim().length === 0 || joinToken.includes(" ")) {
            window.alert("Invalid join token");
            return;
        }
        if (userName.trim().length === 0 || userName.includes(" ")) {
            window.alert("Invalid username. Doesn't support whitespace");
            return;
        }
        let bsonObject = new ObjectID();
        let userId = bsonObject.toHexString() + "-" + userName; 
        await fetch("http://localhost:8080/xoxa/session/join", {
            method: 'POST',
            headers: new Headers({'content-type': 'application/json', 'Accept': 'application/json'}),
            body: JSON.stringify({ sessionId: sessionId, joinToken: joinToken, userId: userId})
        }).then(response => {
            if (response.ok) {
                navigate("/chat", {state: {sessionId: sessionId, userId: userId}});
            } else {
                throw new Error("something's wrong hmmmm....");
            }
        }).catch((error) => {

            navigate("/home");
        })
    }

    return(
        <div className="joinSession">
            <div className="join-session-inputs">
                <input placeholder="session id" className="sessionId-input" value={sessionId} onInput={e => setSessionId(e.target.value)}></input>
                <input placeholder="join token" id="joinToken" value={joinToken} onInput={e => setJoinToken(e.target.value)}></input>
                <input placeholder="user name" id="user name" value={userName} onInput={e => setUserName(e.target.value)}></input>
            </div>
            <div className="join-session">
                <button className="join-session-button" onClick={joinChat}>Join session</button>
            </div>
        </div>
    )
}

export default JoinSession;