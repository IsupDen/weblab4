import {userService} from "../services";
import {errorActions} from "./error.actions";
import {encode as base64_encode} from 'base-64';

export const userActions = {
    login,
    logout,
    register
};

function login(user) {
    return dispatch => {
        localStorage.setItem('user', base64_encode(user.username + ':' + user.password));
        localStorage.setItem('username', user.username);
        console.log(localStorage.getItem('user'));
        userService.login()
            .then(() => {
                window.location = '/';
                dispatch(errorActions.clear());
            })
            .catch(() => {
                dispatch(errorActions.error(['Wrong username or password']));
                logout();
            });
    }
}

function logout() {
    console.log('logout');
    userService.logout();
}

function register(user) {
    return dispatch => {
        localStorage.setItem('user', base64_encode(user.username + ':' + user.password));
        localStorage.setItem('username', user.username);
        userService.register(user)
            .then(() => {
                dispatch(errorActions.clear());
                window.location = '/';
            })
            .catch(error => {
                dispatch(errorActions.error(error.response.data));
                logout();
            })
    }
}
