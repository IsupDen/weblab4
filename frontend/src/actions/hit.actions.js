import {hitService} from "../services";
import {hitConstants} from "../constants";

export const hitAction = {
    createHit,
    deleteHits,
    getHits
}

function createHit(hit) {
    return dispatch => {
        hitService.createHit(hit)
            .then(response => {
                dispatch({ type: hitConstants.CREATE_HIT, hit: response.data});
            })
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    window.location = '/#/signin';
                }
            });
    }
}

function deleteHits() {
    return dispatch => {
        hitService.deleteHits()
            .then(() => {
                dispatch({ type: hitConstants.DELETE_HITS, username: localStorage.getItem("username") });
            })
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    window.location = '/#/signin';
                }
            });
    }
}

function getHits() {
    return dispatch => {
        hitService.getHits()
            .then(response => {
                dispatch({ type: hitConstants.GET_HITS, hits: response.data });
            })
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    window.location = '/#/signin';
                }
            });
    }
}