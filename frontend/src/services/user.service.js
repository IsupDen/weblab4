import axios from "axios";
import {authHeader} from "../util";

export const userService = {
    login,
    logout,
    register,
};

function login() {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
                    ...authHeader()
        }
    };
    console.log(requestOptions);
    let url =  '/login';
    return axios(url, requestOptions);
}

function logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('username');
}

function register(user) {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: user
    };

    return axios('/register', requestOptions);
}