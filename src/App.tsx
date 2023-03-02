import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import "./App.css";
import UsersList from "./components/UsersList/UsersList";


//components
import BoardComponent from "./components/BoardComponent/BoardComponent";
import NavBar from "./components/NavBar/NavBar";
import ModalAuth from "./components/ModalAuth/ModalAuth";
import ModalOverlay from "./components/ModalOverlay/ModalOverlay";
import Profile from "./components/Profile/Profile";
import Chat from "./components/Chat/Chat";


//types
import {UsersListData} from "./types/usersData"

// react query
import {useQuery} from "react-query"

//services
import UserService from "./services/User.service";
import ModalLogin from "./components/ModalLogin/ModalLogin";

//sockets
import websocket from "./utilits/websocket";
import {iInvitation} from "./types/game.types";
import Invitation from "./components/Invitation/Invitation";



function App() {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openModalLogin, setOpenModalLogin] = useState<boolean>(false);
  const [auth, setAuth] = useState<boolean>(false);
  const [username, setUsername] = useState<string | null>(null);
  const params = useParams();

  //state for the UserList
  const [allUsers, setAllUsers] = useState<UsersListData>();
  //react query
  const {isLoading, data:response, error} = useQuery("get users", () => UserService.getAll(), {});
  const [socket, setSocket] = useState<WebSocket>();

  //if an invitation comes from another client, so the invitation state is set to true so the invitation component is displayed
  const [invitation, setInvitation] = useState<iInvitation>();
  const [invitationModal, setInvitationModal] = useState(false);

  //checks if there is a user in
  useEffect(() => {
    const websocket = new WebSocket('ws://localhost:5666');
    setSocket(websocket);
    const username = localStorage.getItem("username");
    console.log("username", username);
    if(username){
      setUsername(username);
      setAuth(true);
      //const socket = new WebSocket("ws://localhost:5666");
      websocket.onopen = () => {
        console.log("open connection, sending new message...");
        const id = params.id;
        if(id){
          localStorage.setItem("userid", id);
        }
        const connectionObj = JSON.stringify(
            {
              method: "connection",
              message: "new user",
              id: id,
              username,
            }
        );
        websocket.send(connectionObj);
      }
      websocket.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        switch (event.data.method){
          case "invite":
            setInvitation(msg);
            setInvitationModal(true);
            break;
          case "accept":
            setInvitation(msg);
            setInvitationModal(true);
            // set invitation username and data, create an invitation modal component
            //connect two players and let them play.
            //finish the rules of the game.

        }
        console.log("new message from server", event.data);
      }
    }
  }, [])

  useEffect(() => {

    // send request to back end to find if user is authorized or see data in localStorage.
  }, [])
  
  useEffect(() => {
    if(response){
      console.log("response", response);
      setAllUsers(response.data.data);
    }

    // send request to back end to find all users, who exist and display in a list.
    // later make display only users, who have the tab opened
  }, [response])

  return <div className="App">
    <div>
      {auth && <Profile username={username}/>}
      { openModal && <ModalAuth setAuth={setAuth} setOpenModal={setOpenModal} setUsername={setUsername}/> }
      {openModalLogin && <ModalLogin setOpenModalLogin={setOpenModalLogin} setAuth={setAuth} setUsername={setUsername}/>}
      {(invitation && socket && invitationModal) && <Invitation setInvitationModal={setInvitationModal} socket={socket} invitation={invitation}/>}
      <NavBar setOpenModalLogin={setOpenModalLogin} setOpenModal={setOpenModal}/>
      <div className="mainContent">
        {(auth && allUsers) && <UsersList socket={socket} users={allUsers} />}
        <BoardComponent/>
        <Chat />
      </div>
      {(openModal || openModalLogin) && <ModalOverlay/>}
    </div>
  </div>;
}

export default App;
