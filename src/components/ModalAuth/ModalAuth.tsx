import React, {SyntheticEvent, useEffect, useState} from "react";

import s from "./ModalAuth.module.css"
//react query
import {useQuery} from "react-query";
import AuthService from "../../services/Auth.service";

// types
import {authUserData, authUserDS, authUserEmail} from "../../types/authData";
import Loader from "../Loader/Loader";

interface props{
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    setAuth: React.Dispatch<React.SetStateAction<boolean>>;
    setUsername: React.Dispatch<React.SetStateAction<string | null>>;
}



const ModalAuth: React.FC<props> = ({setOpenModal, setAuth, setUsername}) => {


    const [method, setMethod] = useState<"discord" | "email">("email");
    const [userData, setUserData] = useState<authUserDS| authUserEmail>({
        username: ""
    });

    //useQuery
    //if disabled is false, the query will be sent only with refetch() function
    const {isLoading, data:response, error, isSuccess, status, refetch} = useQuery("user tokens", () => AuthService.register(userData), {enabled: false, refetchOnWindowFocus: false, staleTime: 100});

    //closes the modal window
    const handleClose = () => {
        setOpenModal(false);
    }

    //updates the userData state on change
    const changeUserDataState = (event: React.FormEvent) => {
        const target = (event.target as unknown as HTMLInputElement);
        setUserData(
            {...userData, [target.id] : target.value}
        );
        console.log("data changed");
    }


    // sends data to the back end server
    const handleCheckIn = async (event: SyntheticEvent) => {
        event.preventDefault();
        switch(method){
            case "discord":
                break;
            case "email":
                console.log("making backend request...");
                await refetch({cancelRefetch: true, throwOnError: true});
                break;
        }
    }

    // sets the auth to true (state saying if user is authenticated or not)
    useEffect(() => {
            if(response && response.data){
                const data = response.data;
                console.log("response data", data);
                setAuth(true);
                localStorage.setItem("accessToken", data.accessToken);
                localStorage.setItem("username", data.data.username);
                setUsername(data.data.username);
                console.log("logged in as", data.data.username);
                setOpenModal(false);
            }
    }, [response]);

    useEffect(() => {

            error && console.log("error from back end" , error);

    }, [error]);


    return(
        <div className={s.modalWindow}>

            <div className={s.authForm} >
                <h2 className={s.title}>Authorization</h2>
                {method === "discord" && <div className={s.discord}>
                <p>If you are a member of Insomnia Server, you can authorize with your Nickname</p>
                <div className={s.inputField}>
                    <div className={s.fields}>
                        <input id={"dsName"} type="text" placeholder={"enter your discord Username"}/>
                        #
                        <input id={"dsName"} type="text" placeholder={"throw me some numbers"}/>
                    </div>
                    <label htmlFor="dsName">Discord Name</label>
                </div>
                <div className={s.buttons}>
                    <button onClick={handleCheckIn}>
                        Check In
                    </button>
                    <button onClick={handleClose}> Close Window </button>
                </div>
                <div className={s.chooseMethod}>
                    <button onClick={(event) => {event.preventDefault(); setMethod("email")}}>
                        Email
                    </button>
                    <button onClick={(event) => {event.preventDefault(); setMethod("discord")}}>
                        Discord
                    </button>
                </div>
                </div>}
                {method === "email" && <div className={s.email}>
                    <p>Enter your data below to authorize with your email</p>
                    <div onChange={(event) => changeUserDataState(event)} className={s.emailFields}>
                        <div className={s.inputField}>
                            <input id={"username"} type="text" placeholder={"please, enter your nickName"}/>
                            <label htmlFor="username">Nickname</label>
                        </div>
                        <div className={s.inputField}>
                            <input id={"email"} type="text" placeholder={"please, enter your email"}/>
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className={s.inputField}>
                            <input id={"password"} type="password" placeholder={"please, make up a password"}/>
                            <label htmlFor="password">Password</label>
                        </div>
                    </div>
                    <div className={s.buttons}>
                        <button onClick={handleCheckIn}>
                            Check In
                        </button>
                        <button onClick={handleClose}> Close Window </button>
                    </div>
                    <div className={s.chooseMethod}>
                        <button onClick={(event) => {event.preventDefault(); setMethod("email")}}>
                            Email
                        </button>
                        <button onClick={(event) => {event.preventDefault(); setMethod("discord")}}>
                            Discord
                        </button>
                    </div>
                </div>}
                {/*isLoading && <Loader/>*/}
            </div>
        </div>
    )
}

export default ModalAuth;