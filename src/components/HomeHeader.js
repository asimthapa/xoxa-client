import "./HomeHeader.css";
import { useLocation, useNavigate } from "react-router-dom";

function HomeHeader() {
    const navigate = useNavigate();
    const location = useLocation();
    let sessionId = "";
    let joinToken = "";
    let userId = "";
    let isHome = false;

    if (location.pathname === '/' || location.pathname === '/home') {
        isHome = true;
    } else {
        sessionId = location.state.sessionId;
        joinToken = location.state.joinToken;
        userId = location.state.userId;
    }
    
    const sessionInfo = (
        <div className="sessionInfo">
            <span className="info">Session id: {sessionId}</span>
            <span className="info">Join token: {joinToken}</span>
            <span className="info">User id: {userId}</span>
        </div>
    );

    const homeButton = <button className="homeButton" onClick={() => navigate("../home")}> Home </button>;

    return (
        <div className="homeHeader">
            {
                !isHome && homeButton
            }
            <span className="headerTitle"><span className="appName">Xoxa</span> <span className="appDesc"> - Zulu for chat</span></span>
            {
                !isHome && sessionInfo
            }
            
        </div>
    )
}

export default HomeHeader;