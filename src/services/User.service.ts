import {authUserData, authUserDS, authUserEmail} from "../types/authData";
import axios from "axios";
import {UsersListData} from "../types/usersData";

axios.defaults.baseURL = "http://localhost:5666";

class UserService{

    static async getAll(){
        const accessToken = localStorage.getItem("accessToken")
        return await axios.get<{data: UsersListData, msg: string}>("/auth/getUsers", { withCredentials: true, headers: { Authorization: `Bearer ${accessToken}`}});
        //const response = await fetch("http://localhost:5666/auth/getUsers", {method: "GET", credentials: "include", headers: {'Access-Control-Allow-Origin': "http://localhost:5666", Authorization: `Bearer ${accessToken}`}});  //'Access-Control-Allow-Credentials': "true"
        //const data = await response.json();
        //console.log("data", data);
        //return data;
    }
}

/*
* 'Access-Control-Allow-Origin' : 'http://localhost:5666/auth/getUsers', "Access-Control-Allow-Credentials": true,*/
export default UserService;


















