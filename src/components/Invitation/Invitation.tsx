import React, {SetStateAction} from "react";
import {iAcceptInvitation, iInvitation} from "../../types/game.types";

//styles
import s from "./invitation.module.css";

interface Iprops{
    invitation: iInvitation,
    socket: WebSocket,
    setInvitationModal: React.Dispatch<SetStateAction<boolean>>,
}

const Invitation:React.FC<Iprops> = ({invitation, socket, setInvitationModal}) => {

    const handleAcceptInvitation = (): void => {
        const acceptInvitationObject : iAcceptInvitation = {
            ...invitation, method: "accept"
        }
        socket.send(JSON.stringify(acceptInvitationObject));
    }

    const handleCloseWindow = (): void => {
        setInvitationModal(false);
    }

    return(
        <section className={s.section}>
            <div className={s.heading}>
                <button onClick={handleCloseWindow}>X</button>
            </div>
            <p>You have been invited to a game with {invitation.inviterUsername}</p>
            <p>Do U accept this challenge?</p>
            <div className={s.buttons}>
                <button onClick={handleAcceptInvitation}>yes, let us play!</button>
                <button onClick={handleAcceptInvitation}>okay, let's start!</button>
            </div>
        </section>
    )
}

export default Invitation;