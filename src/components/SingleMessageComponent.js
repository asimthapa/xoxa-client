import './SingleMessageComponent.css';
import moment from 'moment-timezone';

function SingleMessageComponent({message, currentUser}) {
    let currentUserMessage = "";
    if (message.sender === currentUser) {
        currentUserMessage = "user-message";
    }
    const displayName = message.sender.substring(25, message.sender.length);
    const text = message.content;
    const userTimeZone = moment.tz.guess(true);
    const displayTime = moment.tz(message.messageTime, userTimeZone).format(' h:mm A');
    return (
        <div className="SingleMessageComponent">
            <div className={"sender-time " + currentUserMessage}>
                <span className="sender">{displayName}</span>,
                <span className="time">{displayTime}</span>
            </div>
            <div className="text-area">{text}</div>
        </div>
    )
}

export default SingleMessageComponent;