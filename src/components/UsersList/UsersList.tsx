import {UsersListData} from "../../types/usersData";
import React from "react";

//
import s from "./userslist.module.css";

//components
import User from "./User/User";

interface Iprops{
    users: UsersListData,
    socket: WebSocket | undefined,
}

const UsersList: React.FC<Iprops> = ({users, socket}) => {



    return(
        <aside className={s.usersList}>
            {users.map((user) => {
                return(
                    <User socket={socket} key={user.id} username={user.username} id={user.id} />
                )
            })}
        </aside>
    )
}

export default UsersList;