import React, {SyntheticEvent, useEffect, useState} from "react";

import s from "./ModalAuth.module.css"
//react query
import {useQuery} from "react-query";
import AuthService from "../../services/Auth.service";

// types
import {authUserDS, authUserEmail} from "../../types/authData";
//import Loader from "../Loader/Loader";

interface props{
    setOpenModalLogin: React.Dispatch<React.SetStateAction<boolean>>;
    setAuth: React.Dispatch<React.SetStateAction<boolean>>;
    setUsername: React.Dispatch<React.SetStateAction<string | null>>;
}



const ModalLogin: React.FC<props> = ({setOpenModalLogin, setAuth, setUsername}) => {



    const [userData, setUserData] = useState<{
        username: string,
        password: string,
    }>({
        username: "",
        password: "",
    });

    //useQuery
    //if disabled is false, the query will be sent only with refetch() function
    const {isLoading, data:response, error, isSuccess, status, refetch} = useQuery("user tokens", () => AuthService.login(userData), {enabled: false, refetchOnWindowFocus: false});

    //closes the modal window
    const handleClose = () => {
        setOpenModalLogin(false);
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
        console.log("making backend request...");
        await refetch({cancelRefetch: true, throwOnError: true})
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
            setOpenModalLogin(false);
        }
    }, [response]);

    useEffect(() => {

        error && console.log("error from back end" , error);

    }, [error]);


    return(
        <div className={s.modalWindow}>
            <div className={s.authForm} >
                <h2 className={s.title}>LOGIN</h2>
                    <div onChange={changeUserDataState} className={s.inputFields}>
                        <div className={s.field}>
                            <input id={"username"} type="text" placeholder={"enter Username"}/>
                            <label htmlFor="username">Username</label>
                        </div>
                        <div className={s.field}>
                            <input id={"password"} type="password" placeholder={"enter Password"}/>
                            <label htmlFor="password">Password</label>
                        </div>
                    </div>
                    <div className={s.buttons}>
                        <button onClick={handleCheckIn}>
                            Check In
                        </button>
                        <button onClick={handleClose}> Close Window </button>
                    </div>
                </div>
                {/*isLoading && <Loader/>*/}
            </div>
    )
}

export default ModalLogin;