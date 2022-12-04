import {encode as base64_encode} from 'base-64';
import axios from "axios";

export const userService = {
    login,
    logout,
    register,
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    };

    let url =  '/login?username=' + username +  '&password=' + base64_encode(password);
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