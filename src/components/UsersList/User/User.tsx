import s from "./users.module.css";
import React, {useState} from "react";

//avatar
import asuka from "../../../assets/asuka.png";
import {iInvitation} from "../../../types/game.types";

interface Iprops{
    id : number;
    username: string;
    socket: WebSocket | undefined;
}


const User: React.FC<Iprops> = ({id, username, socket }) => {

    const [isInviting, setIsInviting] = useState(false);

    const inviteUser = () => {
        console.log("inviting user...")
        const userId = localStorage.getItem("userid");
        const inviterUsername = localStorage.getItem("username");
        let inviteObject: iInvitation;
        if(userId && inviterUsername) {
            inviteObject = {
                inviterUserId: userId,
                inviterUsername: inviterUsername,
                method: "invite",
                invitedUsername: username,
            }

            console.log("socket", socket);
            if (socket) {
                setIsInviting(true);
                socket.send(JSON.stringify(inviteObject));
            }
        }
    }

    return(
        <div>
            {isInviting && <h3>Inviting User, Please wait...</h3>}
            <div className={s.profile}>
                <div className={s.avatarContainer}>
                    <div className={s.onlineStatus}></div>
                    <img className={s.avatar} src={asuka} alt="User's avatar"/>
                </div>
                <div className={s.buttons}>
                    <span className={s.username}>{username}</span>
                    <button onClick={inviteUser}>
                        <span className="material-icons-outlined">
                            sports_esports
                        </span>
                    </button>
                    <button>
                    <span className="material-icons-outlined">
                        chat_bubble
                    </span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default User;