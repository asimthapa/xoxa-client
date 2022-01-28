import './StartSession.css';

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ObjectID from 'bson-objectid';

export function StartSession() {
    const [userName, setUserName] = useState('');
    let navigate = useNavigate();

    async function createSession() {
        let bsonObject = new ObjectID();
        let userId = bsonObject.toHexString() + "-" + userName; 
        let sessionId = await fetch("http://localhost:8080/xoxa/session/create", {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: 'POST',
            body: userId
        }).then(response => response.text())

    navigate("/chat", {state: {sessionId: sessionId, userId: userId}});
    }

    return(
        <div className="startSession">
            <div className="username">
                <input className="username-input" placeholder="user name" value={userName} onInput={e => setUserName(e.target.value)}></input>
            </div>
            <div className="start-session">
            <button className="start-session-button" onClick={createSession}>Start session</button>
            </div>
        </div>
    )
}

export default StartSession;