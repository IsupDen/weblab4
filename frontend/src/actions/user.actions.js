import {userService} from "../services";
import {errorActions} from "./error.actions";
import {encode as base64_encode} from 'base-64';

export const userActions = {
    login,
    logout,
    register
};

function login(username, password) {
    return dispatch => {
        userService.login(username, password)
            .then(() => {
                const user = base64_encode(username + ':' + password);
                localStorage.setItem('user', user);
                localStorage.setItem('username', username);
                window.location = '/';
                dispatch(errorActions.clear());
            })
            .catch(() => {
                dispatch(errorActions.error(['Wrong username or password']));
            });
    }
}

function logout() {
    userService.logout();
}

function register(user) {
    return dispatch => {
        userService.register(user)
            .then(() => {
                dispatch(errorActions.clear());
                window.location = '/#/signin';
            })
            .catch(error => {
                dispatch(errorActions.error(error.response.data));
            })
    }
}
