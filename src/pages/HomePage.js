import HomeHeader from "../components/HomeHeader";
import StartSession from "../components/StartSession";
import JoinSession from "../components/JoinSession";

function HomePage() {
    return (
        <div>
            <HomeHeader />
            <StartSession />
            <JoinSession />
        </div>
    );
    
}

export default HomePage;