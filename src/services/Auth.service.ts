import axios from "axios";
import {authUserData, authUserDS, authUserEmail} from "../types/authData";

axios.defaults.baseURL = "http://localhost:5666";

class AuthService{

    static async register(userData: authUserDS | authUserEmail){

        return await axios.post<authUserData>("/auth/create", {userData}, {headers: {"Content-Type": "application/json"}});
    }

    static async login(userData: authUserDS | authUserEmail){

        return await axios.post<authUserData>("/auth/login", {userData}, {withCredentials: true, headers: {"Content-Type": "application/json"}});
    }
}

export default AuthService;