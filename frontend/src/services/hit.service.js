import {authHeader} from "../util";
import axios from "axios";

export const hitService = {
    getHits,
    deleteHits,
    createHit
}

function getHits() {
    const requestOptions = {
        method: 'GET',
        headers: {
            ...authHeader()
        }
    };
    return axios('/hits', requestOptions);
}

function deleteHits() {
    const requestOptions = {
        method: 'DELETE',
        headers: {
            ...authHeader()
        }
    };
    return axios('/hits', requestOptions);
}

function createHit(hit) {
    const requestOptions = {
        method: 'POST',
        headers: {
            ...authHeader(),
            'Content-Type': 'application/json'
        },
        data: hit
    };
    return axios('/hits', requestOptions);
}