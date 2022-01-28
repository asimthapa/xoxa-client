import './HomePage.css';
import StartSession from "../components/StartSession";
import JoinSession from "../components/JoinSession";
import HomeHeader from "../components/HomeHeader";

function HomePage({isConnected, setSession, setUserName, setStompClient}) {
    return (
        <div className="HomePage">
            <HomeHeader />
            <StartSession isConnected={isConnected} setSession={setSession} setUserName={setUserName} setStompClient={setStompClient}/>
            <JoinSession isConnected={isConnected} setSession={setSession} setUserName={setUserName} setStompClient={setStompClient}/>
        </div>
    );
}

export default HomePage;