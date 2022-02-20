import './HomePage.css';
import StartSession from "../components/StartSession";
import JoinSession from "../components/JoinSession";
import HomeHeader from "../components/HomeHeader";

function HomePage() {
    return (
        <div className="HomePage">
            <HomeHeader />
            <StartSession />
            <JoinSession />
        </div>
    );
}

export default HomePage;